import React from 'react'
import ReactDOM from 'react-dom/client'
import { filmes, series } from './genres.tsx'
import Profile from './components/Profile'
import Banner from './components/Banner'
import Category from './components/Category'
import Search from './components/Search/index.tsx'


type genre = {
    id: number,
    name: string,
    type: 'movie' | 'tv'
}

let n = filmes.list.sort(() => Math.round(Math.random())).slice(0, 9)
n = [...n, ...series.list.sort(() => Math.round(Math.random())).slice(0, 9)]
n = n.sort(() => Math.round(Math.random()))


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>

    <Search />
    <Profile href={'/src/assets/profile.jpg'} />
    <Banner />
    { n.map((e: genre) => <Category id={e.id} name={e.name} type={e.type} key={`${e.type} ${e.name}`} /> ) }

  </React.StrictMode>,
)
