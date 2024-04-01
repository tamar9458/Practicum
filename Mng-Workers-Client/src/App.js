import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import AddEmployee from './pages/employees/AddEmployee';
import EmployeesList from './pages/employees/EmployeesList';
import { Login } from '@mui/icons-material';

export const API_URL=`https://localhost:7282/api`

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/employees')
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/employees" element={<EmployeesList />}></Route>
        <Route path="/edit" element={<AddEmployee />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>

    </div>
  );
}

export default App;
