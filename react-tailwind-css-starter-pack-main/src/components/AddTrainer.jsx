import React, { useState } from 'react';

const AddTrainer = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    shift: '',
    salary: '',
    contact: '',
    specialization: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log formData to verify values
    console.log('Form Data:', formData);

    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Log token

    // Check if token exists
    if (!token) {
      alert('You must be logged in to add a trainer');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/admin/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include the token in the Authorization header
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json(); // Capture the server response

      if (response.ok) {
        alert('Trainer added successfully!');
        setFormData({
          name: '',
          age: '',
          shift: '',
          salary: '',
          contact: '',
          specialization: ''  // Reset the form
        });
      } else {
        // Display the error message from the server
        alert(`Failed to add trainer: ${responseData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error adding trainer:', error);
      alert('An error occurred while adding the trainer. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdf0d5] to-[#f8b195] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl"
      >
        <h2 className="text-xl font-semibold text-center text-[#ff6f61] mb-6">
          Add New Trainer
        </h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#ff6f61]"
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#ff6f61]"
              required
            />
          </div>

          {/* Shift */}
          <div>
            <label className="block text-sm font-medium mb-1">Working Shift</label>
            <input
              type="text"
              name="shift"
              value={formData.shift}
              onChange={handleChange}
              placeholder="e.g., Morning, Evening"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#ff6f61]"
              required
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium mb-1">Salary (₹)</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#ff6f61]"
              required
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium mb-1">Contact Number</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="e.g., +91 9876543210"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#ff6f61]"
              required
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-sm font-medium mb-1">Specialization</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="e.g., Yoga, Weightlifting, Cardio"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#ff6f61]"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-[#ff6f61] text-white py-2 px-6 rounded-lg font-semibold hover:bg-[#e85c50] transition"
        >
          Add Trainer
        </button>
      </form>
    </div>
  );
};

export default AddTrainer;
