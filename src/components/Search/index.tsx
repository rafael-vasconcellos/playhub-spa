import { useState, useEffect } from 'react'
import './style.css'
import genres from '../../genres.ts'
import Item from '../Item/index.tsx'
import { search, search_discovery } from '../../global.ts'

export default function Search() {
    let page = 1
    const [ contents, setContents ] = useState([] as any[])
    const [ loading, setLoading ] = useState(false)

    async function get_content(e:any) { 
        const section:any = document.querySelector('section:has(.results)')
        section.onscrollend = () => { if ( section.children[1].value !== '' && page ) { 
            console.log(page)
            get_content( {target: section.children[1]} )
        } }


        if (e.target.value === '') { return false }
        else { setLoading(true) }
        let query: [number | undefined, string][] = []
        query.push( [ genres.filmes.list.find(indice => indice.name.includes(e.target.value))?.id, 'movie' ] )
        query.push( [ genres.series.list.find(indice => indice.name.includes(e.target.value))?.id, 'tv' ] )

        let responses: Promise<any>[] = []
        for (let indice of query) {
            if (indice[0]) {
                responses.push( 
                    search_discovery(indice[0], indice[1], page).then(res => {
                        if (res) {setContents(res)}
                    } )
                )
            }

            responses.push( 
                search(e.target.value, indice[1], page).then(res => {
                    if (res) {setContents(res)}
                } )
            )
        }

        Promise.all(responses).then( res => { 
            setLoading(false)
            if ( res[0]?.page === res[0]?.total_pages && res[1]?.page === res[1]?.total_pages ) {
                let section:any = document.querySelector('section > .results')
                section.onscrollend = undefined
                page = 0
                console.log('Search done')

            } else { page++ }

        } )
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
