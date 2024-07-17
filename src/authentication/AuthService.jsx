const getTokenDuration = () => {
  const storeExpDate = sessionStorage.getItem('expiration');
  const expirationDate = new Date(storeExpDate);
  const now = new Date();
  return expirationDate.getTime() - now.getTime();
}

const isAuthenticated = () => {
  const token = sessionStorage.getItem('access-token');

  if (!token) {
    return;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
};

export { getTokenDuration, isAuthenticated };

