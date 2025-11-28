import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useTechnologies from '../hooks/useTechnologies'
import './Page.css'
import './AddTechnology.css'

function AddTechnology() {
  const navigate = useNavigate()
  const { technologies, setTechnologies } = useTechnologies()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'frontend',
    notes: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validate()) {
      return
    }

    // Генерируем новый ID
    const newId = technologies.length > 0 
      ? Math.max(...technologies.map(t => t.id)) + 1 
      : 1

    const newTechnology = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      status: 'not-started',
      notes: formData.notes.trim()
    }

    await addTechnology(newTechnology)
    
    // Перенаправляем на страницу списка
    navigate('/technologies')
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Добавить технологию</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="technology-form">
        <div className="form-group">
          <label htmlFor="title">Название технологии *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
            placeholder="Например: React Hooks"
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
            rows="4"
            placeholder="Опишите, что нужно изучить..."
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Категория</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Fullstack</option>
            <option value="devops">DevOps</option>
            <option value="other">Другое</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Заметки (необязательно)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Добавьте заметки, если нужно..."
          />
        </div>

        {error && (
          <div className="form-error">
            <p>{error}</p>
          </div>
        )}
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Добавление...' : 'Добавить технологию'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/technologies')}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTechnology

