import { getTime, Locale } from './calendar_utils';
import { Day } from './Day';

type MonthDatesProps = {
  dates: Date[];
  currentMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  onDayClick: (date: Date) => void;
  locale?: Locale;
};

export default function MonthDates({
  dates,
  startDate,
  endDate,
  onDayClick,
  currentMonth,
  locale,
}: MonthDatesProps) {
  return dates.map((date) => {
    return (
      <Day
        key={getTime(date)}
        date={date}
        startDate={startDate}
        endDate={endDate}
        onDayClick={onDayClick}
        currentMonth={currentMonth}
        locale={locale}
      />
    );
  });
}
