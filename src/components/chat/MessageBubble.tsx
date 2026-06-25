'use client'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function parseContent(content: string) {
  const projectsMatch = content.match(/<projects>([\s\S]*?)<\/projects>/)
  const skillsMatch = content.match(/<skills>([\s\S]*?)<\/skills>/)
  const text = content
    .replace(/<projects>[\s\S]*?<\/projects>/, '')
    .replace(/<skills>[\s\S]*?<\/skills>/, '')
    .trim()

  let projects = null
  let skills = null
  try { if (projectsMatch) projects = JSON.parse(projectsMatch[1].trim()) } catch {}
  try { if (skillsMatch) skills = JSON.parse(skillsMatch[1].trim()) } catch {}
  return { text, projects, skills }
}

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{
          maxWidth: '80%', padding: '0.6rem 1rem',
          borderRadius: '12px', borderBottomRightRadius: '4px',
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          color: '#fff', fontSize: '0.85rem', lineHeight: 1.5,
        }}>
          {message.content}
        </div>
      </div>
    )
  }

  const { text, projects, skills } = parseContent(message.content)

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
      {/* <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid rgba(99,102,241,0.4)' }}>
  <img src="/memoji2.png" alt="Rupesh" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
</div> */}

<img
  src="/memoji2.png"
  alt="Rupesh"
  style={{
    width: '55px',
    height: '55px',
    objectFit: 'contain',
    objectPosition: 'top',
    flexShrink: 0,
    alignSelf: 'flex-end',
    filter: 'drop-shadow(0 0 6px rgba(99,102,241,0.3))',
  }}
/>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: 'calc(100% - 40px)' }}>
        {text && (
          <div style={{
            padding: '0.6rem 0rem',
            borderRadius: '12px', borderTopLeftRadius: '4px',
            background: 'rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', lineHeight: 1.6,
          }}>
            {text}
          </div>
        )}

        {projects && projects.map((p: any, i: number) => (
          <div key={i} style={{
            padding: '0.875rem',
            borderRadius: '10px',
            border: '1px solid rgba(99,102,241,0.25)',
            background: 'rgba(99,102,241,0.05)',
          }}>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.82rem', margin: '0 0 0.35rem' }}>{p.title}</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', margin: '0 0 0.6rem', lineHeight: 1.5 }}>{p.short_description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.6rem' }}>
              {p.tech_stack?.map((t: string) => (
                <span key={t} style={{ fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: '999px', background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)' }}>{t}</span>
              ))}
            </div>
            {p.github_url && (
              <a href={p.github_url} target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8', fontSize: '0.75rem', textDecoration: 'none', fontWeight: 600 }}>
                GitHub →
              </a>
            )}
          </div>
        ))}

        {skills && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {skills.map((s: any, i: number) => (
              <span key={i} style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem', borderRadius: '999px', background: 'rgba(99,102,241,0.15)', color: '#818cf8', fontWeight: 600 }}>
                {s.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}