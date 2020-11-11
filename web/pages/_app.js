import { Router } from 'next/dist/client/router';
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'
import '../styles/globals.css';
import '../styles/normalize.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => {});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
