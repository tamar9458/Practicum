import { useSelector } from "react-redux/es/hooks/useSelector"
import { useNavigate } from "react-router-dom"
import { decode, typeDecode } from "../App";
import { AppBar, Toolbar, Button } from '@mui/material';
import Swal from 'sweetalert2';
import '../App.css'

export default () => {
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();
    const buttonStyle = {
        color: '#0076ce',
        backgroundColor: '#f5f5f5',
        marginRight: '5px',
        border: '1px solid #0076ce',
        borderRadius: '10px',
        transition: 'background-color 0.3s, color 0.3s',
        '&:hover': {
            backgroundColor: '#e0e0e0',
            color: '#333',
        },
    };
    function goFullList() {
        if (user) { navigate('/employees') }
        else {
            Swal.fire({
                title: 'Hi, you got it!',
                text: `notice: this platform would be open to everyone until 30.05.2024. after this day, only registered will be able to access.
                \n but now, you need to login first. the password to this trial month is "123"`,
                icon: 'warning'
            }).then(() => {
                navigate('/login')
            })
            //the above rows will be replace to the next rows at 30.05.2024
            // Swal.fire({
            //     title: 'ERROR',
            //     text: `Sorry, you hav'nt login yet.`,
            //     icon: 'error'
            // }).then(() => {
            //     navigate('/login')
            // })
        }
    }

    return <>
        <AppBar position="static" >
            <Toolbar style={{ backgroundColor: '#f5f5f5' }} className="header">
                <div>
                    <Button style={buttonStyle} onClick={() => { navigate('/home') }}>Home</Button>
                    <Button style={buttonStyle} onClick={() => { goFullList() }}>Full list</Button>
                </div>
                <div>
                    <Button style={{ ...buttonStyle, color: '#f5f5f5', backgroundColor: '#0076ce' }} onClick={() => { navigate('/login') }}> Login </Button>
                    <Button style={buttonStyle} onClick={() => { navigate('/logout') }}> {decode(user, typeDecode.Name) ? `(${decode(user, typeDecode.Name)})` : "(none)"} log out  </Button>
                </div>
            </Toolbar>
        </AppBar>
    </>
}