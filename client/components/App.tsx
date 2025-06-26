import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function App() {
  return (
    <>
      <div className="app">
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

export default App
