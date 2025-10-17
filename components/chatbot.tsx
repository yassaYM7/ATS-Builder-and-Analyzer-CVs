"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import type { CVData, ATSScore } from "@/types/cv"

interface ChatBotProps {
  cvData: CVData
  atsScore: ATSScore | null
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function ChatBot({ cvData, atsScore }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm your CV Buddy. I can help you improve your resume, suggest keywords, and answer questions about ATS optimization. How can I assist you today?",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(input, cvData, atsScore)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  const generateResponse = (query: string, data: CVData, score: ATSScore | null): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("score") || lowerQuery.includes("ats")) {
      if (score) {
        return `Your current ATS score is ${score.overall}%. ${
          score.overall >= 70
            ? "That's excellent! Your CV is well-optimized."
            : score.overall >= 40
              ? "That's good, but there's room for improvement. Focus on adding more relevant keywords and measurable achievements."
              : "Your CV needs significant improvements. I recommend adding more specific skills, quantifiable achievements, and industry keywords."
        }`
      }
      return "You haven't analyzed your CV yet. Click the 'Analyze CV' button to get your ATS compatibility score!"
    }

    if (lowerQuery.includes("keyword") || lowerQuery.includes("skill")) {
      return "To improve keyword matching, add specific technical skills relevant to your target role. Include tools, technologies, methodologies, and soft skills. For example: 'React, TypeScript, Agile, Team Leadership, API Development'."
    }

    if (lowerQuery.includes("experience") || lowerQuery.includes("achievement")) {
      return "Make your experience section stronger by using action verbs and quantifiable results. For example: 'Developed a React application that improved user engagement by 35%' or 'Led a team of 5 developers to deliver project 2 weeks ahead of schedule'."
    }

    if (lowerQuery.includes("summary") || lowerQuery.includes("profile")) {
      return "Your professional summary should be 3-5 lines highlighting your experience, key skills, and career goals. Include years of experience, main expertise areas, and what value you bring. Keep it concise and impactful!"
    }

    if (lowerQuery.includes("improve") || lowerQuery.includes("better")) {
      return "To improve your CV: 1) Add measurable achievements with numbers, 2) Include relevant keywords for your target role, 3) Keep formatting clean and ATS-friendly, 4) Use action verbs, 5) Tailor your CV to each job application."
    }

    return "I can help you with: improving your ATS score, adding relevant keywords, writing better achievements, optimizing your professional summary, and general CV improvement tips. What would you like to know more about?"
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="border-b border-border flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                CV Buddy
              </CardTitle>
              <Button onClick={() => setIsOpen(false)} size="sm" variant="ghost">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Your AI CV Assistant</p>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
          </CardContent>

          <div className="border-t border-border p-4 flex-shrink-0">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
