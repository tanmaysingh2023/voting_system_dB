import React, { useState } from 'react';

const EditElectionForm = ({ election, onUpdate, onCancel }) => {
  // console.log(election);

  const formatDateForInput = (date) => {
    const d = new Date(date);
    const pad = (n) => (n < 10 ? '0' + n : n);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };  

  const [formData, setFormData] = useState({
    _id: election._id,
    name: election.name,
    description: election.description,
    startTime: formatDateForInput(election.startTime),
    endTime: formatDateForInput(election.endTime),
    active: election.active
  });  
  // console.log(formData);
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Election name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }
    
    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    } else if (new Date(formData.endTime) <= new Date(formData.startTime)) {
      newErrors.endTime = 'End time must be after start time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onUpdate(formData);
    }
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Edit Election</h2>
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
            Election Name*
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
          <label htmlFor="description" className="block text-gray-400 text-sm mb-1">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className={`w-full bg-gray-700 text-white p-2 rounded-md border ${errors.description ? 'border-red-500' : 'border-gray-600'} focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200`}
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startTime" className="block text-gray-400 text-sm mb-1">
              Start Time*
            </label>
            <input
              id="startTime"
              name="startTime"
              type="datetime-local"
              value={formData.startTime}
              onChange={handleChange}
              className={`w-full bg-gray-700 text-white p-2 rounded-md border ${errors.startTime ? 'border-red-500' : 'border-gray-600'} focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200`}
            />
            {errors.startTime && <p className="mt-1 text-sm text-red-500">{errors.startTime}</p>}
          </div>
          
          <div>
            <label htmlFor="endTime" className="block text-gray-400 text-sm mb-1">
              End Time*
            </label>
            <input
              id="endTime"
              name="endTime"
              type="datetime-local"
              value={formData.endTime}
              onChange={handleChange}
              className={`w-full bg-gray-700 text-white p-2 rounded-md border ${errors.endTime ? 'border-red-500' : 'border-gray-600'} focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200`}
            />
            {errors.endTime && <p className="mt-1 text-sm text-red-500">{errors.endTime}</p>}
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
            className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-md transition-all duration-200 hover:cursor-pointer"
          >
            Update Election
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditElectionForm;