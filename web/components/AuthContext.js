import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';

import api from '../services/api';

const AuthContext = createContext();

const Auth = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const router = useRouter();

  //Sempre que a página é atualizada ele armazena novamente os dados do usuário logado.
  useEffect(() => {
    const userInfoFromLocalStorage = localStorage.getItem('userInfo');
    if (userInfoFromLocalStorage) {
      const userInfo = JSON.parse(userInfoFromLocalStorage);
      const token = userInfo.authToken;

      if (!token){
        setAuthenticated(false)
      }

      if (token) {
        api.defaults.headers.Authorization = `${token}`;
        setAuthenticated(true);
      }
    }
  }, []);

  //Realiza o requisição de login
  const handleLogin = async (email, password) => {
    try {
      const { data } = await api.post('/users/login', { email, password });
      console.log(data);
      setUser(data.user);

      localStorage.setItem('userInfo', JSON.stringify(data));
      api.defaults.headers.Authorization = `${data.authToken}`;
      setAuthenticated(true);
      router.push('/entrou');
    } catch (err) {
      setAuthenticated(false);
      alert('E-mail ou senha inválido');
    }
  };

  //Realiza o logout
  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('userInfo');
    api.defaults.headers.Authorization = undefined;
    router.push('/admin');
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, user, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { Auth, AuthContext };
