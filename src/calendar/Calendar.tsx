import {
  addDays,
  addMonths,
  endOfMonth,
  format,
  getDay,
  getDaysInMonth,
  getTime,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns';
import { zhTW } from 'date-fns/locale';
import styles from './Calendar.module.css';
import { useState } from 'react';

function Month({ children }) {
  return <section className={styles.month}>{children}</section>;
}

function MonthDates({
  dates,
  startDate,
  endDate,
  handleClickDay,
  currentMonth,
  locale,
}) {
  return dates.map((date) => {
    return (
      <Day
        key={getTime(date)}
        date={date}
        startDate={startDate}
        endDate={endDate}
        onClickDay={handleClickDay}
        currentMonth={currentMonth}
      >
        {format(date, 'do', { locale })}
      </Day>
    );
  });
}

function Day({ date, currentMonth, startDate, endDate, onClickDay, children }) {
  let className = `${styles.day} `;
  if (isToday(date)) {
    className += `${styles.highlight} `;
  }
  if (!isSameMonth(date, currentMonth)) {
    className += `${styles.muted} `;
  }

  if (startDate) {
    if (isSameDay(date, startDate)) {
      className += `${styles.selected} `;
    }
  }
  if (endDate) {
    if (isSameDay(date, endDate)) {
      className += `${styles.selected} `;
    } else if (isAfter(date, startDate) && isBefore(date, endDate)) {
      className += `${styles.selected} `;
    }
  }

  return (
    <button
      key={getTime(date)}
      className={className}
      onClick={() => onClickDay(date)}
    >
      {children}
    </button>
  );
}

export default function Calendar({
  onSelectRange,
  startDate,
  endDate,
  locale = zhTW,
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const firstDayOfCurrentMonth = startOfMonth(currentMonth);
  const totalDaysInCurrentMonth = getDaysInMonth(currentMonth);
  const weekStartsOn = locale.options?.weekStartsOn ?? 1;

  const daysInWeek = 7;
  const daysFromPreviousMonth =
    (getDay(firstDayOfCurrentMonth) - weekStartsOn + daysInWeek) % daysInWeek;
  const totalCalendarDays =
    Math.ceil((daysFromPreviousMonth + totalDaysInCurrentMonth) / daysInWeek) *
    daysInWeek;
  const daysFromNextMonth =
    totalCalendarDays - (daysFromPreviousMonth + totalDaysInCurrentMonth);

  const currentMonthDates = Array.from(
    { length: totalDaysInCurrentMonth },
    (_, i) => addDays(firstDayOfCurrentMonth, i)
  );
  const previousMonthDates = Array.from(
    { length: daysFromPreviousMonth },
    (_, i) => subDays(firstDayOfCurrentMonth, i + 1)
  ).reverse();

  const lastDayOfCurrentMonth = endOfMonth(currentMonth);
  const nextMonthDates = Array.from({ length: daysFromNextMonth }, (_, i) =>
    addDays(lastDayOfCurrentMonth, i + 1)
  );

  function handlePreviousButtonClick() {
    setCurrentMonth((date) => subMonths(date, 1));
  }

  function handleNextButtonClick() {
    setCurrentMonth((date) => addMonths(date, 1));
  }

  function handleClickDay(date: Date) {
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
      <header className={styles.header}>
        <button
          className={styles.selectMonth}
          onClick={handlePreviousButtonClick}
        >
          &lt;
        </button>
        <time className={styles.currentMonth}>
          {format(currentMonth, 'yyyy年M月', { locale })}
        </time>
        <button className={styles.selectMonth} onClick={handleNextButtonClick}>
          &gt;
        </button>
      </header>
      <Month>
        <MonthDates
          dates={previousMonthDates}
          startDate={startDate}
          endDate={endDate}
          handleClickDay={handleClickDay}
          locale={locale}
          currentMonth={currentMonth}
        />
        <MonthDates
          dates={currentMonthDates}
          startDate={startDate}
          endDate={endDate}
          handleClickDay={handleClickDay}
          locale={locale}
          currentMonth={currentMonth}
        />
        <MonthDates
          dates={nextMonthDates}
          startDate={startDate}
          endDate={endDate}
          handleClickDay={handleClickDay}
          locale={locale}
          currentMonth={currentMonth}
        />
      </Month>
    </article>
  );
}
