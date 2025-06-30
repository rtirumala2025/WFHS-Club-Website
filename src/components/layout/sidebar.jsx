import React, { useState } from 'react';
import {
  Home,
  Users,
  Calendar,
  Search,
  BookOpen,
  Trophy,
  Music,
  Palette,
  Code,
  Heart,
  Globe
} from 'lucide-react';

const Sidebar = ({ selectedCategory, onCategorySelect, clubsByCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categoryIcons = {
    Academic: BookOpen,
    Sports: Trophy,
    Arts: Palette,
    Music: Music,
    Technology: Code,
    Service: Heart,
    Cultural: Globe,
    Other: Users
  };

  const navigationItems = [
    { name: 'Home', icon: Home, id: 'home' },
    { name: 'All Clubs', icon: Users, id: 'all' },
    { name: 'Search', icon: Search, id: 'search' },
    { name: 'Calendar', icon: Calendar, id: 'calendar' }
  ];

  const isSearch = selectedCategory === 'search';

  // Flatten all clubs
  const allClubs =
    clubsByCategory &&
    Object.values(clubsByCategory).flat();

  const filteredClubs =
    isSearch && searchQuery
      ? allClubs?.filter((club) =>
          club.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  return (
    <>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      <div className="h-screen w-64 flex flex-col bg-white border-r border-gray-200 shadow-md">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">WFHS Clubs</h2>
          <p className="text-sm text-gray-600 mt-1">Explore & Join</p>
        </div>

        {/* Navigation */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Navigation
          </h3>
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onCategorySelect?.(item.id);
                    setSearchQuery('');
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                    selectedCategory === item.id
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} className="mr-3" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Scrollable section */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          {isSearch ? (
            <>
              <input
                type="text"
                placeholder="Search clubs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring focus:ring-blue-200"
              />
              <nav className="space-y-1">
                {filteredClubs?.length > 0 ? (
                  filteredClubs.map((club, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 bg-gray-100 rounded-md text-sm text-gray-800"
                    >
                      {club.name}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No clubs found.</p>
                )}
              </nav>
            </>
          ) : (
            <>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Categories
              </h3>
              <nav className="space-y-1">
                {clubsByCategory &&
                  Object.keys(clubsByCategory).map((category) => {
                    const Icon = categoryIcons[category] || Users;
                    const clubCount = clubsByCategory[category]?.length || 0;

                    return (
                      <button
                        key={category}
                        onClick={() => onCategorySelect?.(category)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                          selectedCategory === category
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center">
                          <Icon size={18} className="mr-3" />
                          {category}
                        </div>
                        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {clubCount}
                        </span>
                      </button>
                    );
                  })}
              </nav>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>West Forsyth High School</p>
            <p className="mt-1">Student Clubs Directory</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
