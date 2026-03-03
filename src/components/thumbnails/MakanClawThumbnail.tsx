/**
 * MakanClaw thumbnail — warm plum background, claw machine icon
 * with orange-tipped prongs, colourful capsules, Nunito Black title.
 */

const C = {
  bg0:       '#1a0a10',                    // deep warm plum
  bg1:       '#2a1420',                    // lighter plum
  dots:      'rgba(255,107,53,0.06)',      // subtle dot pattern
  housing:   '#3e2e2e',                    // claw housing
  arm:       '#a89888',                    // arm metal
  tip:       '#FF6B35',                    // claw tip orange
  chain:     '#B89878',                    // chain warm
  led:       '#FFD23F',                    // LED gold
  cap0:      '#EF476F',                    // capsule coral
  cap1:      '#FFD23F',                    // capsule gold
  cap2:      '#06D6A0',                    // capsule mint
  cap3:      '#A855F7',                    // capsule purple
  cap4:      '#FF6B35',                    // capsule orange
  titleText: '#FFF5EB',                    // warm white title
  rule0:     '#FF6B35',                    // gradient rule start
  rule1:     '#FFD23F',                    // gradient rule end
  subText:   'rgba(255,245,235,0.45)',     // subtitle
}

export default function MakanClawThumbnail() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(145deg, ${C.bg1} 0%, ${C.bg0} 100%)`,
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
          <pattern id="mc-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="1.5" fill={C.dots} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mc-dots)" />
      </svg>

      {/* Claw machine illustration */}
      <svg
        viewBox="0 0 100 100"
        style={{ width: 80, height: 80, position: 'relative', filter: `drop-shadow(0 4px 12px rgba(255,107,53,0.25))` }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Chain */}
        <line x1="50" y1="8" x2="50" y2="30" stroke={C.chain} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 3" />

        {/* Housing */}
        <rect x="34" y="30" width="32" height="14" rx="4" fill={C.housing} stroke={C.tip} strokeWidth="1.2" />
        {/* LED */}
        <circle cx="50" cy="34" r="2" fill={C.led} opacity="0.9" />

        {/* Left arm */}
        <line x1="40" y1="44" x2="32" y2="62" stroke={C.arm} strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="64" r="3.5" fill={C.tip} />

        {/* Center arm */}
        <line x1="50" y1="44" x2="50" y2="64" stroke={C.arm} strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="66" r="3.5" fill={C.tip} />

        {/* Right arm */}
        <line x1="60" y1="44" x2="68" y2="62" stroke={C.arm} strokeWidth="3" strokeLinecap="round" />
        <circle cx="68" cy="64" r="3.5" fill={C.tip} />

        {/* Capsules scattered below */}
        <circle cx="28" cy="84" r="8" fill={C.cap0} opacity="0.9" />
        <circle cx="28" cy="84" r="4" fill="rgba(255,255,255,0.2)" />
        <circle cx="46" cy="88" r="7" fill={C.cap1} opacity="0.9" />
        <circle cx="46" cy="88" r="3.5" fill="rgba(255,255,255,0.2)" />
        <circle cx="62" cy="85" r="7.5" fill={C.cap2} opacity="0.9" />
        <circle cx="62" cy="85" r="3.8" fill="rgba(255,255,255,0.2)" />
        <circle cx="78" cy="88" r="6.5" fill={C.cap3} opacity="0.9" />
        <circle cx="78" cy="88" r="3" fill="rgba(255,255,255,0.2)" />
        <circle cx="38" cy="92" r="6" fill={C.cap4} opacity="0.8" />
        <circle cx="72" cy="93" r="5.5" fill={C.cap0} opacity="0.7" />

        {/* Rail */}
        <line x1="12" y1="8" x2="88" y2="8" stroke={C.tip} strokeWidth="1.5" opacity="0.4" />
        {/* Rail mount */}
        <circle cx="50" cy="8" r="3" fill={C.housing} stroke={C.tip} strokeWidth="1" />
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
          textShadow: '0 0 12px rgba(255,107,53,0.4)',
        }}>MakanClaw</span>

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
        }}>Grab Your Meal</span>
      </div>
    </div>
  )
}
