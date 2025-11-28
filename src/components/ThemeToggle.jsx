import { IconButton, Tooltip } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

function ThemeToggle({ mode, onToggle }) {
  return (
    <Tooltip title={mode === 'light' ? 'Переключить на тёмную тему' : 'Переключить на светлую тему'}>
      <IconButton
        onClick={onToggle}
        color="inherit"
        aria-label="переключить тему"
      >
        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle

