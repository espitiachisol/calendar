import { useState } from 'react';
import {
  Locale,
  subMonths,
  addMonths,
  isSameDay,
  isAfter,
} from './calendar_utils';
import Header from './Header';
import Month from './Month';
import styles from './Calendar.module.css';

type CalendarProps = {
  onSelectRange: (range: [Date | null, Date | null]) => void;
  startDate: Date | null;
  endDate: Date | null;
  locale?: Locale;
};

export default function Calendar({
  onSelectRange,
  startDate,
  endDate,
  locale,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  function handlePreviousButtonClick() {
    setCurrentMonth((date) => subMonths(date, 1));
  }

  function handleNextButtonClick() {
    setCurrentMonth((date) => addMonths(date, 1));
  }

  function handleDayClick(date: Date) {
    let start = startDate || null;
    let end = endDate || null;
    if (!start) {
      start = date;
    } else if (!end && (isSameDay(date, start) || isAfter(date, start))) {
      end = date;
    } else {
      start = date;
      end = null;
    }
    onSelectRange([start, end]);
  }

  return (
    <article className={styles.calendar}>
      <Header
        currentMonth={currentMonth}
        onClickPreviousButton={handlePreviousButtonClick}
        onClickNextButton={handleNextButtonClick}
        locale={locale}
      />
      <Month
        currentMonth={currentMonth}
        startDate={startDate}
        endDate={endDate}
        onDayClick={handleDayClick}
        locale={locale}
      />
    </article>
  );
}
