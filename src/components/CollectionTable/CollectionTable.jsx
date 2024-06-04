import { useState, useEffect } from 'react';
import { Table, Empty, Checkbox } from 'antd';

import './CollectionTable.css';
import { convertCurrencyToNumber, formatMoney } from '../../helpers/formatters';

const CollectionTable = ({ data, setInfoTable, expandedRowKeys, setExpandedRowKeys }) => {
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    const updatedData = addDisableds(data);
    setLocalData(updatedData);
  }, [data]);

  const addDisableds = (data) => {
    return data.map((item) => {
      const updatedItem = { ...item };
      const unselectedCount = item.originalCompanyReference.filter(ref => !ref.checked).length;
      updatedItem.originalCompanyReference = item.originalCompanyReference.map((item2) => ({
        ...item2,
        disabledItem: unselectedCount === 1 && !item2.checked,
      }));
      return updatedItem;
    });
  };

  const handleCheckboxOne = (rowIndex, record) => {
    const updatedData = localData.map((item) => {
      if (item.key === record.key) {
        const updatedItem = { ...item };
        updatedItem.originalCompanyReference = item.originalCompanyReference.map((item3) => {
          if (item3.referenciaProducto === rowIndex.referenciaProducto) {
            const newChecked = !item3.checked;
            item3.checked = newChecked;
            updatedItem.total = convertCurrencyToNumber(updatedItem.total);
            updatedItem.total = newChecked
              ? updatedItem.total - convertCurrencyToNumber(item3.valor)
              : updatedItem.total + convertCurrencyToNumber(item3.valor);
            updatedItem.total = formatMoney(updatedItem.total);
          }
          return item3;
        });

        // Update disabled state for checkboxes
        const unselectedCount = updatedItem.originalCompanyReference.filter(ref => !ref.checked).length;
        updatedItem.originalCompanyReference = updatedItem.originalCompanyReference.map((item3) => ({
          ...item3,
          disabledItem: unselectedCount === 1 && !item3.checked,
        }));

        return updatedItem;
      }
      return item;
    });

    setLocalData(updatedData);
    setInfoTable([...updatedData]);
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
        key: 'valor',
      },
      {
        title: 'Excluir',
        dataIndex: 'excluir',
        key: 'excluir',
        render: (row, rowIndex) => {
          return (
            <label htmlFor={'checkedAllUsr-' + rowIndex.key}>
              <Checkbox
                id={'checkedAllUsr-' + rowIndex.key}
                key={rowIndex.key}
                checked={rowIndex.checked}
                disabled={rowIndex.disabledItem}
                onChange={() => handleCheckboxOne(rowIndex, record)}
              />
            </label>
          );
        },
        align: 'center',
      },
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
    },
  ];

  return (
    <Table
      locale={{
        emptyText: (
          <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} description={false}>
            <p>{data ? 'Debes generar los registros...' : 'No se encontraron registros...'}</p>
          </Empty>
        ),
      }}
      columns={columns}
      expandable={{
        expandedRowRender,
        expandedRowKeys,
        onExpand: handleExpand,
      }}
      dataSource={localData}
      size="small"
    />
  );
};

export default CollectionTable;
