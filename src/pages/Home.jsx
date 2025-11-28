import { useNavigate } from 'react-router-dom'
import { 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Stack,
  useTheme,
  alpha
} from '@mui/material'
import Dashboard from '../components/Dashboard'
import useTechnologiesApi from '../hooks/useTechnologiesApi'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import NotesIcon from '@mui/icons-material/Notes'
import SearchIcon from '@mui/icons-material/Search'
import SaveIcon from '@mui/icons-material/Save'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ScheduleIcon from '@mui/icons-material/Schedule'
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
      width: '100%',
      background: isDark 
        ? 'linear-gradient(180deg, #0a0e27 0%, #1a1a2e 50%, #16213e 100%)'
        : 'linear-gradient(180deg, #667eea 0%, #764ba2 50%, #f5f7fa 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Container maxWidth="xl" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        {/* Hero секция */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: 5,
          color: isDark ? 'text.primary' : 'white'
        }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 800,
              mb: 1.5,
              fontSize: { xs: '2rem', md: '3rem' },
              textShadow: isDark ? 'none' : '0 2px 20px rgba(0,0,0,0.3)'
            }}
          >
            🚀 Трекер технологий
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4,
              opacity: isDark ? 0.8 : 0.9,
              fontWeight: 300,
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            Отслеживайте свой прогресс в изучении технологий разработки
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            justifyContent="center"
            sx={{ mb: 5 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/technologies')}
              startIcon={<RocketLaunchIcon />}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              Все технологии
            </Button>
            <Button
              variant={isDark ? "outlined" : "contained"}
              size="large"
              onClick={() => navigate('/add-technology')}
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                ...(isDark ? {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.light',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1)
                  }
                } : {
                  backgroundColor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                    transform: 'translateY(-2px)'
                  }
                }),
                transition: 'all 0.2s ease'
              }}
            >
              Добавить технологию
            </Button>
          </Stack>
        </Box>

        {/* Быстрая статистика */}
        {!loading && stats.total > 0 && (
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={6} sm={3}>
              <Card sx={{ 
                textAlign: 'center',
                background: isDark 
                  ? alpha(theme.palette.success.main, 0.15)
                  : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderRadius: 2,
                border: isDark ? `1px solid ${alpha(theme.palette.success.main, 0.3)}` : 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }
              }}>
                <CardContent sx={{ py: 2 }}>
                  <CheckCircleIcon sx={{ color: 'success.main', fontSize: 32, mb: 0.5 }} />
                  <Typography color="success.main" variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {stats.completed}
                  </Typography>
                  <Typography color="text.secondary" variant="body2" sx={{ fontSize: '0.875rem' }}>
                    Завершено
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ 
                textAlign: 'center',
                background: isDark 
                  ? alpha(theme.palette.warning.main, 0.15)
                  : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderRadius: 2,
                border: isDark ? `1px solid ${alpha(theme.palette.warning.main, 0.3)}` : 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }
              }}>
                <CardContent sx={{ py: 2 }}>
                  <ScheduleIcon sx={{ color: 'warning.main', fontSize: 32, mb: 0.5 }} />
                  <Typography color="warning.main" variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {stats.inProgress}
                  </Typography>
                  <Typography color="text.secondary" variant="body2" sx={{ fontSize: '0.875rem' }}>
                    В процессе
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ 
                textAlign: 'center',
                background: isDark 
                  ? alpha(theme.palette.info.main, 0.15)
                  : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderRadius: 2,
                border: isDark ? `1px solid ${alpha(theme.palette.info.main, 0.3)}` : 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }
              }}>
                <CardContent sx={{ py: 2 }}>
                  <TrendingUpIcon sx={{ color: 'info.main', fontSize: 32, mb: 0.5 }} />
                  <Typography color="info.main" variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {stats.notStarted}
                  </Typography>
                  <Typography color="text.secondary" variant="body2" sx={{ fontSize: '0.875rem' }}>
                    Не начато
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card sx={{ 
                textAlign: 'center',
                background: isDark 
                  ? alpha(theme.palette.primary.main, 0.15)
                  : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderRadius: 2,
                border: isDark ? `1px solid ${alpha(theme.palette.primary.main, 0.3)}` : 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }
              }}>
                <CardContent sx={{ py: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: theme.palette.primary.main }}>
                    {completionPercentage}%
                  </Typography>
                  <Typography color="text.secondary" variant="body2" sx={{ fontSize: '0.875rem' }}>
                    Прогресс
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Dashboard - прозрачный на градиенте */}
        {!loading && technologies && technologies.length > 0 && (
          <Box sx={{ 
            mb: 4,
            '& .MuiCard-root': {
              background: isDark 
                ? alpha(theme.palette.background.paper, 0.3)
                : 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: isDark 
                ? `1px solid ${alpha(theme.palette.divider, 0.3)}`
                : '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
            },
            '& .MuiTypography-root': {
              color: isDark ? 'text.primary' : 'rgba(255, 255, 255, 0.95)'
            }
          }}>
            <Dashboard technologies={technologies} />
          </Box>
        )}

        {/* Особенности - компактные карточки */}
        <Grid container spacing={2}>
          {[
            { icon: TrendingUpIcon, title: 'Отслеживание прогресса', desc: 'Визуализируйте свой прогресс изучения' },
            { icon: NotesIcon, title: 'Заметки', desc: 'Сохраняйте важные моменты и ссылки' },
            { icon: SearchIcon, title: 'Поиск и фильтрация', desc: 'Быстро находите нужные технологии' },
            { icon: SaveIcon, title: 'Автосохранение', desc: 'Данные сохраняются автоматически' }
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{
                height: '100%',
                background: isDark 
                  ? alpha(theme.palette.background.paper, 0.6)
                  : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease',
                border: isDark ? `1px solid ${alpha(theme.palette.divider, 0.5)}` : 'none',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  background: isDark 
                    ? alpha(theme.palette.background.paper, 0.8)
                    : 'rgba(255, 255, 255, 0.9)'
                }
              }}>
                <CardContent sx={{ p: 2.5, textAlign: 'center' }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    mb: 1.5,
                    color: theme.palette.primary.main
                  }}>
                    <feature.icon sx={{ fontSize: 36 }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, fontSize: '1rem' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
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
