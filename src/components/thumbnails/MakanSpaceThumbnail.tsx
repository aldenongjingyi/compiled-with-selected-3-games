/**
 * MakanSpace thumbnail — deep purple-space background, rocket/planet
 * illustration with orbiting cargo pods, star dots, Nunito Black title.
 */

const C = {
  bg0:       '#1e0a40',                    // purple space
  bg1:       '#050210',                    // deep space
  dots:      'rgba(196,90,255,0.05)',      // subtle purple dot pattern
  planet:    '#3a1a6a',                    // planet body
  planetLit: '#5a2a9a',                    // planet lit side
  ring:      'rgba(196,90,255,0.3)',       // planet ring
  pod0:      '#FF6B35',                    // cargo pod orange
  pod1:      '#FFD23F',                    // cargo pod gold
  pod2:      '#EF476F',                    // cargo pod coral
  pod3:      '#06D6A0',                    // cargo pod mint
  star:      'rgba(255,255,255,0.6)',      // star dots
  starBright:'rgba(196,90,255,0.5)',       // bright star
  titleText: '#ffffff',                    // white title
  rule0:     '#C45AFF',                    // gradient rule start
  rule1:     '#5BA8FF',                    // gradient rule end
  subText:   'rgba(255,255,255,0.45)',     // subtitle
}

export default function MakanSpaceThumbnail() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(145deg, ${C.bg0} 0%, ${C.bg1} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Dot pattern overlay */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="ms-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="1.5" fill={C.dots} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ms-dots)" />
      </svg>

      {/* Space scene illustration */}
      <svg
        viewBox="0 0 100 100"
        style={{ width: 80, height: 80, position: 'relative', filter: `drop-shadow(0 4px 16px rgba(196,90,255,0.25))` }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background stars */}
        <circle cx="12" cy="18" r="1" fill={C.star} />
        <circle cx="88" cy="14" r="1.2" fill={C.star} />
        <circle cx="22" cy="82" r="0.8" fill={C.star} />
        <circle cx="78" cy="78" r="1" fill={C.star} />
        <circle cx="8" cy="52" r="0.8" fill={C.star} />
        <circle cx="92" cy="48" r="1" fill={C.star} />
        <circle cx="50" cy="8" r="1.2" fill={C.starBright} />
        <circle cx="36" cy="92" r="0.8" fill={C.star} />
        <circle cx="72" cy="92" r="1" fill={C.star} />

        {/* Planet with ring */}
        <defs>
          <radialGradient id="ms-planet" cx="40%" cy="35%" r="50%">
            <stop offset="0%" stopColor={C.planetLit} />
            <stop offset="100%" stopColor={C.planet} />
          </radialGradient>
        </defs>

        {/* Planet ring behind */}
        <ellipse cx="50" cy="52" rx="36" ry="10" fill="none" stroke={C.ring} strokeWidth="2" opacity="0.5"
          strokeDasharray="0" transform="rotate(-15, 50, 52)" />

        {/* Planet body */}
        <circle cx="50" cy="50" r="22" fill="url(#ms-planet)" />
        {/* Planet highlight */}
        <ellipse cx="42" cy="42" rx="10" ry="8" fill="rgba(255,255,255,0.06)" />
        {/* Planet surface bands */}
        <ellipse cx="50" cy="44" rx="20" ry="4" fill="none" stroke="rgba(196,90,255,0.15)" strokeWidth="1" />
        <ellipse cx="50" cy="56" rx="18" ry="3" fill="none" stroke="rgba(196,90,255,0.12)" strokeWidth="1" />

        {/* Planet ring in front (top arc) */}
        <ellipse cx="50" cy="52" rx="36" ry="10" fill="none" stroke={C.ring} strokeWidth="2" opacity="0.3"
          transform="rotate(-15, 50, 52)" strokeDasharray="56 120" strokeDashoffset="0" />

        {/* Cargo pods orbiting */}
        {/* Pod 1 — orange, top-left */}
        <rect x="14" y="28" width="12" height="8" rx="3" fill={C.pod0} opacity="0.9" />
        <rect x="16" y="30" width="4" height="4" rx="1" fill="rgba(255,255,255,0.3)" />

        {/* Pod 2 — gold, top-right */}
        <rect x="76" y="24" width="10" height="7" rx="2.5" fill={C.pod1} opacity="0.85" />
        <rect x="78" y="26" width="3" height="3" rx="1" fill="rgba(255,255,255,0.3)" />

        {/* Pod 3 — coral, bottom-left */}
        <rect x="10" y="66" width="11" height="7" rx="3" fill={C.pod2} opacity="0.8" />
        <rect x="12" y="68" width="3.5" height="3.5" rx="1" fill="rgba(255,255,255,0.25)" />

        {/* Pod 4 — mint, bottom-right */}
        <rect x="80" y="68" width="10" height="7" rx="2.5" fill={C.pod3} opacity="0.85" />
        <rect x="82" y="70" width="3" height="3" rx="1" fill="rgba(255,255,255,0.3)" />

        {/* Planet edge glow */}
        <circle cx="50" cy="50" r="22" fill="none" stroke="rgba(196,90,255,0.2)" strokeWidth="1.5" />
      </svg>

      {/* Title + rule + subtitle */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 900,
          fontSize: 21,
          color: C.titleText,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          textShadow: '0 0 12px rgba(196,90,255,0.4)',
        }}>MakanSpace</span>

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
        }}>Tap to Discover</span>
      </div>
    </div>
  )
}
