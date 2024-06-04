import { useState, useEffect } from 'react';
import { Checkbox, Table } from 'antd';
import { getInfoCollections } from '../api/api';

const Pruebas = () => {
  const [dataFirstRow, setFirstData] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  useEffect(() => {
    handleApi();
  }, []);

  const handleApi = async () => {
    const data = await getInfoCollections();
    const dataWithKeys = data.map((item, index) => ({ ...item, key: index.toString() }));
    const dataWithCheck = dataWithKeys.map((item) => ({ ...item, checked: false }));
    setFirstData(dataWithCheck);
  };

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: 'Referencia Producto',
        dataIndex: 'referenciaProducto',
        key: 'referenciaProducto',
      },
      {
        title: 'ID Producto',
        dataIndex: 'idProducto',
        key: 'idProducto',
      },
      {
        title: 'Cedula',
        dataIndex: 'cedula',
        key: 'cedula',
      },
      {
        title: 'Codigo Producto',
        dataIndex: 'codigoProducto',
        key: 'codigoProducto',
      },
      {
        title: 'Valor',
        dataIndex: 'valor',
        key: 'valor'
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
                /* checked={rowIndex.checked} */
               /*  onChange={ () => handleCheckboxOne(rowIndex, 'checkbox') } */
              />
            </>
          )
        },
        align: 'center',
      }
    ];

    const dataSecondRow = record.originalCompanyReference || [];
    
    return <Table columns={columns} dataSource={dataSecondRow} pagination={false} rowKey={(record) => record.referenciaProducto} />;
  };

  const handleExpand = (expanded, record) => {
    const keys = expanded
      ? [...expandedRowKeys, record.key]
      : expandedRowKeys.filter(key => key !== record.key);
    setExpandedRowKeys(keys);
  };

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
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    }
  ];

  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          expandedRowKeys,
          onExpand: handleExpand,
        }}
        dataSource={dataFirstRow}
        size="small"
      />
    </>
  );
};

export default Pruebas;
