import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

import Modal from '../components/Modal';
import Card from '../components/OfferCard';

import api from '../services/api';
import styles from '../styles/landing-page.module.css';

export async function getServerSideProps() {
  const res = await api.get('/index-offers');
  const offers = await res.data;

  return {
    props: { offers }
  };
}

export default function Home({ offers }) {
  const [isOpen, setIsOpen] = useState(false);
  const [offerLink, setOfferLink] = useState('');

  async function submitOfferLinkHandler() {
    const res = await api.post('/create-suggestion', {
      offerLink
    });

    setIsOpen(false)
    setOfferLink('')
    alert("Sua sugestão de promoção foi enviado com sucesso, agradecemos a sua colaboração!")
  }

  return (
    <>
      <Head>
        <title>
          Super Oferta do Dia - Encontre a melhor oferta e economize muito
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {isOpen && (
        <Modal
          onClickCloseModal={() => setIsOpen(false)}
          submitSuggestion={submitOfferLinkHandler}
          value={offerLink}
          onChange={(e) => setOfferLink(e.target.value)}
        />
      )}

      <main>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <img
              src={require('../public/logo.svg')}
              alt='Super Oferta do Dia - Logo'
            />

            <input type='text' placeholder='🔎 Pesquise por um produto' />

            <a className={styles.enviarPromo} onClick={() => setIsOpen(true)}>
              <img
                src={require('../public/price-tag.svg')}
                width={24}
                height={24}
              />{' '}
              Enviar promoção
            </a>
          </div>
        </div>

        <section className={styles.pageContent}>
          {offers.map((offer, index) => {
            return (
              <Card
                key={index}
                active={offer.active}
                name={offer.name}
                urlImage={offer.urlImage}
                urlOffer={offer.urlOffer}
                offerPrice={offer.offerPrice}
                normalPrice={offer.normalPrice}
                offerText={offer.offerText}
                store={offer.store}
                author={offer.author.name}
                createdAt={offer.createdAt}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}
