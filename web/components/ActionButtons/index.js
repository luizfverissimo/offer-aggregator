import React from 'react';

import styles from './action-button.module.css';

function ActionButtons({ isActive, suggestion, onClickActivity, onClickDelete, onClickEdit, href }) {
  return (
    <div className={styles.container}>
      {!suggestion && (
        <>
          <button type='button' onClick={onClickActivity}>
            <img
              src={
                isActive
                  ? require('../../public/close.svg')
                  : require('../../public/confirm.svg')
              }
            />
          </button>
          <button type='button' onClick={onClickEdit}>
            <img src={require('../../public/edit.svg')} />
          </button>
        </>
      )}

      <button type='button'>
        <a href={href} target="_blank">
        <img src={require('../../public/eye.svg')} />
        </a>
      </button>
      <button type='button' onClick={onClickDelete}>
        <img src={require('../../public/delete.svg')} />
      </button>
    </div>
  );
}

export default ActionButtons;
