import { useEffect } from 'react';

import { getCategoryList } from '@/redux/features/categorySlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export const usePantipCategory = () => {
  const isFetch = useAppSelector(state => state.categoryReducer.isFetch);
  const isLoading = useAppSelector(state => state.categoryReducer.isLoading);
  const error = useAppSelector(state => state.categoryReducer.error);
  const keys = useAppSelector(state => state.categoryReducer.keys);
  const listIds = useAppSelector(state => state.categoryReducer.listIds);
  const dispatch = useAppDispatch();

  const refetch = async () => {
    dispatch(getCategoryList());
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
