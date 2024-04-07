
import axios from 'axios';
import { API_URL } from '../App';
import { useNavigate } from 'react-router-dom';

function searchValueInRoles(roles, search) {
    let res = false
    if (roles) {
        const r = roles.map(r => r.role?.description
            // console.log('des',r.description)
        )
        console.log('r', r);
        console.log('roles', roles);
        r?.forEach(e => {
            if (e && e.includes(search)) {
                res = true
                console.log('res', res, 'description', e);
                return
            }
        })
    }
    return res
}
export const getEmployees = (byUser, search,navigate) => {
//const navigate = useNavigate();

    return dispatch => {
        if (!byUser) {
            alert("you havn't a permittion. please login and try again.")
            navigate('/login')
        }
        else {
            axios.get(`${API_URL}/Employee`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then((res) => {
                    console.log('employee', res.data);
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
                .catch((error) => {
                    console.log(error)
                    alert('error')
                })
        }

    }
}
export const addEmployee = (data) => {
    return dispatch => axios.post(`${API_URL}/Employee`, { ...data })
        .then((res) => {
            dispatch({ type: "ADD_EMPLOYEE", data: res.data })
            getEmployees(true, '')
        })
        .catch((error) => {
            console.log(error)
            alert('error')
        })
}
export const editEmployee = (id, data) => {
    return dispatch => axios.put(`${API_URL}/Employee/${id}`, { ...data })
        .then((res) => {
            dispatch({ type: "EDIT_RECIPE", data: res.data })
            getEmployees(true, '')
        }).catch((error) => {
            console.log(error)
            alert('error')
        })
}
export const deleteEmployee = (data) => {
    console.log(data);
    return dispatch => axios.delete(`${API_URL}/Employee/${data.id}`)
        .then((res) => {
            console.log('delete', data, res, res.data);
            dispatch({ type: "DELETE_RECIPE", data: res.data })
        }).catch((error) =>
            console.log(error))
}