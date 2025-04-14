import React, { useState } from 'react';

const AddPartyForm = ({ onAdd, onCancel, electionID }) => {
  const [formData, setFormData] = useState({
    name: '',
    agenda: '',
    headname: '',
    members: ['', '', ''], // 4 members including head
    electionID: electionID,
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleMemberChange = (index, value) => {
    const newMembers = [...formData.members];
    newMembers[index] = value;
    setFormData(prev => ({ ...prev, members: newMembers }));
    
    // Clear error when user starts typing
    if (errors[`member${index}`]) {
      setErrors(prev => ({ ...prev, [`member${index}`]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Party name is required';
    }
    
    if (!formData.agenda.trim()) {
      newErrors.agenda = 'Agenda is required';
    }
    
    if (!formData.headname.trim()) {
      newErrors.headname = 'Party head name is required';
    }
    
    // Validate all members
    formData.members.forEach((member, index) => {
      if (!member.trim()) {
        newErrors[`member${index}`] = `Member ${index + 1} name is required`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Copy the head's name to the first member if they're the same person
      const finalData = { ...formData };
      // if (finalData.members[0] === '') {
      //   finalData.members[0] = finalData.headname;
      // }
      
      onAdd(finalData);
    }
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Add New Party</h2>
        <button 
          onClick={onCancel}
          className="text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-colors duration-200 hover:cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-400 text-sm mb-1">
            Party Name*
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-gray-700 text-white p-2 rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-600'} focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="agenda" className="block text-gray-400 text-sm mb-1">
            Party Agenda*
          </label>
          <textarea
            id="agenda"
            name="agenda"
            value={formData.agenda}
            onChange={handleChange}
            rows="3"
            className={`w-full bg-gray-700 text-white p-2 rounded-md border ${errors.agenda ? 'border-red-500' : 'border-gray-600'} focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200`}
          />
          {errors.agenda && <p className="mt-1 text-sm text-red-500">{errors.agenda}</p>}
        </div>
        
        <div>
          <label htmlFor="headname" className="block text-gray-400 text-sm mb-1">
            Party Head Name*
          </label>
          <input
            id="headname"
            name="headname"
            type="text"
            value={formData.headname}
            onChange={handleChange}
            className={`w-full bg-gray-700 text-white p-2 rounded-md border ${errors.headname ? 'border-red-500' : 'border-gray-600'} focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200`}
          />
          {errors.headname && <p className="mt-1 text-sm text-red-500">{errors.headname}</p>}
        </div>
        
        <div>
          <label className="block text-gray-400 text-sm mb-3">
            Party Members* (4 members including head)
          </label>
          <div className="space-y-3">
            {formData.members.map((member, index) => (
              <div key={index}>
                <label htmlFor={`member${index}`} className="block text-gray-400 text-xs mb-1">
                  {`Member ${index + 1}`}*
                </label>
                <input
                  id={`member${index}`}
                  type="text"
                  value={member}
                  onChange={(e) => handleMemberChange(index, e.target.value)}
                  className={`w-full bg-gray-700 text-white p-2 rounded-md border ${errors[`member${index}`] ? 'border-red-500' : 'border-gray-600'} focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200`}
                />
                {errors[`member${index}`] && <p className="mt-1 text-sm text-red-500">{errors[`member${index}`]}</p>}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-md transition-all duration-200 hover:cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-all duration-200 hover:cursor-pointer"
          >
            Add Party
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPartyForm;