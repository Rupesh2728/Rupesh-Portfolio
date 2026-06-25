'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const sections = [
  { label: 'Profile', icon: '👤', href: '/admin/dashboard/profile', desc: 'Edit bio, tagline, social links' },
  { label: 'Projects', icon: '🚀', href: '/admin/dashboard/projects', desc: 'Add, edit, or remove projects' },
  { label: 'Skills', icon: '⚡', href: '/admin/dashboard/skills', desc: 'Manage your tech stack' },
  { label: 'Experience', icon: '💼', href: '/admin/dashboard/experience', desc: 'Update work history' },
  { label: 'Education', icon: '🎓', href: '/admin/dashboard/education', desc: 'Manage degrees' },
  { label: 'Publications', icon: '📄', href: '/admin/dashboard/publications', desc: 'Research papers' },
  { label: 'AI Config', icon: '🤖', href: '/admin/dashboard/ai-config', desc: 'Customize AI persona' },
]

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/admin')
      else { setUser(data.user); setLoading(false) }
    })
  }, [router])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>Loading...</div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', fontFamily: 'system-ui, sans-serif' }}>

      {/* Glow blobs */}
      <div style={{ position: 'fixed', top: '-10%', right: '20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '0', right: '0', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '1rem 1.25rem' : '1.25rem 4rem',
        background: 'rgba(13,13,13,0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(99,102,241,0.5)', flexShrink: 0 }}>
            <Image src="/memoji.png" alt="Rupesh" width={36} height={36} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
           <div style={{ color: '#fff', fontWeight: 800, fontSize: isMobile ? '0.9rem' : '1rem' }}>
  Rupesh<span style={{ color: '#6366f1' }}>.</span>
  {!isMobile && <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, fontSize: '0.78rem', marginLeft: '0.5rem' }}>Admin</span>}
</div>
{!isMobile && <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem' }}>{user?.email}</div>}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
  <Link href="/" target="_blank"
    style={{
      padding: isMobile ? '0.35rem 0.6rem' : '0.45rem 1rem',
      borderRadius: '6px',
      border: '1px solid rgba(99,102,241,0.4)',
      color: '#818cf8',
      fontSize: isMobile ? '0.7rem' : '0.78rem',
      textDecoration: 'none', fontWeight: 600,
      whiteSpace: 'nowrap',
    }}
  >
    {isMobile ? '↗' : 'View Site →'}
  </Link>
  <button onClick={handleLogout}
    style={{
      padding: isMobile ? '0.35rem 0.6rem' : '0.45rem 1rem',
      borderRadius: '6px',
      border: '1px solid rgba(255,255,255,0.1)',
      background: 'transparent',
      color: 'rgba(255,255,255,0.4)',
      fontSize: isMobile ? '0.7rem' : '0.78rem',
      cursor: 'pointer', fontWeight: 600,
      whiteSpace: 'nowrap',
    }}
  >
    {isMobile ? '✕' : 'Sign Out'}
  </button>
</div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '6rem 1rem 3rem' : '8rem 2rem 4rem', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: '2.5rem', height: '1px', background: '#6366f1' }} />
            <span style={{ color: '#6366f1', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>Dashboard</span>
          </div>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: isMobile ? '1.75rem' : '2.5rem', margin: '0 0 0.5rem', lineHeight: 1.1 }}>
            Welcome back,{' '}
            <span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Agent Rups
            </span> 
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem', margin: 0 }}>
            Manage your portfolio content - changes reflect live on your site instantly.
          </p>
        </div>

        {/* Status bar */}
        <div style={{
          display: 'flex', gap: '1rem', flexWrap: 'wrap',
          padding: '1rem 1.5rem', borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.02)',
          marginBottom: '2.5rem',
        }}>
          {[
            { label: 'Status', value: 'Live', color: '#22c55e', glow: true },
            { label: 'Sections', value: '7', color: '#818cf8', glow: false },
            { label: 'AI Chat', value: 'Active', color: '#a855f7', glow: false },
            { label: 'Database', value: 'Supabase', color: 'rgba(255,255,255,0.4)', glow: false },
          ].map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingRight: '1rem', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              {item.glow && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color, boxShadow: `0 0 6px ${item.color}`, display: 'inline-block' }} />}
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.label}:</span>
              <span style={{ color: item.color, fontSize: '0.8rem', fontWeight: 700 }}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Section cards */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {sections.map((section, i) => (
            <Link key={section.label} href={section.href} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  padding: '1.5rem', borderRadius: '14px',
                  border: '1px solid rgba(255,255,255,0.07)',
                  background: 'rgba(255,255,255,0.02)',
                  cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: '1.25rem',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = 'rgba(99,102,241,0.4)'
                  el.style.background = 'rgba(99,102,241,0.05)'
                  el.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = 'rgba(255,255,255,0.07)'
                  el.style.background = 'rgba(255,255,255,0.02)'
                  el.style.transform = 'translateY(0)'
                }}
              >
                {/* Icon */}
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
                  background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem',
                }}>
                  {section.icon}
                </div>

                {/* Text */}
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{section.label}</div>
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem' }}>{section.desc}</div>
                </div>

                {/* Arrow */}
                <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '1rem' }}>→</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <p style={{ color: 'rgba(255,255,255,0.1)', fontSize: '0.72rem', textAlign: 'center', marginTop: '4rem' }}>
          Rupesh Portfolio Admin · Powered by Supabase + Claude AI
        </p>
      </div>
    </div>
  )
}