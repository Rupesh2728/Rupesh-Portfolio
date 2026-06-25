'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Profile } from '@/types'

interface HeroProps {
  profile: Profile | null
}

export default function Hero({ profile }: HeroProps) {
  const [isMobile, setIsMobile] = useState(false)
  const tagline = profile?.tagline ?? 'Unfortunately but not this time'
  const email = profile?.email ?? ''

 useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 900)
  check()
  window.addEventListener('resize', check)
  return () => window.removeEventListener('resize', check)
}, [])

  return (
    <section style={{ minHeight: '100vh', background: '#0d0d0d', position: 'relative', overflow: 'hidden', fontFamily: 'system-ui, sans-serif' }}>

      {/* Glow blobs */}
      <div style={{ position: 'absolute', top: '-10%', right: '20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '0%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: isMobile ? '1rem' : '1.25rem 4rem',
          background: 'rgba(13,13,13,0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem' }}>
          Rupesh<span style={{ color: '#6366f1' }}>.</span>
        </div>

        {!isMobile && (
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['About', 'Projects', 'Skills', 'Experience', 'Publications', 'Contact'].map((link) => (
              <Link key={link} href={'#' + link.toLowerCase()}
                style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}
                onMouseEnter={e => (e.currentTarget.style.color = '#6366f1')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
              >
                {link}
              </Link>
            ))}
          </div>
        )}

        <Link href={profile?.resume_url ?? '#'} target="_blank"
          style={{
            padding: '0.45rem 1rem', borderRadius: '6px',
            border: '1px solid rgba(99,102,241,0.5)',
            color: '#818cf8', fontSize: '0.78rem', textDecoration: 'none', fontWeight: 600,
          }}
        >
          Resume
        </Link>
      </motion.nav>

      {/* Hero content */}
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '5rem 1rem 3rem' : '0 4rem',
        maxWidth: '1200px',
margin: '0 auto',
width: '100%',
        gap: isMobile ? '2.5rem' : '4rem',
      }}>

        {/* Left — text */}
        <div style={{ flex: 1, textAlign: isMobile ? 'center' : 'left' }}>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 1rem', borderRadius: '999px',
              border: '1px solid rgba(34,197,94,0.3)',
              background: 'rgba(34,197,94,0.08)',
              marginBottom: '1.5rem',
            }}
          >
            {/* <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e', display: 'inline-block' }} /> */}
            <span style={{ position: 'relative', width: '10px', height: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Ping ring */}
            <span style={{
                position: 'absolute', width: '100%', height: '100%', borderRadius: '50%',
                background: '#22c55e', opacity: 0.4,
                animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
            }} />
            {/* Solid dot */}
            <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#22c55e', boxShadow: '0 0 8px #22c55e',
                display: 'inline-block', position: 'relative', zIndex: 1,
            }} />
            </span>
            <span style={{ color: '#22c55e', fontSize: '0.75rem', fontWeight: 600 }}>Available for Full-time & Internship opportunities</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 style={{ margin: 0, lineHeight: 1.1, fontWeight: 800 }}>
              <span style={{ display: 'block', fontSize: isMobile ? '1.1rem' : 'clamp(1.5rem, 3vw, 2rem)', color: 'rgba(255,255,255,0.5)', fontWeight: 400, marginBottom: '0.5rem' }}>
                Hello, I&apos;m
              </span>
              <span style={{ display: 'block', fontSize: isMobile ? '3rem' : 'clamp(3rem, 6vw, 5.5rem)', color: '#ffffff', letterSpacing: '-0.03em' }}>
                Rupesh
              </span>
              <span style={{
                display: 'block', fontSize: isMobile ? '3rem' : 'clamp(3rem, 6vw, 5.5rem)', letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Peddineni.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', margin: '1.25rem 0', lineHeight: 1.7 }}
          >
            {profile?.short_bio}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{
              color: 'rgba(255,255,255,0.7)', fontSize: '1rem',
              fontStyle: 'italic', marginBottom: '2rem',
              borderLeft: isMobile ? 'none' : '3px solid #6366f1',
              borderTop: isMobile ? '3px solid #6366f1' : 'none',
              paddingLeft: isMobile ? 0 : '1rem',
              paddingTop: isMobile ? '0.75rem' : 0,
            }}
          >
            &quot;{tagline}&quot;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}
          >
            <Link href="#projects"
              style={{
                padding: '0.875rem 1.5rem', borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                color: '#fff', fontWeight: 700, textDecoration: 'none',
                fontSize: '0.85rem', display: 'inline-block',
                boxShadow: '0 0 25px rgba(99,102,241,0.35)',
              }}
            >
              View My Work ↓
            </Link>
            <Link href="#contact"
              style={{
                padding: '0.875rem 1.5rem', borderRadius: '8px',
                border: '1px solid rgba(99,102,241,0.4)',
                color: '#818cf8', fontWeight: 600, textDecoration: 'none',
                fontSize: '0.85rem', display: 'inline-block',
              }}
            >
              Get in Touch
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', justifyContent: isMobile ? 'center' : 'flex-start' }}
          >
            {[
              { label: 'GitHub', href: profile?.github_url ?? '#' },
              { label: 'LinkedIn', href: profile?.linkedin_url ?? '#' },
              { label: 'LeetCode', href: profile?.leetcode_url ?? '#' },
            ].map((s) => (
              <Link key={s.label} href={s.href} target="_blank"
                style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.78rem', textDecoration: 'none', fontWeight: 600 }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
              >
                {s.label}
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Right — avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ flexShrink: 0, position: 'relative', width: isMobile ? '260px' : '420px', height: isMobile ? '260px' : '420px' }}
        >
          <div style={{ position: 'absolute', inset: '-20px', borderRadius: '50%', border: '1px dashed rgba(99,102,241,0.35)', animation: 'spin 20s linear infinite' }} />
          <div style={{ position: 'absolute', inset: '-8px', borderRadius: '50%', border: '1px solid rgba(168,85,247,0.2)' }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)' }} />

          <div style={{
            width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden',
            border: '3px solid transparent',
            background: 'linear-gradient(#0d0d0d, #0d0d0d) padding-box, linear-gradient(135deg, #6366f1, #a855f7, #ec4899) border-box',
            position: 'relative', zIndex: 1,
          }}>
            <Image src="/avatar.png" alt="Rupesh" width={420} height={420}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>

          {!isMobile && (
            <>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', bottom: '10px', left: '-30px', zIndex: 2,
                  background: 'rgba(13,13,13,0.9)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px', padding: '0.6rem 1rem', backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Currently at</div>
                <div style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>CAVAS Lab · UB</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                style={{
                  position: 'absolute', top: '20px', right: '-30px', zIndex: 2,
                  background: 'rgba(13,13,13,0.9)', border: '1px solid rgba(99,102,241,0.3)',
                  borderRadius: '10px', padding: '0.6rem 1rem', backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>GPA</div>
                <div style={{ color: '#818cf8', fontSize: '0.85rem', fontWeight: 700 }}>3.96 / 4.0</div>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>

            <style>{`
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes ping {
            0% { transform: scale(1); opacity: 0.4; }
            75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        `}</style>
    </section>
  )
}