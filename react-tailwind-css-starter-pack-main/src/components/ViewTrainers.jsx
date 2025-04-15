import React, { useEffect, useState } from 'react';

const ViewTrainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/admin/trainers');
      const data = await res.json();
      setTrainers(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch trainers');
      console.error('❌ Error fetching trainers:', err);
      setLoading(false);
    }
  };

  // Handle DELETE request
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this trainer?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/trainer/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Trainer deleted successfully!');
        fetchTrainers(); // Refresh trainer list after deletion
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      console.error('❌ Error deleting trainer:', err);
      alert('Something went wrong while deleting the trainer.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">💪 All Trainers</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading trainers...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : trainers.length === 0 ? (
        <p className="text-center text-gray-500">No trainers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <div
              key={trainer.tr_id}
              className="bg-white shadow-md rounded-xl p-5 border border-purple-200 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-purple-800 mb-2">{trainer.name}</h3>
              <p><strong>ID:</strong> {trainer.tr_id}</p>
              <p><strong>Age:</strong> {trainer.age} years</p>
              <p><strong>Shift:</strong> {trainer.shift}</p>
              <p><strong>Salary:</strong> ₹{trainer.salary}</p>
              <p><strong>Contact:</strong> {trainer.contact}</p>
              <p><strong>Specialization:</strong> {trainer.specialization}</p>

              {/* Delete Button */}
              <div className="mt-4">
                <button
                  onClick={() => handleDelete(trainer.tr_id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewTrainers;
