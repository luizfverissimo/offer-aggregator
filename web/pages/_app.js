import React from 'react';
import { Router } from 'next/dist/client/router';
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';
import '../styles/globals.css';
import '../styles/normalize.css';
import { Auth } from '../components/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => {});

function MyApp({ Component, pageProps }) {
  return (
    <Auth>
      <ProtectedRoute>
        <Component {...pageProps} />
      </ProtectedRoute>
    </Auth>
  );
}

export default MyApp;
