import axios from 'axios';
import { API_URL } from '../App';

export const getAllRoles = () => {
    return dispatch => {
        axios.get(`${API_URL}/Role`)
            .then((res) => {
                dispatch({ type: "SET_ROLE", data: res.data })
            })
            .catch((error) =>{
            console.log(error)
            alert('error')  
        })
    }
}
export const addRole = (data) => {
    return dispatch => {
     
    }
}