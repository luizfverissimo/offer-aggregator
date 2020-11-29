import { useRouter } from 'next/router';
import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../components/AuthContext';

import styles from '../styles/redirect.module.css';

function Redirect() {
  const { authenticated } = useContext(AuthContext);

  const router = useRouter();
  useEffect(() => {
    if(authenticated === false){
      router.push('/admin');
    }   
  }, []);

  return (
    <div className={styles.content}>
      <h1>Redirecting...</h1>
    </div>
  );
}

export default Redirect;
