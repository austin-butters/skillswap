import { createRoutesFromElements, Route } from 'react-router-dom'
import {
  App,
  MessageBox,
  Connect,
  CodeFixer,
  Profile,
  Inbox,
  Login,
  Home,
  LoadingUser,
  QuestionPage,
} from '#components'
import CreateMeeting from '#components/CreateMeeting'
import YourMeetings from '#components/YourMeetings'

export default createRoutesFromElements(
  <>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/questions/" element={<Home />} />
      <Route path="/questions/:id" element={<QuestionPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/message/:id" element={<MessageBox />} />
      <Route path="/connect" element={<Connect />} />
      <Route path="/codeFixer" element={<CodeFixer />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/loadingUser" element={<LoadingUser />} />
      <Route path="/meeting/create" element={<CreateMeeting />} />
      <Route path="/yourMeetings" element={<YourMeetings />} />
    </Route>
  </>,
)
