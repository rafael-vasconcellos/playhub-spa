import { useState } from 'react'
type profileProps = {
    href: string
}

const Profile: React.FC<profileProps> = function( {href} ) {
    const [menuVisible, setmenuVisible] = useState('hidden')
    const menuItems = 'px-3 py-1 hover:bg-zinc-500 cursor-pointer'

      return (
        <section>
          <div className='inline-flex items-center gap-3 absolute top-2 right-2 z-10'>

              <div className={`h-12 w-12 rounded-full bg-zinc-600 inline-block bg-contain`} style={{backgroundImage: `url('${href}')`}}></div>
              <label className='inline-block cursor-pointer' htmlFor="select">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                  className="w-6 h-6 text-zinc-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
              </label>

              <input type="checkbox" id='select' 
              onChange={ (e) => {
                const value = e.target.checked? 'inline-block' : 'hidden'
                setmenuVisible(() => value)
              }
              } className='hidden'/>

              <ul className={`py-3 w-44 h-56 bg-zinc-600 rounded-lg absolute top-14 right-0 ${menuVisible}`}>
                  <li className={menuItems}>Conta</li>
                  <li className={menuItems}>Minha lista</li>
                  <li className={menuItems}>Configurações</li>
                  <li className={menuItems}>Mudar de perfil</li>
                  <li className={menuItems}>Help</li>
                  <li className={menuItems}>Sair</li>
              </ul>

          </div>
        </section>
      )
}

export default Profile
