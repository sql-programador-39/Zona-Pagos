import { useEffect } from 'react';
import { Table, Empty, Checkbox } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { style } from '../../pages/Config/styleConfig';

import './CollectionTable.css';

const CollectionTable = ({ data, setInfoTable }) => {

  useEffect(() => {
    setInfoTable(data)
  }, [])

  const columns = [
    { 
      title: 'Referencia',
      dataIndex: 'referencia',
      key: 'referencia',
    },
    {
      title: 'Cedula',
      dataIndex: 'cedula',
      key: 'cedula',
    },
    {
      title: 'Producto',
      dataIndex: 'producto',
      key: 'producto',
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
    },
    {
      title: 'Excluir',
      dataIndex: 'excluir',
      key: 'excluir',
      render: (row, rowIndex) => {
        return (
          <>
            <Checkbox
              id={ 'checkedAllUsr-' + row }
              key={ row }
              checked={rowIndex.checked}
              onChange={ () => handleCheckboxOne(rowIndex, 'checkbox') }
              disabled={ rowIndex.disabled }
            />
          </>
        )
      },
      align: 'center',
    },
  ];

  const handleCheckboxOne = (rowIndex, type) => {
    data.map((item) => {
      if (item.key === rowIndex.key) {
        if (type === 'checkbox') item.checked = !rowIndex.checked
      }
    })
    setInfoTable([...data])
  }

  const handleClick = () => {

    const dataFiltered = data.filter((item) => {
      return !item.checked;
    });

    setInfoTable(dataFiltered)
  }

  return (
    <>
      <Table locale={{ emptyText: (<Empty image={ Empty.PRESENTED_IMAGE_DEFAULT } description={ false }>
        <p>No se encontraron registros</p>
      </Empty>) }} dataSource={ data } columns={ columns } pagination={{ pageSize: 5 }} />  
        
      <div className="flex justify-end mt-5">
        <button 
          className={`${ style.button } w-1/2 sm:w-1/4`}
          onClick={ handleClick }
        ><FontAwesomeIcon icon={ faClipboardCheck } /> Actualizar</button>
      </div>
    </>
  )
}

export default CollectionTable
