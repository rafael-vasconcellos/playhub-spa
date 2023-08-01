import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { API_KEY } from "../../config"

type Content = {
    id: number | null,
    title: string, // ou name
    genres: {name: string, id: number | string}[],
    adult: boolean,
    overview: string,
    vote_average: number | string,
    popularity: number | string,
    runtime: number,
    release_date: string,
    poster_path: string,
    backdrop_path: string,
    video: string,
    production_companies: {name: string}[]
}

type detailProps = {type: string | undefined, id: number | undefined}

const Details:React.FC<detailProps> = function( { type, id } ) { 
    const screen = {
        normal: {
            popup_bg: 'absolute -top-2 -left-14', 
            container: 'w-72', 
            banner: 'h-40 bg-y-center', 
            stats: '',
            more: 'hidden' 
        },

        full: {
            popup_bg: 'w-screen h-screen fixed top-0 left-0', 
            container: 'w-1/2', 
            banner: 'h-72', 
            stats: 'hidden',
            more: '' 
        }
    }

    const [ skeleton, setSkeleton ] = useState('text-zinc-500 bg-zinc-500 animate-pulse')

    const [ screen_status, setScreen ] = useState( screen.normal )
    const [ content, setContent ] = useState( {
          id: 0,
          title: '', // ou name
          genres: [{name: 'genre1', id: 0}, {name: 'genre2', id: 0}],
          adult: false,
          overview: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, placeat veniam quas dolor facilis soluta, consectetur magnam ut eos architecto similique eius porro amet possimus commodi rerum nesciunt facere eum.',
          vote_average: 7.814,
          popularity: 2947.91,
          runtime: 92,
          release_date: '2022',
          poster_path: '',
          backdrop_path: '',
          video: '',
          production_companies: [ {name: ''}, {name: ''} ]

          // tagline?
    } as Content )


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
        <div className={`${screen_status.popup_bg} details animate-scale z-10 bg-zinc-950/40 flex justify-center items-center cursor-default`}
         onClick={   () => setScreen( () => screen.normal )   }> {/* fundo preto */}
                <div className={`${screen_status.container} h-fit bg-zinc-800 rounded-b-2xl`} 
                 onClick={ (e) => e.stopPropagation() }> {/* container */}


                      <div className={`w-full ${screen_status.banner} ${skeleton} bg-zinc-500 bg-cover`} style={ {backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${content.poster_path})`} }></div> {/* banner */}
                      <div className="flex justify-between w-full px-2 py-3"> {/* botões */}
                            <div className="flex gap-2">
                                    <button className="p-2 rounded-full border-zinc-600 border-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                        </svg>
                                    </button>
                                    <button className="text-3xl px-2 pb-1 h- rounded-full border-zinc-600 border-2 font-bold">+</button>
                                    <button className="p-2 rounded-full border-zinc-600 border-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                        </svg>
                                    </button>
                            </div>
                            <button className="text-3xl px-2 pt-1 rounded-full border-zinc-600 border-2"
                            onClick={   () => {setScreen( () => screen.full )}   }>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-zinc-50">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                      </div> {/* botões */}


                      <div className="relative">
                          <div className="w-full px-3 py-4"> {/* primeira coluna */}
                                  <div>
                                      {content.id && <span className={`mr-2 font-bold p-1 ${content.adult? "bg-zinc-950" : "bg-sky-500"} text-zinc-100`}>PG-{content.adult? "18":"13"}</span> }
                                      <span className={skeleton}> {Math.floor(content.runtime/60)}h {content.runtime%60 !== 0? content.runtime%60 : '00'}min </span><br/>
                                  </div>

                                  <p className={`my-1 ${skeleton}`}>{content.release_date?.slice(0, 4)}</p>

                                  <ul className={`flex gap-2 my-2 flex-wrap ${screen_status.stats}`}>
                                          {content.genres.map(e => <li className={skeleton} key={e.id? e.id : Math.random()}> {e.name} </li>)}
                                  </ul>

                                  <div className={`py-2 ${skeleton}`}>Média: {content.vote_average}<br/>Popularidade: {content.popularity}</div>
                                  <p className={`${screen_status.more} py-2`}>{content.overview}</p>
                          </div>


                          {/* segunda coluna */}
                          <div className={`${screen_status.more} absolute top-0 right-0 w-1/2 px-2 py-8 flex flex-col gap-2`}>
                                  <div>
                                      Produção: {content.production_companies.map(e => {
                                          if (content.production_companies.indexOf(e) !== content.production_companies.length-1) { 
                                              return`${e.name}, `
                                          } else {
                                              return`${e.name}`
                                          }
                                      } ) }
                                  </div>
                                  <div>
                                      Gêneros: {content.genres.map(e => {
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
        {/* fundo preto */} </div>
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