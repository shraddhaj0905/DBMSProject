

// import React, { useEffect, useState } from 'react';

// const Home = () => {
//   const [workouts, setWorkouts] = useState([]);
//   const [memberships, setMemberships] = useState([]);
//   const [loadingWorkouts, setLoadingWorkouts] = useState(true);
//   const [loadingMemberships, setLoadingMemberships] = useState(true);

//   useEffect(() => {
//     const fetchWorkouts = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/admin/workouts');
//         if (!response.ok) throw new Error('Error fetching workouts');
//         const data = await response.json();
//         setWorkouts(data);
//       } catch (error) {
//         console.error('Error fetching workouts:', error);
//       } finally {
//         setLoadingWorkouts(false);
//       }
//     };

//     const fetchMemberships = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/admin/memberships');
//         if (!response.ok) throw new Error('Error fetching memberships');
//         const data = await response.json();
//         setMemberships(data);
//       } catch (error) {
//         console.error('Error fetching memberships:', error);
//       } finally {
//         setLoadingMemberships(false);
//       }
//     };

//     fetchWorkouts();
//     fetchMemberships();
//   }, []);

//   return (
//     <div className="font-sans text-gray-800">
//       {/* Navbar */}
//       <nav className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-50">
//         <div className="text-2xl font-bold text-indigo-600">Gravox</div>
//         <ul className="flex space-x-6 text-gray-700 font-medium">
//           <li><a href="#about" className="hover:text-indigo-600">About</a></li>
//           <li><a href="#features" className="hover:text-indigo-600">Features</a></li>
//           <li><a href="#pricing" className="hover:text-indigo-600">Plans</a></li>
//           <li><a href="#workouts" className="hover:text-indigo-600">Workouts</a></li>
//         </ul>
//       </nav>

//       {/* Hero */}
//       <section className="relative h-[80vh] bg-cover bg-center flex items-center justify-center text-center text-white"
//         style={{ backgroundImage: "url('https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg')" }}>
//         <div className="absolute inset-0 bg-black bg-opacity-60"></div>
//         <div className="relative z-10">
//           <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to <span className="text-indigo-400">Gravox Gym</span></h1>
//           <p className="text-lg md:text-xl mb-6">Transform your body. Transform your life.</p>
//         </div>
//       </section>

//       {/* About */}
//       <section id="about" className="py-16 px-4 text-center max-w-3xl mx-auto">
//         <h2 className="text-3xl font-bold mb-4">About Us</h2>
//         <p className="text-gray-600">
//           Gravox Gym is your one-stop destination for personal fitness. With world-class equipment,
//           certified trainers, and a motivating environment, we're here to help you become the best version of yourself.
//         </p>
//       </section>

//       {/* Features */}
//       <section id="features" className="py-16 bg-gray-100">
//         <h2 className="text-3xl font-bold text-center mb-10">Our Features</h2>
//         <div className="grid md:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
//           {[
//             {
//               title: 'Expert Trainers',
//               desc: 'Our professional trainers guide you at every step of your fitness journey.',
//               img: 'https://images.pexels.com/photos/2780761/pexels-photo-2780761.jpeg'
//             },
//             {
//               title: 'Customized Plans',
//               desc: 'Workouts personalized to meet your goals and schedule.',
//               img: 'https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg'
//             },
//             {
//               title: 'Nutrition Coaching',
//               desc: 'Meal plans and expert advice for better performance and health.',
//               img: 'https://images.pexels.com/photos/3768913/pexels-photo-3768913.jpeg'
//             }
//           ].map(({ title, desc, img }, idx) => (
//             <div key={idx} className="bg-white shadow-lg rounded-lg overflow-hidden">
//               <img src={img} alt={title} className="w-full h-56 object-cover" />
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold mb-2">{title}</h3>
//                 <p className="text-gray-600">{desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Membership Plans */}
//       <section id="pricing" className="py-16 bg-indigo-50">
//         <h2 className="text-3xl font-bold text-center mb-10">Membership Plans</h2>
//         <div className="grid md:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
//           {loadingMemberships ? (
//             <p className="text-center">Loading Membership Plans...</p>
//           ) : (memberships && memberships.length > 0) ? (
//             memberships.map(({ Mship_id, duration, price, description, workout_id }, idx) => (
//               <div key={idx} className="bg-white p-6 rounded-xl shadow-lg">
//                 <h3 className="text-xl font-semibold mb-2">Plan {Mship_id}</h3>
//                 <p className="text-indigo-600 font-bold mb-4">{duration} - {price}</p>
//                 <p className="text-gray-600">{description}</p>
//                 <p className="text-gray-600">Workout ID: {workout_id}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-center">No Membership Plans Available</p>
//           )}
//         </div>
//       </section>

//       {/* Our Workout Plans */}
//       <section id="workouts" className="py-16 bg-gray-100">
//         <h2 className="text-3xl font-bold text-center mb-10">Our Workout Plans</h2>
//         <div className="grid md:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
//           {loadingWorkouts ? (
//             <p className="text-center">Loading Workout Plans...</p>
//           ) : (workouts && workouts.length > 0) ? (
//             workouts.map(({ workout_id, exercises, diet }, idx) => (
//               <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
//                 <h3 className="text-xl font-semibold mb-2">Workout Plan {workout_id}</h3>
//                 <p className="text-gray-600"><span className="font-medium">Exercises:</span> {exercises}</p>
//                 <p className="text-gray-600"><span className="font-medium">Diet:</span> {diet}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-center">No Workout Plans Available</p>
//           )}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-white py-6 text-center shadow-inner">
//         <p className="mb-2">&copy; 2025 Gravox Gym. All rights reserved.</p>
//         <div className="space-x-4">
//           <a href="#" className="text-indigo-600 hover:underline">Facebook</a>
//           <a href="#" className="text-indigo-600 hover:underline">Instagram</a>
//           <a href="#" className="text-indigo-600 hover:underline">Twitter</a>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [workouts, setWorkouts] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [loadingWorkouts, setLoadingWorkouts] = useState(true);
  const [loadingMemberships, setLoadingMemberships] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/workouts');
        if (!response.ok) throw new Error('Error fetching workouts');
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoadingWorkouts(false);
      }
    };

    const fetchMemberships = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/memberships');
        if (!response.ok) throw new Error('Error fetching memberships');
        const data = await response.json();
        setMemberships(data);
      } catch (error) {
        console.error('Error fetching memberships:', error);
      } finally {
        setLoadingMemberships(false);
      }
    };

    fetchWorkouts();
    fetchMemberships();
  }, []);

  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-indigo-600">Gravox</div>
        <ul className="flex space-x-6 text-gray-700 font-medium items-center">
          <li><a href="#about" className="hover:text-indigo-600">About</a></li>
          <li><a href="#features" className="hover:text-indigo-600">Features</a></li>
          <li><a href="#pricing" className="hover:text-indigo-600">Plans</a></li>
          <li><a href="#workouts" className="hover:text-indigo-600">Workouts</a></li>
          <li>
            <button
              onClick={() => navigate('/login')}
              className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
            >
              Login
            </button>
          </li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="relative h-[80vh] bg-cover bg-center flex items-center justify-center text-center text-white"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to <span className="text-indigo-400">Gravox Gym</span></h1>
          <p className="text-lg md:text-xl mb-6">Transform your body. Transform your life.</p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 px-4 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-gray-600">
          Gravox Gym is your one-stop destination for personal fitness. With world-class equipment,
          certified trainers, and a motivating environment, we're here to help you become the best version of yourself.
        </p>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">Our Features</h2>
        <div className="grid md:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
          {[{
              title: 'Expert Trainers',
              desc: 'Our professional trainers guide you at every step of your fitness journey.',
              img: 'https://images.pexels.com/photos/2780761/pexels-photo-2780761.jpeg'
            },
            {
              title: 'Customized Plans',
              desc: 'Workouts personalized to meet your goals and schedule.',
              img: 'https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg'
            },
            {
              title: 'Nutrition Coaching',
              desc: 'Meal plans and expert advice for better performance and health.',
              img: 'https://images.pexels.com/photos/3768913/pexels-photo-3768913.jpeg'
            }].map(({ title, desc, img }, idx) => (
            <div key={idx} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={img} alt={title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Membership Plans */}
      <section id="pricing" className="py-16 bg-indigo-50">
        <h2 className="text-3xl font-bold text-center mb-10">Membership Plans</h2>
        <div className="grid md:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
          {loadingMemberships ? (
            <p className="text-center">Loading Membership Plans...</p>
          ) : (memberships && memberships.length > 0) ? (
            memberships.map(({ Mship_id, duration, price, description, workout_id }, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Plan {Mship_id}</h3>
                <p className="text-indigo-600 font-bold mb-4">{duration} - {price}</p>
                <p className="text-gray-600">{description}</p>
                <p className="text-gray-600">Workout ID: {workout_id}</p>
              </div>
            ))
          ) : (
            <p className="text-center">No Membership Plans Available</p>
          )}
        </div>
      </section>

      {/* Our Workout Plans */}
      <section id="workouts" className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">Our Workout Plans</h2>
        <div className="grid md:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
          {loadingWorkouts ? (
            <p className="text-center">Loading Workout Plans...</p>
          ) : (workouts && workouts.length > 0) ? (
            workouts.map(({ workout_id, exercises, diet }, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-2">Workout Plan {workout_id}</h3>
                <p className="text-gray-600"><span className="font-medium">Exercises:</span> {exercises}</p>
                <p className="text-gray-600"><span className="font-medium">Diet:</span> {diet}</p>
              </div>
            ))
          ) : (
            <p className="text-center">No Workout Plans Available</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 text-center shadow-inner">
        <p className="mb-2">&copy; 2025 Gravox Gym. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="text-indigo-600 hover:underline">Facebook</a>
          <a href="#" className="text-indigo-600 hover:underline">Instagram</a>
          <a href="#" className="text-indigo-600 hover:underline">Twitter</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
