import { createContext, useContext, useReducer } from "react";
import Reducer from './Reducer'

// let getTasks = JSON.parse(localStorage.getItem('tasks'))
// let getCompletedTasks = JSON.parse(localStorage.getItem('completedTasks'))

let initialState = {
    pageLoading: false,
    name:'',
    room:''
}

const AuthContext = createContext()


export function useAuth() {
    return useContext(AuthContext)
}

const ContextProvider = ({children})=>{

    const [state,dispatch] = useReducer(Reducer, initialState)

    return(
        <AuthContext.Provider
        value={{
            name:state.name,
            room:state.room,
            dispatch
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default ContextProvider