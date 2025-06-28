import React from 'react';
import MacroCalendar from '../components/Calendar/MacroCalendar';
import DayDetail from '../components/Calendar/DayDetail';
import { loadEntries } from '../services/storageService';

export default function CalendarPage() {
  const [entries, setEntries] = React.useState(loadEntries());
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleClick = date => {
    const year  = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day   = String(date.getDate()).padStart(2, '0');
    const key = `${year}-${month}-${day}`;
    setSelectedDate(key);
  };

  return (
    <div>
      <h2>Calendar</h2>
      <MacroCalendar entries={entries} onDateClick={handleClick} />
      {selectedDate && (
        <div>
          <h3>Details for {selectedDate}</h3>
          <DayDetail entry={entries[selectedDate]} />
        </div>
      )}
    </div>
  );
}
