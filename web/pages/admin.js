import React, { useContext, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/admin.module.css';
import api from '../services/api';
import { Context, useAuth } from '../services/context/authContext';

export default function adminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { handleLogin } = useAuth();

  async function handleLoginSubmit(e) {
    e.preventDefault();

    const regExEmailValidation = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    if (!regExEmailValidation.test(email)) {
      setError('Digite um e-mail válido.');
      return;
    }

    const emailLowercase = email.toLowerCase();

    handleLogin(emailLowercase, password)

    // const res = api.post('/users/login', {
    //   email: emailLowercase,
    //   password
    // })

    return;
  }

  return (
    <>
      <Head>
        <title>Super Oferta do Dia - ADMIN Dashboard</title>
        <link rel='icon' href='/favicon.ico' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>

      <div className={styles.content}>
        <img src={require('../public/logo.svg')} />
        <h1>ADMIN Dashboard</h1>
        <form>
          <legend>Usuário</legend>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <legend>Senha</legend>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <div className={styles.errorContainer}>{error}</div>

          <button type='submit' onClick={(e) => handleLoginSubmit(e)}>
            Entrar
          </button>
        </form>
      </div>
    </>
  );
}
