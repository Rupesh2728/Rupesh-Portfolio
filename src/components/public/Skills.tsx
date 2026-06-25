'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Skill } from '@/types'

export default function Skills({ skills }: { skills: Skill[] }) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const categories = [...new Set(skills.map(s => s.category))]
  const proficiencyColor = (p: string) => {
    if (p === 'Expert') return '#6366f1'
    if (p === 'Intermediate') return '#a855f7'
    return 'rgba(255,255,255,0.3)'
  }

  return (
    <section id="skills" style={{ padding: isMobile ? '4rem 1rem' : '6rem 4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: '2.5rem', height: '1px', background: '#6366f1' }} />
            <span style={{ color: '#6366f1', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>Skills</span>
          </div>
          <h2 style={{ fontSize: isMobile ? '1.75rem' : 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', margin: 0 }}>Tech Stack</h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {categories.map((category, ci) => (
            <motion.div key={category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: ci * 0.1 }} viewport={{ once: true }}>
              <h3 style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.875rem', fontWeight: 600 }}>
                {category}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
                {skills.filter(s => s.category === category).map((skill, i) => (
                  <motion.span key={skill.id}
                    initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }} viewport={{ once: true }}
                    whileHover={{ y: -2 }}
                    style={{
                      padding: '0.45rem 0.875rem', borderRadius: '8px',
                      border: `1px solid ${proficiencyColor(skill.proficiency)}40`,
                      background: `${proficiencyColor(skill.proficiency)}10`,
                      color: skill.proficiency === 'Expert' ? '#818cf8' : skill.proficiency === 'Intermediate' ? '#c084fc' : 'rgba(255,255,255,0.4)',
                      fontSize: '0.82rem', fontWeight: 600, cursor: 'default',
                    }}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}