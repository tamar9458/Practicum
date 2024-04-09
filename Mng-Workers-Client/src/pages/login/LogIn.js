
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
import { Dialog, DialogTitle, DialogContent } from '@mui/material';


export default () => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState([]);
    const navigate = useNavigate();
    const onSubmit = (data) => {
        dispatch(setUser(data, navigate))
    }
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        navigate('/employees')
    };
    return <>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Login </DialogTitle>
            <DialogContent>
                <TextField type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password"
                />
                <br></br>
                <Button variant="outlined" onClick={() => { onSubmit(password) }}>Log In</Button>
            </DialogContent>
        </Dialog>
    </>
}