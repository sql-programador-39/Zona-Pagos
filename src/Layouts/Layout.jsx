
import { useState } from 'react'

import { Outlet } from 'react-router-dom'

import Nav from '../components/Nav/Nav'
import AsideMenu from '../components/AsideMenu/AsideMenu'

import './Layout.css'

const Layout = () => {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <header className='fixed w-full z-10'>
        <Nav />
      </header>

      <main className='pt-16'>
        <aside className='hidden md:inline'>
          <AsideMenu 
            collapsed={ collapsed }
            setCollapsed={ setCollapsed }
          />
        </aside>
        
        <div className={ collapsed ? 'main-content2' : 'main-content' }>
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default Layout
