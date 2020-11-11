import Head from 'next/head';
import styles from '../styles/admin.module.css';

export default function adminLogin() {
  return (
    <>
      <Head>
        <title>
          Super Oferta do Dia - ADMIN Dashboard
        </title>
        <link rel='icon' href='/favicon.ico' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>

      <div className={styles.content}>
        <img src={require('../public/logo.svg')} />
        <h1>ADMIN Dashboard</h1>
        <form>
          <legend>Usuário</legend>
          <input type='text'></input>

          <legend>Senha</legend>
          <input type='password'></input>

          <button type='submit'>Entrar</button>
        </form>
      </div>
    </>
  );
}
