
import axios from 'axios';
import { API_URL } from '../App';

export const getEmployees = (byUser, search) => {
    return dispatch => {
        if (!byUser) {
            alert("you havn't a permittion. please login and try again.")
        }
        else {
            axios.get(`${API_URL}/Employee`)
                .then((res) => {
                    console.log('employee', res.data);
                    const filteredEmployee = res.data.filter(x =>
                        ( x.FirstName && x.FirstName.includes(search)) ||
                        ( x.LastName && x.LastName.includes(search))||(search=='')
                    );
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
export const editEmployee = (data) => {
    return dispatch => axios.put(`${API_URL}/Employee/${data.Id}`, { ...data })
        .then((res) => {
            dispatch({ type: "EDIT_RECIPE", data: res.data })
            getEmployees(true, '')
        }).catch((error) => {
            console.log(error)
            alert('error')
        })
}
export const deleteEmployee=(data) =>{
console.log(data);
 return dispatch => axios.delete(`${API_URL}/Employee/${data.id}`)
        .then((res) => {
             console.log('delete', data,res,res.data);
            dispatch({ type: "DELETE_RECIPE", data: res.data })
    }).catch((error) => console.log(error))
    // console.log(data);
    // console.log({...data});
    // console.log({ ...data, status: false });

    // editEmployee({ ...data, status: false })
    // getEmployees(true, '')

}