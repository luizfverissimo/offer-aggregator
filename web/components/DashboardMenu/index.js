import React, { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../AuthContext';
import { useRouter } from 'next/router';

import styles from './dashboard-menu.module.scss';

function Dashboard() {
  const { handleLogout } = useContext(AuthContext);
  const router = useRouter()

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
          <li className={router.pathname === '/dashboard-suggestions' ? styles.selected : null}>
            <Link href='/dashboard-suggestions'>
              <a>
                <img src={require('../../public/suggestion.svg')} />
                <p>Sugestões de Ofertas</p>
              </a>
            </Link>
          </li>
          <li className={router.pathname === '/dashboard-offers' ? styles.selected : null}>
            <Link href='/dashboard-offers'>
              <a>
                <img src={require('../../public/price-tag.svg')} />
                <p>Gerenciar ofertas</p>
              </a>
            </Link>
          </li>
          <li className={router.pathname === '/dashboard-users' ? styles.selected : null}>
            <Link href='/dashboard-users'>
              <a>
                <img src={require('../../public/user.svg')} />
                <p>Gerenciar Usuários</p>
              </a>
            </Link>
          </li>
          <li className={router.pathname === '/dashboard-affiliates' ? styles.selected : null}>
            <Link href='/dashboard-affiliates'>
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
