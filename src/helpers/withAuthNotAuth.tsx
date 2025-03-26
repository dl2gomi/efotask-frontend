import { useIonRouter } from '@ionic/react';
import { useEffect } from 'react';

interface WithAuthProps {
  children: React.ReactNode;
}

export const withAuth = (WrappedComponent: React.FC<WithAuthProps>) => {
  const Wrapper: React.FC<WithAuthProps> = (props) => {
    const router = useIonRouter();

    useEffect(() => {
      const savedUser = localStorage.getItem('user');
      const user = savedUser && JSON.parse(savedUser);

      if (!user) {
        router.push('/login'); // Redirect to login if not authenticated
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export const withNotAuth = (WrappedComponent: React.FC<WithAuthProps>) => {
  const Wrapper: React.FC<WithAuthProps> = (props) => {
    const router = useIonRouter();

    useEffect(() => {
      const savedUser = localStorage.getItem('user');
      const user = savedUser && JSON.parse(savedUser);

      if (user) {
        router.push('/tabs/profile'); // Redirect to profile if authenticated
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};
