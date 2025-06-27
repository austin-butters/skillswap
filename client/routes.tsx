import { createRoutesFromElements, Route } from 'react-router-dom'
import {
  App,
  MessageBox,
  Connect,
  CodeFixer,
  Profile,
  Inbox,
  Call,
  Login,
  Home,
  LoadingUser,
  QuestionPage,
} from '#components'


export default createRoutesFromElements(
  <>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/questions/:id" element={<QuestionPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/message/:id" element={<MessageBox />} />
      <Route path="/connect" element={<Connect />} />
      <Route path="/codeFixer" element={<CodeFixer />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/inbox/:id" element={<Inbox />} />
      <Route path="/call/:id" element={<Call />} />
      <Route path="/loadingUser" element={<LoadingUser />} />
    </Route>
  </>,
)
