"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Briefcase, GraduationCap, Code, Award, FolderGit2, Languages, Trophy, X } from "lucide-react"
import type { CVData, Experience, Education, Certification, Project, Language, Award as AwardType } from "@/types/cv"
import { useState } from "react"

interface CVFormProps {
  cvData: CVData
  setCVData: (data: CVData) => void
}

export function CVForm({ cvData, setCVData }: CVFormProps) {
  const [skillInput, setSkillInput] = useState("")

  const updateField = (field: keyof CVData, value: any) => {
    setCVData({ ...cvData, [field]: value })
  }

  const handleSkillInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // Check if user typed a comma
    if (value.endsWith(",")) {
      const newSkill = value.slice(0, -1).trim()
      if (newSkill && !cvData.skills.includes(newSkill)) {
        updateField("skills", [...cvData.skills, newSkill])
      }
      setSkillInput("")
    } else {
      setSkillInput(value)
    }
  }

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const newSkill = skillInput.trim()
      if (newSkill && !cvData.skills.includes(newSkill)) {
        updateField("skills", [...cvData.skills, newSkill])
      }
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    updateField(
      "skills",
      cvData.skills.filter((skill) => skill !== skillToRemove),
    )
  }

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      achievements: [""],
    }
    updateField("experience", [...cvData.experience, newExp])
  }

  const removeExperience = (id: string) => {
    updateField(
      "experience",
      cvData.experience.filter((exp) => exp.id !== id),
    )
  }

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    updateField(
      "experience",
      cvData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    )
  }

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      graduationYear: "",
    }
    updateField("education", [...cvData.education, newEdu])
  }

  const removeEducation = (id: string) => {
    updateField(
      "education",
      cvData.education.filter((edu) => edu.id !== id),
    )
  }

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    updateField(
      "education",
      cvData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    )
  }

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: "",
      organization: "",
      issueDate: "",
      expirationDate: "",
    }
    updateField("certifications", [...cvData.certifications, newCert])
  }

  const removeCertification = (id: string) => {
    updateField(
      "certifications",
      cvData.certifications.filter((cert) => cert.id !== id),
    )
  }

  const updateCertification = (id: string, field: keyof Certification, value: any) => {
    updateField(
      "certifications",
      cvData.certifications.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)),
    )
  }

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      role: "",
    }
    updateField("projects", [...cvData.projects, newProject])
  }

  const removeProject = (id: string) => {
    updateField(
      "projects",
      cvData.projects.filter((proj) => proj.id !== id),
    )
  }

  const updateProject = (id: string, field: keyof Project, value: any) => {
    updateField(
      "projects",
      cvData.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    )
  }

  const addLanguage = () => {
    const newLang: Language = {
      id: Date.now().toString(),
      name: "",
      proficiency: "Intermediate",
    }
    updateField("languages", [...cvData.languages, newLang])
  }

  const removeLanguage = (id: string) => {
    updateField(
      "languages",
      cvData.languages.filter((lang) => lang.id !== id),
    )
  }

  const updateLanguage = (id: string, field: keyof Language, value: any) => {
    updateField(
      "languages",
      cvData.languages.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)),
    )
  }

  const addAward = () => {
    const newAward: AwardType = {
      id: Date.now().toString(),
      title: "",
      description: "",
    }
    updateField("awards", [...cvData.awards, newAward])
  }

  const removeAward = (id: string) => {
    updateField(
      "awards",
      cvData.awards.filter((award) => award.id !== id),
    )
  }

  const updateAward = (id: string, field: keyof AwardType, value: any) => {
    updateField(
      "awards",
      cvData.awards.map((award) => (award.id === id ? { ...award, [field]: value } : award)),
    )
  }

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={cvData.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                placeholder="Software Engineer"
                value={cvData.jobTitle}
                onChange={(e) => updateField("jobTitle", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={cvData.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="+1 234 567 8900"
                value={cvData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="New York, NY"
                value={cvData.location}
                onChange={(e) => updateField("location", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Professional Summary *</Label>
            <Textarea
              id="summary"
              placeholder="A brief 3-5 line summary of your experience, skills, and career goals..."
              className="min-h-[100px] resize-none"
              value={cvData.summary}
              onChange={(e) => updateField("summary", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Tip: Include measurable achievements and relevant keywords</p>
          </div>
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Work Experience
            </CardTitle>
            <Button onClick={addExperience} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {cvData.experience.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No experience added yet. Click "Add" to get started.
            </p>
          ) : (
            cvData.experience.map((exp, index) => (
              <div key={exp.id} className="p-4 border border-border rounded-lg space-y-4 bg-card/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Experience {index + 1}</span>
                  <Button
                    onClick={() => removeExperience(exp.id)}
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                  />
                  <Input
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                  />
                  <Input
                    placeholder="Start Date (e.g., Jan 2020)"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                  />
                  <Input
                    placeholder="End Date (e.g., Dec 2022)"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                    disabled={exp.current}
                  />
                </div>

                <Textarea
                  placeholder="Key achievements and responsibilities (one per line)..."
                  className="min-h-[80px]"
                  value={exp.achievements.join("\n")}
                  onChange={(e) => updateExperience(exp.id, "achievements", e.target.value.split("\n"))}
                />
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Education
            </CardTitle>
            <Button onClick={addEducation} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {cvData.education.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No education added yet. Click "Add" to get started.
            </p>
          ) : (
            cvData.education.map((edu, index) => (
              <div key={edu.id} className="p-4 border border-border rounded-lg space-y-4 bg-card/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Education {index + 1}</span>
                  <Button
                    onClick={() => removeEducation(edu.id)}
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                    className="md:col-span-2"
                  />
                  <Input
                    placeholder="Year"
                    value={edu.graduationYear}
                    onChange={(e) => updateEducation(edu.id, "graduationYear", e.target.value)}
                  />
                </div>
                <Input
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                />
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Code className="w-5 h-5" />
            Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Input
              placeholder="Type a skill and press comma or Enter to add (e.g., JavaScript, React, Node.js)"
              value={skillInput}
              onChange={handleSkillInput}
              onKeyDown={handleSkillKeyDown}
            />
            <p className="text-xs text-muted-foreground">Press comma (,) or Enter after each skill to add it</p>
          </div>

          {cvData.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 border border-border rounded-lg bg-muted/30">
              {cvData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                    type="button"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="w-5 h-5" />
              Certifications & Trainings
            </CardTitle>
            <Button onClick={addCertification} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {cvData.certifications.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No certifications added yet. Click "Add" to get started.
            </p>
          ) : (
            cvData.certifications.map((cert, index) => (
              <div key={cert.id} className="p-4 border border-border rounded-lg space-y-4 bg-card/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Certification {index + 1}</span>
                  <Button
                    onClick={() => removeCertification(cert.id)}
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder="Certificate Name"
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                  />
                  <Input
                    placeholder="Issuing Organization"
                    value={cert.organization}
                    onChange={(e) => updateCertification(cert.id, "organization", e.target.value)}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Issue Date (e.g., Jan 2023)"
                      value={cert.issueDate}
                      onChange={(e) => updateCertification(cert.id, "issueDate", e.target.value)}
                    />
                    <Input
                      placeholder="Expiration Date (optional)"
                      value={cert.expirationDate || ""}
                      onChange={(e) => updateCertification(cert.id, "expirationDate", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <FolderGit2 className="w-5 h-5" />
              Projects
            </CardTitle>
            <Button onClick={addProject} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {cvData.projects.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No projects added yet. Click "Add" to get started.
            </p>
          ) : (
            cvData.projects.map((proj, index) => (
              <div key={proj.id} className="p-4 border border-border rounded-lg space-y-4 bg-card/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Project {index + 1}</span>
                  <Button
                    onClick={() => removeProject(proj.id)}
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder="Project Name"
                    value={proj.name}
                    onChange={(e) => updateProject(proj.id, "name", e.target.value)}
                  />
                  <Textarea
                    placeholder="Short description of the project..."
                    className="min-h-[60px]"
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                  />
                  <Input
                    placeholder="Your Role (e.g., Lead Developer, Team Member)"
                    value={proj.role}
                    onChange={(e) => updateProject(proj.id, "role", e.target.value)}
                  />
                  <Input
                    placeholder="Technologies Used (comma-separated)"
                    value={proj.technologies.join(", ")}
                    onChange={(e) =>
                      updateProject(
                        proj.id,
                        "technologies",
                        e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean),
                      )
                    }
                  />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Languages className="w-5 h-5" />
              Languages
            </CardTitle>
            <Button onClick={addLanguage} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {cvData.languages.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No languages added yet. Click "Add" to get started.
            </p>
          ) : (
            cvData.languages.map((lang, index) => (
              <div key={lang.id} className="p-4 border border-border rounded-lg space-y-4 bg-card/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Language {index + 1}</span>
                  <Button
                    onClick={() => removeLanguage(lang.id)}
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Language Name (e.g., English)"
                    value={lang.name}
                    onChange={(e) => updateLanguage(lang.id, "name", e.target.value)}
                  />
                  <Select
                    value={lang.proficiency}
                    onValueChange={(value) => updateLanguage(lang.id, "proficiency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Proficiency Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Native">Native</SelectItem>
                      <SelectItem value="Fluent">Fluent</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Basic">Basic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Awards / Extracurricular Activities
            </CardTitle>
            <Button onClick={addAward} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {cvData.awards.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No awards or activities added yet. Click "Add" to get started.
            </p>
          ) : (
            cvData.awards.map((award, index) => (
              <div key={award.id} className="p-4 border border-border rounded-lg space-y-4 bg-card/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Award/Activity {index + 1}</span>
                  <Button
                    onClick={() => removeAward(award.id)}
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder="Title (e.g., Employee of the Year, Volunteer Work)"
                    value={award.title}
                    onChange={(e) => updateAward(award.id, "title", e.target.value)}
                  />
                  <Textarea
                    placeholder="Description..."
                    className="min-h-[60px]"
                    value={award.description}
                    onChange={(e) => updateAward(award.id, "description", e.target.value)}
                  />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
