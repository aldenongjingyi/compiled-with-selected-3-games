/**
 * MakanBox thumbnail — warm cream background, lunchbox illustration
 * with colourful compartments, lid ajar, Nunito Black title.
 */

const C = {
  bg0:       '#FFF9F4',                    // cream gradient start
  bg1:       '#fde8d6',                    // cream gradient end
  dots:      'rgba(255,107,53,0.08)',      // dot-pattern fill
  box:       '#FF6B35',                    // box body orange
  boxDark:   '#e05a28',                    // box darker shade
  lid:       '#FFD23F',                    // lid gold
  lidDark:   '#e6b820',                    // lid shadow
  latch:     '#EF476F',                    // latch coral
  comp0:     '#EF476F',                    // compartment coral
  comp1:     '#06D6A0',                    // compartment mint
  comp2:     '#FFD23F',                    // compartment yellow
  comp3:     '#A855F7',                    // compartment purple
  shadow:    'rgba(180,90,30,0.18)',       // box drop shadow
  stroke:    'rgba(180,90,30,0.15)',       // edge stroke
  titleText: '#1a0a00',                    // dark title
  rule0:     '#FF6B35',                    // gradient rule start
  rule1:     '#FFD23F',                    // gradient rule end
  subText:   'rgba(26,10,0,0.40)',         // subtitle
}

export default function MakanBoxThumbnail() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(145deg, ${C.bg0} 0%, ${C.bg1} 100%)`,
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
          <pattern id="mb-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="1.5" fill={C.dots} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mb-dots)" />
      </svg>

      {/* Lunchbox illustration */}
      <svg
        viewBox="0 0 100 90"
        style={{ width: 82, height: 74, position: 'relative', filter: `drop-shadow(0 6px 14px ${C.shadow})` }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Box body */}
        <rect x="14" y="38" width="72" height="40" rx="6" fill={C.box} stroke={C.stroke} strokeWidth="1" />
        {/* Box darker bottom strip */}
        <rect x="14" y="58" width="72" height="20" rx="6" fill={C.boxDark} opacity="0.35" />

        {/* Compartment dividers */}
        <line x1="50" y1="42" x2="50" y2="74" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <line x1="14" y1="58" x2="86" y2="58" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

        {/* Food items in compartments */}
        {/* Top-left: coral circle (rice ball) */}
        <circle cx="32" cy="50" r="6" fill={C.comp0} opacity="0.85" />
        <circle cx="32" cy="50" r="3" fill="rgba(255,255,255,0.3)" />
        {/* Top-right: mint rectangle (sushi) */}
        <rect x="58" y="44" width="18" height="10" rx="3" fill={C.comp1} opacity="0.85" />
        <rect x="63" y="46" width="8" height="6" rx="1.5" fill="rgba(255,255,255,0.25)" />
        {/* Bottom-left: yellow circles (dumplings) */}
        <circle cx="28" cy="66" r="4.5" fill={C.comp2} opacity="0.85" />
        <circle cx="38" cy="67" r="4" fill={C.comp2} opacity="0.7" />
        {/* Bottom-right: purple oval (dessert) */}
        <ellipse cx="68" cy="66" rx="9" ry="5" fill={C.comp3} opacity="0.8" />
        <ellipse cx="68" cy="66" rx="4" ry="2.5" fill="rgba(255,255,255,0.25)" />

        {/* Lid — slightly lifted and tilted */}
        <g transform="rotate(-8, 14, 38)">
          <rect x="10" y="18" width="76" height="18" rx="6" fill={C.lid} stroke={C.stroke} strokeWidth="1" />
          {/* Lid highlight */}
          <rect x="16" y="22" width="64" height="6" rx="3" fill="rgba(255,255,255,0.25)" />
          {/* Lid shadow underneath */}
          <rect x="10" y="32" width="76" height="4" rx="2" fill={C.lidDark} opacity="0.2" />
        </g>

        {/* Latch on front of box */}
        <rect x="44" y="38" width="12" height="6" rx="3" fill={C.latch} opacity="0.9" />
        <circle cx="50" cy="41" r="1.5" fill="rgba(255,255,255,0.5)" />

        {/* Steam wisps */}
        <path d="M30 16 Q28 10 32 6" fill="none" stroke="rgba(255,107,53,0.2)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M50 14 Q48 8 52 3" fill="none" stroke="rgba(255,107,53,0.15)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M70 16 Q68 10 72 6" fill="none" stroke="rgba(255,107,53,0.2)" strokeWidth="1.5" strokeLinecap="round" />
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
        }}>MakanBox</span>

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
        }}>Mystery Lunchbox</span>
      </div>
    </div>
  )
}
