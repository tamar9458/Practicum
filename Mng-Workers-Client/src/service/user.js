import axios from 'axios'
import { API_URL } from '../App';
import { useNavigate } from 'react-router-dom';

export const setUser = (data,navigate) => {
//const navigate = useNavigate();

    return dispatch => {
        axios.post(`${API_URL}/Employee/Login`, data.password)
            .then((res) => {
                const token = res.data.token
                dispatch({ type: 'SET_USER', data: token })
            })
            .catch((error) => {
                alert('Sorry, you havent permssion to go into. please try again')
                navigate('home')
                console.log(error);
            })
    }
}