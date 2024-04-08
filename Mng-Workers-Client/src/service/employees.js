
import axios from 'axios';
import { API_URL } from '../App';
import Swal from 'sweetalert2';

function searchValueInRoles(roles, search) {
    let res = false
    if (roles) {
        roles.map(r => r.role?.description)?.forEach(e => {
            if (e && e.includes(search)) {
                res = true
                return
            }
        })
    }
    return res
}
export const getEmployees = (byUser, search, navigate) => {
    return dispatch => {
        if (!byUser) {
            Swal.fire({
                title: 'error...',
                icon: 'error'
            })
            navigate('/login')
        }
        else {
            axios.get(`${API_URL}/Employee`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then((res) => {
                    const filteredEmployee = res.data.filter(x =>
                        (x.firstName && x.firstName.includes(search)) ||
                        (x.lastName && x.lastName.includes(search)) ||
                        (x.tz && x.tz.includes(search)) ||
                        (x.startDate && x.startDate.includes(search)) ||
                        searchValueInRoles(x.roles, search) ||
                        (search == '')
                    )
                    dispatch({ type: "SET_EMPLOYEE", data: filteredEmployee })
                })
                .catch(() => {
                    Swal.fire({
                        title: 'error...',
                        icon: 'error'
                    })
                    navigate('/home')
                })
        }

    }
}
export const addEmployee = (data, navigate) => {
    return dispatch => axios.post(`${API_URL}/Employee`, { ...data })
        .then((res) => {
            dispatch({ type: "ADD_EMPLOYEE", data: res.data })
            Swal.fire({
                title: 'Adding complete successfull',
                icon: 'success'
            })
            getEmployees(true, '', navigate)
        })
        .catch(() => {
            Swal.fire({
                title: 'error...',
                icon: 'error'
            })
            navigate('/employees')
        })
}
export const editEmployee = (id, data, navigate) => {
    return dispatch => axios.put(`${API_URL}/Employee/${id}`, { ...data })
        .then((res) => {
            dispatch({ type: "EDIT_RECIPE", data: res.data })
            Swal.fire({
                title: 'Adding complete successfull',
                icon: 'success'
            })
            getEmployees(true, '', navigate)
        }).catch(() => {
            Swal.fire({
                title: 'error...',
                icon: 'error'
            })
            navigate('/employees')
        })
}
export const deleteEmployee = (data, navigate) => {
    return dispatch => axios.delete(`${API_URL}/Employee/${data.id}`)
        .then((res) => {
            dispatch({ type: "DELETE_RECIPE", data: res.data })
            // getEmployees(true, '', navigate)
        })
        .catch(() => {
            Swal.fire({
                title: 'error...',
                icon: 'error'
            })
            // navigate('/employees')
        }
        )
}