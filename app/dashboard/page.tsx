"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, FileText, MessageSquare, TrendingUp } from "lucide-react"

interface DashboardStats {
  totalCVs: number
  averageAtsScore: number
  totalFeedback: number
  averageRating: number
  scoreDistribution: {
    excellent: number
    good: number
    fair: number
    poor: number
  }
  recentFeedback: Array<{
    id: string
    name: string
    email: string
    rating: number
    feedback: string
    createdAt: string
  }>
}

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const es = new EventSource("/api/dashboard-events")

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data?.error) {
          setError("Failed to load dashboard stats")
          return
        }
        setStats(data)
        setError(null)
        setLoading(false)
      } catch (err) {
        console.error("[v0] Error parsing SSE message:", err)
      }
    }

    es.onerror = () => {
      setError("Connection lost. Reconnecting...")
    }

    return () => {
      es.close()
    }
  }, [])

  if (loading) {
    return (
      <div className="p-4">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="p-4">
        <p className="text-destructive">{error || "Failed to load dashboard"}</p>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {/* Total CVs */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total CVs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{stats.totalCVs}</div>
              <FileText className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>

        {/* Average ATS Score */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg ATS Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{stats.averageAtsScore}</div>
              <TrendingUp className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>

        {/* Total Feedback */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{stats.totalFeedback}</div>
              <MessageSquare className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>

        {/* Average Rating */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{stats.averageRating}</div>
              <Star className="h-8 w-8 text-yellow-400 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Score Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>ATS Score Distribution</CardTitle>
          <CardDescription>Breakdown of CV scores across different ranges</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Excellent (90-100)</span>
              <Badge variant="default">{stats.scoreDistribution.excellent}</Badge>
            </div>
            <Progress value={(stats.scoreDistribution.excellent / stats.totalCVs) * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Good (70-89)</span>
              <Badge variant="secondary">{stats.scoreDistribution.good}</Badge>
            </div>
            <Progress value={(stats.scoreDistribution.good / stats.totalCVs) * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Fair (50-69)</span>
              <Badge variant="outline">{stats.scoreDistribution.fair}</Badge>
            </div>
            <Progress value={(stats.scoreDistribution.fair / stats.totalCVs) * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Poor (0-49)</span>
              <Badge variant="destructive">{stats.scoreDistribution.poor}</Badge>
            </div>
            <Progress value={(stats.scoreDistribution.poor / stats.totalCVs) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Recent Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
          <CardDescription>Latest user feedback</CardDescription>
        </CardHeader>
        <CardContent>
          {stats.recentFeedback.length === 0 ? (
            <p className="text-sm text-muted-foreground">No feedback yet</p>
          ) : (
            <div className="space-y-4">
              {stats.recentFeedback.map((feedback) => (
                <div key={feedback.id} className="border-b pb-3 last:border-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{feedback.name}</p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{feedback.feedback}</p>
                  <p className="text-xs text-muted-foreground">{new Date(feedback.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardPage
