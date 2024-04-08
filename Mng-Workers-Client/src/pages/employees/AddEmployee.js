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
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';//איש
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';//מייל
import CabinIcon from '@mui/icons-material/Cabin';//בית
import CallIcon from '@mui/icons-material/Call';//טלפון
import KeyIcon from '@mui/icons-material/Key';//מנעול
import FingerprintIcon from '@mui/icons-material/Fingerprint';//טביעת אצבע

const schema = yup.object(
    {
        tz: yup.string().required('must be fill').min(9).max(9),
        firstName: yup.string().required('must be fill').min(3),
        lastName: yup.string().required('must be fill').min(3),
        birthDate: yup.date().required('must be fill'),
        StartDate: yup.date().required('must be fill').min(yup.ref('birthDate'), "The start date of work must be after the date of birth."),
        gander: yup.number().required('must be fill'),
        password: yup.string().nullable(),
        rolesEmployee: yup.array().of(yup.object().shape({
            roleId: yup.number(),
            isAdministrative: yup.boolean().nullable(),
            lastChange: yup.date().nullable(),
            enterDate: yup.date()
            // .min(yup.ref('StartDate'),'must be after start date of working'),
            // .min(yup.ref('LastChange'),
            //  `Updating to this date need to be at least ${LastChange}`)
            // .test('enterDateValidation', 'Enter Date must be today or in the future', (value) => {
            //     const today = new Date();
            //     const selectedDate = new Date(value);
            //     // const lastChangeValue = new Date(this.resolve(yup.ref('LastChange')))
            //     const lastChangeValue = new Date( this.parent.LastChange);
            //     console.log(yup.ref('LastChange'));
            //     let valid = true;
            //     if ((lastChangeValue && selectedDate < lastChangeValue) || selectedDate < today) {
            //         valid = false;
            //     }
            //     return valid;
            // }),
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
            tz: selectEmployee?.tz,
            firstName: selectEmployee?.firstName,
            lastName: selectEmployee?.lastName,
            birthDate: selectEmployee?.birthDate?.split('T')[0],
            startDate: selectEmployee?.startDate?.split('T')[0],
            password: selectEmployee?.password,
            gender: selectEmployee?.gender,
            rolesEmployee: selectEmployee?.roles ? selectEmployee.roles.map(role => ({
                roleId: role.roleId || "",
                isAdministrative: role.isAdministrative,
                enterDate: role.enterDate?.split('T')[0],
                lastChange: role.lastChange
            })) : []
        }
    })

    const { fields: rolesEmployee, append: appendRole } = useFieldArray({
        control, name: "rolesEmployee"
    })

    const isRoleIdExists = (index) => {
        const roleIdsArray = rolesEmployee.map(field => field.roleId);
        var isExist = false
        roleIdsArray?.forEach((role) => {
            if (role == index)
                isExist = true;
        })
        return isExist;
    }
    const onSubmit = (data) => {
        console.log(data);
        console.log({ ...data, Status: selectEmployee?.status });

        if (selectEmployee) {
            dispatch(editEmployee(selectEmployee.id, { ...data, status: selectEmployee?.status }, navigate))
        } else {
            dispatch(addEmployee({ ...data, status: true }, navigate))
        }
        navigate("/")
    }

    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        navigate('/employees')
    };
    return <>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>My Form</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField style={{ width: '80%' }} label="Tz-Identity number"
                        margin="dense" {...register("tz")}
                        error={!!errors.tz} helperText={errors.tz?.message} />
                    <br />
                    <TextField style={{ width: '80%' }} label="firstName"
                        margin="dense"{...register("firstName")}
                        error={!!errors.firstName} helperText={errors.firstName?.message} />
                    {/* {errors.FirstName && <p className="ui pointing red basic label">{errors.FirstName?.message}</p>} */}
                    <br />
                    <TextField style={{ width: '80%' }} label="lastName"
                        margin="dense"{...register("lastName")}
                        error={!!errors.lastName} helperText={errors.lastName?.message} />
                    <br />
                    <TextField style={{ width: '80%' }} label="password"
                        margin="dense"{...register("password")}
                        error={!!errors.password} helperText={errors.password?.message} />
                    <br />
                    <FormControl component="fieldset">
                        <RadioGroup {...register("gender")} aria-label="gender" name="gender" defaultValue={selectEmployee?.gender}>
                            <FormControlLabel value={1} control={<Radio />} label="Male" />
                            <FormControlLabel value={2} control={<Radio />} label="Female" />
                        </RadioGroup>
                    </FormControl>
                    <br />
                    <TextField style={{ width: '80%' }} label="birthDate"
                        margin="dense"{...register("birthDate")} type="date"
                        error={!!errors.birthDate} helperText={errors.birthDate?.message} />
                    <br />
                    <TextField style={{ width: '80%' }} label="startDate"
                        margin="dense"{...register("startDate")} type="date"
                        error={!!errors.startDate} helperText={errors.startDate?.message} />
                    <br />
                    <div>
                        {rolesEmployee?.map((item, i) => (
                            <div key={i} className="Roles">

                                <TextField style={{ width: '80%' }} label="Enter date"
                                    margin="dense" {...register(`rolesEmployee[${i}].enterDate`)}
                                    type="date" error={!!errors?.rolesEmployee?.[i]?.enterDate}
                                    helperText={errors?.rolesEmployee?.[i]?.enterDate?.message}
                                />
                                {errors.EnterDate && <p className="ui pointing red basic label">{errors.EnterDate?.message}</p>}
                                <TextField
                                    placeholder="Is administrative:" margin="dense" color="secondary"
                                    {...register(`rolesEmployee[${i}].isAdministrative`)} type="checkbox"
                                    error={!!errors.isAdministrative} helperText={errors.isAdministrative?.message}
                                />
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
                                    <InputLabel>Role Type:</InputLabel>
                                    <Select {...register(`rolesEmployee.[${i}].roleId`)}
                                        label="Role Type" defaultValue={item.roleId || ""} >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {roles?.filter(role => !isRoleIdExists(role.id) || role.id === item.roleId)
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
            </DialogContent>
        </Dialog>


    </>
}
