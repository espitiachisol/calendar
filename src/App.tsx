import { useState } from 'react';
import Calendar from './calendar/Calendar';
function App() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  function handleSelectRange(dates) {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  }

  return (
    <Calendar
      onSelectRange={handleSelectRange}
      startDate={startDate}
      endDate={endDate}
    />
  );
}
export default App;
