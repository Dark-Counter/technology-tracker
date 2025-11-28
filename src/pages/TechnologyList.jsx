import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Container, Grid, CircularProgress, Alert, Box, Typography } from '@mui/material'
import useTechnologiesApi from '../hooks/useTechnologiesApi'
import { useNotification } from '../components/NotificationProvider'
import TechnologyCard from '../components/TechnologyCard'
import SimpleTechCard from '../components/SimpleTechCard'
import SearchBox from '../components/SearchBox'
import FilterTabs from '../components/FilterTabs'
import ProgressHeader from '../components/ProgressHeader'
import QuickActions from '../components/QuickActions'
import RoadmapImporter from '../components/RoadmapImporter'
import DeadlineForm from '../components/DeadlineForm'
import BulkStatusEditor from '../components/BulkStatusEditor'
import DataImportExport from '../components/DataImportExport'
import './Page.css'
import './TechnologyList.css'

function TechnologyList() {
  const { technologies, loading, error, updateTechnology, addTechnology, refetch } = useTechnologiesApi()
  const { showNotification } = useNotification()
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [useMUICards, setUseMUICards] = useState(false)

  // Функция для изменения статуса технологии (циклическое переключение)
  const handleStatusChange = async (id) => {
    const tech = technologies.find(t => t.id === id)
    if (tech) {
      const statusOrder = ['not-started', 'in-progress', 'completed']
      const currentIndex = statusOrder.indexOf(tech.status)
      const nextIndex = (currentIndex + 1) % statusOrder.length
      await updateTechnology(id, { status: statusOrder[nextIndex] })
      showNotification('Статус технологии обновлен', 'success')
    }
  }

  // Функция для изменения статуса (для MUI карточек)
  const handleMUIStatusChange = async (id, newStatus) => {
    await updateTechnology(id, { status: newStatus })
    showNotification('Статус технологии обновлен', 'success')
  }

  // Функция для обновления заметок
  const handleNotesChange = async (techId, newNotes) => {
    await updateTechnology(techId, { notes: newNotes })
  }

  // Функция для отметки всех как выполненных
  const markAllCompleted = async () => {
    const updates = technologies.map(tech => 
      updateTechnology(tech.id, { status: 'completed' })
    )
    await Promise.all(updates)
  }

  // Функция для сброса всех статусов
  const resetAll = async () => {
    const updates = technologies.map(tech => 
      updateTechnology(tech.id, { status: 'not-started' })
    )
    await Promise.all(updates)
  }

  // Функция для случайного выбора следующей технологии
  const randomNextTechnology = () => {
    const notStarted = technologies.filter(tech => tech.status === 'not-started')
    if (notStarted.length === 0) {
      alert('Все технологии уже начаты!')
      return
    }
    const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)]
    handleStatusChange(randomTech.id)
  }

  // Функция для импорта технологии
  const handleImport = async (techData) => {
    await addTechnology(techData)
  }

  // Функция для обновления дедлайна
  const handleDeadlineUpdate = async (techId, updates) => {
    await updateTechnology(techId, updates)
  }

  // Функция для массового обновления статусов
  const handleBulkStatusUpdate = async (techIds, newStatus) => {
    const updates = techIds.map(id => updateTechnology(id, { status: newStatus }))
    await Promise.all(updates)
  }

  // Фильтрация технологий по статусу и поисковому запросу
  const filteredTechnologies = technologies.filter(tech => {
    const matchesFilter = activeFilter === 'all' || tech.status === activeFilter
    const matchesSearch = searchQuery === '' || 
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tech.notes && tech.notes.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  // Расчет прогресса
  const progress = technologies.length > 0
    ? Math.round((technologies.filter(tech => tech.status === 'completed').length / technologies.length) * 100)
    : 0

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Box sx={{ mt: 2 }}>
          <Typography>Загрузка технологий...</Typography>
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" action={
          <button onClick={refetch} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
            Попробовать снова
          </button>
        }>
          {error}
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <div className="page-header">
        <h1>Все технологии</h1>
        <Link to="/add-technology" className="btn btn-primary">
          + Добавить технологию
        </Link>
      </div>
      
      <RoadmapImporter onImport={handleImport} />
      
      <DeadlineForm 
        technologies={technologies} 
        onUpdate={handleDeadlineUpdate}
      />
      
      <BulkStatusEditor
        technologies={technologies}
        onBulkUpdate={handleBulkStatusUpdate}
      />
      
      <DataImportExport />
      
      <ProgressHeader technologies={technologies} />
      <QuickActions
        onMarkAllCompleted={markAllCompleted}
        onResetAll={resetAll}
        onRandomNext={randomNextTechnology}
        technologies={technologies}
      />
      <SearchBox 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        resultsCount={filteredTechnologies.length}
      />
      <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      
      <Box sx={{ mb: 2, textAlign: 'right' }}>
        <button
          onClick={() => setUseMUICards(!useMUICards)}
          style={{
            padding: '0.5rem 1rem',
            background: useMUICards ? '#1976d2' : '#e0e0e0',
            color: useMUICards ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {useMUICards ? 'Показать обычные карточки' : 'Показать MUI карточки'}
        </button>
      </Box>

      {useMUICards ? (
        <Grid container spacing={2}>
          {filteredTechnologies.map(tech => (
            <Grid item xs={12} sm={6} md={4} key={tech.id}>
              <SimpleTechCard
                technology={tech}
                onStatusChange={handleMUIStatusChange}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className="technologies-list">
          {filteredTechnologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              id={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              notes={tech.notes || ''}
              onStatusChange={handleStatusChange}
              onNotesChange={handleNotesChange}
            />
          ))}
        </div>
      )}
      
      {filteredTechnologies.length === 0 && (
        <div className="empty-state">
          <p>Технологий пока нет.</p>
          <Link to="/add-technology" className="btn btn-primary">
            Добавить первую технологию
          </Link>
        </div>
      )}
    </Container>
  )
}

export default TechnologyList

