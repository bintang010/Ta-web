import { AuthProvider } from '@/components/auth/Provider';
import React from 'react';

export default function ServerProviders({ children }) {
  return (
    <AuthProvider>{children}</AuthProvider>
  );
}