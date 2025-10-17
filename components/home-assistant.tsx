"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function HomeAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm your AI CV Assistant. I can help you understand how to create ATS-optimized resumes, answer questions about our platform, and provide career advice. How can I help you today?",
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
      const response = generateResponse(input)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 1000)
  }

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("ats") || lowerQuery.includes("what is")) {
      return "ATS (Applicant Tracking System) is software used by employers to filter resumes. Our Resume Builder helps you create resumes that pass ATS screening by optimizing keywords, formatting, and structure. Start building your resume to get a detailed ATS compatibility score!"
    }

    if (lowerQuery.includes("how") || lowerQuery.includes("start") || lowerQuery.includes("use")) {
      return "Getting started is easy! Click 'Start Building' to access our Resume Builder. Fill in your information, and our AI will analyze your resume for ATS compatibility. You'll get a detailed score with recommendations for improvement."
    }

    if (lowerQuery.includes("free") || lowerQuery.includes("cost") || lowerQuery.includes("price")) {
      return "Yes! Our Resume Builder is completely free to use. You can create unlimited resumes, get ATS analysis, and export your resumes in PDF or DOCX format at no cost."
    }

    if (lowerQuery.includes("feature") || lowerQuery.includes("what can")) {
      return "Our platform offers: ✓ Smart Resume Builder with multiple sections ✓ Real-time ATS scoring ✓ Keyword analysis ✓ AI-powered recommendations ✓ PDF & DOCX export ✓ Dark/Light mode ✓ AI chatbot assistance. Everything you need to create a winning resume!"
    }

    if (lowerQuery.includes("tip") || lowerQuery.includes("advice") || lowerQuery.includes("help")) {
      return "Here are key tips for a great resume: 1) Use action verbs and quantify achievements 2) Include relevant keywords from job descriptions 3) Keep formatting clean and simple 4) Tailor your resume for each application 5) Highlight measurable results. Want to start building? Click 'Start Building' above!"
    }

    if (lowerQuery.includes("export") || lowerQuery.includes("download") || lowerQuery.includes("pdf")) {
      return "You can export your resume in both PDF and DOCX formats. After building your resume, click the 'Export' button in the preview section to choose your preferred format and download your resume."
    }

    return "I can help you with: understanding ATS systems, getting started with the Resume Builder, learning about our features, resume writing tips, and export options. What would you like to know more about?"
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 rounded-full w-12 h-12 sm:w-14 sm:h-14 shadow-lg z-50"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[calc(100vh-2rem)] shadow-2xl z-50 flex flex-col">
          <CardHeader className="border-b border-border flex-shrink-0 p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                AI Assistant
              </CardTitle>
              <Button onClick={() => setIsOpen(false)} size="sm" variant="ghost">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Ask me anything about resume building</p>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 sm:px-4 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-xs sm:text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
          </CardContent>

          <div className="border-t border-border p-3 sm:p-4 flex-shrink-0">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="text-sm"
              />
              <Button onClick={handleSend} size="icon" className="flex-shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
