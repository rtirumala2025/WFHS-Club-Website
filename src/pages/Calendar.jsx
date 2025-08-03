import React, { useMemo, useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

// Sample events (from Events.jsx, but with 2025 dates for demo)
const eventsData = [
  {
    id: 1,
    title: 'Academic Bowl Competition',
    start: new Date('2025-08-05T15:30:00'),
    end: new Date('2025-08-05T17:00:00'),
    description: 'Annual Academic Bowl competition.',
    location: 'Room 201',
    organizer: 'Academic Bowl',
  },
  {
    id: 2,
    title: 'Art Club Exhibition',
    start: new Date('2025-08-12T16:00:00'),
    end: new Date('2025-08-12T18:00:00'),
    description: 'Showcase of student artwork.',
    location: 'Art Gallery',
    organizer: 'Art Club',
  },
  {
    id: 3,
    title: 'Chess Tournament',
    start: new Date('2025-08-20T15:30:00'),
    end: new Date('2025-08-20T17:30:00'),
    description: 'Monthly chess tournament.',
    location: 'Library',
    organizer: 'Chess Club',
  },
  {
    id: 4,
    title: 'Robotics Competition',
    start: new Date('2025-08-25T15:00:00'),
    end: new Date('2025-08-25T18:00:00'),
    description: 'FRC robotics competition prep.',
    location: 'Robotics Lab',
    organizer: 'Robotics Club',
  },
];

const locales = {
  'en-US': enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const Calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const defaultDate = useMemo(() => new Date(2025, 7, 1), []); // August 2025
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob z-0" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000 z-0" />
      <div className="relative z-10 w-full max-w-7xl flex flex-col gap-0 items-stretch justify-center min-h-[80vh]">
        {/* Back Button */}
        <div className="flex items-center justify-start mb-1">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium text-lg mb-2"
          >
            <ChevronLeft size={24} className="mr-2" />
            Back
          </button>
        </div>
        <div className="w-full flex-1 flex flex-col lg:flex-row gap-10 items-stretch justify-center min-h-[70vh]">
          {/* Main Calendar Card */}
          <div className="flex-1 bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center min-w-[350px] min-h-[70vh]">
            <h1 className="text-4xl font-extrabold mb-2 text-blue-900 text-center">August 2025 Calendar</h1>
            <p className="text-lg text-blue-700 mb-8 text-center">Click on an event to see details. All school events are shown here!</p>
            <BigCalendar
              localizer={localizer}
              events={eventsData}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600, width: '100%' }}
              defaultDate={defaultDate}
              views={['month', 'week', 'day']}
              onSelectEvent={event => setSelectedEvent(event)}
              popup
            />
          </div>
          {/* Event Details Panel (side on desktop, below on mobile) */}
          {selectedEvent && (
            <div className="flex-1 max-w-lg w-full bg-blue-50 rounded-3xl shadow-xl p-8 flex flex-col justify-center mt-8 lg:mt-0 min-h-[70vh]">
              <h2 className="text-2xl font-bold mb-2 text-blue-900">{selectedEvent.title}</h2>
              <p className="mb-1"><b>Organizer:</b> {selectedEvent.organizer}</p>
              <p className="mb-1"><b>Location:</b> {selectedEvent.location}</p>
              <p className="mb-1"><b>Start:</b> {selectedEvent.start.toLocaleString()}</p>
              <p className="mb-1"><b>End:</b> {selectedEvent.end.toLocaleString()}</p>
              <p className="mb-2"><b>Description:</b> {selectedEvent.description}</p>
              <button onClick={() => setSelectedEvent(null)} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 self-start">Close</button>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
};

export default Calendar; 