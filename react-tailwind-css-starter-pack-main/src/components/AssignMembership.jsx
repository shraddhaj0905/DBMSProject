// import React, { useEffect, useState } from 'react';

// const AssignMembership = () => {
//   const [members, setMembers] = useState([]);
//   const [memberships, setMemberships] = useState([]);
//   const [formData, setFormData] = useState({ memberId: '', membershipId: '', startDate: '' });

//   // Fetch members and memberships when component mounts
//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       // Fetch members and memberships data
//       const [membersRes, membershipsRes] = await Promise.all([
//         fetch('http://localhost:5000/api/admin/members'), // Get all members
//         fetch('http://localhost:5000/api/admin/memberships') // Get all memberships
//       ]);

//       const membersData = await membersRes.json();
//       const membershipsData = await membershipsRes.json();

//       setMembers(membersData);
//       setMemberships(membershipsData);
//     } catch (error) {
//       console.error('❌ Error fetching data:', error);
//     }
//   };

//   // Handle input changes for form fields
//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem('token'); // Get the admin token from localStorage

//     try {
//       const res = await fetch('http://localhost:5000/api/admin/assign-mem', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}` // Send the token in the Authorization header
//         },
//         body: JSON.stringify(formData)
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert('✅ Membership assigned successfully!');
//         setFormData({ memberId: '', membershipId: '', startDate: '' }); // Reset the form
//       } else {
//         alert(`❌ Error: ${data.error}`);
//       }
//     } catch (error) {
//       console.error('❌ Submission error:', error);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-6 text-center">Assign Membership to Member</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Member Select */}
//         <div>
//           <label className="block mb-1 font-medium">Select Member</label>
//           <select
//             name="memberId"
//             value={formData.memberId}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           >
//             <option value="">-- Choose Member --</option>
//             {members.map(member => (
//               <option key={member.m_id} value={member.m_id}>
//                 {member.name} (ID: {member.m_id})
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Membership Select */}
//         <div>
//           <label className="block mb-1 font-medium">Select Membership</label>
//           <select
//             name="membershipId"
//             value={formData.membershipId}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           >
//             <option value="">-- Choose Membership --</option>
//             {memberships.map(membership => (
//               <option key={membership.Mship_id} value={membership.Mship_id}>
//                 {membership.name} (ID: {membership.Mship_id})
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Start Date */}
//         <div>
//           <label className="block mb-1 font-medium">Start Date</label>
//           <input
//             type="date"
//             name="startDate"
//             value={formData.startDate}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-purple-800 text-white p-2 rounded hover:bg-purple-900"
//         >
//           ✅ Assign Membership
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AssignMembership;
import React, { useEffect, useState } from 'react';

const AssignMembership = () => {
  const [members, setMembers] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [formData, setFormData] = useState({ memberId: '', membershipId: '', startDate: '' });

  // Fetch members and memberships when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch members and memberships data
      const [membersRes, membershipsRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/members'), // Get all members
        fetch('http://localhost:5000/api/admin/memberships') // Get all memberships
      ]);

      const membersData = await membersRes.json();
      const membershipsData = await membershipsRes.json();

      setMembers(membersData);
      setMemberships(membershipsData);
    } catch (error) {
      console.error('❌ Error fetching data:', error);
    }
  };

  // Handle input changes for form fields
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Get the admin token from localStorage

    try {
      const res = await fetch('http://localhost:5000/api/admin/assign-mem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Send the token in the Authorization header
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Membership assigned successfully!');
        setFormData({ memberId: '', membershipId: '', startDate: '' }); // Reset the form
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error('❌ Submission error:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-6 text-center">Assign Membership to Member</h2>
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
                {member.name} (Email: {member.email}, Phone: {member.phone_number}) {/* Adding more details */}
              </option>
            ))}
          </select>
        </div>

        {/* Membership Select */}
        <div>
          <label className="block mb-1 font-medium">Select Membership</label>
          <select
            name="membershipId"
            value={formData.membershipId}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Choose Membership --</option>
            {memberships.map(membership => (
              <option key={membership.Mship_id} value={membership.Mship_id}>
                {membership.name} (Price: ${membership.price}, Duration: {membership.duration} months) {/* Displaying membership details */}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block mb-1 font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-800 text-white p-2 rounded hover:bg-purple-900"
        >
          ✅ Assign Membership
        </button>
      </form>
    </div>
  );
};

export default AssignMembership;
