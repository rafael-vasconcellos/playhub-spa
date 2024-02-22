import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { route_search, production_details, trending } from "../global"
import { IProductionDetails, ProductionDetailsSchema } from "../global"
import './style.css'
import Category from "../components/Category"
import Aside from "../components/Aside"
import Seasons from "../components/Seasons"
import Reviews from "../components/Reviews"
import Medias from "../components/Medias"
import Staff from "../components/Staff"
import Navbar from "../components/Navbar"
import { ProductionCard } from "./utils"
import { Show } from "../components/utils"



const Production: React.FC<{type: string}> = function( {type} ) { 
    const { production_name } = useParams()
    const [ data, setData ] = useState(ProductionDetailsSchema as IProductionDetails)

    const { data: query_id } = useQuery('query '+production_name, async() => { 
            const splited_name = production_name?.split('-')
            const params_id = splited_name?
                Number( splited_name[splited_name.length-1] )
                : undefined

            async function get_id() { 
                const queryname = typeof production_name === 'string'? 
                    production_name?.replace(
                        params_id? `${params_id}` : '', 
                        ''
                    ).replaceAll('-', ' ') : undefined
        
                if (!params_id && queryname) { return await route_search(type, queryname).then(res => res.id) } 
                else { return params_id }
            }

            const production_id = await get_id()
            return production_id

    }, {staleTime: Infinity} )


    const { refetch } = useQuery(production_name+' page', async() => { 
      if (query_id) { 
        const append = "&append_to_response=videos%2Cimages%2Crecommendations%2Csimilar%2Creviews%2Cseasons%2Ccredits"
        const response = await production_details(query_id, type, append)
        console.log(response)
        setData(response)
      }

    }, {staleTime: Infinity, } )


    const { data: trendings } = useQuery('get trendings', async() => {
      return await trending().then(res => res.results)

    }, { staleTime: 1000*600 /* 10min */ }
  )

  

    useEffect(() => { refetch() }, [query_id] )
    useEffect(() => {
        let el = document.querySelector('title')
        if (el) {el.innerText = data?.title ?? data?.name}
    }, [data])


    return (
        <>
            <Navbar />
            <Show when={data?.id !== undefined && data.id !== 0 && data?.id === query_id} fallback={<ProductionCard data={null} />}>
                <ProductionCard data={data} />
            </Show>

            <div className="relative">
                { trendings?.length > 0 && <Aside name={'Trending'} content={trendings?.slice(0, 7)} /> }
                <section className="w-4/5">
                    {data.seasons?.length > 0 && query_id === data.id && 
                        <Seasons seasons={data.seasons} id={data.id} /> }

                    <Show when={data?.credits && query_id === data.id} fallback={<Staff />}>
                        <Staff staff={data.credits} production_companies={data.production_companies} />
                    </Show>

                    {data.videos?.results?.length > 0 && query_id === data.id && 
                        <Medias id={data.id} videos={data.videos.results} /> }

                    <Show when={ (query_id === data.id) && query_id }  
                    fallback={
                        <>
                            <Category categoryName="Placeholder" categoryId={null} />
                            <Category categoryName="Placeholder" categoryId={null} />
                        </>
                    }>
                        { data.recommendations?.results?.length > 0 && <Category content={data.recommendations.results} categoryName="Recomendações" categoryId={data.id} /> }
                        { data.similar?.results?.length > 0 && <Category content={data.similar.results} categoryName="Similares" categoryId={data.id} type={type} /> }
                    </Show>

                    { data.reviews && query_id === data.id && <Reviews obj={data.reviews} /> }
                </section>
            </div>
        </>
    )

}

export default Production


// c.indicativa, 
// ano, duração, nomes alternativos, generos, status | score, total de votos, popularidade
// temporadas, recomendados, trending | mídia | reviews, sua avaliação, sua coleção, imdb id
// Account States: Get the rating, watchlist and favourite status.

// detalhes: Empresas de produção+staff, Elenco, Lançamentos, Países de origem
// Também conhecido como, Locações de filme, Data de lançamento, Idiomas, Centrais de atendimento oficiais (redes sociais)
// crítica, awards, bilheteria




/*



100088
502356
super-mario-bros-o-filme
videos.results[0].key

backdrop_path: https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg
antigo: poster_path

*/
