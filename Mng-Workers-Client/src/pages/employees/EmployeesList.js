import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteEmployee, getEmployees } from "../../service/employees";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { red, blue } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import React from 'react';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { decode, typeDecode } from "../../App";
import AddRole from "../roles/AddRole"
import '../../App.css'

export default () => {
    const { user, employees, roles } = useSelector(state => ({
        user: state.user.user,
        employees: state.employee.employees,
        roles: state.role.roles
    }))
    const userPermission = (decode(user, typeDecode.Permission))
    const levelPermission = 3
    //the above row will be replace to the next row at 30.05.2024
    // const levelPermission = userPermission === "NONE" ? 0 : userPermission === "WATCHING" ? 1 : userPermission === "EDIT" ? 2 : 3
    const [showAddRole, setShowAddRole] = useState(false)
    const [search, setSearch] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEmployees(true, search, navigate))
        //the above row will be replace to the next row at 30.05.2024
        // dispatch(getEmployees(userPermission != "NONE", search, navigate))
    },[])
    useEffect(() => {
        dispatch(getEmployees(true, search, navigate))
        //the above row will be replace to the next row at 30.05.2024
        // dispatch(getEmployees(userPermission != "NONE", search, navigate))
    }, [search])

    const deleteEmployeeHandler = (employee) => {
        Swal.fire({
            title: "Delete Employee",
            text: "Are you sure you want to delete this employee?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: blue[500],
            cancelButtonColor: red[500],
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteEmployee(employee, navigate));
                Swal.fire({
                    title: "Deleted!",
                    text: "This employee has been deleted.",
                    icon: "success"
                }).then(() => {
                    dispatch(getEmployees(true, search, navigate))
                    //the above row will be replace to the next row at 30.05.2024
                    // dispatch(getEmployees(userPermission != "NONE", search, navigate))
                })
            }
        })
    }
    const downloadExcel = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1')
        const headers = ['ID', 'First Name', 'Last Name', 'TZ', 'Male/Female', 'Birth Date', 'Start Date', 'Status', 'Permission', 'Roles']
        worksheet.addRow(headers)
        employees.forEach((item) => {
            worksheet.addRow(Object.values(item))
        })
        workbook.xlsx.writeBuffer().then(buffer => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            saveAs(blob, `employees_${new Date().toISOString().split(['T'][0])}.xlsx`)
        })
    }

    return (
        <><div className="list">
            <br></br>
            <div className="top">
                {showAddRole ? (<>
                    <AddRole />  <Button onClick={() => setShowAddRole(false)}>Close Add Role</Button> </>
                ) : (
                    <Button disabled={levelPermission < 2} variant="outlined" onClick={() => setShowAddRole(true)}>Add Role</Button>
                )}
                <Button onClick={() => navigate('/edit', { state: null })} variant="outlined"
                    disabled={levelPermission < 2} color="primary">Add Employee</Button>
                <Button variant="outlined" disabled={levelPermission < 2} color="primary"
                    onClick={downloadExcel}>Export to Excel</Button>
                <TextField type="search" placeholder="Search" onChange={(e) => setSearch(e.target.value)}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>), }} />
            </div>
            <h2 style={{ width: '40%', marginLeft: '10%' }}>Employees list</h2>
            <TableContainer component={Paper} style={{ width: '80%', margin: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h6">Full Name</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">TZ</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">Start Date</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">Actions</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees?.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell style={{ fontSize: '16px' }}>
                                    {' '}{employee.firstName} {employee.lastName}
                                </TableCell>
                                <TableCell style={{ fontSize: '16px' }}>{employee.tz}</TableCell>
                                <TableCell style={{ fontSize: '16px' }}>{new Date(employee.startDate).toISOString().split('T')[0]}</TableCell>
                                <TableCell  >
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button startIcon={<EditIcon />} onClick={() => navigate('/edit', { state: employee })} variant="outlined" color="primary" disabled={levelPermission < 2}>Edit</Button>
                                        <Button startIcon={<ListOutlinedIcon />} onClick={() => navigate('detail', { state: employee })} variant="outlined" color="secondary" disabled={levelPermission < 1}>Details</Button>
                                        <Button startIcon={<DeleteIcon />} onClick={() => { deleteEmployeeHandler(employee, navigate) }} variant="outlined" color="error" disabled={levelPermission < 3}>Delete</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </div></>
    );
}