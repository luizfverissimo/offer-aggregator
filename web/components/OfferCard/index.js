import React, { useEffect } from 'react';
import moment from 'moment';
import cn from 'classnames';

import styles from './OfferCard.module.css';

export default function Card({
  active,
  name,
  urlImage,
  urlOffer,
  offerPrice,
  normalPrice,
  offerText,
  store,
  createdAt,
  author
}) {
  function priceWithComma(price) {
    const priceString = String(price);
    const position = priceString.length - 2;
    const output =
      priceString.substring(0, position) +
      ',' +
      priceString.substring(position);
    return output;
  }

  let offerNotActiveImage = cn({
    [styles.inactiveImg]: !active
  });

  let offerNotActiveButton = cn({
    [styles.inactiveBtn]: !active
  });

  moment.locale('pt-BR')
  const createdFromNow = moment(createdAt, 'YYYY/MM/DD HH:mm').fromNow();

  return (
    <div className={styles.card}>
      <div className={styles.storeTag}>{store}</div>
      <div className={styles.cardImageContainer}>
        <a href={urlOffer} target='_blank'>
          <img className={offerNotActiveImage} src={urlImage} />
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
        <a className={offerNotActiveButton} href={urlOffer} target='_blank'>
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
  );
}
