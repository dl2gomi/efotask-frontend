import { useEffect } from 'react';
import { useAppDispatch } from '../store';
import { setUser } from '../store/slices/userSlice';
import { useIonRouter } from '@ionic/react';

const TOKEN_EXPIRATION_TIME = parseInt(process.env.REACT_APP_TOKEN_EXPIRE_MINS ?? '1000') * 60 * 1000;

const InitializeUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useIonRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const jsonUser = storedUser && JSON.parse(storedUser);

    if (jsonUser && jsonUser.timestamp) {
      if (new Date().getTime() - jsonUser.timestamp > TOKEN_EXPIRATION_TIME) {
        localStorage.removeItem('user');
        router.push('/login');
        return;
      }
    }

    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return null; // This component does not render anything
};

export default InitializeUser;
