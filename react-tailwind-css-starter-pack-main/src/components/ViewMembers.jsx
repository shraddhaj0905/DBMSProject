// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ViewMembers = () => {
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchMembers();
//   }, []);

//   const fetchMembers = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch('http://localhost:5000/api/admin/members');
//       const data = await res.json();
//       setMembers(data);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to fetch members');
//       console.error('❌ Error fetching members:', err);
//       setLoading(false);
//     }
//   };

//   // Handle DELETE request
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this member?');
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`http://localhost:5000/api/admin/member/${id}`, {
//         method: 'DELETE',
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert('✅ Member deleted successfully!');
//         fetchMembers(); // Refresh member list after deletion
//       } else {
//         alert(`❌ Error: ${data.error}`);
//       }
//     } catch (err) {
//       console.error('❌ Error deleting member:', err);
//       alert('Something went wrong while deleting the member.');
//     }
//   };

//   // Handle UPDATE request
//   const handleEdit = (id) => {
//     navigate(`/update-member/${id}`);
//   };

//   return (
//     <div className="max-w-7xl mx-auto mt-10 p-4">
//       <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">💪 All Registered Members</h2>

//       {loading ? (
//         <p className="text-center text-gray-600">Loading members...</p>
//       ) : error ? (
//         <p className="text-center text-red-600">{error}</p>
//       ) : members.length === 0 ? (
//         <p className="text-center text-gray-500">No members found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {members.map((member) => (
//             <div
//               key={member.m_id}
//               className="bg-white shadow-md rounded-xl p-5 border border-purple-200 hover:shadow-lg transition"
//             >
//               <h3 className="text-xl font-semibold text-purple-800 mb-2">{member.name}</h3>
//               <p><strong>ID:</strong> {member.m_id}</p>
//               <p><strong>Date of Birth:</strong> {new Date(member.dob).toLocaleDateString()}</p>
//               <p><strong>Weight:</strong> {member.weight} kg</p>
//               <p><strong>Height:</strong> {member.height} cm</p>
//               <p><strong>Email:</strong> {member.email}</p>
//               <p><strong>Contact:</strong> {member.contact}</p>
//               <p><strong>Emergency Contact:</strong> {member.emergency_contact}</p>
//               <p><strong>Trainer:</strong> {member.tr_id || 'Not assigned'}</p>

//               {/* Delete and Update Buttons */}
//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={() => handleEdit(member.m_id)}
//                   className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
//                 >
//                   Update
//                 </button>
//                 <button
//                   onClick={() => handleDelete(member.m_id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewMembers;

import React, { useEffect, useState } from 'react';

const ViewMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/admin/members');
      const data = await res.json();
      setMembers(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch members');
      console.error('❌ Error fetching members:', err);
      setLoading(false);
    }
  };

  // Handle DELETE request
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this member?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/member/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Member deleted successfully!');
        fetchMembers(); // Refresh member list after deletion
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      console.error('❌ Error deleting member:', err);
      alert('Something went wrong while deleting the member.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">💪 All Registered Members</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading members...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : members.length === 0 ? (
        <p className="text-center text-gray-500">No members found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.m_id}
              className="bg-white shadow-md rounded-xl p-5 border border-purple-200 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-purple-800 mb-2">{member.name}</h3>
              <p><strong>ID:</strong> {member.m_id}</p>
              <p><strong>Date of Birth:</strong> {new Date(member.dob).toLocaleDateString()}</p>
              <p><strong>Weight:</strong> {member.weight} kg</p>
              <p><strong>Height:</strong> {member.height} cm</p>
              <p><strong>Email:</strong> {member.email}</p>
              <p><strong>Contact:</strong> {member.contact}</p>
              <p><strong>Emergency Contact:</strong> {member.emergency_contact}</p>
              <p><strong>Trainer:</strong> {member.tr_id || 'Not assigned'}</p>

              {/* Delete Button */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleDelete(member.m_id)}
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

export default ViewMembers;
