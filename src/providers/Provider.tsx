'use client';

import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@/redux/store';

type Props = {
  children?: React.ReactNode;
};

export const Provider = ({ children }: Props) => (
  <ReduxProvider store={store}>
    {children}
  </ReduxProvider>
);

export const SsrProvider = ({ children }: Props) => {
  return (
    <ReduxProvider store={store}>
      {children}
    </ReduxProvider>
  );
};
