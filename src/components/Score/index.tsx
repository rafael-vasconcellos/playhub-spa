import star from '../../assets/star.png'

const Score: React.FC<{data: any}> = function( {data} ) {

    return (
        <div className="flex absolute top-3 right-7 items-center gap-2">
            <div className="w-6 h-6 bg-contain" style={ {backgroundImage: `url(${star})`} } />
            <p className="flex flex-col items-center"> 
                <span className="font-bold text-xl">{data.vote_average.toFixed(2)}/10</span>
                <span className="text-zinc-300 text-sm"> {data.vote_count>1000? data.vote_count.toLocaleString()+' mil': data.vote_count} </span>
            </p>
            <p>{data.popularity < 500? data.popularity : ''}</p>
        </div>
    )
}

export default Score