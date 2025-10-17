import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const sql = neon(process.env.DATABASE_URL!)

    const result = await sql`
      INSERT INTO cv_submissions (user_name, user_email, cv_data, ats_score)
      VALUES (
        ${data.personalInfo.fullName},
        ${data.personalInfo.email},
        ${JSON.stringify(data)},
        ${data.atsScore || 0}
      )
      RETURNING id
    `

    return NextResponse.json({ success: true, id: result[0].id })
  } catch (error) {
    console.error("[v0] Error saving CV submission:", error)
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    const submissions = await sql`
      SELECT id, user_name, user_email, cv_data, ats_score, created_at
      FROM cv_submissions
      ORDER BY created_at DESC
    `

    return NextResponse.json(submissions)
  } catch (error) {
    console.error("[v0] Error fetching CV submissions:", error)
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}
