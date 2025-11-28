import { useMemo } from 'react'
import { createTheme } from '@mui/material/styles'
import useLocalStorage from './useLocalStorage'

export function useAppTheme() {
  const [mode, setMode] = useLocalStorage('theme-mode', 'light')

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: mode,
        primary: {
          main: '#1976d2',
        },
        secondary: {
          main: '#dc004e',
        },
      },
    })
  }, [mode])

  const toggleTheme = () => {
    setMode(prevMode => {
      const newMode = prevMode === 'light' ? 'dark' : 'light'
      return newMode
    })
  }

  return { theme, mode, toggleTheme }
}

