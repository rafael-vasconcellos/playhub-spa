import { useState, useEffect } from 'react'
import config from '../../config.json'
import Details from '../Details'

type itemProps = {
    title?: string,
    pic?: string,
    id?: number | undefined,
    type?: string,
    key?: any,
}

const Item: React.FC<itemProps> = function( { title, pic, id, type } ) {
    const [ hover, setHover ] = useState(false)
    const [ content, setContent ] = useState( {
        id: null,
        title: '', // ou name
        genres: [{name: 'genre1'}, {name: 'genre2'}],
        adult: false,
        overview: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, placeat veniam quas dolor facilis soluta, consectetur magnam ut eos architecto similique eius porro amet possimus commodi rerum nesciunt facere eum.',
        vote_average: 7.814,
        popularity: 2947.91,
        runtime: 92,
        release_date: '2022',
        poster_path: '',
        backdrop_path: '',
        video: '',
        production_companies: []

        // tagline?
    } )

    function get_content() { return new Promise( resolve => {
        if (!content.id) {
            let xml = new XMLHttpRequest()
            xml.open('GET', `https://api.themoviedb.org/3/${type}/${id}?language=pt-BR`)
            // &append_to_response=videos
            xml.setRequestHeader('accept', 'application/json')
            xml.setRequestHeader('Authorization', config.api_key)
            xml.onload = function() { if (xml?.status===200) {
                let res = JSON.parse(xml.response)
                setContent(() => res)
                resolve('Done')
            } }
            xml.send()
        } else { resolve('Done') }

    } ) }

    useEffect( () => {
        if (hover && !content.id) {
            get_content() 
            //content.id = 1   // versão esqueleto
        }
    }, [hover])


    let skeleton, animate_bg = ''
    if (!title) {
        title = 'Título'
        skeleton = 'text-zinc-500 bg-zinc-500 animate-pulse'
    }
    if (!pic) {
        pic = ''
        animate_bg = 'animate-pulse'
    }

//console.log('Renderizou')
//style={ {height: '325px'} }
    return (
        <div className={`i${id} relative p-2 cursor-pointer flex flex-col gap-3 justify-center`}
         onMouseOver={  () => {
            if (!hover) {setHover(() => true)}

        } } onMouseLeave={ () => { 
            let elements = Array.from(document.querySelectorAll(`.i${id}`))
            for (let indice of elements) {
                if (indice.children[2]?.className.includes('absolute') && hover) {
                    setHover(() => false)
                }
            }
        } } >

                <div className={`bg-zinc-500 bg-contain ${animate_bg}`} style={{width: '150px', height: '225px', backgroundImage: `url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${pic})`}} />
                <h2 className={skeleton} style={ {width: '150px'} }> {title} </h2>
                {(hover && content.id) && <Details content={content}/>}

        </div>
    )
}

export default Item