const config = {
  signInRedirectURL: `${process.env.REACT_APP_WEB_URL}/menu`,
  signOutRedirectURL: process.env.REACT_APP_WEB_URL,
  clientID: process.env.REACT_APP_ASGARDEO_CLIENT_ID,
  baseUrl: process.env.REACT_APP_ASGARDEO_BASE_URL,
  scope: ['openid', 'profile'],
};

export default config;
