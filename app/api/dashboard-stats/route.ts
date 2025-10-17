import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    // Get CV statistics
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

    // Get feedback statistics
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

    // Get recent feedback
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

    const stats = {
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

    return NextResponse.json(stats)
  } catch (error) {
    console.error("[v0] Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
