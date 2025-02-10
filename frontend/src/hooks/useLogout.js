import { useAuthContext } from "./useAuthContext";
import {useRecipesContext} from './useWRecipeContext'

export const useLogout = () => {
    const dispatch = useAuthContext()
    const { dispatch: dispatchReceipts } = useRecipesContext()

    const logout = () => {
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        dispatchReceipts({type: 'SET_RECEIPTS', payload: null})
    }

    return { logout }
}

