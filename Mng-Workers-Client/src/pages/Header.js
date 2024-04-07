import { useSelector } from "react-redux/es/hooks/useSelector"
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';//הדפסה
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom"
import { jwtDecode } from 'jwt-decode';

export function decode(user) {
    if (user) {
        const decodedToken = jwtDecode(user);
        return decodedToken.Permission
    }
    else if (localStorage.getItem('accessToken') != "null") {
        const decodedToken = jwtDecode(localStorage.getItem('accessToken'));
        return decodedToken.Permission
    }
    return 0
}
export default () => {
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();
    return <>
        <div className="header">
            <div onClick={() => { navigate('/home') }}>Home</div>
            <div onClick={() => { navigate('/login') }}> Login </div>
            <div onClick={() => { navigate('/logout') }}> {"("}{decode(user)} {")"}log out  </div>
            <div onClick={() => { navigate('/employees') }}> Full list</div>
        </div>
    </>
}