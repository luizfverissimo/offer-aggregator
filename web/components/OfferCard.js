import react from 'react';

import styles from './OfferCard.module.css';

export default function Card() {
  return (
    <div className={styles.card}>
      <div className={styles.storeTag}>
        AMAZON
      </div>
      <div className={styles.cardImageContainer}>
        <img src='https://compass-ssl.xbox.com/assets/f0/85/f085c120-d3d5-4424-8b70-eb25deaa326e.png?n=XBX_A-BuyBoxBGImage01-D.png' />
      </div>
      <h3 className={styles.cardTitle}>Controle Dualshock 4</h3>
      <div className={styles.cardPrice}>
        <p className={styles.cardPriceDe}>R$ 200,00</p>
        <h4 className={styles.cardPricePor}>
          <span>R$</span>150<span>,00</span>
        </h4>
        <p className={styles.cardPriceDescription}>À vista</p>
        <p className={styles.cardPriceSave}>Economize 50 reais!</p>
      </div>

      <div className={styles.cardButtonContainer}>
        <button>Ir à loja</button>
      </div>

      <footer>
        <p>Por <span>Luiz Fernando</span></p>
        <p>Hà 2 horas</p>
      </footer>
    </div>
  );
}
