import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import CountdownTimer from './CountdownTimer';
import { Link } from 'react-router-dom';

const PartyList = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const { electionId } = useParams(); // get election id from URL
  const [confirmVote, setConfirmVote] = useState(null);
  const [votedParty, setVotedParty] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const storedUser = localStorage.getItem("voterUser");
  const user = storedUser ? JSON.parse(storedUser) : null;
  // console.log(user);

  const [election, setElection] = useState({});
  useEffect(() => {
    getData();
  }, []);
  const [isElectionEnded, setIsElectionEnded] = useState(election.active);
  async function getData() {
    try {
      // Get election data
      const electionRes = await fetch(`${SERVER_URL}/getelections/${electionId}`);
      const electionData = await electionRes.json();

      // Get parties for that election
      const partiesRes = await fetch(`${SERVER_URL}/parties/${electionId}`);
      const partiesData = await partiesRes.json();

      // Get user's vote for this election
      const voteRes = await fetch(`${SERVER_URL}/vote/${user._id}/${electionId}`);
      const voteData = await voteRes.json();
      
      voteData.success ? setVotedParty(voteData.data.partyID) : setVotedParty(null);
      // console.log(electionData.data);
      if (electionData.success && partiesData.success) {
        const formatted = {
          id: electionId,
          name: electionData.data.name,
          description: electionData.data.description,
          active: electionData.data.active,
          endTime: new Date(electionData.data.endTime).toLocaleString(),
          parties: partiesData.data.map(party => ({
            id: party._id,
            name: party.name,
            head: party.headname,
          })),
          votedPartyID: voteData.success ? voteData.data.partyID : null // <-- include this
        };

        
        setElection(formatted);
        // console.log(election.active)
      } else {
        console.error("Failed to load election or parties.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleVoteClick = (partyId) => {
    // console.log(showConfirmation);
    setConfirmVote(partyId);
    setShowConfirmation(true);
  };

  const handleConfirmVote = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          voterID: user._id, // replace with the actual logged-in voter's ID
          electionID: electionId, // replace with the current election's ID
          partyID: confirmVote
        })
      });

      const result = await res.json();

      if (result.success) {
        setVotedParty(confirmVote);
        setShowConfirmation(false);
        console.log(`Vote recorded for party ID: ${confirmVote}`);
      } else {
        console.error('Failed to record vote');
      }
    } catch (error) {
      console.error('Error recording vote:', error);
    }
  };


  const handleCancelVote = () => {
    setConfirmVote(null);
    setShowConfirmation(false);
  };

  const handleElectionEnd = () => {
    setIsElectionEnded(true);
    // console.log("Election has ended!");
    // Here you could make API calls to get election results
  };

  // console.log(election?.votedPartyID);

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
              {election.parties?.map((party) => (
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
                    <button
                      onClick={() => handleVoteClick(party.id)}
                      disabled={votedParty !== null || isElectionEnded || !election.active}
                      className={`px-4 py-2 rounded ${election.active && votedParty === party.id
                        ? 'bg-green-600 text-white cursor-default'
                        : votedParty !== null || isElectionEnded || !election.active
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                        } transition-all duration-200`}
                    >
                      {election.active && votedParty === party.id ? 'Voted' : 'Vote'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {isElectionEnded && (
              <Link to={`/results/${electionId}`} className="mt-8 flex justify-center">
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md text-lg font-medium transition-all duration-200 hover:cursor-pointer">
                  Show Results
                </button>
              </Link>
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