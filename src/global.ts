import { API_KEY } from "./config"
import { QueryClient } from "react-query"

export type IRouteInfo = { 
    name: string | undefined
    original_title: string | undefined
    id: number
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


type IProductionSchema = typeof ProductionDetailsSchema

type ITrendigs = {
    "genre_ids": number[],
    "original_language": string,
    "media_type": string,
    "vote_count": number
}

export type IProductionCompanies = {
    id: number
    name: string
    origin_country: string
    logo_path: string
}

export type IProductionDetails = IProductionSchema & ITrendigs & {
    credits: any
    production_companies: IProductionCompanies[]
}

/*
    type Content = { 
    genres: {name: string, id: number | string}[],
    runtime: number,
    production_companies: {name: string}[]

    id: number | null,
    title: string,
    name: string,
    original_title: string,
    original_name: string,
    adult: boolean,
    overview: string,
    vote_average: number | string,
    popularity: number | string,
    release_date: string,
    poster_path: string,
    backdrop_path: string,
    video: string,
}

*/






export const queryClient = new QueryClient()
export let routesInfo: IRouteInfo[] = []
export let staticRoutesInfo: IRouteInfo[] = []

export function get_routes(queryname: string) {
    const id1 = routesInfo.find(e => e.name === queryname || e.original_title === queryname)?.id
    const id2 = staticRoutesInfo.find(e => e.name === queryname || e.original_title === queryname)?.id
    return id1 ?? id2
}


export function strip(s: string | undefined) {
    return s?.toLowerCase().replaceAll(".", "").replaceAll(":", "").replaceAll(",", "").replaceAll('?', '').
    replaceAll('!', '').replaceAll('-', '')
}

async function fetchData(url: string) {
    return await fetch(url, {headers: {"Authorization": API_KEY} } ).then(response => response.json())
}

async function query(url: string, type: string) {
    return await fetchData(url)
    .then(res => { 
        if ( (res.results?.length ?? 0) > 0 ) {
            res.results.forEach( (indice:any) => {indice.type = type} )
            return (prevState: any) => [...prevState, ...res.results].sort( () => Math.round(Math.random()) )
        }

    } )
}


export async function routeSearch(type: string, queryname?: string) { 
    return await fetchData(`https://api.themoviedb.org/3/search/${type}?query=${queryname}&include_adult=true&language=pt-BR&page=1`)
    .then(res => { 
  
        if ((res.results?.length ?? 0) > 0 && queryname) { 
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
  
  
        }
  
    } )
}








export async function search(
        queryname: string | number, 
        type: string, 
        page: number
    ) {

    return await query(`https://api.themoviedb.org/3/search/${type}?query=${queryname}&include_adult=true&language=pt-BR&page=${page}`, type)
}

export async function search_genre(
        value: string | number, 
        type: string, 
        page: number
    ) { 

    return await query(`https://api.themoviedb.org/3/discover/${type}?include_adult=true&include_video=false&language=pt-BR&page=${page}&sort_by=popularity.desc&with_genres=${value}`, type)
}

export async function discover(categoryId: number, type: string) { 
    return await fetchData(`https://api.themoviedb.org/3/discover/${type}?include_adult=true&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=${categoryId}`).then(res => res?.results)
}

export async function get_images(id: number) {
    return await fetchData(`https://api.themoviedb.org/3/movie/${id}/images`)
}

export async function get_season(id: number, season_number: number) { 
    return await fetchData(`https://api.themoviedb.org/3/tv/${id}/season/${season_number}?language=pt-BR`)
}

export async function trending() {
    return await fetchData(`https://api.themoviedb.org/3/trending/all/day?language=pt-BR`)
}

export async function production_details(id: number | undefined, type: string | undefined, append?: string | undefined) { 
    append = append ?? ''
    return await fetchData(`https://api.themoviedb.org/3/${type}/${id}?language=pt-BR`+append)
}