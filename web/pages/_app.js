import { Router } from 'next/dist/client/router';
import NProgress from 'nprogress';

import { Context, ProtectRoute } from '../services/context/authContext';

import 'nprogress/nprogress.css';
import '../styles/globals.css';
import '../styles/normalize.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => {});

function MyApp({ Component, pageProps }) {
  return (
    <Context>
      <ProtectRoute>
        <Component {...pageProps} />
      </ProtectRoute>
    </Context>
  );
}

export default MyApp;
