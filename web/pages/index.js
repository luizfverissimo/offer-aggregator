import Head from 'next/head';
import Link from 'next/link';

import Card from '../components/OfferCard';

import styles from '../styles/landing-page.module.css';

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/index-offers')
  const offers = await res.json()

  return {
    props: { offers }
  }
}

export default function Home({offers}) {
  return (
    <>
      <Head>
        <title>
          Super Oferta do Dia - Encontre a melhor oferta e economize muito
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <img
              src={require('../public/logo.svg')}
              alt='Super Oferta do Dia - Logo'
            />

            <input type='text' placeholder='🔎 Pesquise por um produto' />

            <Link href='/'>
              <a className={styles.enviarPromo}><img src={require('../public/price-tag.svg')} width={24} height={24} /> Enviar promoção</a>
            </Link>
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
            )
          })}
        </section>
      </main>
    </>
  );
}
