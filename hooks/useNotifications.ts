import useSWR from 'swr';

import fetcher from '../libs/fetcher';

const useNotifications = (userId?: string) => {
  const url = userId ? `/api/notifications/${userId}` : null;
  const { data, isLoading, mutate, error } = useSWR(url, fetcher);

  return { data, error, isLoading, mutate };
};

export default useNotifications;
