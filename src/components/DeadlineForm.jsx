import { useState, useEffect } from 'react'
import './DeadlineForm.css'

function DeadlineForm({ technologies, onUpdate }) {
  const [selectedTech, setSelectedTech] = useState('')
  const [deadline, setDeadline] = useState('')
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  // Валидация формы
  useEffect(() => {
    const newErrors = {}
    
    if (!selectedTech) {
      newErrors.selectedTech = 'Выберите технологию'
    }
    
    if (deadline) {
      const deadlineDate = new Date(deadline)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (deadlineDate < today) {
        newErrors.deadline = 'Дедлайн не может быть в прошлом'
      }
    } else {
      newErrors.deadline = 'Укажите дедлайн'
    }
    
    setErrors(newErrors)
    setIsFormValid(Object.keys(newErrors).length === 0)
  }, [selectedTech, deadline])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isFormValid) {
      onUpdate(parseInt(selectedTech), { deadline })
      setSelectedTech('')
      setDeadline('')
      setErrors({})
    }
  }

  const handleClear = () => {
    if (selectedTech) {
      onUpdate(parseInt(selectedTech), { deadline: '' })
      setSelectedTech('')
      setDeadline('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="deadline-form" noValidate>
      <h3>Установка сроков изучения</h3>
      
      <div className="form-group">
        <label htmlFor="tech-select">
          Выберите технологию *
          {errors.selectedTech && <span className="error-indicator" aria-live="polite">⚠</span>}
        </label>
        <select
          id="tech-select"
          value={selectedTech}
          onChange={(e) => setSelectedTech(e.target.value)}
          className={errors.selectedTech ? 'error' : ''}
          aria-invalid={!!errors.selectedTech}
          aria-describedby={errors.selectedTech ? 'tech-error' : undefined}
          required
        >
          <option value="">-- Выберите технологию --</option>
          {technologies.map(tech => (
            <option key={tech.id} value={tech.id}>
              {tech.title} {tech.deadline ? `(дедлайн: ${new Date(tech.deadline).toLocaleDateString('ru-RU')})` : ''}
            </option>
          ))}
        </select>
        {errors.selectedTech && (
          <span id="tech-error" className="error-message" role="alert">
            {errors.selectedTech}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="deadline-input">
          Дедлайн *
          {errors.deadline && <span className="error-indicator" aria-live="polite">⚠</span>}
        </label>
        <input
          type="date"
          id="deadline-input"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className={errors.deadline ? 'error' : ''}
          aria-invalid={!!errors.deadline}
          aria-describedby={errors.deadline ? 'deadline-error' : undefined}
          min={new Date().toISOString().split('T')[0]}
          required
        />
        {errors.deadline && (
          <span id="deadline-error" className="error-message" role="alert">
            {errors.deadline}
          </span>
        )}
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isFormValid}
          aria-describedby={!isFormValid ? 'submit-help' : undefined}
        >
          Установить дедлайн
        </button>
        {!isFormValid && (
          <span id="submit-help" className="form-help-text">
            Заполните все поля корректно
          </span>
        )}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleClear}
          disabled={!selectedTech}
        >
          Очистить дедлайн
        </button>
      </div>
    </form>
  )
}

export default DeadlineForm

