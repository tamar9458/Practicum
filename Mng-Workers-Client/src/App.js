import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import AddEmployee from './pages/employees/AddEmployee';
import EmployeesList from './pages/employees/EmployeesList';
import  Footer from './pages/Footer';
import Home from './pages/Home';
import Header from './pages/Header'
import LogIn from './pages/login/LogIn';
import LogOut from './pages/login/LogOut';
import { jwtDecode } from 'jwt-decode';
import EmployeeDetails from './pages/employees/EmployeeDetails';

export const API_URL = `https://localhost:7282/api`
export function decode(user,typeDecode) {
  if (user) {
      const decodedToken = jwtDecode(user);
      return typeDecode==1?decodedToken.Permission:decodedToken.Name
  }
  else if (localStorage.getItem('accessToken') != "null") {
      const decodedToken = jwtDecode(localStorage.getItem('accessToken'));
      return typeDecode==1?decodedToken.Permission:decodedToken.Name
  }
  return 0
}
export const typeDecode = {
  Name: 0,
  Permission: 1
};
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
        <Route path="/logout" element={<LogOut />}></Route>
        <Route path="/employees" element={<EmployeesList />}></Route>
        <Route path="/edit" element={<AddEmployee />}></Route>
        <Route path="/employees/detail" element={<EmployeeDetails />}></Route>
      </Routes>
<footer><Footer></Footer></footer>
    </div>

  );
}

export default App;
