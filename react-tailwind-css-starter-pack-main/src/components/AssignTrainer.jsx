import React, { useEffect, useState } from 'react';

const AssignTrainer = () => {
  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [formData, setFormData] = useState({ memberId: '', trainerId: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token'); // Get the admin token from localStorage

    try {
      const [membersRes, trainersRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/members', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }),
        fetch('http://localhost:5000/api/admin/trainers', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      ]);

      if (!membersRes.ok || !trainersRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const membersData = await membersRes.json();
      const trainersData = await trainersRes.json();

      setMembers(membersData);
      setTrainers(trainersData);
    } catch (error) {
      console.error('❌ Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Get the admin token from localStorage

    try {
      const res = await fetch('http://localhost:5000/api/admin/assign-trainer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Trainer assigned successfully!');
        setFormData({ memberId: '', trainerId: '' });
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error('❌ Submission error:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-6 text-center">Assign Trainer to Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Member Select */}
        <div>
          <label className="block mb-1 font-medium">Select Member</label>
          <select
            name="memberId"
            value={formData.memberId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Choose Member --</option>
            {members.map(member => (
              <option key={member.m_id} value={member.m_id}>
                {member.name} (ID: {member.m_id})
              </option>
            ))}
          </select>
        </div>

        {/* Trainer Select */}
        <div>
          <label className="block mb-1 font-medium">Select Trainer</label>
          <select
            name="trainerId"
            value={formData.trainerId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Choose Trainer --</option>
            {trainers.map(trainer => (
              <option key={trainer.tr_id} value={trainer.tr_id}>
                {trainer.name} (ID: {trainer.tr_id})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-800 text-white p-2 rounded hover:bg-purple-900"
        >
          ✅ Assign Trainer
        </button>
      </form>
    </div>
  );
};

export default AssignTrainer;
