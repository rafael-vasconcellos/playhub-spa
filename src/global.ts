import { API_KEY } from "./config"

export type IRouteInfo = { 
    name: string | undefined
    original_title: string | undefined
    id: number
}

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
    return fetchData(url)
    .then(res => { 
        if ( (res.results?.length ?? 0) > 0 ) {
            res.results.forEach( (indice:any) => {indice.type = type} )
            return (prevState: any) => [...prevState, ...res.results].sort( () => Math.round(Math.random()) )
        }

    } )
}




export async function filterData(type: string, queryname?: string) { 
    return fetchData(`https://api.themoviedb.org/3/search/${type}?query=${queryname}&include_adult=true&language=pt-BR&page=1`)
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

export async function search(value: string | number, type: string, page: number) {
    return query(`https://api.themoviedb.org/3/search/${type}?query=${value}&include_adult=true&language=pt-BR&page=${page}`, type)
}

export async function search_discovery(value: string | number, type: string, page: number) {
    return query(`https://api.themoviedb.org/3/discover/${type}?include_adult=true&include_video=false&language=pt-BR&page=${page}&sort_by=popularity.desc&with_genres=${value}`, type)
}

export async function discover(categoryId: number, type: string) { 
    return fetchData(`https://api.themoviedb.org/3/discover/${type}?include_adult=true&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&with_genres=${categoryId}`)
}

export async function get_images(id: number) {
    return fetchData(`https://api.themoviedb.org/3/movie/${id}/images`)
}

export async function get_season(id: number, season_number: number) { 
    return fetchData(`https://api.themoviedb.org/3/tv/${id}/season/${season_number}?language=pt-BR`)
}

export async function trending() {
    return fetchData(`https://api.themoviedb.org/3/trending/all/day?language=pt-BR`)
}

export async function production_details(id: number | undefined, type: string | undefined, append?: string | undefined) { 
    append = append ?? ''
    return fetchData(`https://api.themoviedb.org/3/${type}/${id}?language=pt-BR`+append)
}