import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { Dropdown, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faGears, faSackDollar, faX, faBars } from '@fortawesome/free-solid-svg-icons';
import { style } from './styleNav';
import user from '../../assets/user.png';
import LogoOpa from '../../assets/Logo-opa.png';


const Nav = () => {
  
  const navigate = useNavigate();
  
  const [hamCollapsed, setHamCollapsed] = useState(true);
  const dropdownRef = useRef();

  useEffect(() => {
    console.log('useEffect');
    const handleDropdownToggle = () => {
      console.log('handleDropdownToggle');
      if (dropdownRef.current) {

        console.log(dropdownRef.current.classList.contains('ant-dropdown-open'));
        setHamCollapsed(false);
        console.log('setHamCollapsed1');
      } else {
        setHamCollapsed(true);
        console.log('setHamCollapsed2');
      }
    };

    document.addEventListener('click', handleDropdownToggle);

    return () => {
      document.removeEventListener('click', handleDropdownToggle);
    };
  }, [hamCollapsed]);

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
      label: <Link to="/" className={ style.iconNav }>
        <p>Cerrar sesión</p>
        <FontAwesomeIcon icon={ faPowerOff } />   
      </Link>,
      key: '3',
    },
  ];

  return (
    <nav className={style.nav}>
      <div className='flex items-center gap-5'>
        <img src={ LogoOpa } alt="Logo-opa" width={ "65px" } height={ "40px" } />
        <p className='text-2xl font-bold'>Zona Pagos</p>
      </div>

      <div className='border-l-2 pl-5 cursor-pointer' >
        <Dropdown
          menu={{ items }}
          trigger={ ['click'] }
        >
          <div> 
            <Space>
              OPA S.A.S
              <div className='' ref={dropdownRef}>
                { hamCollapsed ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faX} /> }
              </div>
            </Space>
          </div>
        </Dropdown>
      </div>
    </nav>
  )
}

export default Nav
