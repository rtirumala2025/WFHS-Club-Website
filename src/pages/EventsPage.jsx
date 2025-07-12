import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EventsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample events data
  const eventsData = [
    {
      id: 1,
      title: 'Academic Bowl Competition',
      club: 'Academic Bowl',
      category: 'Academic',
      date: '2024-02-15',
      time: '3:30 PM - 5:30 PM',
      location: 'Room 105',
      description: 'Join us for our monthly academic competition! Test your knowledge in various subjects.',
      attendees: 25,
      image: 'academic-bowl.jpg'
    },
    {
      id: 2,
      title: 'Robotics Workshop',
      club: 'Robotics Club (FRC)',
      category: 'STEM',
      date: '2024-02-18',
      time: '4:00 PM - 6:00 PM',
      location: 'Room 212',
      description: 'Learn the basics of robotics programming and build your first robot!',
      attendees: 15,
      image: 'robotics.jpg'
    },
    {
      id: 3,
      title: 'Art Exhibition',
      club: 'Art Club',
      category: 'Arts',
      date: '2024-02-20',
      time: '6:00 PM - 8:00 PM',
      location: 'Art Studio',
      description: 'Showcase your artistic talents at our annual art exhibition.',
      attendees: 40,
      image: 'art.jpg'
    },
    {
      id: 4,
      title: 'Debate Tournament',
      club: 'Debate Team',
      category: 'Academic',
      date: '2024-02-22',
      time: '9:00 AM - 4:00 PM',
      location: 'Auditorium',
      description: 'Annual debate tournament featuring teams from across the region.',
      attendees: 60,
      image: 'debate.jpg'
    },
    {
      id: 5,
      title: 'Environmental Cleanup',
      club: 'Environmental Club',
      category: 'Service',
      date: '2024-02-25',
      time: '2:00 PM - 4:00 PM',
      location: 'School Grounds',
      description: 'Help keep our school beautiful! Join us for a campus cleanup event.',
      attendees: 30,
      image: 'environmental.jpg'
    },
    {
      id: 6,
      title: 'Chess Tournament',
      club: 'Chess Club',
      category: 'Recreation',
      date: '2024-02-28',
      time: '3:00 PM - 5:00 PM',
      location: 'Library',
      description: 'Monthly chess tournament for all skill levels.',
      attendees: 20,
      image: 'chess.jpg'
    },
    {
      id: 7,
      title: 'Business Pitch Competition',
      club: 'DECA',
      category: 'Business',
      date: '2024-03-01',
      time: '5:00 PM - 7:00 PM',
      location: 'Room 301',
      description: 'Present your business ideas to a panel of judges.',
      attendees: 35,
      image: 'deca.jpg'
    },
    {
      id: 8,
      title: 'Science Fair',
      club: 'Science Olympiad',
      category: 'STEM',
      date: '2024-03-05',
      time: '6:00 PM - 8:30 PM',
      location: 'Gymnasium',
      description: 'Annual science fair showcasing student research projects.',
      attendees: 80,
      image: 'science.jpg'
    }
  ];

  const categories = ['All', 'Academic', 'STEM', 'Arts', 'Business', 'Service', 'Recreation', 'Cultural', 'Sports'];

  const filteredEvents = eventsData.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Academic': 'bg-purple-100 text-purple-800',
      'STEM': 'bg-blue-100 text-blue-800',
      'Arts': 'bg-pink-100 text-pink-800',
      'Business': 'bg-blue-100 text-blue-800',
      'Service': 'bg-orange-100 text-orange-800',
      'Recreation': 'bg-green-100 text-green-800',
      'Cultural': 'bg-orange-100 text-orange-800',
      'Sports': 'bg-green-100 text-green-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-slate-50">
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 h-[104px] flex items-center shadow-md text-white px-6 relative">
        <button
          onClick={() => navigate('/')}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="max-w-7xl mx-auto w-full text-center">
          <h1 className="text-2xl font-bold leading-tight">Club Events</h1>
          <p className="text-sm text-blue-100 mt-1 leading-snug">
            Discover upcoming events and activities from all WFHS clubs
          </p>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <div className="relative">
                <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <div key={event.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Event Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <Calendar size={48} className="text-white opacity-80" />
              </div>

              {/* Event Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{event.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={16} className="mr-2 text-gray-400" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={16} className="mr-2 text-gray-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="mr-2 text-gray-400" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users size={16} className="mr-2 text-gray-400" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>

                {/* Club Name */}
                <p className="text-sm font-medium text-blue-600 mb-4">{event.club}</p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Join Event
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage; 