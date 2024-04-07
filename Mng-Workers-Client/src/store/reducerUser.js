
const initalseState = {
    user: null,
}

const reducer = (state = initalseState, action) => {

    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.data}
        default: return { ...state }
    }
}

export default reducer;