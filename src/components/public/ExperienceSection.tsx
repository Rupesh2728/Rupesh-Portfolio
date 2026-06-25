'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Experience } from '@/types'

export default function ExperienceSection({ experience }: { experience: Experience[] }) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section id="experience" style={{ padding: isMobile ? '4rem 1rem' : '6rem 4rem', background: 'rgba(255,255,255,0.01)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: '2.5rem', height: '1px', background: '#6366f1' }} />
            <span style={{ color: '#6366f1', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>Experience</span>
          </div>
          <h2 style={{ fontSize: isMobile ? '1.75rem' : 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', margin: 0 }}>Where I&apos;ve Worked</h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {experience.map((exp, i) => (
            <motion.div key={exp.id}
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
              style={{ padding: isMobile ? '1.5rem' : '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', borderLeft: '3px solid #6366f1' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: isMobile ? '1rem' : '1.1rem', margin: 0 }}>{exp.role}</h3>
                  <p style={{ color: '#818cf8', fontSize: '0.875rem', margin: '0.25rem 0 0', fontWeight: 600 }}>{exp.company}</p>
                </div>
                <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>{exp.start_date} – {exp.end_date}</span>
                  <br />
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>{exp.location}</span>
                </div>
              </div>
              <ul style={{ margin: '1rem 0 0', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {exp.bullets?.map((bullet, bi) => (
                  <li key={bi} style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.7 }}>{bullet}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}