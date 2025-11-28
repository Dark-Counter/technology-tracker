import { Link, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { useAppTheme } from '../hooks/useTheme'
import ThemeToggle from './ThemeToggle'
import './Navigation.css'

function Navigation() {
  const location = useLocation()
  const { mode, toggleTheme } = useAppTheme()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold'
          }}
        >
          📚 Трекер технологий
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              backgroundColor: location.pathname === '/' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
            }}
          >
            Главная
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/technologies"
            sx={{
              backgroundColor: location.pathname === '/technologies' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
            }}
          >
            Все технологии
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/add-technology"
            sx={{
              backgroundColor: location.pathname === '/add-technology' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
            }}
          >
            Добавить
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/data-management"
            sx={{
              backgroundColor: location.pathname === '/data-management' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
            }}
          >
            Данные
          </Button>
          <ThemeToggle mode={mode} onToggle={toggleTheme} />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation

