import {
  isAfter,
  isBefore,
  isSameDay,
  isToday,
  getTime,
  isSameMonth,
  format,
  startOfMonth,
  getDaysInMonth,
  getDay,
  addDays,
  subDays,
  subMonths,
  addMonths,
  endOfMonth,
  Day,
} from 'date-fns';

import {
  zhTW as defaultLocale,
  Locale as DateFnsLocale,
} from 'date-fns/locale';

// ** Type **
export type Locale = DateFnsLocale;

const DAYS_IN_WEEK = 7;

// ** Date Formatting **
export function formatDate(
  date: Date,
  pattern: string,
  locale: Locale = defaultLocale
): string {
  if (pattern === 'customYearMonth') {
    return new Intl.DateTimeFormat(locale.code, {
      year: 'numeric',
      month: 'long',
    }).format(date);
  }
  return format(date, pattern, { locale: locale });
}

// ** Date Getters **
export { getTime };

// ** Date Comparison **
export { isToday, isSameMonth, isAfter, isSameDay };

// ** Date Math **
export { subMonths, addMonths };

// ** Utils for components **
type CalendarDates = {
  previousMonthDates: Date[];
  currentMonthDates: Date[];
  nextMonthDates: Date[];
};

/**
 * Calculate the dates to display in a calendar for a given month
 * @param currentMonth - The current month to display
 * @param locale - The locale settings, default is zhTW
 * @returns An object containing arrays of dates for the previous, current, and next months
 */
export function calculateCalendarDates(
  currentMonth: Date,
  locale: Locale = defaultLocale
): CalendarDates {
  const firstDayOfCurrentMonth = startOfMonth(currentMonth);
  const lastDayOfCurrentMonth = endOfMonth(currentMonth);
  const totalDaysInCurrentMonth = getDaysInMonth(currentMonth);
  const weekStartsOn: Day = locale.options?.weekStartsOn ?? 1;

  // Calculate the number of days to show from the previous month
  const daysFromPreviousMonth =
    (getDay(firstDayOfCurrentMonth) - weekStartsOn + DAYS_IN_WEEK) %
    DAYS_IN_WEEK;

  // Total days to be displayed in the calendar, it's either 35 or 42
  const totalCalendarDays =
    Math.ceil(
      (daysFromPreviousMonth + totalDaysInCurrentMonth) / DAYS_IN_WEEK
    ) * DAYS_IN_WEEK;

  // Calculate the number of days to show from the next month
  const daysFromNextMonth =
    totalCalendarDays - (daysFromPreviousMonth + totalDaysInCurrentMonth);

  // Dates in the current month
  const currentMonthDates = Array.from(
    { length: totalDaysInCurrentMonth },
    (_, i) => addDays(firstDayOfCurrentMonth, i)
  );

  // Dates from the previous month,
  const previousMonthDates = Array.from(
    { length: daysFromPreviousMonth },
    (_, i) => subDays(firstDayOfCurrentMonth, i + 1)
  ).reverse();

  // Dates from the next month
  const nextMonthDates = Array.from({ length: daysFromNextMonth }, (_, i) =>
    addDays(lastDayOfCurrentMonth, i + 1)
  );
  return {
    previousMonthDates,
    currentMonthDates,
    nextMonthDates,
  };
}

/**
 * Checks if a date is selected within a given date range
 * @param date - The date to check
 * @param startDate - The start date of the range
 * @param endDate - The end date of the range
 * @returns True if the date is within the range, otherwise false
 */
export function isDateSelected(
  date: Date,
  startDate: Date | null,
  endDate: Date | null
): boolean {
  if (!startDate) return false;
  if (isSameDay(date, startDate)) return true;
  if (endDate && isSameDay(date, endDate)) return true;
  if (endDate && isAfter(date, startDate) && isBefore(date, endDate))
    return true;
  return false;
}
