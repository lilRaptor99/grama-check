import axios from 'axios';
import qs from 'qs';

export const handleTokenExchange = (idToken) => {
  const data = qs.stringify({
    grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
    subject_token: idToken,
    subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
    requested_token_type: 'urn:ietf:params:oauth:token-type:jwt',
  });

  const config = {
    method: 'post',
    url: 'https://sts.choreo.dev/oauth2/token',
    headers: {
      Authorization: `Basic ${process.env.REACT_APP_CHOREO_CONSUMER_SECRET}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: 'apim=1669196441.771.386.676202|dcb1dc1c03c8f17e5aa485d6222013b8',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      const result = response.data;
      localStorage.setItem('access-token', result.access_token);
      localStorage.setItem('refresh-token', result.refresh_token);
    })
    .catch(function (error) {
      console.log(error);
    });
};
