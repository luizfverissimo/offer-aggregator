import React, {useState} from 'react';

import api from '../../services/api';

import styles from './styles.module.css';

function Modal({ onClickCloseModal, children}) {
  

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClickCloseModal}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
