import { useState, useEffect } from 'react'
import './TechnologyForm.css'

function TechnologyForm({ onSave, onCancel, initialData = {} }) {
  // Состояние формы с начальными значениями
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || 'frontend',
    difficulty: initialData.difficulty || 'beginner',
    deadline: initialData.deadline || '',
    resources: initialData.resources || ['']
  })

  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState({})
  // Флаг валидности всей формы
  const [isFormValid, setIsFormValid] = useState(false)

  // Функция валидации
  const validateForm = () => {
    const newErrors = {}

    // Валидация названия технологии
    if (!formData.title.trim()) {
      newErrors.title = 'Название технологии обязательно'
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Название должно содержать минимум 3 символа'
    }

    // Валидация описания
    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно'
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Описание должно содержать минимум 10 символов'
    }

    // Валидация дедлайна (не должен быть в прошлом)
    if (formData.deadline) {
      const deadlineDate = new Date(formData.deadline)
      const today = new Date()
      today.setHours(0, 0, 0, 0) // Обнуляем время для сравнения только дат
      
      if (deadlineDate < today) {
        newErrors.deadline = 'Дедлайн не может быть в прошлом'
      }
    }

    // Валидация ресурсов (минимум один валидный URL)
    const validResources = formData.resources.filter(resource => {
      if (!resource.trim()) return false
      try {
        new URL(resource.trim())
        return true
      } catch {
        return false
      }
    })

    if (validResources.length === 0 && formData.resources.some(r => r.trim())) {
      newErrors.resources = 'Добавьте хотя бы один валидный URL'
    }

    // Проверка отдельных ресурсов на валидность URL
    formData.resources.forEach((resource, index) => {
      if (resource.trim() && !validResources.includes(resource.trim())) {
        if (!newErrors[`resource_${index}`]) {
          newErrors[`resource_${index}`] = 'Введите корректный URL'
        }
      }
    })

    setErrors(newErrors)
    setIsFormValid(Object.keys(newErrors).length === 0)
  }

  // Запуск валидации при изменении данных
  useEffect(() => {
    validateForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData])

  // Обработчик изменения полей
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Обработчик изменения конкретного ресурса в массиве
  const handleResourceChange = (index, value) => {
    const newResources = [...formData.resources]
    newResources[index] = value
    setFormData(prev => ({
      ...prev,
      resources: newResources
    }))
  }

  // Добавление нового поля ресурса
  const handleAddResource = () => {
    setFormData(prev => ({
      ...prev,
      resources: [...prev.resources, '']
    }))
  }

  // Удаление поля ресурса
  const handleRemoveResource = (index) => {
    if (formData.resources.length > 1) {
      const newResources = formData.resources.filter((_, i) => i !== index)
      setFormData(prev => ({
        ...prev,
        resources: newResources
      }))
    }
  }

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isFormValid) {
      // Фильтруем пустые ресурсы перед сохранением
      const filteredResources = formData.resources
        .filter(r => r.trim())
        .map(r => r.trim())
      
      onSave({
        ...formData,
        resources: filteredResources
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="technology-form" noValidate>
      <div className="form-group">
        <label htmlFor="title">
          Название технологии *
          {errors.title && <span className="error-indicator" aria-live="polite">⚠</span>}
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : undefined}
          placeholder="Например: React Hooks"
          required
        />
        {errors.title && (
          <span id="title-error" className="error-message" role="alert">
            {errors.title}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">
          Описание *
          {errors.description && <span className="error-indicator" aria-live="polite">⚠</span>}
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={errors.description ? 'error' : ''}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? 'description-error' : undefined}
          rows="4"
          placeholder="Опишите, что нужно изучить..."
          required
        />
        {errors.description && (
          <span id="description-error" className="error-message" role="alert">
            {errors.description}
          </span>
        )}
      </div>

      <div className="form-row">
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
            <option value="language">Язык программирования</option>
            <option value="other">Другое</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Сложность</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="beginner">Начинающий</option>
            <option value="intermediate">Средний</option>
            <option value="advanced">Продвинутый</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="deadline">
          Дедлайн (необязательно)
          {errors.deadline && <span className="error-indicator" aria-live="polite">⚠</span>}
        </label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className={errors.deadline ? 'error' : ''}
          aria-invalid={!!errors.deadline}
          aria-describedby={errors.deadline ? 'deadline-error' : undefined}
          min={new Date().toISOString().split('T')[0]}
        />
        {errors.deadline && (
          <span id="deadline-error" className="error-message" role="alert">
            {errors.deadline}
          </span>
        )}
      </div>

      <div className="form-group">
        <label>
          Ресурсы для изучения *
          {errors.resources && <span className="error-indicator" aria-live="polite">⚠</span>}
        </label>
        {formData.resources.map((resource, index) => (
          <div key={index} className="resource-input-group">
            <input
              type="url"
              value={resource}
              onChange={(e) => handleResourceChange(index, e.target.value)}
              className={errors[`resource_${index}`] ? 'error' : ''}
              aria-invalid={!!errors[`resource_${index}`]}
              aria-describedby={errors[`resource_${index}`] ? `resource-${index}-error` : undefined}
              placeholder="https://example.com"
            />
            {errors[`resource_${index}`] && (
              <span id={`resource-${index}-error`} className="error-message" role="alert">
                {errors[`resource_${index}`]}
              </span>
            )}
            {formData.resources.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveResource(index)}
                className="remove-resource-btn"
                aria-label={`Удалить ресурс ${index + 1}`}
              >
                ×
              </button>
            )}
          </div>
        ))}
        {errors.resources && (
          <span className="error-message" role="alert">
            {errors.resources}
          </span>
        )}
        <button
          type="button"
          onClick={handleAddResource}
          className="add-resource-btn"
          aria-label="Добавить еще один ресурс"
        >
          + Добавить ресурс
        </button>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isFormValid}
          aria-describedby={!isFormValid ? 'submit-help' : undefined}
        >
          {initialData.title ? 'Сохранить изменения' : 'Добавить технологию'}
        </button>
        {!isFormValid && (
          <span id="submit-help" className="form-help-text">
            Заполните все обязательные поля корректно
          </span>
        )}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Отмена
        </button>
      </div>
    </form>
  )
}

export default TechnologyForm

