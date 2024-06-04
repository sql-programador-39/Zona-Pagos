import { Dropdown, Space } from "antd"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

import EfectyIcon from '../../assets/efecty.png';

const Drop = ({reference, setReference}) => {

  const items = [
    {
      label: <div className="flex items-center gap-3" style={ { cursor: 'pointer', width: "8em" } } onClick={() => setReference("Zona Pagos")}>
        <p>Zona Pagos</p>
        <FontAwesomeIcon icon={ faFileInvoiceDollar } className="w-5 h-5" />
      </div>,
      key: '0',
    },
    {
      label: <div className="flex items-center gap-3" style={ { cursor: 'pointer', width: "8em" } } onClick={() => setReference("Efecty")}>
      <p>Efecty</p>
      <img src={ EfectyIcon } alt="" className="w-5 h-5"/>
    </div>,
      key: '1',
    }
  ]

  return (
    <div>
      <Dropdown 
        menu={ { items } }
        trigger={ ['click'] }
      >
        <a className="drop-custom" onClick={(e) => e.preventDefault()}>
          <Space>
            {reference}

            <div>
              <FontAwesomeIcon icon={ faChevronDown } />
            </div>
          </Space>
        </a>
      </Dropdown>
    </div>
  )
}

export default Drop
