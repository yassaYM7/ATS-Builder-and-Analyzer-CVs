"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sparkles, TrendingUp, AlertCircle, CheckCircle2, Lightbulb } from "lucide-react"
import type { CVData, ATSScore } from "@/types/cv"

interface ATSAnalysisProps {
  cvData: CVData
  atsScore: ATSScore | null
  setAtsScore: (score: ATSScore) => void
}

export function ATSAnalysis({ cvData, atsScore, setAtsScore }: ATSAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    if (atsScore) {
      let current = 0
      const target = atsScore.overall
      const increment = target / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setAnimatedScore(target)
          clearInterval(timer)
        } else {
          setAnimatedScore(Math.floor(current))
        }
      }, 20)
      return () => clearInterval(timer)
    }
  }, [atsScore])

  const analyzeCV = () => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const keywords = calculateKeywordScore(cvData)
      const formatting = calculateFormattingScore(cvData)
      const readability = calculateReadabilityScore(cvData)
      const overall = Math.round(keywords * 0.5 + formatting * 0.25 + readability * 0.25)

      const score: ATSScore = {
        overall,
        keywords,
        formatting,
        readability,
        feedback: generateFeedback(overall),
        suggestions: generateSuggestions(cvData, keywords, formatting, readability),
        missingKeywords: generateMissingKeywords(cvData),
      }

      setAtsScore(score)
      setIsAnalyzing(false)
    }, 2000)
  }

  const calculateKeywordScore = (data: CVData): number => {
    let score = 0
    if (data.skills.length > 5) score += 30
    if (data.skills.length > 10) score += 20
    if (data.experience.length > 0) score += 25
    if (data.summary.length > 100) score += 25
    return Math.min(score, 100)
  }

  const calculateFormattingScore = (data: CVData): number => {
    let score = 0
    if (data.fullName && data.jobTitle && data.email) score += 40
    if (data.experience.length > 0) score += 30
    if (data.education.length > 0) score += 30
    return Math.min(score, 100)
  }

  const calculateReadabilityScore = (data: CVData): number => {
    let score = 50
    if (data.summary.length > 50 && data.summary.length < 300) score += 25
    if (data.experience.some((exp) => exp.achievements.length > 2)) score += 25
    return Math.min(score, 100)
  }

  const generateFeedback = (score: number): string[] => {
    if (score >= 70) {
      return [
        "Excellent! Your CV is well-optimized for ATS systems.",
        "Strong keyword presence detected.",
        "Professional formatting maintained throughout.",
      ]
    } else if (score >= 40) {
      return [
        "Good foundation, but there's room for improvement.",
        "Consider adding more relevant keywords.",
        "Some sections could be more detailed.",
      ]
    } else {
      return [
        "Your CV needs significant improvements for ATS compatibility.",
        "Missing critical information in key sections.",
        "Add more specific achievements and keywords.",
      ]
    }
  }

  const generateSuggestions = (data: CVData, keywords: number, formatting: number, readability: number): string[] => {
    const suggestions: string[] = []

    if (keywords < 70) {
      suggestions.push("Add more industry-specific keywords and technical skills")
      suggestions.push("Include measurable achievements with numbers and percentages")
    }
    if (formatting < 70) {
      suggestions.push("Ensure all required sections are complete (Contact, Experience, Education)")
      suggestions.push("Use consistent formatting throughout your CV")
    }
    if (readability < 70) {
      suggestions.push("Keep your professional summary concise (3-5 lines)")
      suggestions.push("Use action verbs to start each achievement bullet point")
    }
    if (data.skills.length < 8) {
      suggestions.push("Add more relevant skills to increase keyword matching")
    }

    return suggestions
  }

  const generateMissingKeywords = (data: CVData): string[] => {
    const commonKeywords = [
      "Team Collaboration",
      "Project Management",
      "Problem Solving",
      "Communication",
      "Leadership",
      "Agile",
      "Version Control",
      "API Integration",
    ]

    return commonKeywords
      .filter((keyword) => !data.skills.some((skill) => skill.toLowerCase().includes(keyword.toLowerCase())))
      .slice(0, 5)
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-success"
    if (score >= 40) return "text-warning"
    return "text-destructive"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 70) return "bg-success/10 border-success/20"
    if (score >= 40) return "bg-warning/10 border-warning/20"
    return "bg-destructive/10 border-destructive/20"
  }

  return (
    <div className="space-y-6">
      {/* Analyze Button */}
      {!atsScore && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Ready to Analyze Your CV?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get instant AI-powered feedback and ATS compatibility score
                </p>
              </div>
              <Button onClick={analyzeCV} disabled={isAnalyzing || !cvData.fullName} className="w-full" size="lg">
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Analyze CV
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ATS Score Display */}
      {atsScore && (
        <>
          {/* Overall Score */}
          <Card className={`border-2 ${getScoreBgColor(atsScore.overall)}`}>
            <CardHeader>
              <CardTitle className="text-lg">ATS Compatibility Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className={`text-6xl font-bold ${getScoreColor(atsScore.overall)}`}>{animatedScore}%</div>
                <Progress value={animatedScore} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  {atsScore.overall >= 70
                    ? "Excellent - Highly likely to pass ATS screening"
                    : atsScore.overall >= 40
                      ? "Good - May pass with improvements"
                      : "Needs Work - Unlikely to pass ATS screening"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Scores */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Detailed Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Keywords Match</span>
                    <span className={getScoreColor(atsScore.keywords)}>{atsScore.keywords}%</span>
                  </div>
                  <Progress value={atsScore.keywords} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Formatting Score</span>
                    <span className={getScoreColor(atsScore.formatting)}>{atsScore.formatting}%</span>
                  </div>
                  <Progress value={atsScore.formatting} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Readability</span>
                    <span className={getScoreColor(atsScore.readability)}>{atsScore.readability}%</span>
                  </div>
                  <Progress value={atsScore.readability} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {atsScore.feedback.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-warning" />
                Improvement Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {atsScore.suggestions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Missing Keywords */}
          {atsScore.missingKeywords.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Suggested Keywords to Add</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {atsScore.missingKeywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full border border-border"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Re-analyze Button */}
          <Button onClick={analyzeCV} variant="outline" className="w-full bg-transparent" disabled={isAnalyzing}>
            {isAnalyzing ? "Analyzing..." : "Re-analyze CV"}
          </Button>
        </>
      )}
    </div>
  )
}
