import React, { useRef, useState } from 'react';
import moment from 'moment';
import cn from 'classnames';

import { priceWithComma } from '../../services/price_with_comma';
import Modal from '../Modal';

import styles from './styles.module.css';

export default function Card({
  active,
  name,
  urlImage,
  urlOffer,
  offerPrice,
  normalPrice,
  coupon,
  offerText,
  store,
  createdAt,
  author
}) {
  const [isOpen, setIsOpen] = useState(false);

  const textAreaRef = useRef(null);

  let offerNotActiveImage = cn({
    [styles.inactiveImg]: !active
  });

  let offerNotActiveButton = cn({
    [styles.inactiveBtn]: !active
  });

  moment.locale('pt-BR');
  const createdFromNow = moment(createdAt, 'YYYY/MM/DD HH:mm').fromNow();

  const handleGoToStore = (href, coupon) => {
    if (coupon !== 'SEM') {
      setIsOpen(true);
      return;
    }

    window.open(href, '_blank');
  };

  const copyToClipBoardAndNavigate = (href) => {
    textAreaRef.current.select();
    document.execCommand('copy');

    window.open(href, '_blank');
  };

  return (
    <>
      {isOpen && (
        <Modal onClickCloseModal={() => setIsOpen(false)}>
          <h2>Use o código do cupom para obter o desconto.</h2>
          <textarea
            readOnly
            id='coupon'
            value={coupon}
            disable="true"
            ref={textAreaRef}
            style={{
              color: 'var(--color-dark-blue)',
              fontSize: 20,
              width: '50%',
              height: '25px',
              padding: '18px 0',
              border: '1px solid var(--color-green)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              textAlign: 'center'
            }}
          >
            {coupon}
          </textarea>
          <button
            type='button'
            onClick={() => copyToClipBoardAndNavigate(urlOffer, coupon)}
          >
            Copiar e ir para à loja!
          </button>
        </Modal>
      )}
      
      
      <div className={styles.card}>
        <div className={styles.storeTag}>{store}</div>
        <div className={styles.cardImageContainer}>
          <a href={urlOffer} target='_blank'>
            <img className={offerNotActiveImage} src={urlImage} alt={name}/>
          </a>
        </div>
        <h3 className={styles.cardTitle}>{name}</h3>
        <div className={styles.cardPrice}>
          <p className={styles.cardPriceDe}>R$ {priceWithComma(normalPrice)}</p>
          <h4 className={styles.cardPricePor}>
            <span>R$</span>
            {priceWithComma(offerPrice)}
          </h4>
          <p className={styles.cardPriceDescription}>{offerText}</p>
          <p className={styles.cardPriceSave}>
            Economize R$ {priceWithComma(normalPrice - offerPrice)}!
          </p>
        </div>

        <div className={styles.cardButtonContainer}>
          <a
            className={offerNotActiveButton}
            onClick={() => handleGoToStore(urlOffer, coupon)}
          >
            Ir à loja
          </a>
        </div>

        <footer>
          <p>
            Por <span>{author}</span>
          </p>
          <p>{createdFromNow}</p>
        </footer>
      </div>
    </>
  );
}
