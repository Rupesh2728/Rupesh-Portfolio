'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Project } from '@/types'

const empty: Omit<Project, 'id'> = {
  title: '', short_description: '', long_description: '',
  tech_stack: [], github_url: '', live_url: '',
  thumbnail_url: null, featured: false, display_order: 0,
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [editing, setEditing] = useState<Partial<Project> | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { if (!data.user) router.push('/admin') })
    fetchProjects()
  }, [router])

  async function fetchProjects() {
    const { data } = await supabase.from('projects').select('*').order('display_order')
    setProjects(data ?? [])
    setLoading(false)
  }

  async function handleSave() {
    if (!editing) return
    setSaving(true)
    if (editing.id) {
      await supabase.from('projects').update(editing).eq('id', editing.id)
    } else {
      await supabase.from('projects').insert(editing)
    }
    setSaving(false)
    setEditing(null)
    fetchProjects()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this project?')) return
    await supabase.from('projects').delete().eq('id', id)
    fetchProjects()
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

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 2rem', background: 'rgba(13,13,13,0.9)',
        backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/dashboard" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', textDecoration: 'none' }}>← Dashboard</Link>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>Projects</span>
        </div>
        <button onClick={() => setEditing({ ...empty })}
          style={{ padding: '0.5rem 1.5rem', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
        >
          + Add Project
        </button>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '6rem 1.5rem 4rem', position: 'relative', zIndex: 1 }}>

        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '2.5rem', height: '1px', background: '#6366f1' }} />
            <span style={{ color: '#6366f1', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>Admin</span>
          </div>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: '2rem', margin: 0 }}>Projects</h1>
        </div>

        {/* Project list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {projects.map((project) => (
            <div key={project.id} style={{ padding: '1.25rem 1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>{project.title}</span>
                  {project.featured && <span style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem', borderRadius: '999px', background: 'rgba(99,102,241,0.15)', color: '#818cf8', fontWeight: 600 }}>Featured</span>}
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {project.tech_stack?.slice(0, 4).map(t => (
                    <span key={t} style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: '999px', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => setEditing(project)}
                  style={{ padding: '0.4rem 0.875rem', borderRadius: '6px', border: '1px solid rgba(99,102,241,0.4)', background: 'transparent', color: '#818cf8', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(project.id)}
                  style={{ padding: '0.4rem 0.875rem', borderRadius: '6px', border: '1px solid rgba(239,68,68,0.3)', background: 'transparent', color: '#f87171', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit modal */}
        {editing && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '600px', maxHeight: '85vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>
                  {editing.id ? 'Edit Project' : 'Add Project'}
                </h2>
                <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { key: 'title', label: 'Title' },
                  { key: 'short_description', label: 'Short Description' },
                  { key: 'github_url', label: 'GitHub URL' },
                  { key: 'live_url', label: 'Live URL' },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label style={labelStyle}>{label}</label>
                    <input value={(editing as any)[key] ?? ''} onChange={e => setEditing({ ...editing, [key]: e.target.value })} style={inputStyle} />
                  </div>
                ))}

                <div>
                  <label style={labelStyle}>Long Description</label>
                  <textarea value={editing.long_description ?? ''} onChange={e => setEditing({ ...editing, long_description: e.target.value })}
                    rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>

                <div>
                  <label style={labelStyle}>Tech Stack (comma separated)</label>
                  <input
                    value={editing.tech_stack?.join(', ') ?? ''}
                    onChange={e => setEditing({ ...editing, tech_stack: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                    style={inputStyle}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input type="checkbox" checked={editing.featured ?? false} onChange={e => setEditing({ ...editing, featured: e.target.checked })} id="featured" />
                  <label htmlFor="featured" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', cursor: 'pointer' }}>Featured project</label>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <button onClick={() => setEditing(null)}
                    style={{ padding: '0.6rem 1.25rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', cursor: 'pointer' }}>
                    Cancel
                  </button>
                  <button onClick={handleSave} disabled={saving}
                    style={{ padding: '0.6rem 1.5rem', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}