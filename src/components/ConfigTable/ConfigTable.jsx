import { Table, Empty } from 'antd';

const ConfigTable = ({ data }) => {

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
      </Empty>) }} dataSource={ data } columns={ columns  } /* pagination={{ pageSize: 5 }} */ />  
    </>
  )
}

export default ConfigTable
