const config = {
  signInRedirectURL: `${process.env.REACT_APP_WEB_URL}/dashboard`,
  signOutRedirectURL: `${process.env.REACT_APP_WEB_URL}/home`,
  clientID: process.env.REACT_APP_ASGARDEO_CLIENT_ID,
  baseUrl: process.env.REACT_APP_ASGARDEO_BASE_URL,
  scope: ['openid', 'profile'],
};

export default config;
