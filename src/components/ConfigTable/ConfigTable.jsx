import { Table, Empty } from 'antd';

const ConfigTable = () => {
  const dataSource = [
    {
      key: '1',
      grupo: 'Mike',
      referencia: 32,
      valor: '10 Downing Street',
      recaudo: '5000',
      reversado: 'No',
      fecha: '2021-09-21',
    },
    {
      key: '2',
      grupo: 'Mike',
      referencia: 32,
      valor: '10 Downing Street',
      recaudo: '5000',
      reversado: 'No',
      fecha: '2021-09-21',
    },
    {
      key: '3',
      grupo: 'Mike',
      referencia: 32,
      valor: '10 Downing Street',
      recaudo: '5000',
      reversado: 'No',
      fecha: '2021-09-21',
    },
    {
      key: '4',
      grupo: 'Mike',
      referencia: 32,
      valor: '10 Downing Street',
      recaudo: '5000',
      reversado: 'No',
      fecha: '2021-09-21',
    },
    {
      key: '5',
      grupo: 'Mike',
      referencia: 32,
      valor: '10 Downing Street',
      recaudo: '5000',
      reversado: 'No',
      fecha: '2021-09-21',
    }
  ];
  
  const columns = [
    {
      title: 'Grupo',
      dataIndex: 'grupo',
      key: 'grupo',
    },
    {
      title: 'Referencia',
      dataIndex: 'referencia',
      key: 'referencia',
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
    },
    {
      title: 'Tipo Recaudo',
      dataIndex: 'recaudo',
      key: 'recaudo',
    },
    {
      title: 'Reversado',
      dataIndex: 'reversado',
      key: 'reversado',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
    },
  ];
  return (
    <>
      <Table locale={{ emptyText: (<Empty image={ Empty.PRESENTED_IMAGE_DEFAULT } description={ false }>
        <p>No se encontraron registros</p>
      </Empty>) }} dataSource={ dataSource } columns={ columns } pagination={{ pageSize: 5 }} />  
    </>
  )
}

export default ConfigTable
