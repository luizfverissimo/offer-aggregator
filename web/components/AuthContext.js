import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';

import Redirect from '../pages/redirect';
import Loading from '../pages/loading';

import api from '../services/api';

const AuthContext = createContext();

const Auth = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')
  const router = useRouter();

  //Sempre que a página é atualizada ele armazena novamente os dados do usuário logado.
  useEffect(() => {
    const userInfoFromLocalStorage = localStorage.getItem('userInfo');
    if (userInfoFromLocalStorage) {
      const userInfo = JSON.parse(userInfoFromLocalStorage);
      const token = userInfo.authToken;

      if (!token) {
        setAuthenticated(false);
      }

      if (token) {
        api.defaults.headers.Authorization = `${token}`;
        setAuthenticated(true);
      }
    }

    setLoading(false);
  }, []);

  //Realiza o requisição de login
  const handleLogin = async (email, password) => {
    setError('')
    try {
      const { data } = await api.post('api/users/login', { email, password });
      console.log(data);
      setUser(data.user);

      localStorage.setItem('userInfo', JSON.stringify(data));
      api.defaults.headers.Authorization = `${data.authToken}`;
      setAuthenticated(true);
      router.push('/dashboard-offers');
    } catch (err) {
      setAuthenticated(false);
      setError('Email ou senha inválidos.')
    }
  };

  //Realiza o logout
  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('userInfo');
    api.defaults.headers.Authorization = undefined;
    router.push('/admin');
  };

  const authenticatedRoute = (children) => {
    if (!authenticated) {
      return <Redirect />;
    }
    if (authenticated) {
      return <>{children}</>;
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        loading,
        user,
        error,
        handleLogin,
        handleLogout,
        authenticatedRoute
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { Auth, AuthContext };
