'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface QA { question: string; answer: string }

export default function AdminAIConfig() {
  const [toneNotes, setToneNotes] = useState('')
  const [customQA, setCustomQA] = useState<QA[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [configId, setConfigId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { if (!data.user) router.push('/admin') })
    supabase.from('ai_config').select('*').single().then(({ data }) => {
      if (data) {
        setToneNotes(data.tone_notes ?? '')
        setCustomQA(data.custom_qa ?? [])
        setConfigId(data.id)
      }
      setLoading(false)
    })
  }, [router])

  async function handleSave() {
    setSaving(true)
    await supabase.from('ai_config').update({ tone_notes: toneNotes, custom_qa: customQA }).eq('id', configId)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function addQA() {
    setCustomQA([...customQA, { question: '', answer: '' }])
  }

  function updateQA(i: number, field: 'question' | 'answer', value: string) {
    const updated = [...customQA]
    updated[i][field] = value
    setCustomQA(updated)
  }

  function removeQA(i: number) {
    setCustomQA(customQA.filter((_, idx) => idx !== i))
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
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>AI Config</span>
        </div>
        <button onClick={handleSave} disabled={saving}
          style={{ padding: '0.5rem 1.5rem', borderRadius: '8px', border: 'none', background: saved ? 'rgba(34,197,94,0.3)' : 'linear-gradient(135deg, #6366f1, #a855f7)', color: saved ? '#22c55e' : '#fff', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}>
          {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 1.5rem 4rem', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '2.5rem', height: '1px', background: '#6366f1' }} />
            <span style={{ color: '#6366f1', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>Admin</span>
          </div>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: '2rem', margin: '0 0 0.5rem' }}>AI Config</h1>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', margin: 0 }}>
            Configure how AI-Rupesh talks to employers. Changes take effect immediately.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Tone notes */}
          <div style={{ padding: '1.75rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', margin: '0 0 0.5rem' }}>Tone & Persona</h3>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', margin: '0 0 1.25rem' }}>
              Instructions for how AI-Rupesh should speak. This is injected into every conversation.
            </p>
            <textarea
              value={toneNotes}
              onChange={e => setToneNotes(e.target.value)}
              rows={5}
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="Speak confidently in first person. Be professional but warm..."
            />
          </div>

          {/* Custom Q&A */}
          <div style={{ padding: '1.75rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', margin: 0 }}>Custom Q&A</h3>
              <button onClick={addQA}
                style={{ padding: '0.35rem 0.875rem', borderRadius: '6px', border: '1px solid rgba(99,102,241,0.4)', background: 'transparent', color: '#818cf8', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>
                + Add
              </button>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', margin: '0 0 1.25rem' }}>
              Specific questions the AI will answer exactly as you specify — visa status, salary, availability, etc.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {customQA.map((qa, i) => (
                <div key={i} style={{ padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', position: 'relative' }}>
                  <button onClick={() => removeQA(i)}
                    style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'none', border: 'none', color: 'rgba(239,68,68,0.5)', cursor: 'pointer', fontSize: '0.9rem' }}>
                    ✕
                  </button>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <label style={labelStyle}>Question</label>
                    <input value={qa.question} onChange={e => updateQA(i, 'question', e.target.value)}
                      style={inputStyle} placeholder="Are you authorized to work in the US?" />
                  </div>
                  <div>
                    <label style={labelStyle}>Answer</label>
                    <textarea value={qa.answer} onChange={e => updateQA(i, 'answer', e.target.value)}
                      rows={3} style={{ ...inputStyle, resize: 'vertical' }}
                      placeholder="Yes, I'm on F-1 OPT..." />
                  </div>
                </div>
              ))}

              {customQA.length === 0 && (
                <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.85rem', textAlign: 'center', padding: '1rem 0' }}>
                  No custom Q&A yet. Add one above.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}