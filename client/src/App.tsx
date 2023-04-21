import React, { useEffect, useState } from "react";
import AuthForm from "./components/AuthForm";
import Header from "./components/Header";
import { IUser } from "./interfaces/user.interface";
import api, { IAuthData } from "./api";
import setAuthToken from "./utils/setAuthToken";
import Notes from "./components/Notes";
import Loader from "./components/common/Loader";

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [appLoading, setAppLoading] = useState<boolean>(true);

  const getUser = async () => {
    const user = await api.getUser();
    setUser(user);
  };

  useEffect(() => {
    getUser().finally(() => setAppLoading(false));
  }, []);

  const handleLogin = async (data: IAuthData) => {
    const { access_token } = await api.login(data);
    setAuthToken(access_token);
    getUser();
  };

  const handleRegister = async (data: IAuthData) => {
    const { access_token } = await api.register(data);
    setAuthToken(access_token);
    getUser();
  };

  if (appLoading) return <Loader />;

  return (
    <div className="App">
      <Header />
      {!Boolean(user) && (
        <AuthForm handleLogin={handleLogin} handleRegister={handleRegister} />
      )}
      {Boolean(user) && <Notes />}
    </div>
  );
}

export default App;
