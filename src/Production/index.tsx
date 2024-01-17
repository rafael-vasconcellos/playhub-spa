import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { routeSearch, get_routes, production_details, trending } from "../global"
import { IProductionDetails, ProductionDetailsSchema } from "../global"
import './style.css'
import Category from "../components/Category"
import Aside from "../components/Aside"
import Score from "../components/Score"
import Seasons from "../components/Seasons"
import Reviews from "../components/Reviews"
import Medias from "../components/Medias"
import EmbeddedVideo, { ButtonVideo, findVideoKey } from "../components/EmbeddedVideo"
import Staff from "../components/Staff"
import Navbar from "../components/Navbar"



const Production: React.FC<{type: string}> = function( {type} ) { 
    const { production_name } = useParams()
    const [ data, setData ] = useState(ProductionDetailsSchema as IProductionDetails)

    const { data: query } = useQuery('query '+production_name, async() => { 

        const queryname = production_name?.replaceAll('-', ' ')
        if ( !queryname ) { return null }
        const id = get_routes(queryname)
        if (id) { return id }

        const response = await routeSearch(type, queryname)
        if ( response ) { return response.id }
        else { return false }

    }, {staleTime: Infinity} )


    const { refetch } = useQuery(production_name+' page', async() => { 
      if (query) { 
        const append = "&append_to_response=videos%2Cimages%2Crecommendations%2Csimilar%2Creviews%2Cseasons%2Ccredits"
        const response = await production_details(query, type, append)
        setData(response)
      }

    }, {staleTime: 1000 * 600, enabled: true} )


    const { data: trendings } = useQuery('get trendings', async() => {
      return await trending().then(res => res.results)

    }, { staleTime: 1000*600 /* 10min */ }
  )

  

    useEffect(() => { refetch();console.log(query) }, [query] )
    useEffect(() => {
        let el = document.querySelector('title')
        if (el) {el.innerText = data?.title ?? data?.name}
    }, [data])


    return (
        <>
          <Navbar />
          { data?.id !== undefined && data.id !== 0 && 
              <div className="w-screen h-fit mb-6 bg-center" style={ {backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${data.backdrop_path})`} }>
                <div className="bg-zinc-950/[0.6] w-full h-full relative">
                  <div className="px-10 py-7 flex gap-4 relative">

                      {/* score */}
                      <Score data={data} />
                      {/* poster */}
                      <div className="bg-zinc-500 bg-contain bg-center" style={ {width: '150px', height: '225px', backgroundImage: `url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path})`} } />

                      <div className="w-3/5 flex flex-col gap-3">
                          <h1 className="font-bold text-2xl py-3">{data.title ?? data.name}</h1>
                          <h2><b>{data.original_title? `Título original:` : ''}</b> {data.original_title}</h2>

                          <div className="flex items-center gap-1 mb-3"> {/* classificação e etc. */}
                              <span className={`p-2 ${data.adult? "bg-zinc-950":"bg-sky-500"}`}>
                                {data.adult? '18':'13'}
                              </span>
                              <p>{data.release_date?.slice(0, 4)}</p>
                              <p className="text-zinc-300 italic">
                                {!Number.isNaN(Math.floor(data.runtime / 60))? ' - '+Math.floor(data.runtime/60)+'h' : ''} 
                                {!Number.isNaN(data.runtime % 60)? data.runtime%60+'min' : ''}
                              </p>
                          </div>

                          { findVideoKey(data?.videos?.results) && data.id === query && <ButtonVideo />}

                          <div>
                              <h1 className="font-bold text-xl my-2">Sinopse</h1>
                              <p>{data.overview}</p>
                          </div>
                          <p className="text-zinc-300 italic">{data.tagline}</p>
                          <div className="flex flex-col gap-2 my-3">
                              <p><b>Generos:</b> {data.genres?.map( (e:{name: string, id: number}) => <span className="p-1 m-1" style={ {border: '1px solid white'} } key={`gen-${e.name}`}>{e.name}</span>  )}</p>
                              <p><b>Status:</b> {data.status}</p>
                          </div>
                      </div>

                  </div>


                  { data?.videos?.results?.length > 0 && data.id === query && (
                      <EmbeddedVideo videos={data.videos.results} />
                  ) }

                </div>
              </div>
          }

          <div className="relative">
              {trendings?.length > 0 && <Aside name={'Trending'} content={trendings?.slice(0, 7)} />}
              <section className="w-4/5">
                  {data.seasons?.length > 0 && query === data.id && 
                      <Seasons seasons={data.seasons} id={data.id} /> }

                  {data?.credits && query === data.id && <Staff staff={data.credits} production_companies={data.production_companies} />}
                  
                  {data.videos?.results?.length > 0 && query === data.id && 
                      <Medias id={data.id} videos={data.videos.results} /> }

                  {data.recommendations?.results?.length > 0 && query === data.id && 
                      <Category content={data.recommendations.results} categoryName="Recomendações" categoryId={data.id} /> }

                  {data.similar?.results?.length > 0 && query === data.id && 
                      <Category content={data.similar.results} categoryName="Similares" categoryId={data.id} type={type} /> }

                  { data.reviews && query === data.id && <Reviews obj={data.reviews} /> }
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