import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useAppTheme } from './hooks/useTheme'
import { NotificationProvider } from './components/NotificationProvider'
import './App.css'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import TechnologyList from './pages/TechnologyList'
import TechnologyDetail from './pages/TechnologyDetail'
import AddTechnology from './pages/AddTechnology'
import DataManagement from './pages/DataManagement'

function AppContent() {
  return (
    <Router basename="/technology-tracker">
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/technologies" element={<TechnologyList />} />
            <Route path="/technology/:techId" element={<TechnologyDetail />} />
            <Route path="/add-technology" element={<AddTechnology />} />
            <Route path="/data-management" element={<DataManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

function App() {
  const { theme } = useAppTheme()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </ThemeProvider>
  )
}

export default App
