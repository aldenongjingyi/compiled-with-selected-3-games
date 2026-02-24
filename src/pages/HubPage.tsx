import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import GameCard from '../components/GameCard'
import { GAMES } from '../games/games.config'
import { useGameFilter } from '../hooks/useGameFilter'

type Props = {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export default function HubPage({ theme, onToggleTheme }: Props) {
  const {
    query,
    setQuery,
    selectedTags,
    toggleTag,
    clearTags,
    selectedCategory,
    setCategory,
    filteredGames,
  } = useGameFilter(GAMES)

  function clearAllFilters() {
    setQuery('')
    clearTags()
    setCategory(null)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <Header theme={theme} onToggleTheme={onToggleTheme} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">
            Game Hub
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {GAMES.length} demo games — click any card to play
          </p>
        </div>

        {/* Search */}
        <div className="mb-4">
          <SearchBar query={query} onChange={setQuery} />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <FilterBar
            games={GAMES}
            selectedTags={selectedTags}
            onToggleTag={toggleTag}
            onClearTags={clearTags}
            selectedCategory={selectedCategory}
            onSetCategory={setCategory}
          />
        </div>

        {/* Results count */}
        {(query || selectedTags.length > 0 || selectedCategory) && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">
            {filteredGames.length === 0
              ? 'No games match your filters'
              : `${filteredGames.length} game${filteredGames.length !== 1 ? 's' : ''} found`}
          </p>
        )}

        {/* Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-4xl mb-4">🎮</p>
            <p className="text-slate-500 dark:text-slate-400 text-base mb-3">
              No games found — try clearing your filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="text-sm text-brand-green hover:underline font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      <footer className="max-w-5xl mx-auto px-4 sm:px-6 pb-8 text-center text-xs text-slate-400 dark:text-slate-600">
        Map72 Game Hub · Data sourced from Sunway Malls
      </footer>
    </div>
  )
}
