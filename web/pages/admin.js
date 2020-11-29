import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import styles from '../styles/admin.module.css';
import api from '../services/api';

import { AuthContext } from '../components/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const { handleLogin, error } = useContext(AuthContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();

    const regExEmailValidation = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    if (!regExEmailValidation.test(email)) {
      setErrorEmail('Enter a valid e-mail.');
      return;
    }

    const emailLowercase = email.toLowerCase();

    handleLogin(emailLowercase, password);

    handleLogin(emailLowercase, password);
    return;
  }

  return (
    <>
      <Head>
        <title>Super Oferta do Dia - Login</title>
        <link rel='icon' href='/favicon.ico' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>

      <div className={styles.content}>
        <img src={require('../public/logo.svg')} />
        <h1>ADMIN Dashboard</h1>
        <form>
          <legend>User</legend>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <legend>Password</legend>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <div className={styles.errorContainer}>{error} {errorEmail}</div>

          <button type='submit' onClick={(e) => handleLoginSubmit(e)}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}
