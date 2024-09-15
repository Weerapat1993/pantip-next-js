import { useEffect } from 'react';

import { getAnnounceList } from '@/redux/features/announceSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export const usePantipAnnounce = () => {
  const isFetch = useAppSelector(state => state.announceReducer.isFetch);
  const isLoading = useAppSelector(state => state.announceReducer.isLoading);
  const error = useAppSelector(state => state.announceReducer.error);
  const keys = useAppSelector(state => state.announceReducer.keys);
  const listIds = useAppSelector(state => state.announceReducer.listIds);
  const dispatch = useAppDispatch();

  const refetch = async () => {
    dispatch(getAnnounceList());
  };

  useEffect(() => {
    if (!isFetch) {
      refetch();
    }
  }, []);

  const list = listIds.map(key => keys[key]);

  return {
    list,
    isFetch,
    isLoading,
    error,
    refetch,
  };
};
