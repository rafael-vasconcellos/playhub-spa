import { filmes, series } from './genres.tsx'
import Banner from './components/Banner/index.tsx'
import Category from './components/Category/index.tsx'
import Search from './components/Search/index.tsx'


type genre = {
    id: number,
    name: string,
    type: 'movie' | 'tv'
}

let n = filmes.list.sort(() => Math.round(Math.random())).slice(0, 9)
n = [...n, ...series.list.sort(() => Math.round(Math.random())).slice(0, 9)]
n = n.sort(() => Math.round(Math.random()))

export default function Home() {

    return (
        <>
            <Search />
            <Banner />
            { n.map((e: genre) => <Category id={e.id} type={e.type} name={e.name} key={`discover shows ${e.type} ${e.name}`} /> ) }
        </>
    )
}