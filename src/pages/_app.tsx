import './styles.css';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="App">
        <div className="header">
          <div className="Logo"></div>

          <div className="Img"></div>
        </div>
      </div>
      <Component {...pageProps} />
    </>
  );
}
