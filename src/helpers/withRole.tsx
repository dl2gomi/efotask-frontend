import React, { useEffect } from 'react';
import { useApiRequest, useTelegramUser } from '../hooks';
import { useIonRouter, useIonToast } from '@ionic/react';
import { userInfoUrl } from '../consts/paths';
import { closeCircle } from 'ionicons/icons';

interface WithRoleProps {
  children?: React.ReactNode;
}

export const withRole = (WrappedComponent: React.FC<WithRoleProps>, role: string | null) => {
  const Wrapper: React.FC<WithRoleProps> = (props) => {
    const user = useTelegramUser();
    const router = useIonRouter();
    const [toast] = useIonToast();

    const {
      response: meReponse,
      error: meError,
      loading: meLoading,
      sendRequest: sendMeRequest,
    } = useApiRequest({
      endpoint: userInfoUrl,
      method: 'GET',
      headers: {
        'X-Telegram-Id': user?.user?.id,
      },
    });

    useEffect(() => {
      user && sendMeRequest();
    }, [user]);

    useEffect(() => {
      if (meReponse && meReponse.data?.me) {
        if (meReponse.data.me.role !== role) {
          if (meReponse.data.me.role === null) {
            router.push('/getstarted');
          } else if (meReponse.data.me.role === 'earner') {
            router.push('/tabs/home');
          } else if (meReponse.data.me.role === 'advertiser') {
            router.push('/advs/home');
          }
        }
      }
    }, [meReponse]);

    useEffect(() => {
      meError && toast({ message: meError.message, color: 'danger', icon: closeCircle });
    }, [meError]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};
