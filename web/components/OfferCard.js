import react from 'react';

import styles from './OfferCard.module.css';

export default function Card() {
  return (
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        <img src='https://a-static.mlcdn.com.br/618x463/controle-para-ps4-sem-fio-dualshock-4-sony-preto/magazineluiza/043179500/335834b5fb0892a78b9e827251a75414.jpg' />
      </div>
      <h3 className={styles.cardTitle}>Controle Dualshock 4</h3>
      <div className={styles.cardPrice}>
        <p className={styles.cardPriceDe}>R$ 200,00</p>
        <h4 className={styles.cardPricePor}>
          <span>R$</span>150<span>,00</span>
        </h4>
        <p className={styles.cardPriceDescription}>À vista</p>
        <p className={styles.cardPriceSave}>Economize 50 reais</p>
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
