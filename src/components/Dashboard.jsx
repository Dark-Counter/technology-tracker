import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Tabs,
  Tab,
  LinearProgress,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ScheduleIcon from '@mui/icons-material/Schedule'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import './Dashboard.css'

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function Dashboard({ technologies }) {
  const [tabValue, setTabValue] = useState(0)

  // Расчет статистики
  const stats = {
    total: technologies.length,
    completed: technologies.filter(t => t.status === 'completed').length,
    inProgress: technologies.filter(t => t.status === 'in-progress').length,
    notStarted: technologies.filter(t => t.status === 'not-started').length
  }

  const completionPercentage = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Панель управления
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Обзор" />
          <Tab label="Статистика" />
        </Tabs>
      </Box>

      {/* Вкладка обзора */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Карточка завершенных */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'transparent !important' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Завершено
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{stats.completed}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Карточка в процессе */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'transparent !important' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <ScheduleIcon color="warning" sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    В процессе
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{stats.inProgress}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Карточка не начатых */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'transparent !important' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingUpIcon color="info" sx={{ mr: 1 }} />
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Не начато
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{stats.notStarted}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Карточка прогресса */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'transparent !important' }}>
              <CardContent>
                <Typography variant="body2" gutterBottom sx={{ opacity: 0.9 }}>
                  Общий прогресс
                </Typography>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                  {completionPercentage}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={completionPercentage}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Недавно добавленные технологии */}
          <Grid item xs={12} md={6}>
            <Card sx={{ background: 'transparent !important' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Недавно добавленные
                </Typography>
                <List>
                  {technologies.slice(0, 5).map((tech) => (
                    <ListItem key={tech.id} sx={{ py: 0.5 }}>
                      <ListItemText
                        primary={tech.title}
                        secondary={tech.category}
                        primaryTypographyProps={{ sx: { fontWeight: 500 } }}
                        secondaryTypographyProps={{ sx: { opacity: 0.7 } }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Распределение по категориям */}
          <Grid item xs={12} md={6}>
            <Card sx={{ background: 'transparent !important' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  По категориям
                </Typography>
                <List>
                  {['frontend', 'backend', 'fullstack', 'devops', 'language', 'other'].map(category => {
                    const count = technologies.filter(t => t.category === category).length
                    return count > 0 ? (
                      <ListItem key={category} sx={{ py: 0.5 }}>
                        <ListItemText
                          primary={category}
                          secondary={`${count} технологий`}
                          primaryTypographyProps={{ sx: { fontWeight: 500 } }}
                          secondaryTypographyProps={{ sx: { opacity: 0.7 } }}
                        />
                      </ListItem>
                    ) : null
                  })}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Вкладка статистики */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Детальная статистика
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ background: 'transparent !important' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Общая информация
                </Typography>
                <Typography sx={{ mb: 1 }}>Всего технологий: {stats.total}</Typography>
                <Typography sx={{ mb: 1 }}>Завершено: {stats.completed}</Typography>
                <Typography sx={{ mb: 1 }}>В процессе: {stats.inProgress}</Typography>
                <Typography sx={{ mb: 1 }}>Не начато: {stats.notStarted}</Typography>
                <Typography sx={{ mt: 2, fontWeight: 600 }}>
                  Процент выполнения: {completionPercentage}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  )
}

export default Dashboard

