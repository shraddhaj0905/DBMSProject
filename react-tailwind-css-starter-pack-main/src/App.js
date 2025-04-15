import "./App.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // or wherever the file is
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import AddTrainer from './components/AddTrainer'; // Imp
import CreateWorkoutPlan from './components/CreateWorkoutPlan';
import CreateMembership from './components/CreateMembership';
import AddMember from './components/AddMember'; // adjust path as needed
import AssignTrainer from "./components/AssignTrainer";
import AssignMembership from "./components/AssignMembership";
import ViewMembers from "./components/ViewMembers";
import ViewTrainers from "./components/ViewTrainers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/add-trainer" element={<AddTrainer />} /> 
        <Route path="/create-workout" element={<CreateWorkoutPlan />} />
        <Route path="/create-membership" element={<CreateMembership />} />

         <Route path="/add-member" element={<AddMember />} />
         <Route path="/assign-trainer" element={<AssignTrainer/>}/>
         <Route path="/assign-membership" element={<AssignMembership/>}/>
         <Route path="/all-members"  element={<ViewMembers/>} />
         <Route path="/all-trainers"  element={<ViewTrainers/>} />

      </Routes>
    </Router>
  );
}


export default App;
