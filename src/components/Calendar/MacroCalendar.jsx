import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function MacroCalendar({ entries, onDateClick }) {
  const tileContent = ({ date, view }) => {
    const year  = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day   = String(date.getDate()).padStart(2, '0');
    const key = `${year}-${month}-${day}`;
    return entries[key] ? <div style={{ background: '#aaf', borderRadius: '50%', width: 8, height: 8 }} /> : null;
  };
  return (
    <Calendar
      onClickDay={onDateClick}
      tileContent={tileContent}
    />
  );
}
