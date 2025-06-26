import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './routes.tsx'
import { AppState, Auth0Provider } from '@auth0/auth0-react'

const router = createBrowserRouter(routes)
const queryClient = new QueryClient()

function onRedirectCallback(appState: AppState | undefined) {
  if (appState?.returnTo) {
    router.navigate(appState.returnTo)
  } else {
    router.navigate('/')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="lane-piwakawaka-25.au.auth0.com"
      clientId="lQLGSDiPQpPueDqz6rw8qT50nrQ7H7uf"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://SkillShare/api',
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Auth0Provider>,
  )
})
