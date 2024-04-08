import { useSelector } from "react-redux/es/hooks/useSelector"
import { useNavigate } from "react-router-dom"
import { decode ,typeDecode} from "../App";

export default () => {
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();
    return <>
        <div className="header">
            <div onClick={() => { navigate('/home') }}>Home</div>
            <div onClick={() => { navigate('/login') }}> Login </div>
            <div onClick={() => { navigate('/logout') }}> {decode(user,typeDecode.Name)?`(${decode(user,typeDecode.Name)})`:"(none)"} log out  </div>
            <div onClick={() => { navigate('/employees') }}> Full list</div>
        </div>
    </>
}