export interface Profile {
  id: string
  name: string
  tagline: string
  short_bio: string
  long_bio: string
  profile_photo_url: string | null
  resume_url: string | null
  email: string
  github_url: string
  linkedin_url: string
  leetcode_url: string
  gfg_url: string
  work_auth: string
  job_preference: string
  location_preference: string
}

export interface Project {
  id: string
  title: string
  short_description: string
  long_description: string
  tech_stack: string[]
  github_url: string | null
  live_url: string | null
  thumbnail_url: string | null
  featured: boolean
  display_order: number
}

export interface Skill {
  id: string
  name: string
  category: string
  proficiency: 'Beginner' | 'Intermediate' | 'Expert'
  display_order: number
}

export interface Experience {
  id: string
  role: string
  company: string
  location: string
  start_date: string
  end_date: string
  bullets: string[]
  logo_url: string | null
  display_order: number
}

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  start_year: number
  end_year: number
  gpa: string
  display_order: number
}

export interface Publication {
  id: string
  title: string
  authors: string
  conference: string
  date: string
  link: string | null
  display_order: number
}

export interface AIConfig {
  id: string
  custom_qa: { question: string; answer: string }[]
  tone_notes: string
  sections_enabled: Record<string, boolean>
}