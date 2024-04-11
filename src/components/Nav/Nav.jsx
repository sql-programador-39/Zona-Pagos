import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Dropdown, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faGears, faSackDollar, faX, faBars } from '@fortawesome/free-solid-svg-icons';
import { style } from './styleNav';
import user from '../../assets/user.png';
import LogoOpa from '../../assets/Logo-opa.png';


const Nav = () => {
  
  const { setIsAuthenticaded } = useAuth();

  const [hamCollapsed, setHamCollapsed] = useState(false);
  const dropdownRef = useRef();

  const handleSignOutClick = () => {
    setIsAuthenticaded(false);
  }

  useEffect(() => {

    const handleDropdownToggle = () => {

      if(dropdownRef.current.classList.contains('ant-dropdown-open')) {
        setHamCollapsed(true);
      } else {
        setHamCollapsed(false);
      }
    };

    document.addEventListener('click', handleDropdownToggle);

    return () => {
      document.removeEventListener('click', handleDropdownToggle);
    }

  }, [dropdownRef]);

  const items = [
    {
      label: <Link to="/config" className={ style.iconNav }>
        <p>Configuración</p>
        <FontAwesomeIcon icon={faGears} />
      </Link>,
      key: '0',
    },
    {
      label: <Link to="/recaudo" className={ style.iconNav }>
        <p>Recaudo</p>
        <FontAwesomeIcon icon={faSackDollar} />
      </Link>,
      key: '1',
    },
    {
      label: <Link to="/" className={ style.iconNav }>
        <p>Perfil</p>
        <img src={ user } alt="" width={ "14px" } height={ "14px" } />
      </Link>,
      key: '2',
    },
    {
      label: <Link onClick={ handleSignOutClick } to="/" className={ style.iconNav }>
        <p>Cerrar sesión</p>
        <FontAwesomeIcon icon={ faPowerOff } />   
      </Link>,
      key: '3',
    },
  ];

  return (
    <div>
      <nav className={`${style.nav} bg-white`}>
        <div className='flex items-center gap-5'>
          <img src={ LogoOpa } alt="Logo-opa" width={ "65px" } height={ "40px" } />
          <p className='text-2xl font-bold'>Zona Pagos</p>
        </div>

        <div className='border-l-2 pl-5 cursor-pointer'>
          <Dropdown
            menu={{ items }}
            trigger={ ['click'] }
          >
            <div ref={dropdownRef} className=''> 
              <Space>
                OPA S.A.S
                <div className='flex items-center'>
                  { hamCollapsed ? <FontAwesomeIcon className='w-6 h-6' icon={ faX } /> : <FontAwesomeIcon className='w-6 h-6' icon={ faBars } /> }
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
