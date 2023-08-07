import { API_KEY } from "../config"

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
    videos: {results: []},
    images: {results: []},
    recommendations: {results: []},
    similar: {results: []},
    seasons: [],
    reviews: {results: []},
  
  }
  
  export async function fetchData(url: string, queryname?: string) { 
    return fetch(url, {headers: {"Authorization": API_KEY} } ).then(response => response.json())
    .then(res => { 
  
        if (res.results && queryname) { 
            let arr:any[] = []
            for (let indice of res.results) { 
                let title: string | undefined = indice?.title ?? indice?.name
                let original: string | undefined = indice?.original_title ?? indice?.original_name
                title = title?.toLocaleLowerCase().replaceAll(".", "").replaceAll(":", "").replaceAll('-', '')
                original = original?.toLocaleLowerCase().replaceAll(".", "").replaceAll(":", "").replaceAll('-', '')
                if (title?.toLowerCase() === queryname || original?.toLowerCase() === queryname) { 
                  arr.push(indice) 
                }
            }
  
            if (arr.length === 1 ) {return arr[0]} else {console.log(arr)}
  
  
        } else {
            return res
        }
  
    } )
  }