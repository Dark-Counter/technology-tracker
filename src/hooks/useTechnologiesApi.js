import { useState, useEffect } from 'react'
import useLocalStorage from './useLocalStorage'

// Начальные данные для технологий
const initialTechnologies = [
  {
    id: 1,
    title: 'React',
    description: 'Библиотека для создания пользовательских интерфейсов',
    category: 'frontend',
    status: 'not-started',
    notes: '',
    difficulty: 'beginner',
    resources: ['https://react.dev', 'https://ru.reactjs.org']
  },
  {
    id: 2,
    title: 'Node.js',
    description: 'Среда выполнения JavaScript на сервере',
    category: 'backend',
    status: 'not-started',
    notes: '',
    difficulty: 'intermediate',
    resources: ['https://nodejs.org', 'https://nodejs.org/ru/docs/']
  },
  {
    id: 3,
    title: 'TypeScript',
    description: 'Типизированное надмножество JavaScript',
    category: 'language',
    status: 'not-started',
    notes: '',
    difficulty: 'intermediate',
    resources: ['https://www.typescriptlang.org']
  }
]

function useTechnologiesApi() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Загрузка технологий из API (имитация)
  const fetchTechnologies = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // В реальном приложении здесь будет запрос к вашему API
      // Сейчас имитируем загрузку с задержкой
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Проверяем, есть ли сохраненные данные в localStorage
      const saved = localStorage.getItem('technologies')
      if (saved) {
        const parsed = JSON.parse(saved)
        // Если есть сохраненные данные, используем их
        if (parsed.length > 0) {
          setTechnologies(parsed)
          setLoading(false)
          return
        }
      }
      
      // Если нет сохраненных данных, используем начальные
      setTechnologies(initialTechnologies)
    } catch (err) {
      setError('Не удалось загрузить технологии')
      console.error('Ошибка загрузки:', err)
    } finally {
      setLoading(false)
    }
  }

  // Добавление новой технологии
  const addTechnology = async (techData) => {
    try {
      setError(null)
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newTech = {
        id: Date.now(), // В реальном приложении ID генерируется на сервере
        ...techData,
        status: techData.status || 'not-started',
        notes: techData.notes || '',
        createdAt: new Date().toISOString()
      }
      
      setTechnologies(prev => [...prev, newTech])
      return newTech
    } catch (err) {
      setError('Не удалось добавить технологию')
      throw err
    }
  }

  // Обновление технологии
  const updateTechnology = async (techId, updates) => {
    try {
      setError(null)
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setTechnologies(prev =>
        prev.map(tech =>
          tech.id === techId ? { ...tech, ...updates } : tech
        )
      )
    } catch (err) {
      setError('Не удалось обновить технологию')
      throw err
    }
  }

  // Удаление технологии
  const deleteTechnology = async (techId) => {
    try {
      setError(null)
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setTechnologies(prev => prev.filter(tech => tech.id !== techId))
    } catch (err) {
      setError('Не удалось удалить технологию')
      throw err
    }
  }

  // Загружаем технологии при монтировании
  useEffect(() => {
    fetchTechnologies()
  }, [])

  return {
    technologies,
    loading,
    error,
    refetch: fetchTechnologies,
    addTechnology,
    updateTechnology,
    deleteTechnology,
    setTechnologies
  }
}

export default useTechnologiesApi

