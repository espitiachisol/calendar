import { formatDate, Locale } from './calendar_utils';
import styles from './Calendar.module.css';

type HeaderProps = {
  currentMonth: Date;
  onClickPreviousButton: () => void;
  onClickNextButton: () => void;
  locale?: Locale;
};

export default function Header({
  currentMonth,
  onClickPreviousButton,
  onClickNextButton,
  locale,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <button className={styles.selectMonth} onClick={onClickPreviousButton}>
        &lt;
      </button>
      <time className={styles.currentMonth}>
        {formatDate(currentMonth, 'customYearMonth', locale)}
      </time>
      <button className={styles.selectMonth} onClick={onClickNextButton}>
        &gt;
      </button>
    </header>
  );
}
