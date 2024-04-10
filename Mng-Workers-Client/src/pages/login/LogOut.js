import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUser } from "../../service/user";
import { red, blue } from '@mui/material/colors';
import Swal from 'sweetalert2';
import { useEffect } from "react";

export default () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function logOut() {
        Swal.fire({
            title: "Log Out?",
            text: "Are you sure you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: blue[500],
            cancelButtonColor: red[500],
            confirmButtonText: "Yes, log out."
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "See you later!",
                    icon: "success"
                })
                dispatch(setUser(null, navigate))
            }
        })
    }
    useEffect(() => {
        logOut()
    })
    return <>
    </>
}