import React from 'react';
import AdminSidebar from './AdminSidebar';
import ElectionManagement from './ElectionManagement';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Mock admin data - in a real app, this would come from an API or context
  const admin = {
    username: "AdminUser",
    email: "admin@example.com",
    adminId: "ADM987654321"
  };

  // Mock elections data - in a real app, this would come from an API
  const elections = [
    {
      id: 1,
      name: "Student Council Elections 2025",
      description: "Vote for your student representatives",
      active: true,
      startTime: "2025-04-10T08:00:00",
      endTime: "2025-04-15T17:00:00"
    },
    {
      id: 2,
      name: "Department Head Election",
      description: "Select the new head of Computer Science department",
      active: true,
      startTime: "2025-04-12T09:00:00",
      endTime: "2025-04-14T16:00:00"
    },
    {
      id: 3,
      name: "Budget Allocation Referendum",
      description: "Vote on the proposed budget for next semester",
      active: false,
      startTime: "2025-05-01T08:00:00",
      endTime: "2025-05-05T17:00:00"
    },
    {
      id: 4,
      name: "Campus Development Initiative",
      description: "Approve or reject new campus facilities",
      active: false,
      startTime: "2025-05-10T08:00:00",
      endTime: "2025-05-15T17:00:00"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with Home button */}
      {/* <header className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Control Panel</h1>
          <Link 
            to="/" 
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Home
          </Link>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="container mx-auto flex flex-col md:flex-row">
        {/* Left Sidebar - takes about 25% width */}
        <div className="w-full md:w-1/4">
          <AdminSidebar admin={admin} />
        </div>
        
        {/* Right Content Area - takes about 75% width */}
        <div className="w-full md:w-3/4 bg-gray-900">
          <ElectionManagement elections={elections} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;