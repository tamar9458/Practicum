import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteEmployee, getEmployees } from "../../service/employees";
import { Button, Select, MenuItem, Card, CardHeader, CardContent, CardActions, Avatar } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red, blue } from '@mui/material/colors';
import Swal from 'sweetalert2';
import React from 'react';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { jwtDecode } from 'jwt-decode';
import { decode } from "../Header";
const formatDataForExcel = (employees) => {
    return employees.map(employee => (
        {
            ID: employee.id,
            FirstName: employee.firstName,
            LastName: employee.lastName,
            TZ: employee.tz,
            StartDate: employee.startDate,
        }
    ));
};
export default function EmployeeList() {
    const { user, employees, roles } = useSelector(state => ({
        user: state.user.user,
        employees: state.employee.employees,
        roles: state.role.roles
    }));

    const userPermission=(decode(user))

    const [search, setSearch] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEmployees(userPermission!=0, search,navigate))
    }, [search]);

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
                Swal.fire({
                    title: "Deleted!",
                    text: "This employee has been deleted.",
                    icon: "success"
                });
                dispatch(deleteEmployee(employee,navigate));
            }
        })

    }
    const downloadExcel = () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');
        const headers = ['ID', 'First Name', 'Last Name', 'TZ', 'Start Date'];
        worksheet.addRow(headers)
        const formattedEmployees = formatDataForExcel(employees);
        console.log(formattedEmployees);
        formattedEmployees.forEach((item) => {
            worksheet.addRow(Object.values(item))
        })
        workbook.xlsx.writeBuffer().then(buffer => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            saveAs(blob, `employees_${new Date().toISOString().split(['T'][0])}.xlsx`)
        })
    }

    return (
        <>
            <Button onClick={() => navigate('/edit', { state: null })} variant="contained" color="primary">Add Employee</Button>
            <input type="search" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
            <Button variant="contained" color="primary" onClick={downloadExcel}>Export to Excel</Button>
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
                                    {/* <Avatar sx={{ bgcolor: blue[500] }}>{employee.firstName[0]}</Avatar> */}
                                    {' '}{employee.firstName} {employee.lastName}
                                </TableCell>
                                <TableCell style={{ fontSize: '16px' }}>{employee.tz}</TableCell>
                                <TableCell style={{ fontSize: '16px' }}>{new Date(employee.startDate).toISOString().split('T')[0]}</TableCell>
                                <TableCell  >
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button startIcon={<EditIcon />} onClick={() => navigate('/edit', { state: employee })} variant="outlined" color="primary">Edit</Button>
                                        <Button startIcon={<DeleteIcon />} onClick={() => { deleteEmployeeHandler(employee,navigate) }} 
                                        variant="outlined" color="secondary">Delete</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </>
    );
}