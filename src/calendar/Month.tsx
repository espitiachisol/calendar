import { PropsWithChildren } from 'react';
import { calculateCalendarDates, Locale } from './calendar_utils';
import MonthDates from './MonthDates';
import styles from './Calendar.module.css';

type MonthProps = PropsWithChildren<{
  currentMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  onDayClick: (date: Date) => void;
  locale?: Locale;
}>;

export default function Month({
  currentMonth,
  startDate,
  endDate,
  onDayClick,
  locale,
}: MonthProps) {
  const { previousMonthDates, currentMonthDates, nextMonthDates } =
    calculateCalendarDates(currentMonth, locale);
  return (
    <section className={styles.month}>
      {[previousMonthDates, currentMonthDates, nextMonthDates].map(
        (dates, index) => {
          return (
            <MonthDates
              key={index}
              dates={dates}
              startDate={startDate}
              endDate={endDate}
              onDayClick={onDayClick}
              currentMonth={currentMonth}
              locale={locale}
            />
          );
        }
      )}
    </section>
  );
}
