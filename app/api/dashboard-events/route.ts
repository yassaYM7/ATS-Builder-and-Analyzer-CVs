export const dynamic = "force-dynamic";


import { neon } from "@neondatabase/serverless"

export async function GET(request: Request) {
  const encoder = new TextEncoder()
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const sendEvent = (event: unknown) => {
        const data = `data: ${JSON.stringify(event)}\n\n`
        controller.enqueue(encoder.encode(data))
      }

      let intervalId: ReturnType<typeof setInterval> | null = null
      const abort = () => {
        if (intervalId) clearInterval(intervalId)
        controller.close()
      }

      // Close the stream when client disconnects
      request.signal.addEventListener("abort", abort)

      const fetchStats = async () => {
        try {
          const sql = neon(process.env.DATABASE_URL!)

          const cvStats = await sql`
            SELECT 
              COUNT(*) as total_cvs,
              COALESCE(AVG(ats_score), 0) as avg_score,
              COUNT(CASE WHEN ats_score >= 90 THEN 1 END) as excellent,
              COUNT(CASE WHEN ats_score >= 70 AND ats_score < 90 THEN 1 END) as good,
              COUNT(CASE WHEN ats_score >= 50 AND ats_score < 70 THEN 1 END) as fair,
              COUNT(CASE WHEN ats_score < 50 THEN 1 END) as poor
            FROM cv_submissions
          `

          const feedbackStats = await sql`
            SELECT 
              COUNT(*) as total_feedback,
              COALESCE(AVG(rating), 0) as avg_rating
            FROM feedback_submissions
          `

          const recentCVs = await sql`
            SELECT id, cv_data, ats_score, created_at
            FROM cv_submissions
            ORDER BY created_at DESC
            LIMIT 5
          `

          const recentFeedback = await sql`
            SELECT id, user_name, user_email, rating, feedback, created_at
            FROM feedback_submissions
            ORDER BY created_at DESC
            LIMIT 5
          `

          const formattedRecentCVs = recentCVs.map((cv: any) => {
            const cvData = typeof cv.cv_data === "string" ? JSON.parse(cv.cv_data) : cv.cv_data
            return {
              id: cv.id,
              personalInfo: cvData.personalInfo || {
                fullName: "Unknown",
                email: "",
                phone: "",
                location: "",
              },
              atsScore: Number(cv.ats_score),
              createdAt: cv.created_at,
            }
          })

          const payload = {
            totalCVs: Number(cvStats[0].total_cvs),
            averageAtsScore: Math.round(Number(cvStats[0].avg_score)),
            totalFeedback: Number(feedbackStats[0].total_feedback),
            averageRating: Math.round(Number(feedbackStats[0].avg_rating) * 10) / 10,
            scoreDistribution: {
              excellent: Number(cvStats[0].excellent),
              good: Number(cvStats[0].good),
              fair: Number(cvStats[0].fair),
              poor: Number(cvStats[0].poor),
            },
            recentCVs: formattedRecentCVs,
            recentFeedback: recentFeedback.map((feedback: any) => ({
              id: feedback.id,
              name: feedback.user_name,
              email: feedback.user_email,
              rating: Number(feedback.rating),
              feedback: feedback.feedback,
              createdAt: feedback.created_at,
            })),
          }

          sendEvent(payload)
        } catch (error) {
          sendEvent({ error: "Failed to fetch stats" })
        }
      }

      // Initial push
      fetchStats()
      // Push updates every 5 seconds
      intervalId = setInterval(fetchStats, 5000)
    },
    cancel() {
      // noop; abort handler above handles cleanup
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  })
}


