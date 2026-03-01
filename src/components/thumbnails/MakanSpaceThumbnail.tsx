/**
 * MakanSpace thumbnail — Option B: Bold logo card.
 *
 * Deep purple-space gradient, large centred planet emoji, oversized
 * Nunito Black title, and a subtle decorative rule.
 */
export default function MakanSpaceThumbnail() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(145deg, #1e0a40 0%, #0a0522 55%, #050210 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Radial glow behind icon */}
      <div style={{
        position: 'absolute',
        width: 140, height: 140,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,90,255,0.28) 0%, transparent 70%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -62%)',
        pointerEvents: 'none',
      }} />

      {/* Decorative ring */}
      <div style={{
        position: 'absolute',
        width: 110, height: 110,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.07)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -62%)',
        pointerEvents: 'none',
      }} />

      {/* Icon */}
      <span style={{ fontSize: 52, lineHeight: 1, position: 'relative' }}>🪐</span>

      {/* Title + rule + subtitle */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
        <span style={{
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 900,
          fontSize: 22,
          color: '#ffffff',
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}>MakanSpace</span>

        <div style={{
          width: 36, height: 3,
          background: 'linear-gradient(90deg, #C45AFF, #5BA8FF)',
          borderRadius: 2,
        }} />

        <span style={{
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 700,
          fontSize: 10,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}>Tap to Discover</span>
      </div>
    </div>
  )
}
