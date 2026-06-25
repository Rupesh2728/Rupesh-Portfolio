'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Skill } from '@/types'

const categories = ['Languages', 'Frameworks & Libraries', 'AI / ML', 'Cloud & Databases', 'Tools & Platforms']
const proficiencies = ['Beginner', 'Intermediate', 'Expert']

const empty: Partial<Skill> = { name: '', category: 'Languages', proficiency: 'Intermediate', display_order: 0 }

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [editing, setEditing] = useState<Partial<Skill> | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { if (!data.user) router.push('/admin') })
    fetchSkills()
  }, [router])

  async function fetchSkills() {
    const { data } = await supabase.from('skills').select('*').order('category').order('display_order')
    setSkills(data ?? [])
    setLoading(false)
  }

  async function handleSave() {
    if (!editing) return
    if (editing.id) {
      await supabase.from('skills').update(editing).eq('id', editing.id)
    } else {
      await supabase.from('skills').insert(editing)
    }
    setEditing(null)
    fetchSkills()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this skill?')) return
    await supabase.from('skills').delete().eq('id', id)
    fetchSkills()
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

  const grouped = categories.reduce((acc, cat) => {
    acc[cat] = skills.filter(s => s.category === cat)
    return acc
  }, {} as Record<string, Skill[]>)

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'rgba(255,255,255,0.3)' }}>Loading...</div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0d', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ position: 'fixed', top: '-10%', right: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 2rem', background: 'rgba(13,13,13,0.9)',
        backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/dashboard" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', textDecoration: 'none' }}>← Dashboard</Link>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>Skills</span>
        </div>
        <button onClick={() => setEditing({ ...empty })}
          style={{ padding: '0.5rem 1.5rem', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}>
          + Add Skill
        </button>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '6rem 1.5rem 4rem', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '2.5rem', height: '1px', background: '#6366f1' }} />
            <span style={{ color: '#6366f1', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>Admin</span>
          </div>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: '2rem', margin: 0 }}>Skills</h1>
        </div>

        {categories.map(cat => (
          <div key={cat} style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.875rem', fontWeight: 600 }}>{cat}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {grouped[cat]?.map(skill => (
                <div key={skill.id} style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.4rem 0.75rem', borderRadius: '8px',
                  border: '1px solid rgba(99,102,241,0.25)',
                  background: 'rgba(99,102,241,0.08)',
                }}>
                  <span style={{ color: '#818cf8', fontSize: '0.82rem', fontWeight: 600 }}>{skill.name}</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem' }}>{skill.proficiency}</span>
                  <button onClick={() => setEditing(skill)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '0.75rem', padding: '0' }}>✎</button>
                  <button onClick={() => handleDelete(skill.id)} style={{ background: 'none', border: 'none', color: 'rgba(239,68,68,0.5)', cursor: 'pointer', fontSize: '0.75rem', padding: '0' }}>✕</button>
                </div>
              ))}
              {grouped[cat]?.length === 0 && (
                <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.8rem' }}>No skills in this category</span>
              )}
            </div>
          </div>
        ))}

        {editing && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '440px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>{editing.id ? 'Edit Skill' : 'Add Skill'}</h2>
                <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Skill Name</label>
                  <input value={editing.name ?? ''} onChange={e => setEditing({ ...editing, name: e.target.value })} style={inputStyle} />
                </div>
                
                <div>
                <label style={labelStyle}>Category</label>
                <div style={{ position: 'relative' }}>
                    <select
                    value={editing.category ?? 'Languages'}
                    onChange={e => setEditing({ ...editing, category: e.target.value })}
                    style={{
                        ...inputStyle,
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23818cf8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        paddingRight: '2.5rem',
                        colorScheme: 'dark',
                        cursor: 'pointer',
                    }}
                    >
                    {categories.map(c => (
                        <option key={c} value={c} style={{ background: '#1a1a2e', color: '#fff' }}>{c}</option>
                    ))}
                    </select>
                </div>
                </div>

               <div>
                <label style={labelStyle}>Proficiency</label>
                <div style={{ position: 'relative' }}>
                    <select
                    value={editing.proficiency ?? 'Intermediate'}
                    onChange={e => setEditing({ ...editing, proficiency: e.target.value as any })}
                    style={{
                        ...inputStyle,
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23818cf8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        paddingRight: '2.5rem',
                        colorScheme: 'dark',
                        cursor: 'pointer',
                    }}
                    >
                    {proficiencies.map(p => (
                        <option key={p} value={p} style={{ background: '#1a1a2e', color: '#fff' }}>{p}</option>
                    ))}
                    </select>
                </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
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