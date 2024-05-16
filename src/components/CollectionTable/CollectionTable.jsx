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

  return (
    <>
      <Table locale={{ emptyText: (<Empty image={ Empty.PRESENTED_IMAGE_DEFAULT } description={ false }>
        <p>No se encontraron registros</p>
      </Empty>) }} dataSource={ data } columns={ columns } pagination={{ pageSize: 5 }} rowKey={(record) => record.cedula} />  
    </>
  )
}

export default CollectionTable
