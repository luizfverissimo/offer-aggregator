import React, { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import api from '../api'

const Context = createContext()

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState({})

  const router = useRouter()

  //Sempre que a página é atualizada ele armazena novamente os dados do usuário logado. 
  useEffect(() => {
    const userInfoFromLocalStorage = localStorage.getItem('userInfo')
    if (userInfoFromLocalStorage) {
      const userInfo = JSON.parse(
        userInfoFromLocalStorage
      )
      const token = userInfo.authToken

      if (token) {
        api.defaults.headers.Authorization = `${token}`
        setAuthenticated(true)
      }
    }

  }, [])

  //Realiza o requisição de login
  const handleLogin = async (email, password) => {
    try{
      const { data } = await api.post('/users/login', { email, password })
      console.log(data)
      setUser(data.user)
  
      localStorage.setItem('userInfo', JSON.stringify(data))
      api.defaults.headers.Authorization = `${data.authToken}`
      setAuthenticated(true)
      router.push('/entrou')
    } catch (err) {
      setAuthenticated(false)
      alert('E-mail ou senha inválido')
    }
  }

  //Realiza o logout
  const handleLogout = () => {
    setAuthenticated(false)
    localStorage.removeItem('userInfo')
    api.defaults.headers.Authorization = undefined
    router.push('/admin')
  }

  if(loading){
    return <h1>Carregando...</h1>
  }

  return (
    <Context.Provider
      value={{ authenticated, user, handleLogin, handleLogout }}
    >
      {children}
    </Context.Provider>
  )
}

const ProtectRoute = ({ children }) => {
  const router = useRouter()
  const { authenticated } = useAuth();

  function isAuthenticated() {
    if(authenticated) {
      return children;
    }

    if(!authenticated) {
      router.push('/admin')
    }
  }

  switch (window.location.pathname) {
    case "/entrou":
      isAuthenticated()
      break
    
    case "/index":
      return children;
    
    case "/admin":
      return children
  }
};

export const useAuth = () => useContext(Context)
export { Context, AuthProvider, ProtectRoute }

