'use client';
import { ReactNode } from 'react';

import { query } from '@config/query';
import { QueryClientProvider } from '@tanstack/react-query';

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
};
