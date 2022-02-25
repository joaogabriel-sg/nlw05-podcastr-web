import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

import styles from "./styles.module.scss";

export function Header() {
  const currentDate = format(new Date(), "EEEEEE, d MMM", { locale: ptBR });

  return (
    <header className={styles.headerContainer}>
      <img
        src="/logo.svg"
        alt="Imagem da logo contendo fones de ouvido e do seu lado o nome Podcastr"
      />

      <p>O melhor para você ouvir sempre</p>

      <span>{currentDate}</span>
    </header>
  );
}
