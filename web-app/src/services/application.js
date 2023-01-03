import axios from 'axios';

const api = process.env.REACT_APP_GRAMA_INTEGRATOR;

export const submitApplication = async (data) => {
  const accessToken = await localStorage.getItem('access-token');
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
      proof_image_url: data.url,
      user_email: data.email,
    },
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const generateImageLink = async (formData) => {
  const config = {
    method: 'post',
    url: 'https://api.cloudinary.com/v1_1/dfgk4vgol/image/upload',
    data: formData,
  };

  try {
    const response = await axios(config);
    return response.data.secure_url;
  } catch (error) {
    console.error(error);
  }
};

export const getApplicationStatus = async (email) => {
  const accessToken = await localStorage.getItem('access-token');

  console.log(email);

  const config = {
    method: 'get',
    url: `${api}/policeReport/${email}`,
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
