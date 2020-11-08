import React, {useState} from 'react';

import api from '../../services/api';

import styles from './styles.module.css';

function Modal({ onClickCloseModal, submitSuggestion, value, onChange }) {
  

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClickCloseModal}>
          X
        </button>
        <h2>Enviar Promoção</h2>
        <input
          type='text'
          placeholder='Digite o link da promoção'
          value={value}
          onChange={onChange}
        />
        <button type='button' onClick={submitSuggestion}>Enviar</button>
      </div>
    </div>
  );
}

export default Modal;
