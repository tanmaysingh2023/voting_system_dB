import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import CountdownTimer from './CountdownTimer';

const PartyList = () => {
  const { electionId } = useParams();
  const [confirmVote, setConfirmVote] = useState(null);
  const [votedParty, setVotedParty] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isElectionEnded, setIsElectionEnded] = useState(false);

  // Mock election data - in a real app, fetch based on electionId
  const election = {
    id: electionId,
    name: "Student Council Elections 2025",
    description: "Vote for your student representatives",
    endTime: "April 6, 2025, 2:56 PM", // Example end time
    parties: [
      {
        id: 1,
        name: "Progressive Student Alliance",
        head: "Sarah Johnson",
      },
      {
        id: 2,
        name: "Student Unity Forum",
        head: "Michael Chen",
      },
      {
        id: 3,
        name: "Campus Reform Coalition",
        head: "Priya Patel",
      },
      {
        id: 4,
        name: "Academic Excellence Party",
        head: "David Rodriguez",
      }
    ]
  };

  // Mock user data
  const user = {
    username: "JohnDoe",
    email: "john.doe@example.com",
    voterId: "VOT123456789"
  };

  const handleVoteClick = (partyId) => {
    setConfirmVote(partyId);
    setShowConfirmation(true);
  };

  const handleConfirmVote = () => {
    // In a real app, send vote to backend
    setVotedParty(confirmVote);
    setShowConfirmation(false);

    // Here you would make an API call to record the vote
    console.log(`Vote confirmed for party ID: ${confirmVote}`);
  };

  const handleCancelVote = () => {
    setConfirmVote(null);
    setShowConfirmation(false);
  };

  const handleElectionEnd = () => {
    setIsElectionEnded(true);
    console.log("Election has ended!");
    // Here you could make API calls to get election results
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#141827] relative">
      {/* Header with Home button */}

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Sidebar - takes about 25% width */}
        <div className="w-1/4 bg-gray-800">
          <UserSidebar user={user} />
        </div>

        {/* Right Content Area - takes about 75% width */}
        <div className="w-3/4 overflow-y-auto space-y-6 px-6 mt-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">{election.name}</h1>
            <div className='flex gap-6 items-center'>

              <CountdownTimer
                endTimeString={election.endTime}
                onElectionEnd={handleElectionEnd}
              />
              {/* <header className="p-4 flex justify-end items-center"> */}
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-all duration-200 hover:cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Home
                </button>
              {/* </header> */}
            </div>
          </div>

          <p className="text-gray-400">{election.description}</p>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">Participating Parties</h2>

            <div className="space-y-4">
              {election.parties.map((party) => (
                <div
                  key={party.id}
                  className="bg-gray-800 rounded-lg p-5 flex justify-between items-center hover:bg-gray-700 transition-all duration-200"
                >
                  <div className="flex-1">
                    <h3 className="text-white text-lg font-medium">{party.name}</h3>
                  </div>

                  <div className="flex-1 text-center">
                    <p className="text-gray-300 text-sm underline">
                      {party.head}
                    </p>
                  </div>

                  <div className="flex-1 flex justify-end">
                    <button
                      onClick={() => handleVoteClick(party.id)}
                      disabled={votedParty !== null || isElectionEnded}
                      className={`px-4 py-2 rounded ${votedParty === party.id
                        ? 'bg-green-600 text-white cursor-default'
                        : votedParty !== null || isElectionEnded
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                        } transition-all duration-200 hover:cursor-pointer`}
                    >
                      {votedParty === party.id ? 'Voted' : 'Vote'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {isElectionEnded && (
              <div className="mt-8 flex justify-center">
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md text-lg font-medium transition-all duration-200 hover:cursor-pointer">
                  Show Results
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vote Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Your Vote</h3>
            <p className="text-gray-300 mb-6">
              You are voting for: <span className="font-semibold">{election.parties.find(p => p.id === confirmVote)?.name}</span>
            </p>
            <p className="text-gray-300 mb-6">
              Once confirmed, you cannot change your vote for this election. Are you sure?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelVote}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-all duration-200 hover:cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmVote}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-all duration-200 hover:cursor-pointer"
              >
                Confirm Vote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartyList;