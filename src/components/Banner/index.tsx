import { useState, useEffect } from 'react'
import { API_KEY } from '../../config'
import { useQuery } from 'react-query'

export default function Banner() {
    const [skeleton, setSkeleton] = useState('text-zinc-500 bg-zinc-500')
    const [animate, setAnimate] = useState('animate-pulse')
    const [display, setDisplay] = useState( {
        banner: '',
        type: 'Tipo',
        title: 'Título',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ipsum consequatur impedit nostrum officia a sint id pariatur veniam, natus quibusdam porro error commodi qui nam itaque quod iusto quo.',

    } )

    const { data } = useQuery('get trendings banner', async() => {
            return await fetch(`https://api.themoviedb.org/3/trending/all/day?language=pt-BR`, {
                headers: {"Authorization": API_KEY}
            } ).then(res => res.json())

        }, { staleTime: 1000*180 /* 3min */ }
    )



    function resetAnim(el:any) {
        el.style.animation = 'none'
        el.offsetWidth
        el.style.animation = ''
    }

    useEffect(() => {
        function func() {
            if (data) {
                let item = data.results[Math.round(Math.random()*data.results.length)]
                if (item) {
                    let obj = {
                        banner: `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${item.poster_path}`,
                        type: item.media_type === 'movie'? 'Filme': 'Série',
                        title: item.title ?? item.name,
                        description: item.overview
                    }
                    document.querySelector('.b-description')?.classList.add('animate-emerge')
                    resetAnim( document.querySelector('.banner') )
                    resetAnim( document.querySelector('.b-description') )
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

    }, [data] )


    return (
        <section className={`banner w-screen h-screen bg-zinc-950 bg-contain bg-no-repeat bg-center ${animate} mb-6`} style={{backgroundImage: `url(${display.banner})`}} >
            <div className='w-full h-full bg-zinc-950/[0.4] flex items-end'>
                <div className="b-description w-1/2 flex flex-col gap-10 px-10 py-20">
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