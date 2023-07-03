import { useState, useEffect } from 'react'
import config from '../../config.json'

export default function Banner() {
    const [skeleton, setSkeleton] = useState('text-zinc-500 bg-zinc-500')
    const [animate, setAnimate] = useState('animate-pulse')
    const [display, setDisplay] = useState( {
        banner: '',
        type: 'Tipo',
        title: 'Título',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ipsum consequatur impedit nostrum officia a sint id pariatur veniam, natus quibusdam porro error commodi qui nam itaque quod iusto quo.'
    } )

    let contents:any

    function resetAnim(el:any) {
        el.style.animation = 'none'
        el.offsetWidth
        el.style.animation = ''
    }

    useEffect( () => {
        let xml:XMLHttpRequest | undefined = new XMLHttpRequest()
        xml.open('GET', `https://api.themoviedb.org/3/trending/all/day?language=pt-BR`)
        xml.setRequestHeader('accept', 'application/json')
        xml.setRequestHeader('Authorization', config.api_key)
        xml.onload = function() { if (xml?.status===200) {
            let res = JSON.parse(xml.response)
            contents = res
        } }
        xml.send()

        return () => {
            xml = undefined
        }

    }, [] )

    useEffect(() => {
        function func() {
            if (contents) {
                let item = contents.results[Math.round(Math.random()*contents.results.length)]
                if (item) {
                    let obj = {
                        banner: `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${item.poster_path}`,
                        type: item.media_type.capi==='movie'? 'Filme': 'Série',
                        title: item.title ?? item.name,
                        description: item.overview
                    }
                    document.querySelector('.text')?.classList.add('animate-emerge')
                    resetAnim( document.querySelector('.banner') )
                    resetAnim( document.querySelector('.text') )
                    setDisplay(() => obj )
                    if (skeleton && animate==='animate-pulse') {
                        setSkeleton(() => '')
                        setAnimate(() => 'animate-display')
                    }
                }
            }
        }

        const timeout = setTimeout(func, 3000)
        const interval = setInterval(func, 7000 )

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [] )
    

    return (
        <section className={`banner w-screen h-screen bg-zinc-950 bg-contain bg-no-repeat bg-center ${animate}`} style={{backgroundImage: `url(${display.banner})`}} >
            <div className='w-full h-full bg-zinc-950/[0.4] flex items-end'>
                <div className="text w-1/2 flex flex-col gap-10 px-10 py-20">
                    <h2 className={`w-fit text-xl ${skeleton}`}>{display.type}</h2>
                    <h1 className={`text-6xl font-bold ${skeleton}`}>{display.title}</h1>
                    <p className={skeleton}>{display.description}</p>
                </div>
            </div>
        </section>
    )

}


/*

https://www.themoviedb.org/t/p/w300_and_h450_bestv2/rXTqhpkpj6E0YilQ49PK1SSqLhm.jpg
https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/h8gHn0OzBoaefsYseUByqsmEDMY.jpg

*/