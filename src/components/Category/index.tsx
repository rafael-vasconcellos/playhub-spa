import { useQuery } from 'react-query'
import { discover } from '../../global'
import Item from '../Item'
import { IProductionDetails } from '../../global'
import './style.css'



type categoryProps = { 
    categoryName: string,
    categoryId: number | null,
    type?: string,
    content?: any[]
}

const Category:React.FC<categoryProps> = function( {categoryName, categoryId, type, content} ) { 
    const placeholderSchema = {title: '', name: '', backdrop_path: '', poster_path: '', id: undefined}
    const placeholder = Array(8).fill(placeholderSchema)

    const { data } = useQuery(`discover shows ${type} ${categoryName} ${categoryId}`, async() => { 
        if (type && categoryId && !content) { 
            await new Promise( resolve => setTimeout(resolve, 3000) )
            const response = await discover(categoryId, type)
            return response

        } else if (content) { return content }
        else { return placeholder }

        }, { staleTime: 1000*180, /* 3min */  placeholderData: placeholder,  }
    )

    const skeleton = !data[0]?.id? 'text-zinc-500 bg-zinc-500 animate-pulse' : ''



    return (
        <section className='category'>
                <h1 className={`${skeleton} px-2 inline-block text-2xl font-bold`}>
                    { content || !categoryId? categoryName : 
                        (type==='tv'? 'Séries de ' : 'Filmes de ') + categoryName 
                    }
                </h1>
                <div className='carrosel-itens flex items-center px-3' style={ {maxWidth: '98vw'} }>
                        <div className="cursor-pointer h-full">
                            <button className="bg-zinc-700 rounded-full px-4 pb-3 pt-2 font-bold text-4xl"
                             onClick={(e:any) => {
                                let el = e.target.parentElement?.nextSibling
                                el.scrollBy(-el.offsetWidth, 0)
                            } }>
                                {"<"}
                            </button>
                        </div>

                        <div className='flex gap-5 items-start px-3 py-4 overflow-x-scroll overflow-y-hidden scroll-smooth'>

                            {data?.map( (e: IProductionDetails) => <Item title={e.title ?? e.name} pic={e.poster_path} id={e.id} type={type ?? e.media_type} key={`${e.id ?? Math.random()}`} />)}

                        </div>

                        <div className="cursor-pointer h-full">
                            <button className="bg-zinc-700 rounded-full px-4 pt-2 pb-3 font-bold text-4xl"
                             onClick={(e:any) => {
                                let el = e.target.parentElement?.previousSibling
                                el.scrollBy(el.offsetWidth, 0)
                            } }>
                                {">"}
                            </button>
                        </div>
                </div>
        </section>
    )
}


export default Category