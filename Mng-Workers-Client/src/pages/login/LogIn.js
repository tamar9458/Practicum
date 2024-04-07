
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
    const onSubmit = (data) => {
        dispatch(setUser(data, navigate))
    }

    return (
        <div className="whiteBack login">
            <label> Password:</label>
            <TextField type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => { onSubmit(password) }}>Log In</button>
        </div>
    )
}