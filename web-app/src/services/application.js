import axios from 'axios';

const api = process.env.REACT_APP_GRAMA_INTEGRATOR;

export const submitApplication = async (data) => {
  const accessToken = await localStorage.getItem('access-token');
  console.log(data);
  const config = {
    method: 'post',
    url: `${api}/policeReport`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      first_name: data.fname,
      last_name: data.lname,
      id_number: data.nic,
      address: data.address,
      // proof_image_url: data.
    },
  };

  try {
    const response = await axios(config);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
