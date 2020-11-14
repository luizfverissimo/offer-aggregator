import React, { useContext, useState } from 'react';

import Link from 'next/link';
import { AuthContext } from '../AuthContext';

import styles from './dashboard-menu.module.css';

function Dashboard() {
  const { handleLogout } = useContext(AuthContext);

  const { user } = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <img src={require('../../public/logo.svg')} />
        <h3>Dashboard</h3>
        <p>{user.name}</p>
      </div>
      <div className={styles.menu}>
        <ul>
          <li>
            <Link href='#'>
              <a>
                <img src={require('../../public/suggestion.svg')} />
                <p>Sugestões de Ofertas</p>
              </a>
            </Link>
          </li>
          <li>
            <Link href='#'>
              <a>
                <img src={require('../../public/price-tag.svg')} />
                <p>Gerenciar ofertas</p>
              </a>
            </Link>
          </li>
          <li>
            <Link href='#'>
              <a>
                <img src={require('../../public/user.svg')} />
                <p>Gerenciar Usuários</p>
              </a>
            </Link>
          </li>
          <li>
            <Link href='#'>
              <a>
                <img src={require('../../public/link.svg')} />
                <p>Gerenciar Links de Afiliados</p>
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <footer>
        <a onClick={handleLogout}>&larr; Logout</a>
      </footer>
    </div>
  );
}

export default Dashboard;
