import {authAPI, ResponseDataType} from "./loginApi";
import {FormikErrorType} from "./Login";
import {Dispatch} from "redux";

const initialState = {
    isLoggedIn: false,
    data: {} as ResponseDataType,
    loginError: '',
    isInitialised: false,
    initError: '',
};

export const loginReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {

        case "Login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value};
        case "Login/SET-DATA":
            return {...state, data: action.data}
        case "Login/SET-LOGIN-ERROR":
            return {...state, loginError: action.loginError}
        case "Login/SET-INIT-ERROR":
            return {...state, initError: action.initError}
        case "Login/SET-IS-INITIALIZED":
            return {...state, isInitialised: action.value}
        default:
            return state;
    }
};

// actions
const setLoginErrorAC = (loginError: string) =>
    ({type: "Login/SET-LOGIN-ERROR", loginError} as const)
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'Login/SET-IS-LOGGED-IN', value} as const)
export const setDataAC = (data: ResponseDataType) =>
    ({type: 'Login/SET-DATA', data} as const)
export const setIsInitializedAC = (value: boolean) =>
    ({type: 'Login/SET-IS-INITIALIZED', value} as const)
export const setInitErrorAC = (initError: string) =>
    ({type: "Login/SET-INIT-ERROR", initError} as const)

// types
type InitialStateType = typeof initialState;
export type ActionType = ReturnType<typeof setLoginErrorAC>
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setDataAC>
    | ReturnType<typeof setIsInitializedAC>
    | ReturnType<typeof setInitErrorAC>

// thunks
export const loginTC = (data: FormikErrorType) => (dispatch: Dispatch<ActionType>) => {

    authAPI.login(data)
        .then(res => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setDataAC(res.data))
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setLoginErrorAC(error))
        })
}
export const isInitialisedTC = () => (dispatch: Dispatch<ActionType>) => {

    authAPI.me()
        .then(res => {
            dispatch(setIsInitializedAC(true))
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setInitErrorAC(error))
        })
}
export const logOutTC = () => (dispatch: Dispatch<ActionType>) => {

    authAPI.logOut()
        .then(res => {
            dispatch(setIsLoggedInAC(false))

        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setLoginErrorAC(error))
        })
}