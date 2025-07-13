import React, { useState } from 'react';
import { useAuth } from '../../firebase';
import { User, LogOut } from 'lucide-react';

const UserMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="relative z-[9999]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg bg-white border-2 border-black hover:bg-gray-50 transition-all duration-300"
      >
        <User size={20} className="text-black" />
        <span className="text-black text-sm font-medium">
          {user?.displayName || user?.email || 'User'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border-2 border-black py-2 z-[9999]">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">
              {user?.displayName || 'User'}
            </p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-sm text-black hover:bg-gray-50 transition-colors font-medium"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </button>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default UserMenu; 