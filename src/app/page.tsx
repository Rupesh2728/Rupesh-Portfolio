import { supabase } from '@/lib/supabase'
import { Profile, Project, Skill, Experience, Education, Publication } from '@/types'
import Hero from '@/components/public/Hero'
import About from '@/components/public/About'
import Projects from '@/components/public/Projects'
import Skills from '@/components/public/Skills'
import ExperienceSection from '@/components/public/ExperienceSection'
import EducationSection from '@/components/public/EducationSection'
import Publications from '@/components/public/Publications'
import Contact from '@/components/public/Contact'

export default async function Home() {
  const { data: profileData } = await supabase.from('profile').select('*').single()
  const { data: projectsData } = await supabase.from('projects').select('*').order('display_order')
  const { data: skillsData } = await supabase.from('skills').select('*').order('display_order')
  const { data: experienceData } = await supabase.from('experience').select('*').order('display_order')
  const { data: educationData } = await supabase.from('education').select('*').order('display_order')
  const { data: publicationsData } = await supabase.from('publications').select('*').order('display_order')

  const profile = profileData as Profile | null
  const projects = (projectsData ?? []) as Project[]
  const skills = (skillsData ?? []) as Skill[]
  const experience = (experienceData ?? []) as Experience[]
  const education = (educationData ?? []) as Education[]
  const publications = (publicationsData ?? []) as Publication[]

  return (
    <main style={{ background: '#0d0d0d', minHeight: '100vh' }}>
      <Hero profile={profile} />
      <About profile={profile} />
      <Projects projects={projects} />
      <Skills skills={skills} />
      <ExperienceSection experience={experience} />
      <EducationSection education={education} />
      <Publications publications={publications} />
      <Contact profile={profile} />
    </main>
  )
}