import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import MessageBox from './components/MessageBox.tsx'
import Connect from './components/Connect.tsx'
import CodeFixer from './components/CodeFixer.tsx'
import Profile from './components/Profile.tsx'
import Inbox from './components/Inbox.tsx'
import Call from './components/Call.tsx'
import Login from './components/Login.tsx'
export default createRoutesFromElements(
  <>
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/message/:id" element={<MessageBox />} />
      <Route path="/connect" element={<Connect />} />
      <Route path="/codeFixer" element={<CodeFixer />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/inbox/:id" element={<Inbox />} />
      <Route path="/call/:id" element={<Call />} />
    </Route>
  </>,
)
