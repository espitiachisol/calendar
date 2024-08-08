import {
  isToday,
  isSameMonth,
  getTime,
  isDateSelected,
  formatDate,
  Locale,
} from './calendar_utils';
import styles from './Calendar.module.css';

type DayProps = {
  date: Date;
  currentMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  onDayClick: (date: Date) => void;
  locale?: Locale;
};

export function Day({
  date,
  startDate,
  endDate,
  onDayClick,
  currentMonth,
}: DayProps) {
  let className = `${styles.day} `;
  if (isToday(date)) {
    className += `${styles.highlight} `;
  }
  if (!isSameMonth(date, currentMonth)) {
    className += `${styles.muted} `;
  }
  if (isDateSelected(date, startDate, endDate)) {
    className += `${styles.selected} `;
  }

  return (
    <button
      key={getTime(date)}
      className={className}
      onClick={() => onDayClick(date)}
    >
      {formatDate(date, 'do')}
    </button>
  );
}
