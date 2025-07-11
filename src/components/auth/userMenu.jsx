import React, { useState, useEffect, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const UserMenu = ({ user }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  // Close menu if click is outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center px-4 py-2 bg-white text-gray-800 rounded-full shadow hover:bg-gray-100 transition-colors focus:outline-none min-w-[100px]"
        style={{ borderRadius: '1.5rem' }}
      >
        <span className="text-sm font-medium w-full text-center">
          {user.displayName || 'Profile'}
        </span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-50">
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-lg"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;