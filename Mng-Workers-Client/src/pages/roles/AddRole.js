import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { TextField, Button } from "@mui/material"
import InputAdornment from '@mui/material/InputAdornment';
import WorkIcon from '@mui/icons-material/Work'; //תיק עבודה
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { addRole } from "../../service/roles";

const schema = yup.object().shape({
    description: yup.string().required('Role description is required')
})

export default () => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function onSubmit() {
        const data = getValues()
        dispatch(addRole(data))
        navigate('/employees')
    }

    return (
        <>
            <TextField
                label="new role description"
               // margin="dense"
                {...register("description")}
                InputProps={{ startAdornment: (<InputAdornment position="start"><WorkIcon /></InputAdornment>) }}
                error={!!errors.description}
                helperText={errors.description?.message}
            />
            <button onClick={() => { onSubmit() }} color="primary">Add</button>
        </>
    );
}