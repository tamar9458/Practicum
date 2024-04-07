import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { useFieldArray, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { getAllRoles } from "../../service/roles"
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, FormControlLabel, FormLabel, Radio, RadioGroup, FormControlButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addEmployee, editEmployee } from "../../service/employees"
import { } from '@mui/material';

const schema = yup.object(
    {
        Tz: yup.string().required('must be fill').min(9).max(9),
        FirstName: yup.string().required('must be fill').min(3),
        LastName: yup.string().required('must be fill').min(3),
        BirthDate: yup.date().required('must be fill'),
        StartDate: yup.date().required('must be fill').min(yup.ref('BirthDate'), "The start date of work must be after the date of birth."),
        Gender: yup.number().required('must be fill'),
        RolesEmployee: yup.array().of(yup.object().shape({
            RoleId: yup.number(),
            IsAdministrative: yup.boolean().nullable(),
            EnterDate: yup.date().test('enterDateValidation', 'Enter Date must be today or in the future', (value) => {
                const today = new Date();
                const selectedDate = new Date(value);
                let valid = true;
                if (selectedDate < today) {
                    valid = false;
                }
                return valid;
            }),
        }))
         .required('must be fill')
    })

export default () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { state } = useLocation()
    const selectEmployee = state
    const { roles } = useSelector(x => ({
        roles: x.role.roles
    }))
    useEffect(() => {
        dispatch(getAllRoles())
    }, [dispatch])

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        values: {
            Tz: selectEmployee?.tz,
            FirstName: selectEmployee?.firstName,
            LastName: selectEmployee?.lastName,
            BirthDate: selectEmployee?.birthDate?.split('T')[0],
            StartDate: selectEmployee?.startDate?.split('T')[0],
            Gender: selectEmployee?.gender,
            RolesEmployee: selectEmployee?.roles ? selectEmployee.roles.map(role => ({
                RoleId: role.roleId || "",
                IsAdministrative: role.isAdministrative,
                EnterDate: role.enterDate?.split('T')[0]
            })) : []
        }
    })

    const { fields: RolesEmployee, append: appendRole } = useFieldArray({
        control, name: "RolesEmployee"
    })

    const isRoleIdExists = (index) => {
        const roleIdsArray = RolesEmployee.map(field => field.roleId);
        var isExist = false
        roleIdsArray?.forEach((role) => {
            if (role == index)
                isExist = true;
        })
        return isExist;
    }
    const onSubmit = (data) => {
        console.log(data)
        if (selectEmployee) {
            dispatch(editEmployee(selectEmployee.id, data))
        } else {
            dispatch(addEmployee(data))
        }
        navigate("/")
    }


    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField style={{ width: '80%' }} label="Tz-Identity number"
                margin="dense" {...register("Tz")}
                error={!!errors.Tz} helperText={errors.Tz?.message} />
            <br />
            <TextField style={{ width: '80%' }} label="FirstName"
                margin="dense"{...register("FirstName")}
                error={!!errors.FirstName} helperText={errors.FirstName?.message} />
            {errors.FirstName && <p className="ui pointing red basic label">{errors.FirstName?.message}</p>}
            <br />
            <TextField style={{ width: '80%' }} label="LastName"
                margin="dense"{...register("LastName")}
                error={!!errors.LastName} helperText={errors.LastName?.message} />
            <br />
            <FormControl component="fieldset">
                <RadioGroup {...register("Gender")} aria-label="gender" name="Gender" value={selectEmployee?.gender}>
                    <FormControlLabel value={1} control={<Radio />} label="Male" />
                    <FormControlLabel value={2} control={<Radio />} label="Female" />
                </RadioGroup>
            </FormControl>
            <br />
            <TextField style={{ width: '80%' }} label="BirthDate"
                margin="dense"{...register("BirthDate")} type="date"
                error={!!errors.BirthDate} helperText={errors.BirthDate?.message} />
            <br />
            <TextField style={{ width: '80%' }} label="StartDate"
                margin="dense"{...register("StartDate")} type="date"
                error={!!errors.StartDate} helperText={errors.StartDate?.message} />
            <br />
            <div>
                {RolesEmployee?.map((item, i) => (
                    <div key={i} className="Roles">
                        {/*ישן <TextField style={{ width: '80%' }} label="Enter date"
                            margin="dense" {...register(`RolesEmployee[${i}].EnterDate`)}
                            type="date" error={!!errors.EnterDate} helperText={errors.EnterDate?.message}
                        /> */}

                        <TextField style={{ width: '80%' }} label="Enter date"
                            margin="dense" {...register(`RolesEmployee[${i}].EnterDate`)}
                            type="date" error={!!errors?.RolesEmployee?.[i]?.EnterDate}
                            helperText={errors?.RolesEmployee?.[i]?.EnterDate?.message}
                        />
                        {errors.EnterDate && <p className="ui pointing red basic label">{errors.EnterDate?.message}</p>}
                        <TextField
                            placeholder="Is administrative:" margin="dense" color="secondary"
                            {...register(`RolesEmployee[${i}].IsAdministrative`)} type="checkbox"
                            error={!!errors.IsAdministrative} helperText={errors.IsAdministrative?.message}
                        />
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
                            <InputLabel>Role Type:</InputLabel>
                            <Select {...register(`RolesEmployee.${i}.roleId`)}
                                label="Role Type" defaultValue={item.RoleId || ""} >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {roles?.filter(role => !isRoleIdExists(role.id) || role.id === item.RoleId)
                                    .map((role) => (
                                        <MenuItem key={role.id} value={role.id} >
                                            {role.description}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </div>
                ))}
            </div>
            <Button variant="outlined" startIcon={<AddIcon />} color="secondary"
                onClick={() => appendRole({ RoleId: "", IsAdministrative: false, EnterDate: null })}>
                Add Role
            </Button>
            <br />
            <Button variant="contained" color="secondary" type="submit" className="submitt">Submit</Button>
        </form>


    </>
}
