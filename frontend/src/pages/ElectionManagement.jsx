import React, { useState, useEffect } from 'react';
import AddElectionForm from './AddElectionForm';
import EditElectionForm from './EditElectionForm';
import PartyManagement from './PartyManagement';
import { Link } from 'react-router-dom';
// import { div } from 'framer-motion/client';


const ElectionManagement = (props) => {
    // const [elections, setElections] = useState(props.elections);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentElection, setCurrentElection] = useState(null);
    const [showPartyManagement, setShowPartyManagement] = useState(false);
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    // console.log(elections);
    // useEffect(() => {
    //     props.setElections(props.elections);
    //     // console.log(props.elections);
    // }, [props.elections]);

    // console.log(props?.elections);

    const handleAddElection = async (newElection) => {
        // In a real app, this would make an API call
        // POST REQUEST
        // console.log(SERVER_URL);

        const res = await fetch(`${SERVER_URL}/addelections`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newElection)
        })
        const result = await res.json();
        // console.log(result);

        props.setElections([...props.elections, result.data]);
        // console.log(props.elections);
        setShowAddForm(false);
    };

    const handleEditElection = async (updatedElection) => {
        try {
            const res = await fetch(`${SERVER_URL}/elections/${updatedElection._id}`, {
                method: 'PUT', // or 'PATCH'
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedElection)
            });

            const result = await res.json();

            if (result.success && result.data) {
                props.setElections(props.elections.map(election =>
                    election._id === result.data._id ? result.data : election
                ));
                setShowEditForm(false);
            } else {
                console.error('Failed to update election');
            }
        } catch (error) {
            console.error('Error updating election:', error);
        }
    };

    const handleRemoveElection = async (id) => {
        if (window.confirm('Are you sure you want to remove this election?')) {
            try {
                const res = await fetch(`${SERVER_URL}/elections/${id}`, {
                    method: 'DELETE',
                });

                const result = await res.json();

                if (result.success) {
                    props.setElections(props.elections.filter(election => election._id !== id));
                } else {
                    console.error('Failed to delete election:', result.message);
                }
            } catch (error) {
                console.error('Error deleting election:', error);
            }
        }
    };

    const handleToggleElectionStatus = async (id) => {
        const electionToToggle = props.elections.find(e => e._id === id);

        if (!electionToToggle) {
            console.error("Election not found.");
            return;
        }

        const hasEnded = new Date(electionToToggle.endTime) < new Date();
        if (hasEnded && !electionToToggle.active) {
            alert("Cannot restart an election that has already ended.");
            return;
        }

        try {
            const res = await fetch(`${SERVER_URL}/controlelection`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });

            const result = await res.json();

            if (result.success && result.data) {
                const updated = result.data;

                props.setElections(
                    props.elections.map(election =>
                        election._id === updated._id
                            ? { ...election, active: updated.active }
                            : election
                    )
                );
            } else {
                console.error('Failed to toggle election status');
            }
        } catch (error) {
            console.error('Error toggling election status:', error);
        }
    };

    const handleSelectElection = (election) => {
        setCurrentElection(election);
        setShowPartyManagement(true);
    };

    const handleBackToElections = () => {
        setShowPartyManagement(false);
        setCurrentElection(null);
    };

    if (showAddForm) {
        return <AddElectionForm onAdd={handleAddElection} onCancel={() => setShowAddForm(false)} />;
    }

    if (showEditForm && currentElection) {
        return <EditElectionForm
            election={currentElection}
            onUpdate={handleEditElection}
            onCancel={() => setShowEditForm(false)}
        />;
    }

    if (showPartyManagement && currentElection) {
        return <PartyManagement
            election={currentElection}
            onBack={handleBackToElections}
        />;
    }

    return (
        <div className="p-6 flex flex-col space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Election Management</h2>
                <div className='flex gap-6'>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-md flex items-center gap-2 transition-all duration-200 hover:cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add Election
                    </button>
                    <header className="shadow-md">
                        <div className="container mx-auto flex justify-between items-center">
                            <Link
                                to="/"
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-all duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                                Home
                            </Link>
                        </div>
                    </header>
                </div>
            </div>

            <div className="flex flex-col space-y-4">
                {
                    props.elections?.length > 0 ? (
                        props.elections?.map((election, index) => {
                            return (
                                <div
                                    key={index}
                                    className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-all duration-200"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-white text-lg font-medium">{election.name}</h3>
                                            <p className="text-gray-400 text-sm">{election.description}</p>
                                            <div className="mt-2 text-xs text-gray-500">
                                                <span>Starts: {new Date(election.startTime).toLocaleString()}</span>
                                                <span className="ml-4">Ends: {new Date(election.endTime).toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-sm ${election?.active
                                            ? 'bg-green-900 text-green-300'
                                            : 'bg-red-900 text-red-300'
                                            }`}>
                                            {election.active ? 'Active' : 'Inactive'}
                                        </div>
                                    </div>

                                    <div className="mt-4 flex space-x-3">
                                        <button
                                            onClick={() => handleSelectElection(election)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md text-sm flex items-center gap-1 transition-all duration-200 hover:cursor-pointer"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                            Manage Parties
                                        </button>
                                        <button
                                            onClick={() => {
                                                setCurrentElection(election);
                                                setShowEditForm(true);
                                            }}
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white py-1 px-3 rounded-md text-sm flex items-center gap-1 transition-all duration-200 hover:cursor-pointer"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                            </svg>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleToggleElectionStatus(election._id)}
                                            className={`${election.active ? 'bg-orange-600 hover:bg-orange-700' : 'bg-green-600 hover:bg-green-700'
                                                } text-white py-1 px-3 rounded-md text-sm flex items-center gap-1 transition-all duration-200 hover:cursor-pointer`}
                                        >
                                            {election.active ? (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                                                    </svg>
                                                    Stop
                                                </>
                                            ) : (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                    </svg>
                                                    Start
                                                </>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleRemoveElection(election._id)}
                                            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md text-sm flex items-center gap-1 transition-all duration-200 hover:cursor-pointer"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            )
                        })) : (
                        <div className="text-gray-400 text-sm">No elections to display.</div>
                    )}
            </div>
        </div>
    );
};

export default ElectionManagement;