import { Link } from 'react-router-dom'
import Profile from '../Profile'
import Search from '../Search'
import MobileNav from './MobileNav'
import profile_pic from '../../assets/profile.jpg'
import './style.css'


export default function Navbar() { 


    return (
        <nav className='relative h-fit py-3 px-6 flex items-center gap-2'>
            <div className='h-9 bg-contain p-5' style={ {backgroundImage: `url(/logo.png)`, minWidth: '2.25rem'} } />
            <ul className='flex items-center gap-6 px-3'>
                <Link to='/'><li>Home</li></Link>
                <Link to='/series'><li>Séries</li></Link>
                <Link to='/filmes'><li>Filmes</li></Link>
            </ul>

            <Profile href={profile_pic}>
                <label htmlFor='search-check' className='text-zinc-500 cursor-pointer py-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                    className="w-6 h-6" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </label>
            </Profile>
            <input type="checkbox" id="search-check" className='hidden'onChange={ () => {
                    const input: HTMLInputElement | null = document.querySelector('input[type="search"]')
                    input?.focus()
            } } />
            <Search />
            <MobileNav />
        </nav>
    )
}

