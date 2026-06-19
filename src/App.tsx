import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import InscriptionPage from './pages/InscriptionPage'
import ReglementPage from './pages/ReglementPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inscription" element={<InscriptionPage />} />
        <Route path="/reglement" element={<ReglementPage />} />
      </Routes>
    </>
  )
}
