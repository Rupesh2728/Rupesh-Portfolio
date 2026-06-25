'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Education } from '@/types'

export default function EducationSection({ education }: { education: Education[] }) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section id="education" style={{ padding: isMobile ? '4rem 1rem' : '6rem 4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: '2.5rem', height: '1px', background: '#6366f1' }} />
            <span style={{ color: '#6366f1', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>Education</span>
          </div>
          <h2 style={{ fontSize: isMobile ? '1.75rem' : 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', margin: 0 }}>Academic Background</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.25rem' }}>
          {education.map((edu, i) => (
            <motion.div key={edu.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
              style={{ padding: '1.75rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.75rem' }}>{i === 0 ? '🎓' : '🏛️'}</span>
                <span style={{ padding: '0.3rem 0.8rem', borderRadius: '999px', background: 'rgba(99,102,241,0.15)', color: '#818cf8', fontSize: '0.75rem', fontWeight: 700 }}>
                  GPA: {edu.gpa}
                </span>
              </div>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', margin: '0 0 0.5rem' }}>{edu.degree}</h3>
              <p style={{ color: '#a855f7', fontSize: '0.875rem', fontWeight: 600, margin: '0 0 0.25rem' }}>{edu.institution}</p>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', margin: 0 }}>{edu.location} · {edu.start_year} – {edu.end_year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}