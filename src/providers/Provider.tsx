'use client';

import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { ThemeProvider } from '@/providers/ThemeProvider';
import { store } from '@/redux/store';

type Props = {
  children?: React.ReactNode;
};

export const Provider = ({ children }: Props) => (
  <ReduxProvider store={store}>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </ReduxProvider>
);

export const SsrProvider = ({ children }: Props) => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
};
