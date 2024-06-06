import { Table, Empty } from 'antd'

const ConfigTable = ({ data }) => {

  const columns = [
    {
      title: 'Referencia',
      dataIndex: 'companyReferenceId',
      key: 'companyReferenceId',
    },
    {
      title: 'Valor',
      dataIndex: 'paymentValue',
      key: 'paymentValue',
    },
    {
      title: 'Tipo Recaudo',
      dataIndex: 'paymentType',
      key: 'paymentType',
    },
    {
      title: 'Reversado',
      dataIndex: 'reverse',
      key: 'reverse',
    },
    {
      title: 'Fecha',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
    },
  ]

  return (
    <>
      <Table locale={{ emptyText: (<Empty image={ Empty.PRESENTED_IMAGE_DEFAULT } description={ false }>
        <p>No se encontraron registros</p>
      </Empty>) }} dataSource={ data } columns={ columns  } pagination={{ pageSize: 10 }}  rowKey={(record) => record.companyPaymentId}/>  
    </>
  )
}

export default ConfigTable
