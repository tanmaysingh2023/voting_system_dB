// Dashboard.jsx
import React from 'react';
import UserSidebar from './UserSidebar';
import ElectionList from './ElectionList';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const navigate = useNavigate();
    // Mock user data - in a real app, this would come from an API or context
    const storedUser = localStorage.getItem("voterUser") ? localStorage.getItem("voterUser") : null;
    const user = storedUser ? JSON.parse(storedUser) : null;
    
    useEffect(() => {
        // if (!user) {
        //     navigate("/user-login"); // Redirect to login if no user is found
        // }
    }, [user, navigate]);

    // Mock elections data - in a real app, this would come from an API
    const [elections, setElections] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate("/user-login"); // Redirect to login if no user is found
        }
        getData();
    }, []);
    async function getData() {
        try {
            const res = await fetch(`${SERVER_URL}/getelections`, {
                method: 'GET',
            });

            const result = await res.json();

            if (result.success && result.data) {
                setElections(result.data);
            } else {
                console.error('Failed to fetch elections');
            }
        } catch (error) {
            console.error('Error fetching elections:', error);
        }
    }


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