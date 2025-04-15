import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import UserSidebar from './UserSidebar'
import { div } from 'framer-motion/client';

const Results = () => {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const storedUser = localStorage.getItem("voterUser");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const { electionId } = useParams()
    const [parties, setParties] = useState([])

    useEffect(() => {
        getData();
        // console.log(parties);
    }, []);
    async function getData() {
        try {
            const res = await fetch(`${SERVER_URL}/parties/${electionId}`);
            const result = await res.json();

            if (result.success) {
                const formatted = result.data.map(party => ({
                    id: party._id,
                    name: party.name,
                    head: party.headname,
                    votes: party.votes
                }));
                // console.log(formatted);
                setParties(formatted); // assuming you have a state like `const [parties, setParties] = useState([])`
            } else {
                console.error("Failed to fetch parties");
            }
        } catch (error) {
            console.error("Error fetching party vote data:", error);
        }
    }


    return (
        <div className="flex flex-col min-h-screen bg-[#141827] relative text-white">

            {/* Main Content */}
            <div className='flex flex-1'>
                {/* Left Sidebar - takes about 25% width */}
                <div className="w-1/4 bg-gray-800">
                    <UserSidebar user={user} />
                </div>

                {/* Right Content Area - takes about 75% width */}
                <div className="w-3/4 overflow-y-auto p-4 pl-6">
                    {/* Header with Home button */}
                    <div className='flex mb-12'>
                        <h2 className='text-4xl font-bold'>Results</h2>
                        <header className="p-4 flex justify-end items-center absolute right-2 top-0">
                            <Link to='/' className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-all duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                                Home
                            </Link>
                        </header>
                    </div>

                    <div className='font-extrabold text-2xl my-6'>
                        Winner: {parties[0]?.name}
                    </div>

                    <div className="space-y-4">
                        {
                        parties?.map((party) => {
                            return (
                            <div
                                key={party.id}
                                className="bg-gray-800 rounded-lg p-5 flex justify-between items-center hover:bg-gray-700 transition-all duration-200"
                            >
                                <div className="flex-1">
                                    <h3 className="text-white text-lg font-medium">{party.name}</h3>
                                </div>

                                <div className="flex-1 text-center">
                                    <p className="text-gray-300 text-sm underline">
                                        {party?.headname}
                                    </p>
                                </div>

                                <div className="flex-1 flex justify-end">
                                    <div className="text-center bg-blue-700 px-4 py-2 rounded-xl text-white text-xl font-bold shadow-inner">
                                        {party.votes} Votes
                                    </div>
                                </div>
                            </div>
                        )})}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Results