"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { CVForm } from "@/components/cv-form"
import { CVPreview } from "@/components/cv-preview"
import { ATSAnalysis } from "@/components/ats-analysis"
import { ChatBot } from "@/components/chatbot"
import type { CVData, ATSScore } from "@/types/cv"

export default function CVBuilderPage() {
  const [cvData, setCVData] = useState<CVData>({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: [],
    languages: [],
    awards: [],
  })

  const [atsScore, setAtsScore] = useState<ATSScore | null>(null)
  const [activeTab, setActiveTab] = useState<"build" | "analyze">("build")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-4 sm:py-8 max-w-7xl">
        {/* Tab Navigation */}
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <div className="flex gap-1 sm:gap-2 bg-card border border-border rounded-lg p-1 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("build")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 rounded-md text-sm sm:text-base font-medium transition-all ${
                activeTab === "build"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Build CV
            </button>
            <button
              onClick={() => setActiveTab("analyze")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 rounded-md text-sm sm:text-base font-medium transition-all ${
                activeTab === "analyze"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Analyze & Preview
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {activeTab === "build" ? (
            <>
              <CVForm cvData={cvData} setCVData={setCVData} />
              <CVPreview cvData={cvData} />
            </>
          ) : (
            <>
              <CVPreview cvData={cvData} />
              <ATSAnalysis cvData={cvData} atsScore={atsScore} setAtsScore={setAtsScore} />
            </>
          )}
        </div>
      </main>

      {/* Chatbot */}
      <ChatBot cvData={cvData} atsScore={atsScore} />
    </div>
  )
}
