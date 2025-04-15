import React, { useState } from 'react';

const CreateWorkoutPlan = () => {
  const [formData, setFormData] = useState({
    exercises: '',
    diet: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/admin/create-workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('✅ Workout plan created successfully!');
        setFormData({ exercises: '', diet: '' });
      } else {
        const data = await response.json();
        alert(`❌ Failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-purple-200 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700">Create Workout Plan</h2>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Exercises</label>
          <textarea
            name="exercises"
            value={formData.exercises}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="e.g. Squats, Push-ups..."
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Diet</label>
          <textarea
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="e.g. High-protein meals..."
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          ➕ Create Plan
        </button>
      </form>
    </div>
  );
};

export default CreateWorkoutPlan;
