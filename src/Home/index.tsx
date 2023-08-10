import Banner from '../components/Banner/index.tsx'
import Category from '../components/Category/index.tsx'
import Navbar from '../components/Navbar/index.tsx'
import genres from '../genres.ts'


function get_genres(type?: string) {
    if (type) {
        return genres[type].list.sort( () => Math.round(Math.random()) )
    } else {
        let list = [
            ...genres.filmes.list.sort( () => Math.round(Math.random()) ).slice(0, 9), 
            ...genres.series.list.sort( () => Math.round(Math.random()) ).slice(0, 9)
        ]
        list = list.sort(() => Math.round(Math.random()))
        return list

    }
}


const Home: React.FC<{type?: 'series' | 'filmes'}> = function( {type} ) { 
    const content = get_genres(type)

    return (
        <>
            <Navbar />
            {!type && <Banner />}
            <div className='h-8'></div>
            { content.map((e) => <Category categoryId={e.id} type={e.type} categoryName={e.name} key={`discover shows ${e.type} ${e.name}`} /> ) }
        </>
    )
}

export default Home