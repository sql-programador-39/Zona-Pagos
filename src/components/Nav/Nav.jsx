import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Dropdown, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faGears, faSackDollar, faX, faBars, faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons'

import useAuth from '../../hooks/useAuth'
import { style } from './styleNav'

import user from '../../assets/user.png'
import LogoOpa from '../../assets/Logo-opa.png'
import Drop from './Drop'


const Nav = () => {
  
  const { setIsAuthenticaded } = useAuth()

  const [hamCollapsed, setHamCollapsed] = useState(false)
  const [reference, setReference] = useState("Zona Pagos")
  const dropdownRef = useRef()

  const handleSignOutClick = () => {
    setIsAuthenticaded(false)
  }

  useEffect(() => {

    const handleDropdownToggle = () => {

      if(dropdownRef.current.classList.contains('ant-dropdown-open')) {
        setHamCollapsed(true)
      } else {
        setHamCollapsed(false)
      }
    };

    document.addEventListener('click', handleDropdownToggle)

    return () => {
      document.removeEventListener('click', handleDropdownToggle)
    }

  }, [dropdownRef]);

  const items = [
    {
      label: <Link to="/config" className={ style.iconNav }>
        <p>Configuración</p>
        <FontAwesomeIcon icon={ faGears } />
      </Link>,
      key: '0',
    },
    {
      label: <Link to="/recaudo" className={ style.iconNav }>
        <p>Recaudo</p>
        <FontAwesomeIcon icon={ faSackDollar } />
      </Link>,
      key: '1',
    },
    {
      label: <Link to="/seguimiento" className={ style.iconNav }>
        <p>Seguimiento</p>
        <FontAwesomeIcon icon={ faMagnifyingGlassChart } />
      </Link>,
      key: '2',
    },
    {
      label: <Link to="/" className={ style.iconNav }>
        <p>Perfil</p>
        <img src={ user } alt="" width={ "14px" } height={ "14px" } />
      </Link>,
      key: '3',
    },
    {
      label: <Link onClick={ handleSignOutClick } to="/" className={ style.iconNav }>
        <p>Cerrar sesión</p>
        <FontAwesomeIcon icon={ faPowerOff } />   
      </Link>,
      key: '4',
    },
  ];

  return (
    <div>
      <nav className={ `${style.nav} bg-white` }>
        <div className='flex items-center gap-5 w-2/4'>
          <img src={ LogoOpa } alt="Logo-opa" width={ "65px" } height={ "40px" } />
          <Drop 
            reference={ reference }
            setReference={ setReference }
          />
        </div>

        <div className='border-l-2 pl-5 cursor-pointer'>
          <Dropdown
            menu={ { items } }
            trigger={ ['click'] }
          >
            <div ref={dropdownRef}> 
              <Space>
                OPA S.A.S
                <div className='flex items-center'>
                  { hamCollapsed ? <FontAwesomeIcon className='w-7 h-6' icon={ faX } /> : <FontAwesomeIcon className='w-7 h-7' icon={ faBars } /> }
                </div>
              </Space>
            </div>
          </Dropdown>
        </div>
      </nav>
    </div>
  )
}

export default Nav
