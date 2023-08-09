import { strip } from "../components/utils"
import { API_KEY } from "../config"


export type IProductionCompanies = {
    id: number
    name: string
    origin_country: string
    logo_path: string
}

export const ProductionDetailsSchema = { 
    id: 0,
    title: '',
    name: '',
    original_title: '',
    original_name: '',
    vote_average: 0,
    vote_count: 0,
    popularity: 1000,
    runtime: 0,
    release_date: '',
    status: '',
    tagline: '',
    genres: [],
    adult: null,
    overview: '',
    poster_path: '',
    backdrop_path: '',
    seasons: [],
    videos: {results: []},
    images: {results: []},
    recommendations: {results: []},
    similar: {results: []},
    reviews: {results: []},
    credits: undefined
  
}

type SchemaInterface = typeof ProductionDetailsSchema

export interface IProductionDetails extends SchemaInterface {
    credits: any
    production_companies: IProductionCompanies[]
}


export async function fetchData(url: string, queryname?: string) { 
    return fetch(url, {headers: {"Authorization": API_KEY} } ).then(response => response.json())
    .then(res => { 
  
        if (res.results && queryname) { 
            let arr:any[] = []
            for (let indice of res.results) { 
                let title: string | undefined = indice?.title ?? indice?.name
                let original: string | undefined = indice?.original_title ?? indice?.original_name
                title = strip(title)
                original = strip(original)
                if ( title === queryname || original === queryname ) { 
                  arr.push(indice)
                }
            }
  
            if (arr.length > 0 ) {return arr[0]} else {console.log(arr)}
  
  
        } else {
            return res
        }
  
    } )
}


