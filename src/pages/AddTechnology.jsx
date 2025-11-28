import { useNavigate } from 'react-router-dom'
import useTechnologiesApi from '../hooks/useTechnologiesApi'
import TechnologyForm from '../components/TechnologyForm'
import './Page.css'
import './AddTechnology.css'

function AddTechnology() {
  const navigate = useNavigate()
  const { addTechnology, error } = useTechnologiesApi()

  const handleSave = async (formData) => {
    try {
      await addTechnology({
        ...formData,
        status: 'not-started',
        notes: formData.notes || ''
      })
      navigate('/technologies')
    } catch (err) {
      console.error('Ошибка при добавлении технологии:', err)
    }
  }

  const handleCancel = () => {
    navigate('/technologies')
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Добавить технологию</h1>
      </div>
      
      {error && (
        <div className="form-error">
          <p>{error}</p>
        </div>
      )}
      
      <TechnologyForm
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  )
}

export default AddTechnology
