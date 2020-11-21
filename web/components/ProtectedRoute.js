import { useRouter } from 'next/router';
import { useContext } from 'react';

import { AuthContext } from './AuthContext';

const ProtectRoute = ({ children }) => {
  const router = useRouter();
  const { authenticated, authenticatedRoute } = useContext(AuthContext);
  console.log(authenticated)


  const protectedPath = () => {
    switch (router.pathname) {
      case '/dashboard-suggestions':
        return authenticatedRoute(children);

      case '/dashboard-affiliates':
        return authenticatedRoute(children);

      case '/dashboard-offers':
        return authenticatedRoute(children);

      case '/create-offer':
        return authenticatedRoute(children);

      case '/create-affiliate':
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
