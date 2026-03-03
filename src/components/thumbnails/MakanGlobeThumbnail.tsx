/**
 * MakanGlobe thumbnail — dark emerald background, globe illustration
 * with latitude/longitude grid, restaurant marker dots, atmosphere glow,
 * Nunito Black title.
 */

const C = {
  bg0:       '#0d3a1e',                    // dark emerald
  bg1:       '#071a0e',                    // deeper emerald
  dots:      'rgba(46,160,67,0.06)',       // subtle green dot pattern
  globe:     '#1a5c30',                    // globe body
  globeLit:  '#2a7a45',                    // globe lit side
  grid:      'rgba(56,217,106,0.25)',      // lat/lon grid lines
  marker0:   '#FF6B35',                    // marker orange
  marker1:   '#FFD23F',                    // marker gold
  marker2:   '#EF476F',                    // marker coral
  marker3:   '#06D6A0',                    // marker mint
  atmo:      'rgba(56,217,106,0.15)',      // atmosphere glow
  titleText: '#FFF5EB',                    // warm white title
  rule0:     '#2ea043',                    // gradient rule start
  rule1:     '#38d96a',                    // gradient rule end
  subText:   'rgba(255,245,235,0.45)',     // subtitle
}

export default function MakanGlobeThumbnail() {
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
          <pattern id="mg-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="1.5" fill={C.dots} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mg-dots)" />
      </svg>

      {/* Globe illustration */}
      <svg
        viewBox="0 0 100 100"
        style={{ width: 80, height: 80, position: 'relative', filter: `drop-shadow(0 4px 16px rgba(46,160,67,0.3))` }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Globe gradient — lit from upper-right */}
          <radialGradient id="mg-globe-grad" cx="40%" cy="35%" r="50%">
            <stop offset="0%" stopColor={C.globeLit} />
            <stop offset="100%" stopColor={C.globe} />
          </radialGradient>
          {/* Atmosphere outer glow */}
          <radialGradient id="mg-atmo" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="transparent" />
            <stop offset="100%" stopColor={C.atmo} />
          </radialGradient>
        </defs>

        {/* Atmosphere glow ring */}
        <circle cx="50" cy="50" r="44" fill="url(#mg-atmo)" />

        {/* Globe sphere */}
        <circle cx="50" cy="50" r="38" fill="url(#mg-globe-grad)" />

        {/* Specular highlight */}
        <ellipse cx="38" cy="36" rx="16" ry="12" fill="rgba(255,255,255,0.07)" />

        {/* Latitude lines */}
        <ellipse cx="50" cy="50" rx="38" ry="10" fill="none" stroke={C.grid} strokeWidth="0.8" />
        <ellipse cx="50" cy="50" rx="38" ry="24" fill="none" stroke={C.grid} strokeWidth="0.8" />
        <ellipse cx="50" cy="50" rx="38" ry="36" fill="none" stroke={C.grid} strokeWidth="0.8" />

        {/* Longitude lines (perspective ellipses) */}
        <ellipse cx="50" cy="50" rx="10" ry="38" fill="none" stroke={C.grid} strokeWidth="0.8" />
        <ellipse cx="50" cy="50" rx="26" ry="38" fill="none" stroke={C.grid} strokeWidth="0.8" />
        <ellipse cx="50" cy="50" rx="38" ry="38" fill="none" stroke={C.grid} strokeWidth="0.8" />

        {/* Restaurant marker dots scattered on globe */}
        <circle cx="36" cy="34" r="3.5" fill={C.marker0} opacity="0.9" />
        <circle cx="36" cy="34" r="1.5" fill="rgba(255,255,255,0.4)" />

        <circle cx="58" cy="40" r="3" fill={C.marker1} opacity="0.9" />
        <circle cx="58" cy="40" r="1.3" fill="rgba(255,255,255,0.4)" />

        <circle cx="44" cy="56" r="3.5" fill={C.marker2} opacity="0.9" />
        <circle cx="44" cy="56" r="1.5" fill="rgba(255,255,255,0.4)" />

        <circle cx="64" cy="54" r="2.8" fill={C.marker3} opacity="0.85" />
        <circle cx="64" cy="54" r="1.2" fill="rgba(255,255,255,0.35)" />

        <circle cx="30" cy="50" r="2.5" fill={C.marker1} opacity="0.7" />
        <circle cx="30" cy="50" r="1" fill="rgba(255,255,255,0.3)" />

        <circle cx="54" cy="68" r="2.8" fill={C.marker0} opacity="0.75" />
        <circle cx="54" cy="68" r="1.2" fill="rgba(255,255,255,0.3)" />

        {/* Globe rim edge */}
        <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(56,217,106,0.2)" strokeWidth="1.2" />
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
          textShadow: '0 0 12px rgba(46,160,67,0.4)',
        }}>MakanGlobe</span>

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
        }}>Spin to Discover</span>
      </div>
    </div>
  )
}
