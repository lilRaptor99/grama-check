import axios from 'axios';

const api = process.env.REACT_APP_GRAMA_INTEGRATOR;

export const getAllPoliceRecords = async () => {
  const accessToken = await localStorage.getItem('access-token');

  const config = {
    method: 'get',
    url: `${api}/policeReport/all`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
