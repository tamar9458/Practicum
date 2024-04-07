import axios from 'axios'
import { API_URL } from '../App';
import Swal from 'sweetalert2';

export const setUser = (data,navigate) => {
return dispatch => {
    if(data){
    axios.post(`${API_URL}/Employee/Login`, `"${data}"`, {
        headers: {
            'Content-Type': 'application/json'   }
    })
    .then((res) => {
        const token = res.data.token 
        dispatch({ type: 'SET_USER', data: token });
        localStorage.setItem('accessToken',token)
        Swal.fire({
            title: 'Wellcome!',
            icon: 'success'
          })
        navigate('/home')
    })
    .catch((error) => {
        alert('Sorry, you dont have permission to access. Please try again.');
        navigate('/home');
    });}
    else{
        dispatch({ type: 'SET_USER', data: null });
        localStorage.setItem('accessToken',null)
        navigate('/home')
    }
}
}