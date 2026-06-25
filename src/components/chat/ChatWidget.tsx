'use client'

import { useState, useEffect } from 'react'
import ChatPanel from './ChatPanel'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [shake, setShake] = useState(false)
  const [showBadge, setShowBadge] = useState(true)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
  if (isOpen) return // stop when chat is open

  const firstShake = setTimeout(() => {
    setShake(true)
    setTimeout(() => setShake(false), 600)
  }, 2000)

  const interval = setInterval(() => {
    setShake(true)
    setTimeout(() => setShake(false), 600)
  }, 6000)

  return () => {
    clearTimeout(firstShake)
    clearInterval(interval)
  }
}, [isOpen]) // re-runs when isOpen changes

  return (
    <>
      <div style={{ position: 'fixed', bottom: '1rem',
right: '1rem', zIndex: 100 }}>

        {/* Notification badge */}
        {!isOpen && showBadge && (
          <div style={{
            position: 'absolute', top: '-6px', right: '-6px', zIndex: 101,
            width: '20px', height: '20px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '0.65rem', fontWeight: 800,
            boxShadow: '0 0 8px rgba(236,72,153,0.6)',
            animation: 'badgePop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}>
            1
          </div>
        )}

        {/* Pulse rings */}
        {!isOpen && (
          <>
            <div style={{
              position: 'absolute', inset: '-8px', borderRadius: '50%',
              border: '2px solid rgba(99,102,241,0.3)',
              animation: 'pulseRing 2.5s ease-out infinite',
            }} />
            <div style={{
              position: 'absolute', inset: '-16px', borderRadius: '50%',
              border: '1px solid rgba(99,102,241,0.15)',
              animation: 'pulseRing 2.5s ease-out infinite 0.4s',
            }} />
          </>
        )}

        {/* Main button */}
        <button
         onClick={() => {
  if (isOpen) {
    setIsOpen(false)
    setShowBadge(true) // badge comes back when closed
  } else {
    setIsOpen(true)
    setShowBadge(false)
  }
}}
          style={{
            position: 'relative', zIndex: 102,
            width: '60px', height: '60px', borderRadius: '50%',
            background: isOpen ? 'rgba(13,13,13,0.9)' : 'transparent',
            border: isOpen ? '1px solid rgba(255,255,255,0.1)' : 'none',
            cursor: 'pointer', padding: 0, overflow: 'hidden',
            boxShadow: isOpen ? 'none' : '0 0 25px rgba(99,102,241,0.5)',
            animation: shake ? 'shake 0.5s ease' : 'none',
            transition: 'box-shadow 0.3s',
          }}
        >
          {isOpen ? (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          ) : (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {/* Gradient ring behind image */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
                padding: '3px',
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  overflow: 'hidden', background: '#0d0d0d',
                }}>
                  <img
                    src="/memoji.png"
                    alt="Rupesh"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          )}
        </button>

        {/* Tooltip */}
        {!isOpen && showBadge && (
          <div style={{
            position: 'absolute', bottom: '70px', right: 0,
            background: 'rgba(13,13,13,0.95)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '10px', padding: '0.6rem 0.875rem',
            whiteSpace: 'nowrap', pointerEvents: 'none',
            animation: 'fadeInUp 0.4s ease 1s both',
            boxShadow: '0 0 20px rgba(99,102,241,0.2)',
          }}>
            <p style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 600, margin: 0 }}>
              I know everything about myself 🧠
            </p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem', margin: '0.2rem 0 0' }}>
              Skip the resume. Just ask.
            </p>
            {/* Arrow */}
            <div style={{
              position: 'absolute', bottom: '-6px', right: '22px',
              width: '10px', height: '10px',
              background: 'rgba(13,13,13,0.95)',
              border: '1px solid rgba(99,102,241,0.3)',
              borderTop: 'none', borderLeft: 'none',
              transform: 'rotate(45deg)',
            }} />
          </div>
        )}
      </div>

      {isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          15% { transform: rotate(-15deg); }
          30% { transform: rotate(12deg); }
          45% { transform: rotate(-10deg); }
          60% { transform: rotate(8deg); }
          75% { transform: rotate(-5deg); }
          90% { transform: rotate(3deg); }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes badgePop {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}