import { useState } from 'react';
import { Table, Empty } from 'antd';
import './CollectionTable.css';

const CollectionTable = ({data}) => {
  
  const [checkbox, setCheckbox] = useState(false)

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
      render: () => <input className='checkbox-round' type="checkbox" onChange={handleCheckboxChange} checked={checkbox} />,
      align: 'center',
    },
  ];

  const handleCheckboxChange = () => {
    setCheckbox(!checkbox)
  }

  return (
    <>
      <Table locale={{ emptyText: (<Empty image={ Empty.PRESENTED_IMAGE_DEFAULT } description={ false }>
        <p>No se encontraron registros</p>
      </Empty>) }} dataSource={ data } columns={ columns } pagination={{ pageSize: 5 }} />  
    </>
  )
}

export default CollectionTable
