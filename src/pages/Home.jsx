import { useNavigate } from 'react-router-dom'
import { Button, Container, Grid, Card, CardContent, Typography, Box } from '@mui/material'
import Dashboard from '../components/Dashboard'
import useTechnologiesApi from '../hooks/useTechnologiesApi'
import './Page.css'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const { technologies, loading } = useTechnologiesApi()

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Добро пожаловать в Трекер технологий!
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Отслеживайте свой прогресс в изучении технологий разработки
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/technologies')}
          >
            Посмотреть все технологии
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/add-technology')}
          >
            Добавить технологию
          </Button>
        </Box>
      </Box>

      {!loading && technologies && technologies.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Dashboard technologies={technologies} />
        </Box>
      )}

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📊 Отслеживание прогресса
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Отмечайте статус изучения каждой технологии
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📝 Заметки
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Сохраняйте важные моменты по каждой технологии
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🔍 Поиск и фильтрация
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Быстро находите нужные технологии
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                💾 Автосохранение
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Все данные сохраняются автоматически
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home

