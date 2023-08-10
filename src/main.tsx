import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import Home from './Home'
import Production from './Production'
const queryClient = new QueryClient()




ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>

        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/series" element={<Home type='series' />} />
                <Route path="/filmes" element={<Home type='filmes' />} />
                <Route path="/filme/:production_name" element={<Production type='movie' />} />
                <Route path="/serie/:production_name" element={<Production type='tv' />} />
            </Routes>
        </QueryClientProvider>

    </BrowserRouter>
  </React.StrictMode>

)
