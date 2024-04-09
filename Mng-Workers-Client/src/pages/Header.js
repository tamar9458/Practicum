import { useSelector } from "react-redux/es/hooks/useSelector"
import { useNavigate } from "react-router-dom"
import { decode, typeDecode } from "../App";
import { AppBar, Toolbar, Button } from '@mui/material';
import '../App.css'

export default () => {
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();
    const buttonStyle = {
        color: '#0076ce',
        backgroundColor: '#f5f5f5',
        marginRight: '5px',
        border:'1px solid #0076ce',
        borderRadius:'10px',
        transition: 'background-color 0.3s, color 0.3s',
        '&:hover': {
            backgroundColor: '#e0e0e0',
            color: '#333',
        },
    };
    return <>
        <AppBar position="static" >
            <Toolbar style={{ backgroundColor: '#f5f5f5' }} className="header">
                <div>
                    <Button style={buttonStyle} onClick={() => { navigate('/home') }}>Home</Button>
                    <Button style={buttonStyle} onClick={() => { navigate('/employees') }}>Full list</Button>
                </div>
                <div>
                    <Button style={{...buttonStyle,color:'#f5f5f5',backgroundColor:'#0076ce'}} onClick={() => { navigate('/login') }}> Login </Button>
                    <Button style={buttonStyle} onClick={() => { navigate('/logout') }}> {decode(user, typeDecode.Name) ? `(${decode(user, typeDecode.Name)})` : "(none)"} log out  </Button>
                </div>
            </Toolbar>
        </AppBar>
    </>
}