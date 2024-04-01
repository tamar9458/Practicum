import { useEffect } from "react"
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

export default () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { state } = useLocation()
    const selectEmployee = state
    const { roles } = useSelector(x => ({
        roles: x.role.roles?.filter(role => {
            return !selectEmployee?.roles.some(selectedRole => selectedRole.roleId === role.id);
        })
    }))
    useEffect(() => {
        dispatch(getAllRoles())
    })
    const schema = yup.object(
        {
            Tz: yup.string()/*.required()*/,
            FirstName: yup.string()/*.required()*/,
            LastName: yup.string()/*.required() */,
            BirthDate: yup.date()/*.required() */,
            Gender: yup.number()/*.required() */,
            RolesEmployee: yup.array().of(yup.object({
                RoleId: yup.number()/*.required() */,
                EnterDate: yup.date()/*.required() */,
                IsAdministrative: yup.bool()/*.required() */,
            }))/*.required() */
        }).test('enterDateValidation', 'Enter Date must be today or in the future', (values) => {
            // Custom validation function for 'Enter Date'
            const today = new Date();
            let valid = true;

            values.RolesEmployee.forEach((role) => {
                const selectedDate = new Date(role.EnterDate);
                if (selectedDate < today) {
                    valid = false;
                }
            });

            return valid;
        })

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        values: {
            Tz: selectEmployee?.tz,
            FirstName: selectEmployee?.firstName,
            LastName: selectEmployee?.lastName,
            BirthDate: selectEmployee?.birthDate?.split('T')[0],
            Gender: selectEmployee ? String(selectEmployee.gender) : "1",
            RolesEmployee: selectEmployee?.roles ? selectEmployee.roles.map(role => ({
                RoleId: String(role.roleId),
                IsAdministrative: role.isAdministrative,
                EnterDate: role.enterDate?.split('T')[0]
            })) : []
        }
    })
    const { fields: RolesEmployee, append: appendRole } = useFieldArray({
        control, name: "RolesEmployee"
    })

    const validateEnterDate = (enterDate) => {
        const today = new Date()
        const selectedDate = new Date(enterDate)
        if (selectedDate < today) {
            return 'Enter Date must be today or a future date.'
        }
        return undefined
    }

    const onSubmit = (data) => {
        console.log(data)
        if (selectEmployee) {
            dispatch(editEmployee(data))
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
            <br />
            <TextField style={{ width: '80%' }} label="LastName"
                margin="dense"{...register("LastName")}
                error={!!errors.LastName} helperText={errors.LastName?.message} />
            <br />

            <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup value={register("Gender")} aria-label="gender" name="Gender">
                    <FormControlLabel value="1" control={<Radio />} label="Male" />
                    <FormControlLabel value="2" control={<Radio />} label="Female" />
                </RadioGroup>
            </FormControl>

            <br />
            <TextField style={{ width: '80%' }} label="BirthDate"
                margin="dense"{...register("BirthDate")} type="date"
                error={!!errors.BirthDate} helperText={errors.BirthDate?.message} />
            <br />
            <div>
                {RolesEmployee?.map((item, i) => (
                    <div key={i} className="Roles">
                        <TextField style={{ width: '80%' }} label="Enter date" margin="dense" {...register(`RolesEmployee.${i}.EnterDate`)} type="date" />
                        <TextField placeholder="Is administrative:" margin="dense" color="secondary" {...register(`RolesEmployee.${i}.IsAdministrative`)} />
                        <FormControl style={{ width: '80%' }} margin="dense" color="secondary">
                            <InputLabel>Role Type</InputLabel>
                            <Select {...register(`RolesEmployee.${i}.RoleId`)} error={!!errors.RoleId} value={item.RoleId || ""}>
                                {roles?.map((x) => (
                                    <MenuItem key={x.id} value={x.id}>
                                        {x.description}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div>
                            {errors.RolesEmployee && errors.RolesEmployee.map((error, index) => (
                                <p key={index}>{error.message}</p>
                            ))}
                        </div>

                    </div>
                ))}
            </div>


            <Button variant="outlined" startIcon={<AddIcon />} color="secondary" onClick={() => appendRole({ RoleId: 0, IsAdministrative: false, EnterDate: null })}>
                Add Role
            </Button>

            <br />
            <Button variant="contained" color="secondary" type="submit" className="submitt">Submit</Button>

        </form>


    </>
}
