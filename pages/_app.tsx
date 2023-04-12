import Layout from '../components/Layout';
import LoginModal from '../modals/LoginModal';
import RegisterModal from '../modals/RegisterModal';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
