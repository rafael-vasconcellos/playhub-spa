import { useEffect } from "react"
import { Link } from "react-router-dom"
import { routesInfo, strip } from "../../global"
import { path } from "../utils"

export const ContentSchema = { 
    id: 0,
    title: '',
    name: '',
    original_title: '',
    original_name: '',
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
}

export type Content = typeof ContentSchema


export const screen = { 
    normal: {
        popup_bg: 'absolute -top-2 -left-14', 
        container: 'w-72', 
        banner: 'h-40 bg-y-center', 
        stats: '',
        more: 'hidden' 
    },

    full: {
        popup_bg: 'w-screen h-full fixed top-0 left-0', 
        container: 'w-1/2', 
        banner: 'h-72', 
        stats: 'hidden',
        more: '' 
    }
}




export const DetailsButtons: React.FC<{type: string | undefined, content: Content, setScreen: any}> = function( {type, content, setScreen} ) {

    useEffect( () => { 
        const obj = {
            name: strip(content?.title) ?? strip(content?.name),
            original_title: strip(content?.original_title) ?? strip(content?.original_name),
            id: content.id
        }
        const { name, original_title, id } = obj
        if ( name && original_title && id && !routesInfo.includes(obj) ) { 
            routesInfo.length = 0
            routesInfo.push(obj)
        }

    }, [content] )

    return (
        <>
            {/* botões */}
            <div className="flex justify-between w-full px-2 py-3"> 
                    <div className="flex gap-2">
                            <Link to={ path(type, content.title ?? content.name, content.original_title ?? content.original_name) }>
                                <button className="p-2 rounded-full border-zinc-600 border-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                    </svg>
                                </button>
                            </Link>
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
        </>
    )
}




/*

type Content = {
    id: number | null,
    title: string,
    name: string,
    original_title: string,
    original_name: string,
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

*/