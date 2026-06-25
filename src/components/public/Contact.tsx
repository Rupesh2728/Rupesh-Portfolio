'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Profile } from '@/types'

export default function Contact({ profile }: { profile: Profile | null }) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section id="contact" style={{ padding: isMobile ? '4rem 1rem' : '6rem 4rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '2.5rem', height: '1px', background: '#6366f1' }} />
            <span style={{ color: '#6366f1', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>Contact</span>
            <div style={{ width: '2.5rem', height: '1px', background: '#6366f1' }} />
          </div>

          <h2 style={{ fontSize: isMobile ? '1.75rem' : 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
            Let&apos;s Work Together
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '0.95rem' }}>
            I&apos;m currently open to full-time roles, internships, and research collaborations. Whether you have a question or just want to say hi — my inbox is open.
          </p>

          <Link href={'mailto:' + (profile?.email ?? '')}
            style={{
              display: 'inline-block', padding: '1rem 3rem', borderRadius: '8px',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              color: '#fff', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem',
              boxShadow: '0 0 30px rgba(99,102,241,0.3)', marginBottom: '3rem',
            }}
          >
            Say Hello →
          </Link>

          <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? '1.25rem' : '2rem', flexWrap: 'wrap' }}>
            {[
              { label: 'GitHub', href: profile?.github_url ?? '#' },
              { label: 'LinkedIn', href: profile?.linkedin_url ?? '#' },
              { label: 'LeetCode', href: profile?.leetcode_url ?? '#' },
              { label: 'Email', href: 'mailto:' + (profile?.email ?? '') },
            ].map((s) => (
              <Link key={s.label} href={s.href} target="_blank"
                style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}
                onMouseEnter={e => (e.currentTarget.style.color = '#818cf8')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
              >
                {s.label}
              </Link>
            ))}
          </div>

          <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.75rem', marginTop: '4rem' }}>
            Designed & Built by Rupesh Chowdary Peddineni - Agent Rups © 2026
          </p>
        </motion.div>
      </div>
    </section>
  )
}