import DataImportExport from '../components/DataImportExport'
import './Page.css'
import './DataManagement.css'

function DataManagement() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Управление данными</h1>
      </div>
      <DataImportExport />
    </div>
  )
}

export default DataManagement

