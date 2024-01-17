import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { get_images } from "../../global"
import { IVideo, IImage } from "../Media/IMedia"
import Media from "../Media"
import { display } from "../utils"
import './style.css'



type IImages = {
    backdrop: IImage[],
    poster: IImage[],
    logos: IImage[],
    [key: string]: IImage[]
}

type MediasProps = {
    videos?: IVideo[],
    images?: IImages,
    id: number
}

const Medias: React.FC<MediasProps> = function( {videos, id} ) { 
    const glossary: {
        backdrops: string
        logos: string
        posters: string
        [key: string]: string
    } = {
        backdrops: 'Plano de fundo',
        logos: 'Logos',
        posters: 'Posters'
    }

    const [ imagesData, setImages ] = useState<IImages>( {} as IImages )

    useQuery(`get images from ${id}`, async() => { 
        return get_images(id).then(res => { console.log(res)
            if (res?.success) { setImages(res) } 
        } )
    }, {staleTime: Infinity} )

    useEffect( () => { 
        document.querySelector('.tabcontent')?.children[0]?.classList.remove('hidden')
        document.querySelector('.tabmedias')?.children[0]?.classList.add('selected')
    }, [] )


    return (
        <section className="medias bg-zinc-800 my-8 mx-2 rounded-xl">

            <div className="tabmedias flex gap-2 p-3">
                { videos && 
                    <button className="cursor-pointer p-3 rounded-full" onClick={(e:any) => { 
                        display(e.target, 'tabmedias', 'selected')  
                        display('contentvideos', 'tabcontent', 'hidden')
                    } }>
                        Videos <span className="text-zinc-400 italic" onClick={ e=>e.stopPropagation() }>{videos?.length}</span>
                    </button>
                }

                { Object.keys(imagesData).map(e => { if (e !== "id") { return (
                    <button className="cursor-pointer p-3 rounded-full" key={'tab'+e} onClick={ (event:any) => { 
                        display(event.target, 'tabmedias', 'selected')  
                        display('content'+e, 'tabcontent', 'hidden')
                    } }>
                        {glossary[e]} <span className="text-zinc-400 italic" onClick={ e=>e.stopPropagation() }>{imagesData[e]?.length}</span>
                    </button> 
                ) } } ) }
            </div>


            <div className="tabcontent">
                { videos && <div className="hidden contentvideos"><Media medias={videos} /></div> }
                { Object.keys(imagesData).map( e => { 
                    if (typeof imagesData[e] !== "number") { 
                        return <div className={`hidden content${e}`} key={'content'+e}><Media medias={imagesData[e]} imageType={e} /></div>
                    } 
                } ) }
            </div>

        </section>
    )
}

export default Medias

// https://api.themoviedb.org/3/movie/502356/images