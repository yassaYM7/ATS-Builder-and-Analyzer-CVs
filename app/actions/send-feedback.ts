"use server"

import emailjs from "@emailjs/browser"

export async function sendFeedback(formData: {
  name: string
  email: string
  rating: number
  feedback: string
}) {
  try {
    // Initialize EmailJS with public key
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!publicKey) {
      throw new Error("EmailJS public key not configured")
    }

    emailjs.init(publicKey)

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      rating: formData.rating,
      feedback: formData.feedback,
    }

    await emailjs.send("service_56bvka6", "template_do51ak3", templateParams)

    return { success: true }
  } catch (error) {
    console.error("Error sending feedback:", error)
    return { success: false, error: "Failed to send feedback" }
  }
}
