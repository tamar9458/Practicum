
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import FingerprintIcon from '@mui/icons-material/Fingerprint';//טביעת אצבע
import AccountCircle from '@mui/icons-material/AccountCircle';//איש
import InputAdornment from '@mui/material/InputAdornment';
import { TextField, Button } from '@mui/material';
import { setUser } from '../../service/user'


export default () => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState([]);
    const navigate = useNavigate();
    const { user, employees, roles } = useSelector(state => ({
        user: state.user.user,
        employees: state.employee.employees,
        roles: state.role.roles
    }));
    const onSubmit = (data) => {
        console.log(data);
        alert(data)
        dispatch(setUser(data, navigate))
    }

    return (
        <div className="whiteBack login">
            <form onSubmit={(data) => { onSubmit(data) }}>
                <label>
                    Password:
                </label>
                <TextField
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="secondary" type="submit">Submit</Button>

            </form>
        </div>
    )
}