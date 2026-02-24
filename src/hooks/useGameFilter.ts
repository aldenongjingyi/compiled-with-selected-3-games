import { useState, useMemo } from 'react'
import type { GameEntry } from '../types/game'

export function useGameFilter(games: GameEntry[]) {
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  function toggleTag(tag: string) {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  function clearTags() {
    setSelectedTags([])
  }

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const q = query.toLowerCase()
      const matchesQuery =
        !q ||
        game.title.toLowerCase().includes(q) ||
        game.description.toLowerCase().includes(q)

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some(tag => game.tags.includes(tag))

      const matchesCategory =
        !selectedCategory || game.category === selectedCategory

      return matchesQuery && matchesTags && matchesCategory
    })
  }, [games, query, selectedTags, selectedCategory])

  return {
    query,
    setQuery,
    selectedTags,
    toggleTag,
    clearTags,
    selectedCategory,
    setCategory: setSelectedCategory,
    filteredGames,
  }
}
