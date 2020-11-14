import { useRouter } from 'next/router';
import { useContext } from 'react';

import { AuthContext } from './AuthContext';
import Redirect from '../pages/redirect';
import { route } from 'next/dist/next-server/server/router';

const ProtectRoute = ({ children }) => {
  const router = useRouter();
  const { authenticated, authenticatedRoute } = useContext(AuthContext);
  console.log(authenticated)


  const protectedPath = () => {
    switch (router.pathname) {
      case '/dashboard-offers':
        return authenticatedRoute(children);

      case '/':
        return <>{children}</>;

      case '/admin':
        return <>{children}</>;

      case '/redirect':
        return <>{children}</>;
      
        case '/loading':
          return <>{children}</>;
    }
  };

  return protectedPath();
};

export default ProtectRoute;
