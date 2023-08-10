import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Profile from '../Profile'
import Search from '../Search'


export default function Navbar() { 
    const [ search, setSearch ] = useState(false)

    useEffect( () => { 
        const input: HTMLInputElement | null = document.querySelector('input[type=search]')
        input?.focus()
    }, [search] )

    return (
        <nav className='relative'>
            <ul className='flex gap-6 items-center py-2 px-6'>
                <Link to='/'><li>Home</li></Link>
                <Link to='/series'><li>Séries</li></Link>
                <Link to='/filmes'><li>Filmes</li></Link>
                <li className='text-zinc-500 cursor-pointer p-3' 
                onClick={ () => setSearch( prevState => !prevState ) }>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </li>
            </ul>
            <Profile href={'/src/assets/profile.jpg'} />
            {search && <Search />}
        </nav>
    )
}

