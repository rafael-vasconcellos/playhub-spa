import { useState, useEffect } from 'react'
import { search, search_genre } from '../../global'
import genres from '../../genres'
import Item from '../Item'
import './style.css'


export default function Search() {
    let page = 1
    const [ contents, setContents ] = useState([] as any[])
    const [ loading, setLoading ] = useState(false)


    function get_content(e:any) { 
        if (e.target.value === '') { return false }
        else { setLoading(true) }


        const filmes = genres.movie.list.filter(indice => indice.name.toLowerCase().includes(e.target.value))
        const series = genres.tv.list.filter(indice => indice.name.toLowerCase().includes(e.target.value))

        filmes.forEach(async i => { 
            const response = await search_genre(i.id, i.type, 1)
            if (response?.length > 0) { setContents(prevState => [...prevState, response]) }
        } )

        series.forEach(async i => { 
            const response = await search_genre(i.id, i.type, 1)
            if (response?.length > 0) { setContents(prevState => [...prevState, response]) }
        } )


        if (filmes.length === 0 && series.length === 0) {
            search(e.target.value, 'tv', page).then(res => handler(res) )
            search(e.target.value, 'movie', page).then(res => handler(res) )
        }


    }

    function handler(res: any) { 

        const section: any = document.querySelector('section:has(.results)')
        if ( res?.page === res?.total_pages ) {
            section.onscrollend = undefined
            page = 0
            console.log('Search done')

        } /*else { 
            page = res?.page + 1
            section.onscrollend = () => { if ( section.children[1].value !== '' && page ) { 
                get_content( {target: section.children[1]} )
                console.log("page: "+page)
            } }

        }*/

        setContents(  prevState => [...prevState, ...res?.results].sort(() => { 
            return Math.round(Math.random()) > 0? -1 : 0
        } )  )

        setLoading(false)
    }


    useEffect( () => { 
        let search:any = document.querySelector('#search')
        search.onsearch = (e:any) => { 
            setContents( () => [] ) ; page = 1
            get_content(e)
        }

        return () => { search = undefined }

    }, [] )


    return (
        <section className="w-full bg-zinc-950">
                <input type="search" className='bg-zinc-800' id="search" placeholder='Digite sua pesquisa...' />
                <div className='results flex flex-wrap justify-center items-start px-10 bg-zinc-950'>
                    {contents.map(e => <Item title={e.title ?? e.name} pic={e.backdrop_path ?? e.poster_path} id={e.id} type={e.type} key={contents.indexOf(e)} />)}
                </div>

                { loading && 
                    <div className={`flex justify-center`}>
                        <svg className={`m-auto`} shapeRendering="auto" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                        width="400px" height="400px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <path d="M45 50A5 5 0 0 0 55 50A5 5.5 0 0 1 45 50" fill="#ffffff" stroke="none">
                            <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50.25;360 50 50.25"></animateTransform>
                            </path>
                        </svg>
                    </div>
                }
        </section>
    )
}




// https://api.themoviedb.org/3/search/${type}?query=${e.target.value}&include_adult=true&language=pt-BR&page=1
