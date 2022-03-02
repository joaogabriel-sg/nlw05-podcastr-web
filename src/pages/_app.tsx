import { AppProps } from "next/app";

import { Header, Player } from "@/components";
import { PlayerProvider } from "@/contexts/PlayerContext";

import styles from "@/styles/pages/app.module.scss";
import "@/styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlayerProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>

        <Player />
      </div>
    </PlayerProvider>
  );
}

export default MyApp;
