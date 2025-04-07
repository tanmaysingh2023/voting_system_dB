// Dashboard.jsx
import React from 'react';
import UserSidebar from './UserSidebar';
import ElectionList from './ElectionList';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    // Mock user data - in a real app, this would come from an API or context
    const user = {
        username: "JohnDoe",
        email: "john.doe@example.com",
        voterId: "VOT123456789"
    };

    // Mock elections data - in a real app, this would come from an API
    const elections = [
        {
            id: 1,
            name: "Student Council Elections 2025",
            description: "Vote for your student representatives",
            active: true
        },
        {
            id: 2,
            name: "Department Head Election",
            description: "Select the new head of Computer Science department",
            active: true
        },
        {
            id: 3,
            name: "Budget Allocation Referendum",
            description: "Vote on the proposed budget for next semester",
            active: false
        },
        {
            id: 4,
            name: "Campus Development Initiative",
            description: "Approve or reject new campus facilities",
            active: false
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#141827] relative">
            {/* Header with Home button */}
            <header className="p-4 flex justify-end items-center absolute right-2">
                <Link to='/' className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    Home
                </Link>
            </header>

            {/* Main Content */}
            <div className="flex flex-1">
                {/* Left Sidebar - takes about 25% width */}
                <div className="w-1/4 bg-gray-800">
                    <UserSidebar user={user} />
                </div>

                {/* Right Content Area - takes about 75% width */}
                <div className="w-3/4 overflow-y-auto">
                    <ElectionList elections={elections} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;