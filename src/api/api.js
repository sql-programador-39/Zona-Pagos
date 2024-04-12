import axios from 'axios';

const setInfoConfig = (config) => {
  console.log(config);
}

const setFollowedPaysFilter = async (filter) => {
  const url = `http://localhost:5000/dataConfig`;

  try {
    const response = await axios(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const getInfoCollections = async (date) => {
  const url = `http://localhost:5000/dataCollection`;

  try {
    const response = await axios(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
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