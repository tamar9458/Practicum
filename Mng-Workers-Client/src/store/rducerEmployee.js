const initalseState = {
    employees: []
}

const reducer = (state = initalseState, action) => {
    switch (action.type) {
        case "SET_EMPLOYEE": {
           const employees = action.data.filter(x => x.status);
        return { ...state, employees:employees }
        }
        case "ADD_EMPLOYEE": {
            const employees = [...state.employees];
            employees.push(action.employee);
            return { ...state, employees: employees }
        }
        case "EDIT_EMPLOYEE": {
            const employees = [...state.employees];
            const findIndex = employees.findIndex(x => x.id === action.data.id);
            employees[findIndex] = action.data;
            return { ...state, employees: employees }
        }
        case "DELETE_EMPLOYEE": {
            const employees = [...state.employees];
            const employeesToUpdate = employees.filter(x => x.id !== action.data.id);
            return { ...state, employees: employeesToUpdate }

        }
        default: return { ...state }
    }
}


export default reducer;