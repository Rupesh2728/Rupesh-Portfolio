'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  async function handleLogin() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin/dashboard')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', display: 'flex', alignItems: 'stretch', fontFamily: 'system-ui, sans-serif', overflow: 'hidden' }}>

      {/* Left — hero side */}
      {!isMobile && (
        <div style={{
  flex: 1, position: 'relative',
  borderRight: '1px solid rgba(255,255,255,0.06)',
  display: 'flex', flexDirection: 'column',
  alignItems: 'center', justifyContent: 'center',
  padding: '3rem', overflow: 'hidden',
  minHeight: '100vh',
}}>
          {/* Glow blobs */}
          <div style={{ position: 'absolute', top: '-10%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '0%', left: '0%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

          {/* Grid */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.03,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>

            {/* Avatar */}
            <div style={{ position: 'relative', width: '280px', height: '280px', margin: '0 auto 2.5rem' }}>
              <div style={{ position: 'absolute', inset: '-16px', borderRadius: '50%', border: '1px dashed rgba(99,102,241,0.35)', animation: 'spin 20s linear infinite' }} />
              <div style={{ position: 'absolute', inset: '-6px', borderRadius: '50%', border: '1px solid rgba(168,85,247,0.2)' }} />
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden',
                background: 'linear-gradient(#0d0d0d, #0d0d0d) padding-box, linear-gradient(135deg, #6366f1, #a855f7, #ec4899) border-box',
                border: '3px solid transparent',
              }}>
                <Image src="/memoji.png" alt="Rupesh" width={280} height={280}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>
            </div>

            {/* Text */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '999px', border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.08)', marginBottom: '1.5rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e', display: 'inline-block' }} />
              <span style={{ color: '#22c55e', fontSize: '0.75rem', fontWeight: 600 }}>Admin Access Only</span>
            </div>

            <h1 style={{ margin: '0 0 0.75rem', lineHeight: 1.1, fontWeight: 800 }}>
              <span style={{ display: 'block', fontSize: '3.5rem', color: '#fff', letterSpacing: '-0.03em' }}>Rupesh</span>
              <span style={{
                display: 'block', fontSize: '3.5rem', letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Peddineni.
              </span>
            </h1>

            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', fontStyle: 'italic', margin: '0 0 2rem' }}>
              &quot;Unfortunately but not this time&quot;
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Portfolio', 'AI/ML', 'Research', 'Full Stack'].map((tag) => (
                <span key={tag} style={{
                  padding: '0.35rem 0.875rem', borderRadius: '999px',
                  border: '1px solid rgba(99,102,241,0.25)',
                  background: 'rgba(99,102,241,0.08)',
                  color: '#818cf8', fontSize: '0.75rem', fontWeight: 600,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {/* Right — login form */}
    <div style={{
  flex: 1,
  display: 'flex', flexDirection: 'column',
  alignItems: 'center', justifyContent: 'center',
  padding: isMobile ? '2rem 1.5rem' : '3rem 2.5rem',
  position: 'relative',
  minHeight: '100vh',
  background: 'rgba(255,255,255,0.01)',
}}>

        {/* Glow on right side */}
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ width: '100%', maxWidth: '360px', position: 'relative', zIndex: 1 }}>

          {/* Mobile avatar */}
          {isMobile && (
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1rem', border: '2px solid rgba(99,102,241,0.5)' }}>
                <Image src="/memoji.png" alt="Rupesh" width={80} height={80} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.3rem' }}>
                Rupesh<span style={{ color: '#6366f1' }}>.</span>
              </div>
            </div>
          )}

          {/* Logo — desktop */}
          {!isMobile && (
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                Rupesh<span style={{ color: '#6366f1' }}>.</span>
                <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400, fontSize: '0.85rem', marginLeft: '0.5rem' }}>Admin</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem', margin: 0 }}>Sign in to manage your portfolio</p>
            </div>
          )}

          {/* Form card */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px', padding: '2rem',
          }}>
            <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem', margin: '0 0 1.75rem' }}>
              Welcome back! Agent....
            </h2>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '0.75rem 1rem', color: '#f87171', fontSize: '0.83rem', marginBottom: '1.25rem' }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="rcpeddineni@gmail.com"
                  style={{
                    width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="••••••••"
                  style={{
                    width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading || !email || !password}
              style={{
                width: '100%', padding: '0.875rem', borderRadius: '8px',
                border: 'none', cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
                background: loading || !email || !password ? 'rgba(99,102,241,0.3)' : 'linear-gradient(135deg, #6366f1, #a855f7)',
                color: '#fff', fontWeight: 700, fontSize: '0.9rem',
                boxShadow: !loading && email && password ? '0 0 20px rgba(99,102,241,0.3)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </div>

          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.12)', fontSize: '0.72rem', marginTop: '1.5rem' }}>
            🔒 Protected · Only you can access this
          </p>
        </div>
      </div>
    </div>
  )
}