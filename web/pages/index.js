import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import InfiniteScroll from 'react-infinite-scroll-component';

import 'nprogress/nprogress.css';

import Modal from '../components/Modal';
import Card from '../components/OfferCard';

import api from '../services/api';
import styles from '../styles/landing-page.module.css';

export default function Home() {
  const [offers, setOffers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [offerLink, setOfferLink] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [timer, setTimer] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const router = useRouter();

  const fetchOffers = async () => {
    NProgress.start();
    const res = await api.get('/offers/index-offers?rows=10');
    const offersRes = await res.data;
    setOffers(offersRes);
    NProgress.done();
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  async function submitOfferLinkHandler() {
    const regExUrlValidation = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;
    //verifica se a url é válida
    if (!regExUrlValidation.test(offerLink)) {
      alert('Adicione uma URL válida!');
      return;
    }
    let validatedUrl = offerLink;
    //verifica se a url possui http:// ou https://, caso não, adiciona
    if (!/(http(s?)):\/\//i.test(validatedUrl)) {
      validatedUrl = `http://${offerLink}`;
    }

    const res = await api.post('/suggestions/create-suggestion', {
      offerLink: validatedUrl
    });

    setIsOpen(false);
    setOfferLink('');
    alert(
      'Sua sugestão de promoção foi enviado com sucesso, agradecemos a sua colaboração!'
    );
  }

  const fetchSearchOffers = async (query) => {
    NProgress.start();
    if (query === '') {
      const res = await api.get('/offers/index-offers');
      const offersRes = await res.data;
      setOffers(offersRes);
      NProgress.done();
      return;
    }

    const res = await api.get(`/offers/search-offers?search=${query}`);
    const offersRes = await res.data;
    setOffers(offersRes);
    NProgress.done();
    return;
  };

  const handleSearchEnter = (e) => {
    if (e.keyCode === 13) {
      clearTimeout(timer);
      fetchSearchOffers(searchQuery);
      return;
    }
    return;
  };

  const handleAutoSearch = (e) => {
    setSearchQuery(e.target.value);
    clearTimeout(timer);
    if (e.target.value.length > 3 || e.target.value.length === 0) {
      const actualTimer = setTimeout(() => {
        fetchSearchOffers(e.target.value);
      }, 2000);

      setTimer(actualTimer);
    }
    return;
  };

  const handleNextOffers = async () => {
    NProgress.start();
    const index = offers.length - 1;
    const rows = 10
    const res = await api.get(
      `/offers/index-offers?cursor=${offers[index].id}&rows=${rows}`
    );
    const offersRes = await res.data;
    const increaseOffers = offers.concat(offersRes);
    if (offersRes.length === 0) {
      setHasMore(false);
      NProgress.done();
      return;
    }

    setOffers(increaseOffers);
    NProgress.done();
    return;
  };

  return (
    <>
      <Head>
        <title>
          Super Oferta do Dia - Encontre a melhor oferta e economize muito
        </title>
        <link rel='icon' href='/favicon.ico' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>

      {isOpen && (
        <Modal onClickCloseModal={() => setIsOpen(false)}>
          <h2>Enviar Promoção</h2>
          <input
            type='text'
            placeholder='Digite o link da promoção'
            value={offerLink}
            onChange={(e) => setOfferLink(e.target.value)}
          />
          <button type='button' onClick={submitOfferLinkHandler}>
            Enviar
          </button>
        </Modal>
      )}

      <main>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <img
              src={require('../public/logo.svg')}
              alt='Super Oferta do Dia - Logo'
            />

            <input
              type='text'
              placeholder='🔎 Pesquise por um produto'
              value={searchQuery}
              onKeyUp={(e) => handleSearchEnter(e)}
              onChange={(e) => handleAutoSearch(e)}
            />

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

        <InfiniteScroll
          dataLength={offers.length}
          next={handleNextOffers}
          hasMore={hasMore}
          loader={
            <h3
              style={{ textAlign: 'center', color: 'var(--color-dark-blue)' }}
            >
              Carregando mais ofertas especiais...
            </h3>
          }
          endMessage={
            <h3
              style={{ textAlign: 'center', color: 'var(--color-dark-blue)' }}
            >
              😭 Você já viu todas as ofertas
            </h3>
          }
        >
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
                  coupon={offer.coupon}
                  offerText={offer.offerText}
                  store={offer.store}
                  author={offer.author.name}
                  createdAt={offer.createdAt}
                />
              );
            })}
          </section>
        </InfiniteScroll>
      </main>
    </>
  );
}
