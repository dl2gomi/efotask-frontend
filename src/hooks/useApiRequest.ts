import { useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface UseApiRequestProps {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  params?: any;
  headers?: Record<string, string>;
}

interface UseApiRequestResponse<T extends { message?: string; data?: any; [key: string]: any }> {
  response: T | null;
  error: T | null;
  loading: boolean;
  sendRequest: (dynData?: any, dynParams?: any, dynEndpoint?: string) => Promise<void>;
}

export const useApiRequest = <T extends { message?: string; data?: any; [key: string]: any }>({
  endpoint,
  method = 'GET',
  data = null,
  params = null,
  headers = { 'Content-Type': 'application/json' },
}: UseApiRequestProps): UseApiRequestResponse<T> => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendRequest = async (dynData = {}, dynParams = {}, dynEndpoint = '') => {
    setLoading(true);
    setError(null);

    const config: AxiosRequestConfig = {
      url: endpoint + '/' + dynEndpoint,
      method,
      headers,
      data: {
        ...data,
        ...dynData,
      },
      params: {
        ...params,
        ...dynParams,
      },
    };

    try {
      const res: AxiosResponse<T> = await axios(config);
      setResponse(res.data);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err?.response?.data ?? err);
      } else {
        setError({ message: err?.response?.statusText ?? 'Something went wrong!' } as T);
      }
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, sendRequest };
};
