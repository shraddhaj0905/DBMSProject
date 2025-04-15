import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-200 to-rose-200">
      {/* Header Navbar */}
      <nav className="bg-purple-800 p-4 flex justify-between items-center shadow-md">
        <h2 className="text-white text-xl font-bold">🏋️ Gym Admin Panel</h2>
        <div>
          <a href="/dashboard" className="text-white font-medium ml-6 hover:underline">Dashboard</a>
          <a href="/logout" className="text-white font-medium ml-6 hover:underline">Logout</a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-xl mx-auto mt-16 bg-white rounded-xl shadow-lg p-10">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          Admin Dashboard
        </h1>

        <div className="flex flex-col gap-4">
          <Button onClick={() => handleClick('/add-trainer')} emoji="➕" text="Add Trainer" />
          <Button onClick={() => handleClick('/add-member')} emoji="🧍‍♂️" text="Register Member" />
          <Button onClick={() => handleClick('/create-workout')} emoji="💳" text="Create Workout Plan" />
          <Button onClick={() => handleClick('/create-membership')} emoji="📋" text="Create Membership Plans" />
          <Button onClick={() => handleClick('/all-trainers')} emoji="🥤" text="View all Trainers" />
          <Button onClick={() => handleClick('/all-members')} emoji="💪" text="View all Members" />

          {/* ✅ New Buttons */}
          <Button onClick={() => handleClick('/assign-trainer')} emoji="🏋️" text="Assign Trainer" />
          <Button onClick={() => handleClick('/assign-membership')} emoji="🧾" text="Assign Membership" />
        </div>
      </div>
    </div>
  );
};

const Button = ({ onClick, emoji, text }) => (
  <button
    onClick={onClick}
    className="bg-purple-800 text-white py-3 px-6 rounded-lg font-medium shadow hover:bg-purple-900 transition duration-200 text-lg"
  >
    {emoji} {text}
  </button>
);

export default AdminDashboard;
