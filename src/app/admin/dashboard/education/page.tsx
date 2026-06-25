'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Education } from '@/types'

const empty: Omit<Education, 'id'> = {
  degree: '', institution: '', location: '', start_year: 2021, end_year: 2025, gpa: '', display_order: 0,
}

export default function AdminEducation() {
  const [items, setItems] = useState<Education[]>([])
  const [editing, setEditing] = useState<Partial<Education> | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { if (!data.user) router.push('/admin') })
    fetchData()
  }, [router])

  async function fetchData() {
    const { data } = await supabase.from('education').select('*').order('display_order')
    setItems(data ?? [])
    setLoading(false)
  }

  async function handleSave() {
    if (!editing) return
    if (editing.id) {
      await supabase.from('education').update(editing).eq('id', editing.id)
    } else {
      await supabase.from('education').insert(editing)
    }
    setEditing(null)
    fetchData()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this education entry?')) return
    await supabase.from('education').delete().eq('id', id)
    fetchData()
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
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>Education</span>
        </div>
        <button onClick={() => setEditing({ ...empty })}
          style={{ padding: '0.5rem 1.5rem', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}>
          + Add Education
        </button>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '6rem 1.5rem 4rem', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '2.5rem', height: '1px', background: '#6366f1' }} />
            <span style={{ color: '#6366f1', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>Admin</span>
          </div>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: '2rem', margin: 0 }}>Education</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map((item) => (
            <div key={item.id} style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>{item.degree}</div>
                <div style={{ color: '#a855f7', fontSize: '0.85rem', marginTop: '0.2rem' }}>{item.institution}</div>
                <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem', marginTop: '0.15rem' }}>{item.start_year} – {item.end_year} · GPA: {item.gpa}</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => setEditing(item)} style={{ padding: '0.4rem 0.875rem', borderRadius: '6px', border: '1px solid rgba(99,102,241,0.4)', background: 'transparent', color: '#818cf8', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                <button onClick={() => handleDelete(item.id)} style={{ padding: '0.4rem 0.875rem', borderRadius: '6px', border: '1px solid rgba(239,68,68,0.3)', background: 'transparent', color: '#f87171', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {editing && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '520px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>{editing.id ? 'Edit Education' : 'Add Education'}</h2>
                <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { key: 'degree', label: 'Degree' },
                  { key: 'institution', label: 'Institution' },
                  { key: 'location', label: 'Location' },
                  { key: 'gpa', label: 'GPA' },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label style={labelStyle}>{label}</label>
                    <input value={(editing as any)[key] ?? ''} onChange={e => setEditing({ ...editing, [key]: e.target.value })} style={inputStyle} />
                  </div>
                ))}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Start Year</label>
                    <input type="number" value={editing.start_year ?? ''} onChange={e => setEditing({ ...editing, start_year: Number(e.target.value) })} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>End Year</label>
                    <input type="number" value={editing.end_year ?? ''} onChange={e => setEditing({ ...editing, end_year: Number(e.target.value) })} style={inputStyle} />
                  </div>
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