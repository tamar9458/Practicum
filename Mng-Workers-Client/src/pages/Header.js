import { useSelector } from "react-redux/es/hooks/useSelector"
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';//הדפסה
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom"

export default () =>{

    // const user = useSelector(state => state.user.user);
    const navigate = useNavigate();

    return <>
        <div className="header">
           <div onClick={()=>{navigate('/home')}}>Home | </div>
           <div onClick={()=>{navigate('/login')}}> Login | </div>
           <div onClick={()=>{navigate('/employees')}}> Full list</div>

        </div>
    </>
}