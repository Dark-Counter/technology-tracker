import { useNavigate } from 'react-router-dom'
import { 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Paper,
  Stack,
  useTheme
} from '@mui/material'
import Dashboard from '../components/Dashboard'
import useTechnologiesApi from '../hooks/useTechnologiesApi'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import NotesIcon from '@mui/icons-material/Notes'
import SearchIcon from '@mui/icons-material/Search'
import SaveIcon from '@mui/icons-material/Save'
import './Page.css'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const { technologies, loading } = useTechnologiesApi()
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const stats = {
    total: technologies?.length || 0,
    completed: technologies?.filter(t => t.status === 'completed').length || 0,
    inProgress: technologies?.filter(t => t.status === 'in-progress').length || 0,
    notStarted: technologies?.filter(t => t.status === 'not-started').length || 0
  }

  const completionPercentage = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: isDark 
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden',
      pb: 4
    }}>
      {/* Декоративные элементы */}
      {!isDark && (
        <>
          <Box sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            filter: 'blur(60px)'
          }} />
          <Box sx={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            filter: 'blur(80px)'
          }} />
        </>
      )}

      <Container maxWidth="lg" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
        {/* Hero секция */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: 6,
          color: isDark ? 'text.primary' : 'white'
        }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 2,
              textShadow: isDark ? 'none' : '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            🚀 Трекер технологий
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4,
              opacity: isDark ? 0.9 : 0.95,
              fontWeight: 300
            }}
          >
            Отслеживайте свой прогресс в изучении технологий разработки
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
            sx={{ mb: 6 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/technologies')}
              startIcon={<RocketLaunchIcon />}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.3)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Посмотреть все технологии
            </Button>
            <Button
              variant={isDark ? "contained" : "outlined"}
              size="large"
              onClick={() => navigate('/add-technology')}
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                borderWidth: isDark ? 0 : 2,
                color: isDark ? 'inherit' : 'white',
                borderColor: isDark ? 'transparent' : 'white',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  borderWidth: isDark ? 0 : 2,
                  borderColor: isDark ? 'transparent' : 'white',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Добавить технологию
            </Button>
          </Stack>
        </Box>

        {/* Статистика в карточках */}
        {!loading && stats.total > 0 && (
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={6} sm={3}>
              <Card sx={{ 
                textAlign: 'center',
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                borderRadius: 3,
                transition: 'transform 0.3s ease',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <CardContent>
                  <Typography color="success.main" variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.completed}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Завершено
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ 
                textAlign: 'center',
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                borderRadius: 3,
                transition: 'transform 0.3s ease',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <CardContent>
                  <Typography color="warning.main" variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.inProgress}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    В процессе
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ 
                textAlign: 'center',
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                borderRadius: 3,
                transition: 'transform 0.3s ease',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <CardContent>
                  <Typography color="info.main" variant="h4" sx={{ fontWeight: 700 }}>
                    {stats.notStarted}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Не начато
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ 
                textAlign: 'center',
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                borderRadius: 3,
                transition: 'transform 0.3s ease',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <CardContent>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                    {completionPercentage}%
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Прогресс
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Dashboard */}
        {!loading && technologies && technologies.length > 0 && (
          <Paper 
            elevation={0}
            sx={{ 
              mb: 6,
              background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
            }}
          >
            <Dashboard technologies={technologies} />
          </Paper>
        )}

        {/* Особенности */}
        <Grid container spacing={3}>
          {[
            { icon: TrendingUpIcon, title: 'Отслеживание прогресса', desc: 'Отмечайте статус изучения каждой технологии и визуализируйте свой прогресс' },
            { icon: NotesIcon, title: 'Заметки', desc: 'Сохраняйте важные моменты, ссылки и заметки по каждой технологии' },
            { icon: SearchIcon, title: 'Поиск и фильтрация', desc: 'Быстро находите нужные технологии с помощью поиска и фильтров' },
            { icon: SaveIcon, title: 'Автосохранение', desc: 'Все данные сохраняются автоматически в браузере' },
            { icon: RocketLaunchIcon, title: 'Material Design', desc: 'Современный интерфейс с поддержкой светлой и тёмной темы' },
            { icon: AddCircleOutlineIcon, title: 'Импорт/Экспорт', desc: 'Работайте с данными через JSON файлы и drag-and-drop' }
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{
                height: '100%',
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
                }
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    color: theme.palette.primary.main
                  }}>
                    <feature.icon sx={{ fontSize: 40, mr: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Home
