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
        <button onClick={onClickPrev}>&larr; Previous </button>
      )}
      {showNextButton && <button onClick={onClickNext}> Next &rarr;</button>}
    </div>
  );
}

export default Pagination;
