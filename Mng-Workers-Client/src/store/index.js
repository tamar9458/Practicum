import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducerUser from './reducerUser';
import reducerEmployee from './rducerEmployee'
import reducerRoles from './reducerRoles';
import { thunk } from 'redux-thunk'


const reducers = combineReducers({
    user: reducerUser,
    employee: reducerEmployee,
    role: reducerRoles
})

const store = createStore(reducers, applyMiddleware(thunk));

export default store;