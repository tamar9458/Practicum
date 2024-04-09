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
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';//איש
import KeyIcon from '@mui/icons-material/Key';//מנעול
import FingerprintIcon from '@mui/icons-material/Fingerprint';//טביעת אצבע
import DeleteIcon from '@mui/icons-material/Delete';

const schema = yup.object(
    {
        tz: yup.string().required('must be fill').matches(/^\d{9}$/, 'Tz must be exactly 9 digits'),
        firstName: yup.string().required('must be fill').min(3),
        lastName: yup.string().required('must be fill').min(3),
        birthDate: yup.date().required('must be fill').max(new Date(), 'Birth Date must be on or before the current date'),
        StartDate: yup.date().required('must be fill').min(yup.ref('birthDate'), "The start date of work must be after the date of birth."),
        gander: yup.number().required('must be fill').default(1),
        password: yup.string().nullable().transform((value, originalValue) => {
            return originalValue === '' ? null : value;
        }).nullable().min(8, 'Password must be at least 8 characters'),
        roles: yup.array().of(yup.object().shape({
            roleId: yup.number(),
            isAdministrative: yup.boolean().default(false),
            lastChange: yup.date().nullable(),
            enterDate: yup.date()
                .when('lastChange', (lastChange, schema) => (
                    lastChange && schema.min(lastChange, `Enter Date must be equal to or later than Last Change Date ${lastChange}`)
                ))
        })).required('must be fill')
    })

export default () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { state } = useLocation()
    const selectEmployee = state
    const { allRoles } = useSelector(x => ({
        allRoles: x.role.roles
    }))
    useEffect(() => {
        dispatch(getAllRoles())
    }, [dispatch])

    const { register, control, handleSubmit, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        values: {
            tz: selectEmployee?.tz,
            firstName: selectEmployee?.firstName,
            lastName: selectEmployee?.lastName,
            birthDate: selectEmployee?.birthDate?.split('T')[0],
            startDate: selectEmployee?.startDate?.split('T')[0],
            password: selectEmployee?.password,
            gender: selectEmployee?.gender,
            roles: selectEmployee?.roles ? selectEmployee.roles.map(role => ({
                roleId: role.roleId || "",
                isAdministrative: role.isAdministrative,
                enterDate: role.enterDate?.split('T')[0],
                lastChange: role.lastChange
            })) : []
        }
    })

    const { fields: roles, append: appendRole, remove } = useFieldArray({
        control, name: "roles"
    })

    const isRoleIdExists = (i) => {
        const roleIdsArray = roles.map(r => r.roleId);
        var isExist = false
        roleIdsArray?.forEach((role) => {
            if (role == i)
                isExist = true;
        })
        return isExist;
    }

    const submittion = () => {
        const data = getValues()
        if (selectEmployee) {
            dispatch(editEmployee(selectEmployee.id, { ...data, status: selectEmployee?.status, gender: +data.gender }, navigate))
        } else {
            dispatch(addEmployee({ ...data, status: true, gender: 1 }, navigate))
        }
        navigate("/employees")
    }

    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        navigate('/employees')
    };
    return <>
        <Dialog open={open} onClose={handleClose} PaperProps={{ style: { width: '80%', margin: 'auto' } }}>
            <DialogTitle>{selectEmployee ? `Edit ${selectEmployee.firstName} details` : "Add Employee"}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(submittion)}>
                    <TextField style={{ width: '80%' }} label="Tz-Identity number"
                        margin="dense" {...register("tz")}
                        InputProps={{ startAdornment: (<InputAdornment position="start"><FingerprintIcon /></InputAdornment>), }}
                        error={!!errors.tz} helperText={errors.tz?.message} />
                    <br />
                    <TextField style={{ width: '80%' }} label="firstName"
                        margin="dense"{...register("firstName")}
                        InputProps={{ startAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>), }}
                        error={!!errors.firstName} helperText={errors.firstName?.message} />
                    {/* {errors.FirstName && <p className="ui pointing red basic label">{errors.FirstName?.message}</p>} */}
                    <br />
                    <TextField style={{ width: '80%' }} label="lastName"
                        margin="dense"{...register("lastName")}
                        InputProps={{ startAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>), }}
                        error={!!errors.lastName} helperText={errors.lastName?.message} />
                    <br />
                    <TextField style={{ width: '80%' }} label="password"
                        margin="dense"{...register("password")}
                        InputProps={{ startAdornment: (<InputAdornment position="start"><KeyIcon /></InputAdornment>), }}
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
                    <div>Roles:<br></br>
                        {roles?.map((item, i) => (
                            <div key={i} className="Roles">
                                <hr></hr>
                                <TextField style={{ width: '80%' }} label="Enter date"
                                    margin="dense" {...register(`roles[${i}].enterDate`)}
                                    type="date" error={!!errors?.roles?.[i]?.enterDate}
                                    helperText={errors?.roles?.[i]?.enterDate?.message}
                                />
                                {errors.EnterDate && <p className="ui pointing red basic label">{errors.EnterDate?.message}</p>}
                                <div>Is administrative:
                                    <TextField
                                        margin="dense" color="secondary"
                                        {...register(`roles[${i}].isAdministrative`)} type="checkbox"
                                        error={!!errors.isAdministrative} helperText={errors.isAdministrative?.message}
                                    /></div>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 185 }}>
                                    <InputLabel>Role Type:</InputLabel>
                                    <Select {...register(`roles[${i}].roleId`)}
                                        label="Role Type" defaultValue={item.roleId || ""} >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {allRoles?.filter(role => !isRoleIdExists(role.id) || role.id === item.roleId)
                                            .map((role) => (
                                                <MenuItem key={role.id} value={role.id} >
                                                    {role.description}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                                <Button startIcon={<DeleteIcon />} onClick={() => { remove(i) }} color="primary" ></Button>

                            </div>
                        ))}
                    </div>
                    <Button variant="outlined" startIcon={<AddIcon />} color="primary"
                        onClick={() => appendRole({ roleId: "", isAdministrative: false, enterDate: null })}>
                        Add Role
                    </Button>
                    <br />
                    <Button variant="contained" color="primary"
                         onClick={() => { submittion() }} 
                        className="submitt">Submit</Button>
                </form>
            </DialogContent>
        </Dialog>
    </>
}
