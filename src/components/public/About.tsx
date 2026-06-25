'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Profile } from '@/types'

export default function About({ profile }: { profile: Profile | null }) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const stats = [
    { label: 'GPA', value: '3.96/4.0' },
    { label: 'Problems Solved', value: '400+' },
    { label: 'Projects Built', value: '10+' },
    { label: 'Research Papers', value: '1' },
  ]

  return (
    <section id="about" style={{ padding: isMobile ? '4rem 1rem' : '6rem 4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <div style={{ width: '2.5rem', height: '1px', background: '#6366f1' }} />
            <span style={{ color: '#6366f1', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>About Me</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '3rem' : '5rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: isMobile ? '1.75rem' : 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                Passionate about building{' '}
                <span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  intelligent systems
                </span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                {profile?.long_bio}
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href={profile?.github_url ?? '#'} target="_blank" rel="noopener noreferrer"
                  style={{ padding: '0.6rem 1.5rem', borderRadius: '6px', border: '1px solid rgba(99,102,241,0.4)', color: '#818cf8', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600 }}>
                  GitHub
                </a>
                <a href={profile?.linkedin_url ?? '#'} target="_blank" rel="noopener noreferrer"
                  style={{ padding: '0.6rem 1.5rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600 }}>
                  LinkedIn
                </a>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {stats.map((stat, i) => (
                <motion.div key={stat.label}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                  style={{ padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}
                >
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {stat.value}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', marginTop: '0.4rem' }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}