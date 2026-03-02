/**
 * MakanDice thumbnail — light cream background, bold die with
 * coloured faces, Nunito Black title, subtle decorative rule.
 */

const C = {
  bg:        '#FFF9F4',                    // body gradient start
  dots:      'rgba(255,107,53,0.08)',      // dot-pattern fill
  cardBg:    '#ffffff',                    // die face white
  face0:     '#FF6B35',                   // face accent — orange (bc-1)
  face1:     '#EF476F',                   // face accent — coral (bc-0)
  face2:     '#FFD23F',                   // face accent — yellow (bc-2)
  face3:     '#06D6A0',                   // face accent — mint (bc-3)
  dieShadow: 'rgba(180,90,30,0.18)',      // die drop shadow
  dieStroke: 'rgba(180,90,30,0.12)',      // die edge lines
  titleText: '#1a0a00',                   // MakanDice title
  rule0:     '#FF6B35',                   // gradient rule start
  rule1:     '#FFD23F',                   // gradient rule end
  subText:   'rgba(26,10,0,0.40)',        // subtitle
}

export default function MakanDiceThumbnail() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(145deg, ${C.bg} 0%, #fde8d6 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Dot pattern overlay */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="md-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="1.5" fill={C.dots} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#md-dots)" />
      </svg>

      {/* 3-face isometric die */}
      <svg
        viewBox="0 0 90 90"
        style={{ width: 76, height: 76, position: 'relative', filter: `drop-shadow(0 6px 14px ${C.dieShadow})` }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top face — orange */}
        <polygon
          points="45,4 82,24 45,44 8,24"
          fill={C.face0}
          stroke={C.dieStroke} strokeWidth="1"
        />
        {/* Left face — white card */}
        <polygon
          points="8,24 45,44 45,84 8,64"
          fill={C.cardBg}
          stroke={C.dieStroke} strokeWidth="1"
        />
        {/* Right face — coral */}
        <polygon
          points="45,44 82,24 82,64 45,84"
          fill={C.face1}
          stroke={C.dieStroke} strokeWidth="1"
        />
        {/* Pip dots on top face — 3 dots */}
        <circle cx="35" cy="20" r="3.2" fill="rgba(255,255,255,0.75)" />
        <circle cx="45" cy="28" r="3.2" fill="rgba(255,255,255,0.75)" />
        <circle cx="55" cy="20" r="3.2" fill="rgba(255,255,255,0.75)" />
        {/* Pip dots on right face — 2 dots */}
        <circle cx="58" cy="42" r="3" fill="rgba(255,255,255,0.65)" />
        <circle cx="70" cy="56" r="3" fill="rgba(255,255,255,0.65)" />
      </svg>

      {/* Title + rule + subtitle */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
        <span style={{
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 900,
          fontSize: 22,
          color: C.titleText,
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}>MakanDice</span>

        <div style={{
          width: 36, height: 3,
          background: `linear-gradient(90deg, ${C.rule0}, ${C.rule1})`,
          borderRadius: 2,
        }} />

        <span style={{
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 700,
          fontSize: 10,
          color: C.subText,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}>Roll to Discover</span>
      </div>
    </div>
  )
}
