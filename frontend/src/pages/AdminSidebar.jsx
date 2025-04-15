import React, { useState } from 'react';

const AdminSidebar = ({ admin }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [username, setUsername] = useState(admin.username);

  const handleSaveSettings = () => {
    // In a real app, this would make an API call to update the username
    console.log(`Saving new admin username: ${username}`);
    // Close the settings panel
    setShowSettings(false);
  };

  return (
    <div className="bg-gray-800 h-screen w-full flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Admin Info Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-center mb-8">
          <div className="h-20 w-20 rounded-full bg-red-900 flex items-center justify-center">
            <span className="text-2xl text-white font-bold">
              {admin.username.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-gray-400 text-sm">Username</p>
            <p className="text-white font-medium">{admin.username}</p>
          </div>
          
          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-white font-medium">{admin.email}</p>
          </div>
          
          <div>
            <p className="text-gray-400 text-sm">Admin ID</p>
            <p className="text-white font-medium">{admin.adminId}</p>
          </div>
        </div>

        {/* Settings Button */}
        <button 
          onClick={() => setShowSettings(true)}
          className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-all duration-200 hover:cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.532 1.532 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          Settings
        </button>
      </div>

      {/* Logout Button */}
      <button 
        onClick={() => {
          window.location.href = "/admin-login";
        }}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-all duration-200 hover:cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v1a1 1 0 102 0V9z" clipRule="evenodd" />
          <path d="M4 9a1 1 0 011-1h4a1 1 0 010 2H5a1 1 0 01-1-1z" />
        </svg>
        Logout
      </button>

      {/* Settings Popup Panel */}
      <div 
        className={`absolute inset-0 bg-gray-700 z-10 p-6 transform transition-transform duration-300 ease-in-out ${
          showSettings ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '100%' }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Admin Settings</h2>
          <button 
            onClick={() => setShowSettings(false)}
            className="text-gray-300 hover:text-white transition-colors duration-200 hover:cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Username - Editable */}
          <div>
            <label htmlFor="username" className="block text-gray-400 text-sm mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-800 text-white p-2 rounded-md border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
            />
          </div>
          
          {/* Email - Read only */}
          <div>
            <label htmlFor="email" className="block text-gray-400 text-sm mb-1">
              Email (cannot be changed)
            </label>
            <input
              id="email"
              type="email"
              value={admin.email}
              disabled
              className="w-full bg-gray-900 text-gray-400 p-2 rounded-md border border-gray-700 cursor-not-allowed"
            />
          </div>
          
          {/* Admin ID - Read only */}
          <div>
            <label htmlFor="adminId" className="block text-gray-400 text-sm mb-1">
              Admin ID (cannot be changed)
            </label>
            <input
              id="adminId"
              type="text"
              value={admin.adminId}
              disabled
              className="w-full bg-gray-900 text-gray-400 p-2 rounded-md border border-gray-700 cursor-not-allowed"
            />
          </div>
          
          {/* Save Button */}
          <button
            onClick={handleSaveSettings}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-all duration-200 hover:cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;