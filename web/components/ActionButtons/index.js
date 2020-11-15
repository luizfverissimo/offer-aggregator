import React from 'react';

import styles from './action-button.module.css';

function ActionButtons({ isActive, suggestion, onClickActivity }) {
  return (
    <div className={styles.container}>
      <button type='button' onClick={onClickActivity}>
        <img
          src={
            isActive
              ? require('../../public/close.svg')
              : require('../../public/confirm.svg')
          }
        />
      </button>
      {!suggestion && (
        <button type='button'>
          <img src={require('../../public/edit.svg')} />
        </button>
      )}

      <button type='button'>
        <img src={require('../../public/eye.svg')} />
      </button>
      <button type='button'>
        <img src={require('../../public/delete.svg')} />
      </button>
    </div>
  );
}

export default ActionButtons;
