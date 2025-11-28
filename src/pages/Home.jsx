import { useNavigate } from 'react-router-dom'
import { 
  Button, 
  Grid, 
  Box,
  Stack,
  useTheme,
  Typography,
  LinearProgress
} from '@mui/material'
import useTechnologiesApi from '../hooks/useTechnologiesApi'
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
      background: isDark ? '#0b1020' : '#f6f7fb',
      pt: 8,
      pb: 4,
      px: { xs: 2, sm: 3 }
    }}>
      <Box sx={{ 
        maxWidth: '920px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Hero Card */}
        <Box sx={{
          padding: { xs: 3, sm: 4 },
          borderRadius: 3,
          background: 'linear-gradient(180deg, #5f7df2 0%, #6c4bb0 55%, #7a4c9e 100%)',
          color: '#fff',
          boxShadow: '0 8px 28px rgba(44,32,90,0.16)',
          mb: 3
        }}>
          {/* Title Section */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            alignItems: 'flex-start',
            mb: 2
          }}>
            <Box sx={{ fontSize: 34 }}>🧑‍🚀</Box>
            <Box>
              <Typography 
                variant="h4" 
                component="h1"
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '24px', sm: '28px' },
                  letterSpacing: '0.2px',
                  mb: 0.5
                }}
              >
                Трекер технологий
              </Typography>
              <Typography 
                sx={{ 
                  fontSize: '13px',
                  opacity: 0.95,
                  m: 0
                }}
              >
                Отслеживайте свой прогресс в изучении технологий разработки
              </Typography>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Stack 
            direction="row" 
            spacing={1.5} 
            sx={{ mt: 2, mb: 2.5 }}
            flexWrap="wrap"
          >
            <Button
              variant="contained"
              onClick={() => navigate('/technologies')}
              sx={{
                background: '#0b76ff',
                color: '#fff',
                boxShadow: '0 6px 16px rgba(11,118,255,0.18)',
                borderRadius: 2,
                px: 2,
                py: 1.25,
                fontWeight: 600,
                fontSize: '14px',
                textTransform: 'none',
                '&:hover': {
                  background: '#0a6ae6',
                  boxShadow: '0 8px 20px rgba(11,118,255,0.25)'
                }
              }}
            >
              Все технологии
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/add-technology')}
              sx={{
                background: 'rgba(255,255,255,0.14)',
                color: '#fff',
                border: 'none',
                borderRadius: 2,
                px: 2,
                py: 1.25,
                fontWeight: 600,
                fontSize: '14px',
                textTransform: 'none',
                '&:hover': {
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none'
                }
              }}
            >
              Добавить технологию
            </Button>
          </Stack>

          {/* KPI Row */}
          {!loading && stats.total > 0 && (
            <Grid container spacing={1.5} sx={{ mb: 3 }}>
              <Grid item xs={6} sm={3}>
                <Box sx={{
                  background: 'rgba(255,255,255,0.12)',
                  padding: 1.5,
                  borderRadius: 2.5,
                  display: 'flex',
                  gap: 1.5,
                  alignItems: 'center',
                  color: '#fff'
                }}>
                  <Box sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 2,
                    background: '#1abc9c',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}>
                    ✓
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '20px', lineHeight: 1 }}>
                      {stats.completed}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', opacity: 0.9 }}>
                      Завершено
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{
                  background: 'rgba(255,255,255,0.12)',
                  padding: 1.5,
                  borderRadius: 2.5,
                  display: 'flex',
                  gap: 1.5,
                  alignItems: 'center',
                  color: '#fff'
                }}>
                  <Box sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 2,
                    background: '#ffa726',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}>
                    ⏳
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '20px', lineHeight: 1 }}>
                      {stats.inProgress}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', opacity: 0.9 }}>
                      В процессе
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{
                  background: 'rgba(255,255,255,0.12)',
                  padding: 1.5,
                  borderRadius: 2.5,
                  display: 'flex',
                  gap: 1.5,
                  alignItems: 'center',
                  color: '#fff'
                }}>
                  <Box sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 2,
                    background: '#64b5f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}>
                    📈
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '20px', lineHeight: 1 }}>
                      {stats.notStarted}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', opacity: 0.9 }}>
                      Не начато
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{
                  background: 'rgba(255,255,255,0.12)',
                  padding: 1.5,
                  borderRadius: 2.5,
                  display: 'flex',
                  gap: 1.5,
                  alignItems: 'center',
                  color: '#fff'
                }}>
                  <Box sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 2,
                    background: '#90caf9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px'
                  }}>
                    %
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '20px', lineHeight: 1 }}>
                      {completionPercentage}%
                    </Typography>
                    <Typography sx={{ fontSize: '12px', opacity: 0.9 }}>
                      Прогресс
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}

          {/* Control Panel */}
          {!loading && technologies && technologies.length > 0 && (
            <Box sx={{
              mt: 3,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
              gap: 2
            }}>
              {/* Stats Section */}
              <Box sx={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))',
                padding: 2,
                borderRadius: 2.5,
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                color: '#fff'
              }}>
                <Box sx={{
                  flex: 1,
                  minWidth: 86,
                  padding: 1.5,
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 2,
                  textAlign: 'center'
                }}>
                  <Typography sx={{ fontSize: '18px', fontWeight: 700, mb: 0.5 }}>
                    {stats.completed}
                  </Typography>
                  <Typography sx={{ fontSize: '13px', opacity: 0.78, fontWeight: 500 }}>
                    Завершено
                  </Typography>
                </Box>
                <Box sx={{
                  flex: 1,
                  minWidth: 86,
                  padding: 1.5,
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 2,
                  textAlign: 'center'
                }}>
                  <Typography sx={{ fontSize: '18px', fontWeight: 700, mb: 0.5 }}>
                    {stats.inProgress}
                  </Typography>
                  <Typography sx={{ fontSize: '13px', opacity: 0.78, fontWeight: 500 }}>
                    В процессе
                  </Typography>
                </Box>
                <Box sx={{
                  flex: 1,
                  minWidth: 86,
                  padding: 1.5,
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 2,
                  textAlign: 'center'
                }}>
                  <Typography sx={{ fontSize: '18px', fontWeight: 700, mb: 0.5 }}>
                    {stats.notStarted}
                  </Typography>
                  <Typography sx={{ fontSize: '13px', opacity: 0.78, fontWeight: 500 }}>
                    Не начато
                  </Typography>
                </Box>
                <Box sx={{
                  minWidth: 140,
                  flex: '1 1 100%',
                  padding: 1.5,
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 2
                }}>
                  <Typography sx={{ fontSize: '13px', opacity: 0.78, fontWeight: 500, mb: 1 }}>
                    Общий прогресс
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ flex: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={completionPercentage}
                        sx={{
                          height: 8,
                          borderRadius: 1.5,
                          background: 'rgba(255,255,255,0.06)',
                          '& .MuiLinearProgress-bar': {
                            background: '#00e676',
                            borderRadius: 1.5
                          }
                        }}
                      />
                    </Box>
                    <Typography sx={{ width: 44, textAlign: 'center', fontSize: '14px', fontWeight: 600 }}>
                      {completionPercentage}%
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Right Panels */}
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr' },
                gap: 1.5
              }}>
                <Box sx={{
                  background: 'rgba(255,255,255,0.04)',
                  padding: 1.5,
                  borderRadius: 2.5,
                  color: '#fff'
                }}>
                  <Typography sx={{ fontSize: '13px', fontWeight: 600, mb: 1 }}>
                    Недавно добавленные
                  </Typography>
                  <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none', fontSize: '13px', color: '#e6e6ff' }}>
                    {technologies.slice(0, 3).map((tech) => (
                      <Box component="li" key={tech.id} sx={{ mb: 0.5 }}>
                        {tech.title} <span style={{ opacity: 0.7 }}>— {tech.category}</span>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box sx={{
                  background: 'rgba(255,255,255,0.04)',
                  padding: 1.5,
                  borderRadius: 2.5,
                  color: '#fff'
                }}>
                  <Typography sx={{ fontSize: '13px', fontWeight: 600, mb: 1 }}>
                    По категориям
                  </Typography>
                  <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none', fontSize: '13px', color: '#e6e6ff' }}>
                    {['frontend', 'backend', 'fullstack', 'devops', 'language', 'other'].map(category => {
                      const count = technologies.filter(t => t.category === category).length
                      return count > 0 ? (
                        <Box component="li" key={category} sx={{ mb: 0.5 }}>
                          {category} — {count} {count === 1 ? 'технология' : 'технологий'}
                        </Box>
                      ) : null
                    })}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        {/* Features Cards */}
        <Grid container spacing={2}>
          {[
            { icon: '📊', title: 'Отслеживание прогресса', desc: 'Визуализируйте свой прогресс изучения' },
            { icon: '📝', title: 'Заметки', desc: 'Сохраняйте важные моменты и ссылки' },
            { icon: '🔎', title: 'Поиск и фильтрация', desc: 'Быстро находите нужные технологии' },
            { icon: '💾', title: 'Автосохранение', desc: 'Данные сохраняются автоматически' }
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box sx={{
                background: isDark ? 'rgba(255,255,255,0.05)' : '#fff',
                padding: 2.5,
                borderRadius: 3,
                boxShadow: isDark ? '0 6px 18px rgba(0,0,0,0.3)' : '0 6px 18px rgba(20,28,80,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                alignItems: 'flex-start',
                minHeight: 98,
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : 'none',
                '&:hover': {
                  boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(20,28,80,0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.2s ease'
              }}>
                <Box sx={{ fontSize: '20px' }}>{feature.icon}</Box>
                <Typography sx={{ 
                  margin: 0, 
                  fontSize: '14px', 
                  fontWeight: 600,
                  color: isDark ? '#dbe9ff' : '#1b2430'
                }}>
                  {feature.title}
                </Typography>
                <Typography sx={{ 
                  margin: 0, 
                  color: isDark ? 'rgba(219,233,255,0.7)' : '#555', 
                  fontSize: '13px',
                  lineHeight: 1.5
                }}>
                  {feature.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default Home
