import type { AppProps } from 'next/app'
import Header from '@/src/components/Header';
import { globalStyles } from '@/src/styles/global'
import { Container } from '@/src/styles/pages/app';

globalStyles(); 

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header />
      <Component {...pageProps} />
    </Container>
  )
}
