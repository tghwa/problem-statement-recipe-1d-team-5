import { useAuthContext } from "./useAuthContext";
// import {useWorkoutsContext} from './useWorkoutsContext'

export const useLogout = () => {
    const dispatch = useAuthContext()
    const { dispatch: dispatchWorkouts } = useAuthContext()

    const logout = () => {
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        // dispatchWorkouts({type: 'SET_WORKOUTS', payload: null})
    }
}

