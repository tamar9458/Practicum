import axios from 'axios';
import { API_URL } from '../App';
import Swal from 'sweetalert2';

export const getAllRoles = () => {
    return dispatch => {
        axios.get(`${API_URL}/Role`)
            .then((res) => {
                dispatch({ type: "SET_ROLE", data: res.data })
            })
            .catch((error) => {
                Swal.fire({
                    title: 'error...',
                    icon: 'error'
                })
            })
    }
}
export const addRole = (data) => {
    return dispatch => {
        axios.post(`${API_URL}/Role`,data)
        .then((res) => {
            dispatch({ type: "ADD_ROLE", data: res.data })
            Swal.fire({
                title: 'Add role successfully',
                icon: 'success'
            })
            getAllRoles()
        })
        .catch((error) => {
            Swal.fire({
                title: 'error...',
                icon: 'error'
            })
        })
    }
}