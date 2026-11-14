// Renders recipe text where **word** marks an important word to emphasize.
export function stripEmph(text) {
  return (text || '').replace(/\*\*/g, '')
}

export default function Emph({ text }) {
  if (!text) return null
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return parts.map((p, i) =>
    i % 2 === 1
      ? <strong key={i} className="font-bold text-olive-800 bg-warm-orange-50 rounded px-0.5">{p}</strong>
      : p
  )
}
