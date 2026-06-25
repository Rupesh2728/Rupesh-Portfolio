'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Publication } from '@/types'

export default function Publications({ publications }: { publications: Publication[] }) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section id="publications" style={{ padding: isMobile ? '4rem 1rem' : '6rem 4rem', background: 'rgba(255,255,255,0.01)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: '2.5rem', height: '1px', background: '#6366f1' }} />
            <span style={{ color: '#6366f1', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>Publications</span>
          </div>
          <h2 style={{ fontSize: isMobile ? '1.75rem' : 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', margin: 0 }}>
            Research Work
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {publications.map((pub, i) => (
            <motion.div key={pub.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
              style={{
                padding: isMobile ? '1.25rem' : '2rem',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.07)',
                background: 'rgba(255,255,255,0.02)',
                borderLeft: '3px solid #a855f7',
              }}
            >
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: isMobile ? '0.9rem' : '1rem', lineHeight: 1.6, margin: '0 0 0.75rem' }}>
                {pub.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem', margin: '0 0 0.5rem', lineHeight: 1.6 }}>
                {pub.authors}
              </p>
              <p style={{ color: '#a855f7', fontSize: '0.82rem', fontWeight: 600, margin: '0 0 1rem', lineHeight: 1.5 }}>
                {pub.conference} · {pub.date}
              </p>
              {pub.link && (
                <Link href={pub.link} target="_blank"
                  style={{ color: '#818cf8', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600 }}
                >
                  View Code on GitHub →
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}