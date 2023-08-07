import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { API_KEY } from "../../config"
import './style.css'
import { ContentSchema, DetailsButtons, screen } from "./utils"



type detailProps = {type: string | undefined, id: number | undefined}

const Details:React.FC<detailProps> = function( { type, id } ) { 
    const [ skeleton, setSkeleton ] = useState('text-zinc-500 bg-zinc-500 animate-pulse')
    const [ screen_status, setScreen ] = useState( screen.normal )
    const [ content, setContent ] = useState( ContentSchema )

    const { refetch } = useQuery(`${id} content details`, async() => {
              // &append_to_response=videos
              //await new Promise( resolve => setTimeout(resolve, 3000) )
              return fetch(`https://api.themoviedb.org/3/${type}/${id}?language=pt-BR`, {
                  headers: { "Authorization": API_KEY }
              } ).then(res => res.json()).then(res => { 
                  setSkeleton('')
                  setContent(res)
                  return res
              } )

        }, { staleTime: 1000*180 /* 3min */, enabled: !content.id }
    )


    useEffect( () => {
        if (!content.id) {
            refetch()
        }

    }, [content.id])


    return (
        <section className={`${screen_status.popup_bg} details animate-scale z-10 bg-zinc-950/40 flex justify-center items-center cursor-default`}
         onClick={   () => setScreen( () => screen.normal )   }> {/* fundo preto */}
                <div className={`bg-zinc-800 ${screen_status.container} mb-10 rounded-b-2xl`} 
                 onClick={ (e) => e.stopPropagation() }> {/* container */}


                      {/* banner */}
                      <div className={`${screen_status.banner} ${skeleton} bg-zinc-500 bg-cover w-full`} style={ {backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${content.backdrop_path})`} } />
                      <DetailsButtons type={type} content={content} setScreen={setScreen} />


                      <div className="relative">
                          <div className="w-full px-3 py-4"> {/* primeira coluna */}
                                  <div>
                                      {content.id && <span className={`mr-2 font-bold p-1 ${content.adult? "bg-zinc-950" : "bg-sky-500"} text-zinc-100`}>PG-{content.adult? "18":"13"}</span> }
                                      <span className={skeleton}> 
                                        { !Number.isNaN(Math.floor(content.runtime / 60))? Math.floor(content.runtime/60)+'h' : '' } 
                                        {(  content.runtime%60 !== 0 && !Number.isNaN(content.runtime % 60)  )? 
                                            content.runtime%60+'min' : ''}
                                      </span><br/>
                                  </div>

                                  <p className={`my-1 ${skeleton}`}>{content.release_date?.slice(0, 4)}</p>

                                  <ul className={`flex gap-2 my-2 flex-wrap ${screen_status.stats}`}>
                                          {content?.genres?.map(e => <li className={skeleton} key={e.id? e.id : Math.random()}> {e.name} </li>)}
                                  </ul>

                                  <div className={`py-2 ${skeleton}`}>Média: {content.vote_average}<br/>Popularidade: {content.popularity}</div>
                                  <p className={`${screen_status.more} py-2`}>{content.overview}</p>
                          </div>


                          {/* segunda coluna */}
                          <div className={`${screen_status.more} absolute top-0 right-0 w-1/2 px-2 py-8 flex flex-col gap-2`}>
                                  <div>
                                      Produção: {content?.production_companies?.map(e => {
                                          if (content.production_companies.indexOf(e) !== content.production_companies.length-1) { 
                                              return`${e.name}, `
                                          } else {
                                              return`${e.name}`
                                          }
                                      } ) }
                                  </div>
                                  <div>
                                      Gêneros: {content?.genres?.map(e => {
                                          if (content.genres.indexOf(e) !== content.genres.length-1) { 
                                              return`${e.name}, `
                                          } else {
                                              return e.name
                                          }
                                      } ) }
                                  </div>
                          </div>
                      </div>

                </div> {/* /container */}
        {/* fundo preto */} </section>
    )
}

export default Details




/*

videos.results[0].key

{
  "adult": false,
  "backdrop_path": "/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
  "belongs_to_collection": null,
  "budget": 100000000,
  "genres": [
    {
      "id": 16,
      "name": "Animação"
    },
    {
      "id": 10751,
      "name": "Família"
    },
    {
      "id": 12,
      "name": "Aventura"
    },
    {
      "id": 14,
      "name": "Fantasia"
    },
    {
      "id": 35,
      "name": "Comédia"
    }
  ],
  "homepage": "https://cuevana3.it/pelicula/the-super-mario-bros-movie-2023/",
  "id": 502356,
  "imdb_id": "tt6718170",
  "original_language": "en",
  "original_title": "The Super Mario Bros. Movie",
  "overview": "Os irmãos Mario e Luigi, de ascendência italiana, vivem em Brooklyn (Nova Iorque), onde trabalham como canalizadores. Certo dia, durante um serviço de reparação de uma conduta de água, são sugados por um tubo e transportados para o Reino Cogumelo, um universo paralelo governado pela Princesa Peach. Sem saber do paradeiro do irmão, Mario vai ter de aprender a sobreviver naquele lugar, adquirindo capacidades bizarras mas que serão grandes mais-valias para destruir os planos de Bowser, um verdadeiro vilão que tenciona dominar o mundo.",
  "popularity": 2947.91,
  "poster_path": "/ktU3MIeZtuEVRlMftgp0HMX2WR7.jpg",
  "production_companies": [
    {
      "id": 33,
      "logo_path": "/8lvHyhjr8oUKOOy2dKXoALWKdp0.png",
      "name": "Universal Pictures",
      "origin_country": "US"
    },
    {
      "id": 6704,
      "logo_path": "/fOG2oY4m1YuYTQh4bMqqZkmgOAI.png",
      "name": "Illumination",
      "origin_country": "US"
    },
    {
      "id": 12288,
      "logo_path": "/e4dQAqZD374H5EuM0W1ljEBWTKy.png",
      "name": "Nintendo",
      "origin_country": "JP"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "JP",
      "name": "Japan"
    },
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "2023-04-05",
  "revenue": 1308766975,
  "runtime": 92,
  "spoken_languages": [
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Released",
  "tagline": "Vamos lá!",
  "title": "Super Mario Bros.: O Filme",
  "video": false,
  "vote_average": 7.814,
  "vote_count": 4507
}

*/