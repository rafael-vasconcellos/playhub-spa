import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import Home from './Home'
const queryClient = new QueryClient()




ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>

        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </QueryClientProvider>

    </BrowserRouter>
  </React.StrictMode>

)
