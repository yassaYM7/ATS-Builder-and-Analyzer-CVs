"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Mail, Phone, MapPin } from "lucide-react"
import type { CVData } from "@/types/cv"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CVPreviewProps {
  cvData: CVData
}

export function CVPreview({ cvData }: CVPreviewProps) {
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const saveCVToDatabase = async (atsScore?: number) => {
    if (!cvData.fullName || !cvData.email) {
      return
    }

    setIsSaving(true)
    try {
      await fetch("/api/cv-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personalInfo: {
            fullName: cvData.fullName,
            email: cvData.email,
          },
          ...cvData,
          atsScore: atsScore || 0,
        }),
      })
    } catch (error) {
      console.error("[v0] Error saving CV:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleExportPDF = () => {
    setShowExportDialog(false)
    saveCVToDatabase()

    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const styles = `
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; color: #000; background: #fff; }
        h1 { font-size: 28px; margin-bottom: 8px; }
        h2 { font-size: 18px; margin-top: 24px; margin-bottom: 12px; border-bottom: 2px solid #3b82f6; padding-bottom: 4px; }
        h3 { font-size: 16px; margin-bottom: 4px; }
        p { margin-bottom: 8px; line-height: 1.5; }
        .subtitle { font-size: 20px; color: #666; margin-bottom: 16px; }
        .contact { display: flex; gap: 16px; margin-bottom: 24px; font-size: 14px; color: #666; }
        .section { margin-bottom: 24px; }
        .experience-item, .education-item { margin-bottom: 16px; padding-left: 16px; border-left: 2px solid #e5e7eb; }
        .meta { font-size: 14px; color: #666; margin-bottom: 8px; }
        ul { margin-left: 20px; margin-top: 8px; }
        li { margin-bottom: 4px; line-height: 1.5; }
        .skills { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill { display: inline-block; padding: 4px 12px; background: #eff6ff; border: 1px solid #3b82f6; border-radius: 16px; font-size: 14px; }
        @media print {
          @page { 
            margin: 0;
            size: A4;
          }
          body { 
            padding: 1.5cm;
            margin: 0;
          }
        }
      </style>
    `

    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${cvData.fullName || "CV"} - Resume</title>
          ${styles}
        </head>
        <body>
          <h1>${cvData.fullName || "Your Name"}</h1>
          <p class="subtitle">${cvData.jobTitle || "Job Title"}</p>
          
          <div class="contact">
            ${cvData.email ? `<span>📧 ${cvData.email}</span>` : ""}
            ${cvData.phone ? `<span>📱 ${cvData.phone}</span>` : ""}
            ${cvData.location ? `<span>📍 ${cvData.location}</span>` : ""}
          </div>

          ${
            cvData.summary
              ? `
            <div class="section">
              <h2>Professional Summary</h2>
              <p>${cvData.summary}</p>
            </div>
          `
              : ""
          }

          ${
            cvData.experience.length > 0
              ? `
            <div class="section">
              <h2>Work Experience</h2>
              ${cvData.experience
                .map(
                  (exp) => `
                <div class="experience-item">
                  <h3>${exp.position}</h3>
                  <p class="meta">${exp.company} • ${exp.startDate} - ${exp.current ? "Present" : exp.endDate}</p>
                  <ul>
                    ${exp.achievements
                      .filter(Boolean)
                      .map((achievement) => `<li>${achievement}</li>`)
                      .join("")}
                  </ul>
                </div>
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }

          ${
            cvData.education.length > 0
              ? `
            <div class="section">
              <h2>Education</h2>
              ${cvData.education
                .map(
                  (edu) => `
                <div class="education-item">
                  <h3>${edu.degree}</h3>
                  <p class="meta">${edu.institution} • ${edu.graduationYear}</p>
                </div>
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }

          ${
            cvData.skills.length > 0
              ? `
            <div class="section">
              <h2>Skills</h2>
              <div class="skills">
                ${cvData.skills.map((skill) => `<span class="skill">${skill}</span>`).join("")}
              </div>
            </div>
          `
              : ""
          }

          ${
            cvData.certifications.length > 0
              ? `
            <div class="section">
              <h2>Certifications & Trainings</h2>
              ${cvData.certifications
                .map(
                  (cert) => `
                <div class="education-item">
                  <h3>${cert.name}</h3>
                  <p class="meta">${cert.organization} • ${cert.issueDate}${cert.expirationDate ? ` - ${cert.expirationDate}` : ""}</p>
                </div>
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }

          ${
            cvData.projects.length > 0
              ? `
            <div class="section">
              <h2>Projects</h2>
              ${cvData.projects
                .map(
                  (proj) => `
                <div class="experience-item">
                  <h3>${proj.name}</h3>
                  <p class="meta">${proj.role}</p>
                  <p>${proj.description}</p>
                  ${proj.technologies.length > 0 ? `<p class="meta">Technologies: ${proj.technologies.join(", ")}</p>` : ""}
                </div>
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }

          ${
            cvData.languages.length > 0
              ? `
            <div class="section">
              <h2>Languages</h2>
              ${cvData.languages
                .map(
                  (lang) => `
                <div class="education-item">
                  <h3>${lang.name}</h3>
                  <p class="meta">${lang.proficiency}</p>
                </div>
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }

          ${
            cvData.awards.length > 0
              ? `
            <div class="section">
              <h2>Awards / Extracurricular Activities</h2>
              ${cvData.awards
                .map(
                  (award) => `
                <div class="experience-item">
                  <h3>${award.title}</h3>
                  <p>${award.description}</p>
                </div>
              `,
                )
                .join("")}
            </div>
          `
              : ""
          }
        </body>
      </html>
    `

    printWindow.document.write(content)
    printWindow.document.close()
    setTimeout(() => {
      printWindow.print()
    }, 250)
  }

  const handleExportDOCX = () => {
    setShowExportDialog(false)
    saveCVToDatabase()

    let content = `${cvData.fullName || "Your Name"}\n`
    content += `${cvData.jobTitle || "Job Title"}\n\n`

    if (cvData.email || cvData.phone || cvData.location) {
      content += `Contact Information\n`
      if (cvData.email) content += `Email: ${cvData.email}\n`
      if (cvData.phone) content += `Phone: ${cvData.phone}\n`
      if (cvData.location) content += `Location: ${cvData.location}\n`
      content += `\n`
    }

    if (cvData.summary) {
      content += `Professional Summary\n`
      content += `${cvData.summary}\n\n`
    }

    if (cvData.experience.length > 0) {
      content += `Work Experience\n\n`
      cvData.experience.forEach((exp) => {
        content += `${exp.position}\n`
        content += `${exp.company} • ${exp.startDate} - ${exp.current ? "Present" : exp.endDate}\n`
        exp.achievements.filter(Boolean).forEach((achievement) => {
          content += `• ${achievement}\n`
        })
        content += `\n`
      })
    }

    if (cvData.education.length > 0) {
      content += `Education\n\n`
      cvData.education.forEach((edu) => {
        content += `${edu.degree}\n`
        content += `${edu.institution} • ${edu.graduationYear}\n\n`
      })
    }

    if (cvData.skills.length > 0) {
      content += `Skills\n`
      content += cvData.skills.join(", ") + "\n\n"
    }

    if (cvData.certifications.length > 0) {
      content += `Certifications & Trainings\n\n`
      cvData.certifications.forEach((cert) => {
        content += `${cert.name}\n`
        content += `${cert.organization} • ${cert.issueDate}${cert.expirationDate ? ` - ${cert.expirationDate}` : ""}\n\n`
      })
    }

    if (cvData.projects.length > 0) {
      content += `Projects\n\n`
      cvData.projects.forEach((proj) => {
        content += `${proj.name}\n`
        content += `${proj.role}\n`
        content += `${proj.description}\n`
        if (proj.technologies.length > 0) {
          content += `Technologies: ${proj.technologies.join(", ")}\n`
        }
        content += `\n`
      })
    }

    if (cvData.languages.length > 0) {
      content += `Languages\n\n`
      cvData.languages.forEach((lang) => {
        content += `${lang.name} - ${lang.proficiency}\n`
      })
      content += `\n`
    }

    if (cvData.awards.length > 0) {
      content += `Awards / Extracurricular Activities\n\n`
      cvData.awards.forEach((award) => {
        content += `${award.title}\n`
        content += `${award.description}\n\n`
      })
    }

    const blob = new Blob([content], { type: "application/msword" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${cvData.fullName || "CV"}_Resume.doc`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4 sticky top-24">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FileText className="w-5 h-5" />
          CV Preview
        </h2>
        <Button onClick={() => setShowExportDialog(true)} size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Your CV</DialogTitle>
            <DialogDescription>Choose your preferred format to download your CV</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-4">
            <Button onClick={handleExportPDF} className="w-full justify-start gap-3 bg-transparent" variant="outline">
              <FileText className="w-5 h-5" />
              <div className="text-left">
                <div className="font-semibold">Export as PDF</div>
                <div className="text-xs text-muted-foreground">Best for sharing and printing</div>
              </div>
            </Button>
            <Button onClick={handleExportDOCX} className="w-full justify-start gap-3 bg-transparent" variant="outline">
              <FileText className="w-5 h-5" />
              <div className="text-left">
                <div className="font-semibold">Export as DOCX</div>
                <div className="text-xs text-muted-foreground">Editable document format</div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Card className="overflow-hidden">
        <CardContent className="p-8 bg-card">
          {/* Header */}
          <div className="border-b border-border pb-6 mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">{cvData.fullName || "Your Name"}</h1>
            <p className="text-xl text-muted-foreground mb-4">{cvData.jobTitle || "Job Title"}</p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {cvData.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {cvData.email}
                </div>
              )}
              {cvData.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {cvData.phone}
                </div>
              )}
              {cvData.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {cvData.location}
                </div>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          {cvData.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                Professional Summary
              </h2>
              <p className="text-sm text-foreground leading-relaxed">{cvData.summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {cvData.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                Work Experience
              </h2>
              <div className="space-y-4">
                {cvData.experience.map((exp) => (
                  <div key={exp.id} className="pl-4 border-l-2 border-border">
                    <h3 className="font-semibold text-foreground">{exp.position}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {exp.company} • {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
                      {exp.achievements.filter(Boolean).map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {cvData.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                Education
              </h2>
              <div className="space-y-3">
                {cvData.education.map((edu) => (
                  <div key={edu.id} className="pl-4 border-l-2 border-border">
                    <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">
                      {edu.institution} • {edu.graduationYear}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {cvData.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {cvData.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                Certifications & Trainings
              </h2>
              <div className="space-y-3">
                {cvData.certifications.map((cert) => (
                  <div key={cert.id} className="pl-4 border-l-2 border-border">
                    <h3 className="font-semibold text-foreground">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {cert.organization} • {cert.issueDate}
                      {cert.expirationDate && ` - ${cert.expirationDate}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cvData.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                Projects
              </h2>
              <div className="space-y-4">
                {cvData.projects.map((proj) => (
                  <div key={proj.id} className="pl-4 border-l-2 border-border">
                    <h3 className="font-semibold text-foreground">{proj.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{proj.role}</p>
                    <p className="text-sm text-foreground mb-2">{proj.description}</p>
                    {proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {proj.technologies.map((tech, idx) => (
                          <span key={idx} className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {cvData.languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                Languages
              </h2>
              <div className="space-y-2">
                {cvData.languages.map((lang) => (
                  <div key={lang.id} className="pl-4 border-l-2 border-border">
                    <h3 className="font-semibold text-foreground">{lang.name}</h3>
                    <p className="text-sm text-muted-foreground">{lang.proficiency}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cvData.awards.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                Awards / Extracurricular Activities
              </h2>
              <div className="space-y-3">
                {cvData.awards.map((award) => (
                  <div key={award.id} className="pl-4 border-l-2 border-border">
                    <h3 className="font-semibold text-foreground">{award.title}</h3>
                    <p className="text-sm text-foreground">{award.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
