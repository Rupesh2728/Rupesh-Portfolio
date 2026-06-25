'use client'

import { useState, useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey! I'm Rupesh. Ask me anything — about my projects, experience, skills, or what I'm looking for next.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage() {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const userMessage: Message = { role: 'user', content: trimmed }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })
      const data = await res.json()
      if (data.reply) {
        setMessages([...updatedMessages, { role: 'assistant', content: data.reply }])
      }
    } catch {
      setMessages([...updatedMessages, { role: 'assistant', content: 'Sorry, something went wrong. Try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      position: 'fixed', right: '1rem', bottom: '5rem', zIndex: 99,
      width: 'min(420px, calc(100vw - 2rem))', height: '500px',
      background: '#0d0d0d',
      border: '1px solid rgba(99,102,241,0.25)',
      borderRadius: '16px',
      boxShadow: '0 0 40px rgba(99,102,241,0.15)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>

      {/* Header */}
      <div style={{
        padding: '1rem 1.25rem',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        background: 'rgba(99,102,241,0.05)',
      }}>
        <div style={{ width: '45px', height: '45px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid rgba(99,102,241,0.5)' }}>
  <img src="/memoji.png" alt="Rupesh" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>Rupesh</div>
          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem' }}>Skip the resume. Just ask.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }} />
          <span style={{ color: '#22c55e', fontSize: '0.7rem', fontWeight: 600 }}>Online</span>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
      {loading && (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
    {/* Bitmoji pops up from bottom */}
    <div style={{
      position: 'relative',
      animation: 'popUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    }}>
      <img
        src="/memoji2.png"
        alt="Rupesh typing"
        style={{
          width: '55px',
          height: '55px',
          objectFit: 'contain',
          objectPosition: 'top',
          filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.4))',
        }}
      />
    </div>

    {/* Typing bubbles */}
    <div style={{
      padding: '0.6rem 1rem',
      borderRadius: '12px',
      borderBottomLeftRadius: '4px',
      background: 'rgba(255,255,255,0.06)',
      display: 'flex',
      gap: '4px',
      alignItems: 'center',
      marginBottom: '0.5rem',
    }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: '#6366f1', display: 'inline-block',
          animation: 'bounce 1s infinite',
          animationDelay: `${i * 0.15}s`,
        }} />
      ))}
    </div>
  </div>
)}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '0.875rem 1rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', gap: '0.625rem', alignItems: 'center',
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
          placeholder="Ask me anything..."
          style={{
            flex: 1, background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px', padding: '0.6rem 0.875rem',
            color: '#fff', fontSize: '0.83rem', outline: 'none',
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{
            padding: '0.6rem 1rem', borderRadius: '8px',
            background: input.trim() && !loading ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'rgba(255,255,255,0.05)',
            border: 'none', color: input.trim() && !loading ? '#fff' : 'rgba(255,255,255,0.2)',
            fontSize: '0.8rem', fontWeight: 700, cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s', whiteSpace: 'nowrap',
          }}
        >
          Send
        </button>
      </div>

     <style>{`
  @keyframes bounce {
    0%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-6px); }
  }
  @keyframes popUp {
    0% { transform: translateY(20px) scale(0.8); opacity: 0; }
    100% { transform: translateY(0) scale(1); opacity: 1; }
  }
`}</style>
    </div>
  )
}