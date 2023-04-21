const setAuthToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export default setAuthToken;
