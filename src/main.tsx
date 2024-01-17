import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './global'
import Home from './Home'
import Production from './Production'




ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>

        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/series" element={<Home type='tv' />} />
                <Route path="/filmes" element={<Home type='movie' />} />
                <Route path="/filme/:production_name" element={<Production type='movie' />} />
                <Route path="/serie/:production_name" element={<Production type='tv' />} />
            </Routes>
        </QueryClientProvider>

    </BrowserRouter>
  </React.StrictMode>

)
