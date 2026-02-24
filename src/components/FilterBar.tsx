import type { GameEntry } from '../types/game'

type Props = {
  games: GameEntry[]
  selectedTags: string[]
  onToggleTag: (tag: string) => void
  onClearTags: () => void
  selectedCategory: string | null
  onSetCategory: (category: string | null) => void
}

export default function FilterBar({
  games,
  selectedTags,
  onToggleTag,
  onClearTags,
  selectedCategory,
  onSetCategory,
}: Props) {
  const allTags = [...new Set(games.flatMap(g => g.tags))].sort()
  const allCategories = [...new Set(games.map(g => g.category))].sort()

  return (
    <div className="flex flex-col gap-3">
      {/* Categories — single select */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide w-14 shrink-0">
          Type
        </span>
        <Chip
          label="All"
          active={!selectedCategory}
          onClick={() => onSetCategory(null)}
        />
        {allCategories.map(cat => (
          <Chip
            key={cat}
            label={cat}
            active={selectedCategory === cat}
            onClick={() => onSetCategory(selectedCategory === cat ? null : cat)}
          />
        ))}
      </div>

      {/* Tags — multi-select */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide w-14 shrink-0">
          Tags
        </span>
        <Chip
          label="All"
          active={selectedTags.length === 0}
          onClick={onClearTags}
        />
        {allTags.map(tag => (
          <Chip
            key={tag}
            label={tag}
            active={selectedTags.includes(tag)}
            onClick={() => onToggleTag(tag)}
          />
        ))}
      </div>
    </div>
  )
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
        active
          ? 'bg-brand-green text-white'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
      }`}
    >
      {label}
    </button>
  )
}
