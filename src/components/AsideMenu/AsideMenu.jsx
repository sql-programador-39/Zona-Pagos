import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faSackDollar, faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import './AsideMenu.css';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const AsideMenu = ({ collapsed, setCollapsed }) => {

  const location = useLocation();

  const [selectedKey, setSelectedKey] = useState(null);

  useEffect(() => {
    if (location.pathname === '/config') {
      setSelectedKey('1');
    } else if(location.pathname === '/seguimiento'){
      setSelectedKey('2');
    } else if (location.pathname === '/recaudo') {
      setSelectedKey('3');
    }
  }, [location]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items = [
    getItem(<Link to="/config">Configuración</Link>, '1', <FontAwesomeIcon icon={ faGear } />),
    getItem(<Link to="/seguimiento">Seguimiento</Link>, '2', <FontAwesomeIcon icon={ faMagnifyingGlassChart } />),
    getItem(<Link to="/recaudo">Recuado</Link>, '3', <FontAwesomeIcon icon={ faSackDollar } />),
  ];

  return (
    <div
      style={{ height: '90vh', position: 'fixed' }}
      className={ collapsed ? 'aside-menu-collapsed' : 'aside-menu' }
    >
      <div className={ `${ collapsed ? 'div-menu-collapse' : 'div-menu' } flex justify-center py-3 text-blue-900 text-2xl border-r` } onClick={ toggleCollapsed }>
        <button>
          { collapsed ? <MenuUnfoldOutlined  /> : <MenuFoldOutlined /> }
        </button>
      </div>

      <Menu
        defaultSelectedKeys={ ['1'] }
        selectedKeys={ [selectedKey] }
        mode="inline"
        inlineCollapsed={ collapsed }
        items={ items }
        style={{
          height: '100%',
          fontSize: "1.1rem"
        }}
      />
    </div>
  );
}

export default AsideMenu
