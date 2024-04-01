import axios from 'axios'

export const setUser=(data)=>{
return dispatch=>{
    dispatch({type:'SET_USER',data:data})
}
}