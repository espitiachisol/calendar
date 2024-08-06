import styles from './Calendar.module.css';

export default function Calendar() {
  return (
    <article className={styles.calendar}>
      <header className={styles.header}>
        <button className={styles.selectMonth}>&lt;</button>
        <time className={styles.currentMonth}> 2023 年 6 月</time>
        <button className={styles.selectMonth}>&gt;</button>
      </header>
      <section className={styles.month}>
        {Array.from({ length: 40 }, (_, i) => i + 1).map((day) => {
          return <button className={styles.day}>{day}</button>;
        })}
      </section>
    </article>
  );
}
