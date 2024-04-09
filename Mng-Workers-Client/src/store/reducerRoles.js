
const initalseState = {
    roles: [],
}

const reducer = (state = initalseState, action) => {

    switch (action.type) {
        case "SET_ROLE": {
            const roles = action.data
            return { ...state,  roles: roles }
        }
        case "ADD_ROLE": {
            const roles = [...state.roles]
            roles.push(action.data)
            return { ...state, roles }
        }
        default: return { ...state }
    }
}

export default reducer;