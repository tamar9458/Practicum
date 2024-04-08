import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

export default function () {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [open, setOpen] = useState(true);

    useEffect(() => {
        console.log(state);
    })
    const handleClose = () => {
        setOpen(false);
        navigate('/employees')
    };
    return <>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Details</DialogTitle>
            <DialogContent>
                <div>First Name : {state.firstName}</div>
                <div>Last Name : {state.lastName}</div>
                <div>Tz : {state.tz}</div>
                <div>Birth Date : {state.birthDate?.split('T')[0]}</div>
                <div>Start Date : {state.startDate?.split('T')[0]}</div>
                <div>Gender: {state.gender == 1 ? "male" : "female"}</div>
                <h5>Roles:</h5>
                {state.roles?.map((item, i) => (
                    <div key={i}>
                        {i + 1 + ' '}{item.role?.description} {' : '} {item.isAdministrative ? "Admin" : null}
                    </div>)
                )}
            </DialogContent>
        </Dialog>
    </>
}