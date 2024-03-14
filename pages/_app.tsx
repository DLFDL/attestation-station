import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { extendTheme } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { WagmiProvider } from 'wagmi'
import "./globals.css";
import type { AppProps } from 'next/app';

import {wagmiConfig} from '../src/lib/wagmi-config';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}> 
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Component {...pageProps} />
        </SessionProvider>
        </QueryClientProvider> 
        </WagmiProvider> 
    </ChakraProvider>
  );
};

export default MyApp;