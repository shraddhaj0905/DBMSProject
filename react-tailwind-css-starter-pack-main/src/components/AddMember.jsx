// import React, { useState } from 'react';

// const AddMember = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     dob: '',
//     weight: '',
//     height: '',
//     email: '',
//     contact: '',
//     emergency_contact: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');

//     const payload = {
//       ...formData,
//       weight: parseInt(formData.weight),
//       height: parseInt(formData.height),
//     };

//     try {
//       const res = await fetch('http://localhost:5000/api/admin/member', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(payload)
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert('✅ Member registered successfully!');
//         setFormData({
//           name: '', dob: '', weight: '', height: '',
//           email: '', contact: '', emergency_contact: ''
//         });
//       } else {
//         alert(`❌ Error: ${data.error}`);
//       }
//     } catch (error) {
//       console.error('❌ Submission error:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-4">
//       <h2 className="text-xl font-semibold text-gray-700 text-center">Register New Member</h2>

//       {[
//         { label: 'Full Name', name: 'name' },
//         { label: 'Date of Birth', name: 'dob', type: 'date' },
//         { label: 'Weight (kg)', name: 'weight', type: 'number' },
//         { label: 'Height (cm)', name: 'height', type: 'number' },
//         { label: 'Email', name: 'email', type: 'email' },
//         { label: 'Contact Number', name: 'contact' },
//         { label: 'Emergency Contact', name: 'emergency_contact' }
//       ].map(({ label, name, type = 'text' }) => (
//         <div key={name}>
//           <label className="block mb-1 font-medium">{label}</label>
//           <input
//             type={type}
//             name={name}
//             value={formData[name]}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>
//       ))}

//       <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
//         🧍‍♂️ Register Member
//       </button>
//     </form>
//   );
// };

// export default AddMember;
import React, { useState } from 'react';

const AddMember = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    weight: '',
    height: '',
    email: '',
    contact: '',
    emergency_contact: ''
  });

  const [goals, setGoals] = useState(['']);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoalChange = (index, value) => {
    const updatedGoals = [...goals];
    updatedGoals[index] = value;
    setGoals(updatedGoals);
  };

  const addGoalField = () => {
    setGoals([...goals, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const payload = {
      ...formData,
      weight: parseInt(formData.weight),
      height: parseInt(formData.height),
      goals: goals.filter(goal => goal.trim() !== '') // filter out empty ones
    };

    try {
      const res = await fetch('http://localhost:5000/api/admin/addmember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Member registered successfully!');
        setFormData({
          name: '', dob: '', weight: '', height: '',
          email: '', contact: '', emergency_contact: ''
        });
        setGoals(['']);
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error('❌ Submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-semibold text-gray-700 text-center">Register New Member</h2>

      {[{ label: 'Full Name', name: 'name' },
        { label: 'Date of Birth', name: 'dob', type: 'date' },
        { label: 'Weight (kg)', name: 'weight', type: 'number' },
        { label: 'Height (cm)', name: 'height', type: 'number' },
        { label: 'Email', name: 'email', type: 'email' },
        { label: 'Contact Number', name: 'contact' },
        { label: 'Emergency Contact', name: 'emergency_contact' }
      ].map(({ label, name, type = 'text' }) => (
        <div key={name}>
          <label className="block mb-1 font-medium">{label}</label>
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
      ))}

      <div>
        <label className="block mb-1 font-medium">Fitness Goals</label>
        {goals.map((goal, index) => (
          <input
            key={index}
            type="text"
            value={goal}
            onChange={(e) => handleGoalChange(index, e.target.value)}
            placeholder="e.g. Weight Loss"
            className="w-full border p-2 rounded mb-2"
          />
        ))}
        <button
          type="button"
          onClick={addGoalField}
          className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm"
        >
          ➕ Add Goal
        </button>
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        🧍‍♂️ Register Member
      </button>
    </form>
  );
};

export default AddMember;
