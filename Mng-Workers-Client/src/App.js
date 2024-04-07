import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import AddEmployee from './pages/employees/AddEmployee';
import EmployeesList from './pages/employees/EmployeesList';
import { Login } from '@mui/icons-material';
import Home from './pages/Home';
import Header from './pages/Header'
import LogIn from './pages/login/LogIn';

export const API_URL=`https://localhost:7282/api`

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/home')
  }, [])
  return (
    <div className="App">
      <header> <Header></Header></header>
      <Routes>
      <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/employees" element={<EmployeesList />}></Route>
        <Route path="/edit" element={<AddEmployee />}></Route>
      </Routes>

    </div>

  );
}

export default App;
