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





