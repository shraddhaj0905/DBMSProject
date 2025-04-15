import React, { useState, useEffect } from 'react';

const CreateMembership = () => {
  const [formData, setFormData] = useState({
    duration: '',
    price: '',
    description: '',
    workout_id: ''
  });

  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/workouts'); // ✅ correct route
        const data = await res.json();
        setWorkouts(data);
      } catch (err) {
        console.error("❌ Error fetching workouts:", err);
      }
    };

    fetchWorkouts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // Ensure workout_id is an integer
    const updatedFormData = {
      ...formData,
      workout_id: parseInt(formData.workout_id)  // Convert to integer
    };

    try {
      const response = await fetch('http://localhost:5000/api/admin/membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedFormData)
      });

      if (response.ok) {
        alert('✅ Membership created successfully!');
        setFormData({ duration: '', price: '', description: '', workout_id: '' });
      } else {
        const data = await response.json();
        alert(`❌ Failed: ${data.error}`);
      }
    } catch (error) {
      console.error('❌ Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-center text-[#6b7280]">Create Membership</h2>

      <div>
        <label className="block mb-1">Duration</label>
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Workout Plan</label>
        <select
          name="workout_id"
          value={formData.workout_id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">-- Select Workout Plan --</option>
          {workouts.map((workout) => (
            <option key={workout.workout_id} value={workout.workout_id}>
              ID {workout.workout_id} - {workout.exercises.slice(0, 40)}...
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
        ➕ Create Membership
      </button>
    </form>
  );
};

export default CreateMembership;
