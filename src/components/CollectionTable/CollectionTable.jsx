import { useState } from 'react';
import { Table, Empty } from 'antd';
import './CollectionTable.css';




const CollectionTable = () => {
  
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
      render: () => <input className='checkbox-round' type="checkbox" onChange={handleCheckboxChange} />,
      align: 'center',
    },
  ];

  const dataSource = [
    {
      key: '1',
      referencia: 'Mike',
      cedula: 32,
      producto: '10 Downing Street',
      valor: '5000',
    },
    {
      key: '2',
      referencia: 'Mike',
      cedula: 32,
      producto: '10 Downing Street',
      valor: '5000',
    },
    {
      key: '3',
      referencia: 'Mike',
      cedula: 32,
      producto: '10 Downing Street',
      valor: '5000',
    },
    {
      key: '4',
      referencia: 'Mike',
      cedula: 32,
      producto: '10 Downing Street',
      valor: '5000',
    },
    {
      key: '5',
      referencia: 'Mike',
      cedula: 32,
      producto: '10 Downing Street',
      valor: '5000',
    },
    {
      key: '6',
      referencia: 'Mike',
      cedula: 32,
      producto: '10 Downing Street',
      valor: '5000'
    },
    {
      key: '7',
      referencia: 'Mike',
      cedula: 32,
      producto: '10 Downing Street',
      valor: '5000'
    },
    {
      key: '8',
      referencia: 'Mike',
      cedula: 32,
      producto: '10 Downing Street',
      valor: '5000'
    },
    {
      key: '9',
      referencia: 'Mike',
      cedula: 25,
      producto: '10 Downing Street',
      valor: '5000'
    },
    {
      key: '10',
      referencia: 'Mike',
      cedula: 32,
      producto: '10 Downing Street',
      valor: '5000'
    },
    {
      key: '11',
      referencia: 'Mike',
      cedula: 32,
      producto: '10 Downing Street',
      valor: '5000'
    },
    {
      key: '12',
      referencia: 'Mike',
      cedula: 32,
      producto: '10 Downing Street',
      valor: '5000'
    },
    {
      key: '13',
      referencia: 'Mike',
      cedula: 32,
      producto: '10 Downing Street',
      valor: '5000'
    },
    {
      key: '14',
      referencia: 'Mike',
      cedula: 32,
      producto: '10 Downing Street',
      valor: '5000'
    },
    {
      key: '15',
      referencia: 'Mike',
      cedula: 31,
      producto: '10 Downing Street',
      valor: '5000'
    }
  ];

  const handleCheckboxChange = () => {
    console.log('Checkbox changed');
  }

  return (
    <>
      <Table locale={{ emptyText: (<Empty image={ Empty.PRESENTED_IMAGE_DEFAULT } description={ false }>
        <p>No se encontraron registros</p>
      </Empty>) }} dataSource={ dataSource } columns={ columns } pagination={{ pageSize: 5 }} />  
    </>
  )
}

export default CollectionTable
