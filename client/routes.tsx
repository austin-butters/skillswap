import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import MessageBox from './components/MessageBox.tsx'
import Connect from './components/Connect.tsx'
import CodeFixer from './components/CodeFixer.tsx'
import Profile from './components/Profile.tsx'
import Inbox from './components/Inbox.tsx'
import Call from './components/Call.tsx'

import Login from './components/Login.tsx'
import Home from './components/Home.tsx'
import LoadingUser from './components/LoadingUser.tsx'
import SearchResults from '#components/SearchResults.tsx'
export default createRoutesFromElements(
  <>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/message/:id" element={<MessageBox />} />
      <Route path="/connect" element={<Connect />} />
      <Route path="/codeFixer" element={<CodeFixer />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/inbox/:id" element={<Inbox />} />
      <Route path="/call/:id" element={<Call />} />
      <Route path="/loadingUser" element={<LoadingUser />} />
      <Route path="/search" element={<SearchResults />} />
    </Route>
  </>,
)
