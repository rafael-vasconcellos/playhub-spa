import { QueryClient } from "react-query"
export const queryClient = new QueryClient()
const API_URL = '' // https://playhub-six.vercel.app  (CORS)


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
    genres: [{name: 'genre1', id: 0}, {name: 'genre2', id: 0}],
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

export type IDetailsResumed = {
    "id": number
    "original_language": string
    "original_title": string
    "overview": string
    "popularity": number
    "poster_path": string
    "release_date": string
    "title": string
    "video": boolean
    "vote_average": number
    "vote_count": number

    "adult": boolean
    "backdrop_path": string
    "genre_ids": number[]

    name: string
    original_name: string
    media_type: string
}

export type IDiscover = {
    page: number
    total_pages: number
    total_results: number
    results: IDetailsResumed[]
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


export function prodTypeValidate(type: string | undefined) {
    if (type === 'tv' || type === 'movie') { return type } 
    else { return false }
}

export function strip(s: string | undefined) { 
    return s?.toLowerCase().replaceAll(".", "").replaceAll(":", "").replaceAll(",", "").replaceAll('?', '').
    replaceAll('!', '').replaceAll('-', '')
}

async function fetchData(url: string) {
    return await fetch(url).then( response => { 
        if (response.status === 200) { return response.json() }
        else { return {} as {[key: string]: any} }
    } ).catch( () => null )
}

// /api/production/images
export async function get_images(id: number) {
    return await fetchData(API_URL+`/api/production/images?id=${id}`)
}

// /api/production/season
export async function get_season(id: number, season_number: number) { 
    return await fetchData(API_URL+`/api/production/season?id=${id}&season=${season_number}`)
}

// /api/production/details
export async function production_details(
    id: number | undefined, 
    type: string | undefined, 
    extend?: boolean | string
    ) { 

    extend = extend? "&extend=true" : ''
    return await fetchData(API_URL+`/api/production/details?type=${type}&id=${id}`+extend)
}

// 10min
// /api/discover
export async function discover(genreId: number, type: string) { 
    return await fetchData(API_URL+`/api/discover?type=${type}&genreid=${genreId}`)
}

// 10min
// /api/trending
export async function trending() {
    return await fetchData(API_URL+`/api/trending`)
}






















// /api/search
export async function search(
        queryname: string | number, 
        type: string, 
        page: number
    ) {

    return await fetchData(API_URL+`/api/search?type=${type}&q=${queryname}&page${page ?? 1}`)
}

// 10min
export async function search_genre(
        genreId: number, 
        type: string, 
        page: number
    ) { 

    return await fetchData(API_URL+`/api/search?type=${type}&q=${genreId}&page=${page ?? 1}`)
}

export async function route_search(type: string, queryname: string) {
    return await fetchData(API_URL+`/api/search?type=${type}&q=${queryname}&page=0`)
}