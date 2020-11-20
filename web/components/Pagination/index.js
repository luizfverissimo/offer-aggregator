import React from 'react';

import styles from './pagination.module.scss';

function Pagination({
  onClickNext,
  onClickPrev,
  showNextButton,
  showPrevButton
}) {
  return (
    <div className={styles.pagination}>
      {showPrevButton && (
        <button onClick={onClickPrev}>&larr; Anterior </button>
      )}
      {showNextButton && <button onClick={onClickNext}> Próximo &rarr;</button>}
    </div>
  );
}

export default Pagination;
