'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminProfile() {
  const [form, setForm] = useState({
    id:'',name: '', tagline: '', short_bio: '', long_bio: '',
    email: '', github_url: '', linkedin_url: '', leetcode_url: '',
    gfg_url: '', resume_url: '', work_auth: '', job_preference: '', location_preference: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/admin')
    })
    supabase.from('profile').select('*').single().then(({ data }) => {
      if (data) setForm(data)
      setLoading(false)
    })
  }, [router])


  const [uploading, setUploading] = useState(false)

async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0]
  if (!file) return
  if (file.type !== 'application/pdf') {
    alert('Please upload a PDF file')
    return
  }

  setUploading(true)
  const fileName = `resume_${Date.now()}.pdf`

  const { error } = await supabase.storage
    .from('resume')
    .upload(fileName, file, { upsert: true })

  if (error) {
    alert('Upload failed: ' + error.message)
    setUploading(false)
    return
  }

  const { data: urlData } = supabase.storage
    .from('resume')
    .getPublicUrl(fileName)

  setForm({ ...form, resume_url: urlData.publicUrl })
  setUploading(false)
}

  async function handleSave() {
    setSaving(true)
    await supabase.from('profile').update(form).eq('id', form.id as any)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
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

      {/* Glow */}
      <div style={{ position: 'fixed', top: '-10%', right: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 2rem',
        background: 'rgba(13,13,13,0.9)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/dashboard" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', textDecoration: 'none' }}>
            ← Dashboard
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>Profile</span>
        </div>
        <button onClick={handleSave} disabled={saving}
          style={{
            padding: '0.5rem 1.5rem', borderRadius: '8px', border: 'none',
            background: saved ? 'rgba(34,197,94,0.3)' : 'linear-gradient(135deg, #6366f1, #a855f7)',
            color: saved ? '#22c55e' : '#fff',
            fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
          }}
        >
          {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 1.5rem 4rem', position: 'relative', zIndex: 1 }}>

        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '2.5rem', height: '1px', background: '#6366f1' }} />
            <span style={{ color: '#6366f1', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>Admin</span>
          </div>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: '2rem', margin: 0 }}>Edit Profile</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Basic info */}
          <div style={{ padding: '1.75rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', margin: '0 0 1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              Basic Info
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { key: 'name', label: 'Full Name' },
                { key: 'tagline', label: 'Tagline' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label style={labelStyle}>{label}</label>
                  <input value={(form as any)[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={inputStyle} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1rem' }}>
              <label style={labelStyle}>Short Bio</label>
              <textarea value={form.short_bio} onChange={e => setForm({ ...form, short_bio: e.target.value })}
                rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
            <div style={{ marginTop: '1rem' }}>
              <label style={labelStyle}>Long Bio</label>
              <textarea value={form.long_bio} onChange={e => setForm({ ...form, long_bio: e.target.value })}
                rows={5} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
          </div>

          {/* Contact & Links */}
<div style={{ padding: '1.75rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', margin: '0 0 1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
    Contact & Links
  </h3>

  {/* Resume upload */}
  <div style={{ marginBottom: '1.25rem' }}>
    <label style={labelStyle}>Resume (PDF)</label>
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <label style={{
        padding: '0.6rem 1.25rem', borderRadius: '8px', cursor: uploading ? 'not-allowed' : 'pointer',
        border: '1px solid rgba(99,102,241,0.4)', color: '#818cf8',
        fontSize: '0.82rem', fontWeight: 600, display: 'inline-block',
        background: uploading ? 'rgba(99,102,241,0.1)' : 'transparent',
      }}>
        {uploading ? 'Uploading...' : '📄 Upload PDF'}
        <input type="file" accept=".pdf" onChange={handleResumeUpload} style={{ display: 'none' }} disabled={uploading} />
      </label>
      {form.resume_url && (
        <a href={form.resume_url} target="_blank" rel="noopener noreferrer"
          style={{ color: '#22c55e', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 600 }}>
          ✓ View Current Resume →
        </a>
      )}
    </div>
    {form.resume_url && (
      <div style={{ marginTop: '0.75rem' }}>
        <label style={labelStyle}>Resume URL (auto-filled after upload)</label>
        <input value={form.resume_url} onChange={e => setForm({ ...form, resume_url: e.target.value })} style={inputStyle} />
      </div>
    )}
  </div>

  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
    {[
      { key: 'email', label: 'Email' },
      { key: 'github_url', label: 'GitHub URL' },
      { key: 'linkedin_url', label: 'LinkedIn URL' },
      { key: 'leetcode_url', label: 'LeetCode URL' },
      { key: 'gfg_url', label: 'GeeksForGeeks URL' },
    ].map(({ key, label }) => (
      <div key={key}>
        <label style={labelStyle}>{label}</label>
        <input value={(form as any)[key] ?? ''} onChange={e => setForm({ ...form, [key]: e.target.value })} style={inputStyle} />
      </div>
    ))}
  </div>
</div>

          {/* Work preferences */}
          <div style={{ padding: '1.75rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', margin: '0 0 1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              Work Preferences (used by AI chat)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { key: 'work_auth', label: 'Work Authorization' },
                { key: 'job_preference', label: 'Job Preference' },
                { key: 'location_preference', label: 'Location Preference' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label style={labelStyle}>{label}</label>
                  <input value={(form as any)[key] ?? ''} onChange={e => setForm({ ...form, [key]: e.target.value })} style={inputStyle} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}