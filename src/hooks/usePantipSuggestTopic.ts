import { useCallback, useEffect } from 'react';
import { usePrevious } from 'react-use';

import { getSuggestTopicListByType, setPage } from '@/redux/features/suggestTopicSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

type Props = {
  key: 'room';
};

export const usePantipSuggestTopic = ({ key }: Props) => {
  const isLoading = useAppSelector(state => state.suggestTopicReducer.keys?.[key]?.isLoading);
  const isFetch = useAppSelector(state => state.suggestTopicReducer.keys?.[key]?.isFetch);
  const error = useAppSelector(state => state.suggestTopicReducer.keys?.[key]?.error);
  const pagination = useAppSelector(state => state.suggestTopicReducer.keys?.[key]?.pagination);
  const pages = useAppSelector(state => state.suggestTopicReducer.keys?.[key]?.pages);
  const page = useAppSelector(state => state.suggestTopicReducer.keys?.[key]?.pagination.next_id);
  const dispatch = useAppDispatch();
  const prevPage = usePrevious(page);
  // const allPages = useMemo(() => {
  //   let list: any[] = [];
  //   const pageState = pagination?.next_id || 1;
  //   for (let i = 0; i < pageState; i++) {
  //     const listData = pages?.[i + 1] || [];
  //     // console.log(listData);
  //     if (listData.length) {
  //       list = [
  //         ...list,
  //         ...listData,
  //       ];
  //     }
  //   }
  //   return list;
  // }, [pages]);
  const isPageHasChange = prevPage !== page && prevPage !== undefined;
  const isNotCreatePage = !pages?.[page || 1];

  const setSuggestTopicPage = useCallback((page: number) => {
    dispatch(setPage({ key, page }));
  }, [key]);

  const refetch = async (props: any) => {
    const action = await dispatch(getSuggestTopicListByType(props));
    return action;
  };

  useEffect(() => {
    if (!isFetch) {
      refetch({ key, limit: 1 });
    } else if (isPageHasChange && isNotCreatePage) {
      refetch({ key, limit: 1 });
    }
  }, [key]);

  const list = Object.keys(pages || {}).map(key => pages?.[key]);
  return {
    page,
    pages,
    isLoading,
    isFetch,
    list,
    error,
    pagination,
    refetch,
    setSuggestTopicPage,
  };
};
