import React from 'react';
import { Link } from 'react-router-dom';


const ElectionList = ({ elections }) => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Active Elections</h2>
      
      <div className=" flex flex-col space-y-4">
        {elections.map((election) => (
          <Link 
            key={election.id} 
            to={election.active ? `/election/${election.id}` : '#'}
            className={election.active ? '' : 'pointer-events-none'}
          >
            <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center hover:bg-gray-700 transition-all duration-200">
              <div>
                <h3 className="text-white text-lg font-medium">{election.name}</h3>
                <p className="text-gray-400 text-sm">{election.description}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                election.active 
                  ? 'bg-green-900 text-green-300' 
                  : 'bg-red-900 text-red-300'
              }`}>
                {election.active ? 'Active' : 'Inactive'}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ElectionList;