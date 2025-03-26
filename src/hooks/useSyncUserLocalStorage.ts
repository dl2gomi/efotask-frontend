// the hooks in this file are not being used now
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { setUser } from '../store/slices/userSlice';

const useInitializeUserFromLocalStorage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Runs only on the client
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);
};

const useSyncUserWithLocalStorage = () => {
  const userState = useAppSelector((state) => state.user);

  useEffect(() => {
    // Sync the user state with localStorage on the client
    if (userState.email && userState.name && userState.token) {
      localStorage.setItem('user', JSON.stringify(userState));
    } else {
      localStorage.removeItem('user');
    }
  }, [userState]);
};

export { useInitializeUserFromLocalStorage, useSyncUserWithLocalStorage };
