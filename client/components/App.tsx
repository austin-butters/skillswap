import { Outlet } from 'react-router-dom'
import { Sidebar } from '#components'

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
