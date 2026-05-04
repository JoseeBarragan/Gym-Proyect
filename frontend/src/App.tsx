import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './auth/AuthProvider'
import { AppRouter } from './router/AppRouter'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <AppRouter />
          <ToastContainer/>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
