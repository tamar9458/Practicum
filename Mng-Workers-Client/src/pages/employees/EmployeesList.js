import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteEmployee, getEmployees } from "../../service/employees";
import { Button, Select, MenuItem, Card, CardHeader, CardContent, CardActions, Avatar } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red, blue } from '@mui/material/colors';
import Swal from 'sweetalert2';
import React from 'react';
import { CSVLink } from 'react-csv';

export default function EmployeeList() {
    const { user, employees, roles } = useSelector(state => ({
        user: state.user.user,
        employees: state.employee.employees,
        roles: state.role.roles
    }));
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEmployees(true, ''));
    }, [dispatch]);

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
                dispatch(deleteEmployee(employee));
            }
        });
    };

    const csvData = employees?.map(employee => ({
        ID: employee.id,
        FirstName: employee.firstName,
        LastName: employee.lastName,
        TZ: employee.tz,
        StartDate: employee.startDate,
        Roles: employee.roles.join(', ')
    }));

    const headers = [
        { label: 'ID', key: 'ID' },
        { label: 'First Name', key: 'FirstName' },
        { label: 'Last Name', key: 'LastName' },
        { label: 'TZ', key: 'TZ' },
        { label: 'Start Date', key: 'StartDate' },
        { label: 'Roles', key: 'Roles' }
    ];

    return (
        <>
            <Button onClick={() => navigate('/edit', { state: null })} variant="contained" color="primary">Add Employee</Button>
            <input type="search" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
            <CSVLink data={csvData} headers={headers} filename={"employees.csv"}>
                <Button variant="contained" color="primary">Export to CSV</Button>
            </CSVLink>
            {/* <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {employees?.map((employee) => (
                    <Card key={employee.id} sx={{ maxWidth: 345 }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: blue[500] }}>
                                    {employee.firstName[0]}
                                </Avatar>
                            }
                            title={`${employee.firstName} ${employee.lastName}`}
                        />
                        <CardContent>
                            <div>
                                <p><strong>TZ:</strong> {employee.tz}</p>
                                <p><strong>Start Date:</strong> { new Date(employee.startDate).toISOString().split('T')[0]}</p>
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<EditIcon />}
                                onClick={() => navigate('/edit', { state: employee })}
                                variant="outlined"
                                color="primary"
                            >
                                Edit
                            </Button>
                            <Button
                                startIcon={<DeleteIcon />}
                                onClick={() => deleteEmployeeHandler(employee)}
                                variant="outlined"
                                color="secondary"
                            >
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div> */}
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>TZ</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>
                                {/* <Avatar sx={{ bgcolor: blue[500] }}>{employee.firstName[0]}</Avatar> */}
                                {' '}{employee.firstName} {employee.lastName}
                            </TableCell>
                            <TableCell>{employee.tz}</TableCell>
                            <TableCell>{new Date(employee.startDate).toISOString().split('T')[0]}</TableCell>
                            <TableCell>
                                <Button startIcon={<EditIcon />} onClick={() => navigate('/edit', { state: employee })} variant="outlined" color="primary">Edit</Button>
                                <Button startIcon={<DeleteIcon />} onClick={() => deleteEmployeeHandler(employee)} variant="outlined" color="secondary">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}