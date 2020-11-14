import { useRouter } from 'next/router';
import { useContext } from 'react';

import { AuthContext } from './AuthContext';
import Redirect from '../pages/redirect';
import { route } from 'next/dist/next-server/server/router';

const ProtectRoute = ({ children }) => {
  const router = useRouter();
  const { authenticated } = useContext(AuthContext);
  console.log(authenticated)

  function Authenticated() {
    if (!authenticated) {
      return null;
    }
    if (authenticated) {
      return <>{children}</>;
    }
    
  }

  const protectedPath = () => {
    switch (router.pathname) {
      case '/entrou':
        return Authenticated();

      case '/':
        return <>{children}</>;

      case '/admin':
        return <>{children}</>;

      case '/redirect':
        return <>{children}</>;
    }
  };

  return protectedPath();
};

export default ProtectRoute;
