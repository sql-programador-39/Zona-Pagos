import { useNavigate  } from 'react-router-dom';
import { Dropdown, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faGears } from '@fortawesome/free-solid-svg-icons';
import { style } from './styleNav';
import user from '../../assets/user.png';
import LogoOpa from '../../assets/Logo-opa.png';


const Nav = () => {
  
  const navigate = useNavigate();


  
  const handleClick = () => {
    navigate('/');
  }

  const items = [
    {
      label: <div onClick={ handleClick } className={ style.iconNav }>
        <p>Configuración</p>
        <FontAwesomeIcon icon={faGears} />
      </div>,
      key: '0',
    },
    {
      label: <div onClick={ handleClick } className={ style.iconNav }>
        <p>Perfil</p>
        <img src={ user } alt="" width={ "14px" } height={ "14px" } />
      </div>,
      key: '1',
    },
    {
      label: <div onClick={ handleClick } className={ style.iconNav }>
        <p>Cerrar sesión</p>
        <FontAwesomeIcon icon={ faPowerOff } />   
      </div>,
      key: '2',
    },
  ];

  return (
    <nav className={style.nav}>
      <div className='flex items-center gap-5'>
        <img src={ LogoOpa } alt="Logo-opa" width={ "65px" } height={ "40px" } />
        <p className='text-2xl font-bold'>Zona Pagos</p>
      </div>

      <div className='border-l-2 pl-5 cursor-pointer'>
        <Dropdown
          menu={{ items }}
          trigger={ ['click'] }
        >
          <div> 
            <Space>
              OPA S.A.S
              <div className=''>
                <img src={ user } alt="user" />
              </div>
            </Space>
          </div>
        </Dropdown>
      </div>
    </nav>
  )
}

export default Nav
