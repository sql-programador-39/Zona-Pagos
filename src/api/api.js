import axios from 'axios';
import { formatDate, formatMoney } from '../helpers/formatters';

const setFollowedPaysFilter = async (filter) => {
  const url = `https://recaudos-stage.opa.com.co/ZOPA/SeguimientoPagos`;

  let type;

  if(filter.typeCollection === 'realizados') {
    type = 1;
  } else if(filter.typeCollection === 'reversados') {
    type = 0;
  } else {
    type = 2;
  }

  try {
    const response = await axios.post(url, {
      "paymentType": type,
      "initDate": filter.dateStart + "T00:00:00.000Z",
      "finalDate": filter.dateEnd + "T23:59:59.000Z"
    });

    let objFollowed = [];
    
    response.data.object.map(item => {
      let itemWithType = { ...item, paymentType: item.paymentType === 0 ? 'Revesado' : 'Realizado'}
      let newItem = { ...itemWithType, reverse: itemWithType.paymentType === 'Revesado' ? 'Si' : 'No'}
      newItem.paymentDate = formatDate(newItem.paymentDate);
      newItem.paymentValue = formatMoney(newItem.paymentValue);
      objFollowed = [...objFollowed, newItem]
    });

    return objFollowed;

  } catch (error) {
    return error;
  }
}

const getInfoCollections = async () => {
  const url = `https://recaudos-stage.opa.com.co/ZOPA/ObtenerReferenciasPuntoRecaudo`;

  try {
    const response = await axios.post(url);
    const firstRow = []

    response.data.object.map((item, index) => {

      let obj2 = []
      const idCompany = item.companyReferenceId;

      if(item.modifiedCompanyReference.length === 0 && item.totalPayment === 0) {
        obj2 = [];
      } else if(item.modifiedCompanyReference.length > 0) {
        item.modifiedCompanyReference.map(item2 => {
          const obj3 = {
            key: item2.productReferenceId,
            "idReferenciaCompany": idCompany,
            "referenciaProducto": item2.productReferenceId,
            "idProducto": item2.productId,
            "cedula": item2.clientId,
            "codigoProducto": item2.productCode,
            "subCodigoProducto": item2.subProductCode,
            "valor": formatMoney(item2.dueValue),
          }
          
          obj2.push(obj3);  
        
        });
      } else if (item.modifiedCompanyReference.length === 0 && item.totalPayment > 0) {
        item.originalCompanyReference.map(item2 => {
          const obj3 = {
            key: item2.productReferenceId,
            "idReferenciaCompany": idCompany,
            "referenciaProducto": item2.productReferenceId,
            "idProducto": item2.productId,
            "cedula": item2.clientId,
            "codigoProducto": item2.productCode,
            "subCodigoProducto": item2.subProductCode,
            "valor": formatMoney(item2.dueValue),
          }
          
          obj2.push(obj3);  
        });
      }
    
      const obj = {
        key: index,
        "referencia": item.companyReferenceId,
        "cedula": item.clientId,
        "fecha": formatDate(item.dueDate),
        "total": formatMoney(item.totalPayment),
        "originalCompanyReference": obj2,
      }

      firstRow[index] = obj;
    })

    return firstRow;
  } catch (error) {
    return error;
  }
}

const sendInfoProcessed = async (info) => {
  const url = `https://recaudos-stage.opa.com.co/ZOPA/ExcludeProductInCompanyReference`;

  try {
    const response = await axios.post(url, info);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export {
  setFollowedPaysFilter,
  getInfoCollections,
  sendInfoProcessed
}