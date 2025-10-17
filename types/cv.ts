export interface CVData {
  fullName: string
  jobTitle: string
  email: string
  phone: string
  location: string
  summary: string
  experience: Experience[]
  education: Education[]
  skills: string[]
  certifications: Certification[]
  projects: Project[]
  languages: Language[]
  awards: Award[]
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  achievements: string[]
}

export interface Education {
  id: string
  degree: string
  institution: string
  graduationYear: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  role: string
}

export interface Language {
  id: string
  name: string
  proficiency: string
}

export interface Certification {
  id: string
  name: string
  organization: string
  issueDate: string
  expirationDate?: string
}

export interface Award {
  id: string
  title: string
  description: string
}

export interface ATSScore {
  overall: number
  keywords: number
  formatting: number
  readability: number
  feedback: string[]
  suggestions: string[]
  missingKeywords: string[]
}
