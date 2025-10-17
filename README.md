# ATS Builder/Analyzer

A modern, AI-powered CV/Resume builder with integrated ATS (Applicant Tracking System) analysis. Built with Next.js 15, TypeScript, and Tailwind CSS.

![ATS Builder/Analyzer](public/animated-bg.jpg)

## Overview

ATS Builder/Analyzer is a comprehensive web application designed to help job seekers create professional resumes and optimize them for Applicant Tracking Systems. The platform features real-time ATS scoring, AI-powered feedback, and an interactive chatbot assistant to guide users through the resume building process.

## Features

### Core Features
- **Interactive CV Builder** - Multi-section form with real-time preview
- **ATS Analysis** - Comprehensive scoring system (0-100%) with detailed feedback
- **AI Assistant** - Intelligent chatbot for CV writing guidance and tips
- **Live Preview** - Real-time CV preview as you type
- **Export Options** - Download your CV as PDF or DOCX
- **Dark/Light Mode** - Fully themed interface with smooth transitions
- **Mobile Responsive** - Optimized for all screen sizes

### CV Sections
- Personal Information (Name, Email, Phone, Location, LinkedIn, Portfolio)
- Professional Summary
- Work Experience (Multiple entries with rich descriptions)
- Education (Degrees, institutions, dates)
- Skills (Technical and soft skills)
- Certifications & Trainings
- Projects (With descriptions and links)
- Languages (Proficiency levels)
- Awards & Extracurricular Activities

### Additional Features
- **Contact Form** - Integrated with Formspree for easy communication
- **Feedback System** - EmailJS-powered feedback collection with star ratings
- **Animated Backgrounds** - Beautiful blue gradient animations
- **Responsive Navigation** - Mobile hamburger menu with smooth animations
- **Form Validation** - Client-side validation for all inputs
- **Accessibility** - WCAG compliant with proper ARIA labels

## Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components

### Integrations
- **EmailJS** - Email service for feedback form
- **Formspree** - Contact form handling
- **Vercel Blob** - File storage (optional)
- **Neon/Supabase** - Database support (optional)

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Geist Font** - Modern typography

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** (optional but recommended)
- A code editor (VS Code recommended)

## Installation

### 1. Download the Project

**Option A: Download ZIP**
- Click the three dots (⋯) in the v0 chat interface
- Select "Download ZIP"
- Extract to your desired location

**Option B: Clone from GitHub**
\`\`\`bash
git clone <your-repository-url>
cd ats-builder-analyzer
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

This will install all required packages including:
- Next.js and React
- Tailwind CSS
- shadcn/ui components
- EmailJS browser SDK
- All other dependencies

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# EmailJS Configuration (Required for Feedback Form)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key_here

# Optional: Database Configuration
DATABASE_URL=your_database_url_here

# Optional: Blob Storage
BLOB_READ_WRITE_TOKEN=your_blob_token_here
\`\`\`

#### Getting Your EmailJS Public Key

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Go to [Account Settings](https://dashboard.emailjs.com/admin/account)
3. Copy your **Public Key**
4. Paste it in `.env.local`

**EmailJS Configuration:**
- Service ID: `service_56bvka6`
- Template ID: `n2nlc9n`
- Email: `atsbuilderanalyzer@gmail.com`

#### Securing EmailJS

To prevent abuse of your public key:
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/admin/account)
2. Add **Allowed Origins**:
   - `http://localhost:3000` (development)
   - `https://yourdomain.com` (production)
3. Set **Rate Limits** (e.g., 100 emails/day)
4. Enable **reCAPTCHA** (optional)

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
ats-builder-analyzer/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Home/Landing page
│   ├── layout.tsx               # Root layout with theme provider
│   ├── globals.css              # Global styles and design tokens
│   ├── builder/                 # CV Builder page
│   │   └── page.tsx
│   ├── contact/                 # Contact form page
│   │   └── page.tsx
│   ├── feedback/                # Feedback form page
│   │   └── page.tsx
│   ├── actions/                 # Server actions
│   │   └── send-feedback.ts
│   └── api/                     # API routes (legacy)
│
├── components/                   # React components
│   ├── cv-form.tsx              # Main CV builder form
│   ├── cv-preview.tsx           # Live CV preview
│   ├── ats-analysis.tsx         # ATS scoring component
│   ├── chatbot.tsx              # CV Buddy assistant
│   ├── home-assistant.tsx       # Home page AI assistant
│   ├── header.tsx               # Navigation header
│   ├── theme-toggle.tsx         # Dark/light mode toggle
│   ├── theme-provider.tsx       # Theme context provider
│   ├── animated-svg-background.tsx  # Animated background
│   └── ui/                      # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       └── ... (40+ components)
│
├── types/                        # TypeScript definitions
│   └── cv.ts                    # CV data interfaces
│
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts            # Mobile detection
│   └── use-toast.ts             # Toast notifications
│
├── lib/                          # Utility functions
│   └── utils.ts                 # Helper functions (cn, etc.)
│
├── public/                       # Static assets
│   ├── animated-bg.svg          # Background animation
│   └── *.jpg                    # Images
│
├── scripts/                      # Database scripts (legacy)
│
├── .env.local                   # Environment variables (create this)
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies
└── README.md                    # This file
\`\`\`

## Usage Guide

### Building Your CV

1. **Navigate to Builder**
   - Click "Get Started" on the home page
   - Or go to `/builder` directly

2. **Fill in Your Information**
   - Start with Personal Information
   - Add your Professional Summary
   - Fill in Work Experience (add multiple entries)
   - Add Education details
   - List your Skills
   - Add Certifications, Projects, Languages, and Awards

3. **Preview Your CV**
   - See real-time updates in the right panel
   - Check formatting and layout

4. **Get ATS Analysis**
   - View your ATS score (0-100%)
   - Read detailed feedback
   - See keyword analysis
   - Get improvement suggestions

5. **Export Your CV**
   - Click "Export CV" button
   - Choose PDF or DOCX format
   - Download your professional resume

### Using the AI Assistant

**On Home Page:**
- Click the chat icon in the bottom right
- Ask questions about the platform
- Get CV writing tips

**On Builder Page:**
- Use CV Buddy for section-specific guidance
- Get suggestions for improving content
- Ask about ATS optimization

### Contact & Feedback

**Contact Form** (`/contact`)
- Integrated with Formspree
- Direct submission to your email
- Form validation included

**Feedback Form** (`/feedback`)
- Rate your experience (1-5 stars)
- Provide detailed feedback
- Powered by EmailJS

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create production build |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint for code quality |

## Configuration

### Theme Customization

Edit `app/globals.css` to customize colors:

\`\`\`css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode colors */
}
\`\`\`

### Typography

Fonts are configured in `app/layout.tsx`:
- **Sans:** Geist Sans (headings and body)
- **Mono:** Geist Mono (code)

### Tailwind Configuration

Customize in `tailwind.config.ts`:
- Extend colors
- Add custom utilities
- Modify breakpoints

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   \`\`\`

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. **Add Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   - Add any other required variables

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:
- **Netlify** - Use Next.js plugin
- **Railway** - Direct deployment
- **DigitalOcean** - App Platform
- **AWS** - Amplify or EC2

## Troubleshooting

### Common Issues

**Port 3000 already in use**
\`\`\`bash
# Kill the process
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
\`\`\`

**Module not found errors**
\`\`\`bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
\`\`\`

**EmailJS not working**
- Verify `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` is set in `.env.local`
- Restart dev server after adding environment variables
- Check browser console for specific errors
- Verify domain restrictions in EmailJS dashboard

**Theme not switching**
- Clear browser cache
- Check if `ThemeProvider` is wrapping the app in `layout.tsx`
- Verify `next-themes` is installed

**Export not working**
- Check browser's print dialog settings
- Ensure pop-ups are not blocked
- Try a different browser

**Mobile menu not showing**
- Clear browser cache
- Check responsive breakpoints in `header.tsx`
- Verify Tailwind CSS is properly configured

### Debug Mode

Add console logs to debug issues:
\`\`\`typescript
console.log("[v0] Current CV data:", cvData);
console.log("[v0] ATS Score:", score);
\`\`\`

## Performance Optimization

### Production Build
\`\`\`bash
npm run build
npm start
\`\`\`

### Optimization Tips
- Images are optimized with Next.js Image component
- Code splitting is automatic with App Router
- CSS is purged in production
- Fonts are optimized with `next/font`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

The application follows WCAG 2.1 Level AA guidelines:
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatible
- Sufficient color contrast
- Focus indicators

## Security

- Environment variables are properly scoped
- EmailJS public key is secured with domain restrictions
- Form validation on client and server
- XSS protection with React
- CSRF protection with Next.js

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test on multiple browsers
- Ensure mobile responsiveness

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Email: atsbuilderanalyzer@gmail.com
- Contact Form: [/contact](http://localhost:3000/contact)
- Feedback Form: [/feedback](http://localhost:3000/feedback)

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Email service by [EmailJS](https://www.emailjs.com/)
- Contact form by [Formspree](https://formspree.io/)
- Fonts by [Vercel](https://vercel.com/font)

## Roadmap

Future enhancements planned:
- [ ] Job matching recommendations
- [ ] Interview preparation tips


---

**Built with ❤️ for job seekers worldwide**

For more information, visit the [live demo](https://your-domain.com) or check out the [documentation](https://your-domain.com/docs).
