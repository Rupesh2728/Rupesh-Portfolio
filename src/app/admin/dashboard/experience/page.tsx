'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Experience } from '@/types'

const empty: Omit<Experience, 'id'> = {
  role: '', company: '', location: '', start_date: '', end_date: 'Present',
  bullets: [], logo_url: null, display_order: 0,
}

export default function AdminExperience() {
  const [items, setItems] = useState<Experience[]>([])
  const [editing, setEditing] = useState<Partial<Experience> | null>(null)
  const [loading, setLoading] = useState(true)
  const [bulletsText, setBulletsText] = useState('')
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { if (!data.user) router.push('/admin') })
    fetchData()
  }, [router])

  async function fetchData() {
    const { data } = await supabase.from('experience').select('*').order('display_order')
    setItems(data ?? [])
    setLoading(false)
  }

  async function handleSave() {
    if (!editing) return
    const payload = { ...editing, bullets: bulletsText.split('\n').map(b => b.trim()).filter(Boolean) }
    if (editing.id) {
      await supabase.from('experience').update(payload).eq('id', editing.id)
    } else {
      await supabase.from('experience').insert(payload)
    }
    setEditing(null)
    fetchData()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this experience?')) return
    await supabase.from('experience').delete().eq('id', id)
    fetchData()
  }

  function openEdit(item: Partial<Experience>) {
    setEditing(item)
    setBulletsText(item.bullets?.join('\n') ?? '')
  }

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' as const,
    fontFamily: 'system-ui, sans-serif',
  }

  const labelStyle = {
    color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem',
    letterSpacing: '0.1em', textTransform: 'uppercase' as const,
    display: 'block', marginBottom: '0.5rem',
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'rgba(255,255,255,0.3)' }}>Loading...</div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ position: 'fixed', top: '-10%', right: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', background: 'rgba(13,13,13,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/dashboard" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', textDecoration: 'none' }}>← Dashboard</Link>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>Experience</span>
        </div>
        <button onClick={() => openEdit({ ...empty })}
          style={{ padding: '0.5rem 1.5rem', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}>
          + Add Experience
        </button>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '6rem 1.5rem 4rem', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '2.5rem', height: '1px', background: '#6366f1' }} />
            <span style={{ color: '#6366f1', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>Admin</span>
          </div>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: '2rem', margin: 0 }}>Experience</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map((item) => (
            <div key={item.id} style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', borderLeft: '3px solid #6366f1' }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>{item.role}</div>
                <div style={{ color: '#818cf8', fontSize: '0.85rem', marginTop: '0.2rem' }}>{item.company}</div>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem', marginTop: '0.15rem' }}>{item.start_date} – {item.end_date}</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => openEdit(item)} style={{ padding: '0.4rem 0.875rem', borderRadius: '6px', border: '1px solid rgba(99,102,241,0.4)', background: 'transparent', color: '#818cf8', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                <button onClick={() => handleDelete(item.id)} style={{ padding: '0.4rem 0.875rem', borderRadius: '6px', border: '1px solid rgba(239,68,68,0.3)', background: 'transparent', color: '#f87171', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {editing && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '580px', maxHeight: '85vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>{editing.id ? 'Edit Experience' : 'Add Experience'}</h2>
                <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {[
                    { key: 'role', label: 'Role' },
                    { key: 'company', label: 'Company' },
                    { key: 'location', label: 'Location' },
                    { key: 'start_date', label: 'Start Date' },
                    { key: 'end_date', label: 'End Date' },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label style={labelStyle}>{label}</label>
                      <input value={(editing as any)[key] ?? ''} onChange={e => setEditing({ ...editing, [key]: e.target.value })} style={inputStyle} />
                    </div>
                  ))}
                </div>

                <div>
                  <label style={labelStyle}>Bullet Points (one per line)</label>
                  <textarea value={bulletsText} onChange={e => setBulletsText(e.target.value)}
                    rows={6} style={{ ...inputStyle, resize: 'vertical' }}
                    placeholder="Built X using Y&#10;Improved Z by 40%&#10;Led team of N engineers" />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button onClick={() => setEditing(null)} style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={handleSave} style={{ padding: '0.6rem 1.5rem', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>Save</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}