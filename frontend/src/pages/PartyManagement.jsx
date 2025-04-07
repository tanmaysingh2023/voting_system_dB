import React, { useState } from 'react';
import AddPartyForm from './AddPartyForm';

const PartyManagement = ({ election, onBack }) => {
  // Mock parties data - in a real app, this would come from an API
  const [parties, setParties] = useState([
    {
      id: 1,
      name: "Progressive Students Union",
      agenda: "Focus on student welfare and academic excellence",
      head: "Jane Smith",
      members: ["Jane Smith", "Alex Johnson", "Priya Patel", "Michael Wong"]
    },
    {
      id: 2,
      name: "Campus Reform Party",
      agenda: "Modernizing campus facilities and educational approaches",
      head: "Robert Chen",
      members: ["Robert Chen", "Sarah Williams", "David Martinez", "Emily Taylor"]
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  
  const handleAddParty = (newParty) => {
    // In a real app, this would make an API call
    const partyWithId = {
      ...newParty,
      id: Math.max(...parties.map(p => p.id), 0) + 1
    };
    setParties([...parties, partyWithId]);
    setShowAddForm(false);
  };
  
  const handleRemoveParty = (id) => {
    // In a real app, this would make an API call
    if (window.confirm('Are you sure you want to remove this party?')) {
      setParties(parties.filter(party => party.id !== id));
    }
  };
  
  if (showAddForm) {
    return <AddPartyForm onAdd={handleAddParty} onCancel={() => setShowAddForm(false)} />;
  }
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="mr-4 text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-colors duration-200 hover:cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-white flex-1">Parties in {election.name}</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-all duration-200 hover:cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Party
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {parties.map((party) => (
          <div 
            key={party.id} 
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-all duration-200"
          >
            <div className="flex justify-between">
              <h3 className="text-white text-lg font-medium">{party.name}</h3>
              <button 
                onClick={() => handleRemoveParty(party.id)}
                className="text-red-400 hover:text-red-300 transition-colors duration-200 hover:cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <p className="text-gray-400 mt-2">{party.agenda}</p>
            
            <div className="mt-4">
              <p className="text-sm text-blue-400 font-medium">Party Head</p>
              <p className="text-white">{party.head}</p>
            </div>
            
            <div className="mt-3">
              <p className="text-sm text-blue-400 font-medium">Members</p>
              <ul className="list-disc list-inside text-white">
                {party.members.map((member, index) => (
                  <li key={index} className="ml-2">{member}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      {parties.length === 0 && (
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-gray-400">No parties have been added to this election yet.</p>
        </div>
      )}
    </div>
  );
};

export default PartyManagement;