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
                    icon: 'failed'
                })
            })
    }
}
export const addRole = (data) => {
    return dispatch => {

    }
}