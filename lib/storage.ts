export interface CVSubmission {
  id: string
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
  }
  atsScore: number
  createdAt: string
}

export interface FeedbackSubmission {
  id: string
  name: string
  email: string
  rating: number
  feedback: string
  createdAt: string
}

export interface DashboardStats {
  totalCVs: number
  averageAtsScore: number
  totalFeedback: number
  averageRating: number
  recentCVs: CVSubmission[]
  recentFeedback: FeedbackSubmission[]
  scoreDistribution: {
    excellent: number // 90-100
    good: number // 70-89
    fair: number // 50-69
    poor: number // 0-49
  }
}
