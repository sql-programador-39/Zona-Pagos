import { useState, useEffect,useRef } from 'react'

import { Table, Empty, Checkbox } from 'antd'
import { Button, Input, Space } from 'antd'

import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'

import { convertCurrencyToNumber, formatMoney } from '../../helpers/formatters'

import './CollectionTable.css'

const CollectionTable = ({ data, setInfoTable, expandedRowKeys, setExpandedRowKeys }) => {

  const [localData, setLocalData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)

  useEffect(() => {
    const updatedData = addDisableds(data)
    setLocalData(updatedData)
  }, [data])

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
  }

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
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  }
  
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Resetear
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Cerrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

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
          )
        },
        align: 'center',
      },
    ]

    const dataSecondRow = record.originalCompanyReference || [];
    return <Table columns={columns} dataSource={dataSecondRow} pagination={false} rowKey={(record) => record.referenciaProducto} />;
  };

  const handleExpand = (expanded, record) => {
    const keys = expanded
      ? [...expandedRowKeys, record.key]
      : expandedRowKeys.filter(key => key !== record.key)
    setExpandedRowKeys(keys)
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
      ...getColumnSearchProps('cedula'),
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
  ]

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
  )
}

export default CollectionTable
