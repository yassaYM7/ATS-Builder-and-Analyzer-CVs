import Link from "next/link"
import { Header } from "@/components/header"
import { HomeAssistant } from "@/components/home-assistant"
import { AnimatedSvgBackground } from "@/components/animated-svg-background"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, BarChart3, MessageSquare, CheckCircle, Sparkles, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 sm:py-16 max-w-7xl">
        {/* Hero Section with Animated SVG Background */}
        <div className="relative text-center mb-12 sm:mb-20 overflow-hidden rounded-3xl">
          <AnimatedSvgBackground />
          <div className="relative z-10 py-12 sm:py-20">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              AI-Powered Resume Optimization
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6 text-balance px-4">
              Build ATS-Optimized Resumes
              <br />
              <span className="text-primary">That Get You Hired</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto text-pretty px-4">
              Create professional resumes with AI assistance, analyze them against ATS systems, and get personalized
              recommendations to improve your chances of landing interviews.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
              <Link href="/builder" className="w-full sm:w-auto">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  Start Building <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-card/80 backdrop-blur-sm">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-20">
          <Card className="p-4 sm:p-6 border-border bg-card hover:border-primary/50 transition-colors">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 sm:mb-4">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Smart Resume Builder</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Create professional resumes with our intuitive form builder. Add experience, education, skills, and
              projects with ease.
            </p>
          </Card>

          <Card className="p-4 sm:p-6 border-border bg-card hover:border-primary/50 transition-colors">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 sm:mb-4">
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">ATS Analysis</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Get detailed ATS compatibility scores with keyword analysis, formatting checks, and actionable
              recommendations.
            </p>
          </Card>

          <Card className="p-4 sm:p-6 border-border bg-card hover:border-primary/50 transition-colors sm:col-span-2 md:col-span-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 sm:mb-4">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">AI Assistant</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Chat with our AI assistant for personalized tips, content suggestions, and career advice.
            </p>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 md:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 text-center">
            Why Choose ATS Builder/Analyzer?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              "ATS-optimized templates that pass automated screening",
              "Real-time keyword analysis and suggestions",
              "AI-powered content recommendations",
              "Export to PDF and DOCX formats",
              "Dark and light mode support",
              "Free to use with no hidden costs",
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm sm:text-base text-muted-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 sm:mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4 px-4">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 px-4">
            Join thousands of job seekers who landed their dream jobs
          </p>
          <Link href="/builder" className="inline-block w-full sm:w-auto px-4">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              Get Started Now <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 sm:mt-20">
        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
              © 2025 ATS Builder/Analyzer. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                href="/contact"
                className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/feedback"
                className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Feedback
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <HomeAssistant />
    </div>
  )
}
