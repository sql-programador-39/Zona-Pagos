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

const dataSource2 = [
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

const setInfoConfig = (config) => {
  console.log(config);
}

const setFollowedPaysFilter = (filter) => {
  console.log(filter);

  return dataSource;
}

const getInfoCollections = (date) => {
  console.log(date);

  return dataSource2;
}

const sendInfoProcessed = (info) => {
  console.log(info);
}

export {
  setInfoConfig,
  setFollowedPaysFilter,
  getInfoCollections,
  sendInfoProcessed
}