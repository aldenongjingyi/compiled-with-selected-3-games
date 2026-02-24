import { HashRouter, Routes, Route } from 'react-router-dom'
import HubPage from './pages/HubPage'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<HubPage theme={theme} onToggleTheme={toggleTheme} />}
        />
      </Routes>
    </HashRouter>
  )
}
