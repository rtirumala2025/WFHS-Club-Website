import React, { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: 'Test Event',
    start: new Date(),
    end: new Date(),
  },
];

const CalendarSection = () => {
  // You can add state for modal/events later
  return (
    <section className="w-full max-w-5xl mx-auto mt-12">
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 border border-blue-200" style={{ minHeight: 600 }}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-700">Club Events Calendar</h2>
        </div>
        <div style={{ height: 500, background: '#f8fafc', borderRadius: '1rem', padding: '1rem' }}>
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
          />
        </div>
        <div className="text-center text-gray-400 mt-4">
          If you do not see a calendar above, please let us know.
        </div>
      </div>
    </section>
  );
};

export default CalendarSection; 