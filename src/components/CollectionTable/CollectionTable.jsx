import { Table, Empty } from 'antd';
import './CollectionTable.css';

const CollectionTable = () => {

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
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
    },
  ];
  return (
    <>
      <Table locale={{ emptyText: (<Empty image={ Empty.PRESENTED_IMAGE_DEFAULT } description={ false }>
        <p>No se encontraron registros</p>
      </Empty>) }} dataSource={ dataSource } columns={ columns } />  
    </>
  )
}

export default CollectionTable
