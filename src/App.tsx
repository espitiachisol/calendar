import { useState } from 'react';
import Calendar from './calendar/Calendar';
import { enUS } from 'date-fns/locale';

type DateRange = [Date | null, Date | null];

function App() {
  const [dateRange, setDateRange] = useState<DateRange>([null, null]);
  const [startDate, endDate] = dateRange;

  function handleSelectRange(dates: DateRange) {
    setDateRange(dates);
  }

  return (
    <Calendar
      onSelectRange={handleSelectRange}
      startDate={startDate}
      endDate={endDate}
      locale={enUS}
    />
  );
}
export default App;
