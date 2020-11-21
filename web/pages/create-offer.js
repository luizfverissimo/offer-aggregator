import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Dashboard from '../components/DashboardMenu';
import api from '../services/api';
import { priceWithDot } from '../services/price_with_dot';

import styles from '../styles/create-offer.module.scss';

function CreateOffer() {
  const [offerId, setOfferId] = useState();
  const [name, setName] = useState('');
  const [urlImage, setUrlImage] = useState('');
  const [urlOffer, setUrlOffer] = useState('');
  const [description, setDescription] = useState('');
  const [offerPrice, setOfferPrice] = useState(0);
  const [normalPrice, setNormalPrice] = useState(0);
  const [coupon, setCoupon] = useState('SEM');
  const [offerText, setOfferText] = useState('');
  const [store, setStore] = useState('');
  const [author, setAuthor] = useState();
  const [affiliateLinks, setAffiliateLinks] = useState([]);
  const [affiliate, setAffiliate] = useState('SEM');

  const router = useRouter();

  const { user } = JSON.parse(localStorage.getItem('userInfo'));

  const fetchOffer = async (id) => {
    const res = await api.get(`/offers/offer?id=${id}`);
    const offer = await res.data;

    setName(offer.name);
    setUrlImage(offer.urlImage);
    setUrlOffer(offer.urlOffer);
    setDescription(offer.description);
    setOfferPrice(priceWithDot(offer.offerPrice));
    setNormalPrice(priceWithDot(offer.normalPrice));
    setCoupon(offer.coupon);
    setOfferText(offer.offerText);
    setStore(offer.store);
    setAffiliate(offer.affiliate)
    return;
  };

  const fetchAffiliates = async () => {
    const res = await api.get(`/affiliates/index-affiliates`);
    const affiliatesRes = await res.data;
    setAffiliateLinks(affiliatesRes)
  }

  useEffect(() => {
    fetchAffiliates()
    setAuthor(user.id);

    const { id } = router.query;
    if (id) {
      fetchOffer(id);
      setOfferId(id);
    }
  }, []);

  const handleCreateOffer = async () => {
    if (
      name.length === 0 ||
      urlImage.length === 0 ||
      urlOffer.length === 0 ||
      description.length === 0 ||
      offerPrice === 0 ||
      normalPrice === 0 ||
      coupon.length === 0 ||
      offerText.length === 0 ||
      store.length === 0
    ) {
      alert('Você precisa preencher todos os campos!');
      return;
    }

    const storeUppercase = store.toUpperCase();

    const removeComma = (number) => {
      const numberString = String(number);
      const numberWithOutComma = numberString.replace(/[,.]/g, '');
      return parseInt(numberWithOutComma);
    };

    if (offerId) {
      const res = await api.put('/offers/update-offer', {
        id: offerId,
        name,
        urlImage,
        urlOffer,
        description,
        offerPrice: removeComma(offerPrice),
        normalPrice: removeComma(normalPrice),
        coupon,
        affiliate,
        offerText,
        store: storeUppercase
      });

      alert('Oferta atualizada com sucesso!');
      router.back();
      return;
    }

    const res = await api.post('/offers/create-offer', {
      name,
      urlImage,
      urlOffer,
      description,
      offerPrice: removeComma(offerPrice),
      normalPrice: removeComma(normalPrice),
      coupon,
      affiliate,
      offerText,
      store: storeUppercase,
      author
    });

    alert('Oferta criada com sucesso!');
    router.back();
  };

  return (
    <>
      <Head>
        <title>Super Oferta do Dia - ADMIN Dashboard</title>
        <link rel='icon' href='/favicon.ico' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>

      <div className={styles.content}>
        <Dashboard />
        <div className={styles.createOfferContent}>
          <div className={styles.headerContainer}>
            <h1>Nova Oferta</h1>
            <button
              type='button'
              className={styles.newOfferButton}
              onClick={handleCreateOffer}
            >
              SALVAR
            </button>
          </div>

          <form>
            <p>*Todos os campos são obrigatórios</p>
            <div className={styles.oneColumn}>
              <label>Nome do produto</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>Link da imagem</label>
              <input
                type='text'
                value={urlImage}
                onChange={(e) => setUrlImage(e.target.value)}
              />
            </div>

            <div className={styles.twoColumn}>
              <div className={styles.container}>
                <label>Link do produto sem afiliados</label>
                <input
                  type='text'
                  value={urlOffer}
                  onChange={(e) => setUrlOffer(e.target.value)}
                />
              </div>
              <div className={styles.container}>
                <label>Afiliado</label>
                <select onChange={(e) => setAffiliate(e.target.value)} >
                <option value='SEM'>SEM</option>
                  {affiliateLinks.map((affiliateLink) => {
                    return (
                      <option key={affiliateLink.id} selected={Number(affiliate) === affiliateLink.id} value={affiliateLink.id}>{affiliateLink.store}</option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className={styles.twoColumn}>
              <div className={styles.container}>
                <label>Descrição da oferta</label>
                <textarea
                  type='text'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className={styles.container}>
                <label>CUPOM</label>
                <input
                  type='text'
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.twoColumn}>
              <div className={styles.container}>
                <label>Preço na promoção</label>
                <input
                  type='number'
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                />
              </div>

              <div className={styles.container}>
                <label>Preço antes</label>
                <input
                  type='number'
                  value={normalPrice}
                  onChange={(e) => setNormalPrice(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.twoColumn}>
              <div className={styles.container}>
                <label>Texto da oferta</label>
                <input
                  type='text'
                  value={offerText}
                  onChange={(e) => setOfferText(e.target.value)}
                />
              </div>
              <div className={styles.container}>
                <label>Loja</label>
                <input
                  type='text'
                  value={store}
                  onChange={(e) => setStore(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateOffer;
