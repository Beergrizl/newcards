import {Dispatch} from "redux";
import {authAPI} from "../login/loginApi";
import {FormikRegisterErrorType} from "./Registration";

const initialState = {
    isRegistered: false,
    registrationError: '',
};

export const registrationReducer = (state: InitialStateType = initialState, action: RegActionType): InitialStateType => {
    switch (action.type) {
        case "REGISTRATION/SET-REGISTRATION":
            return {...state, isRegistered: action.value};
        case "REGISTRATION/SET-REGISTRATION-ERROR":
            return {...state, registrationError: action.registrationError}
        default:
            return state;
    }
};

// actions
const setRegistrationAC = (value: boolean) => ({type: "REGISTRATION/SET-REGISTRATION", value} as const)
export const setRegistrationErrorAC = (registrationError: string) => ({type: "REGISTRATION/SET-REGISTRATION-ERROR", registrationError} as const)

// types
type InitialStateType = typeof initialState;
export type RegActionType = ReturnType<typeof setRegistrationAC>|
    ReturnType<typeof setRegistrationErrorAC>

export const registerTC = (data: FormikRegisterErrorType) => (dispatch: Dispatch<RegActionType>) => {

    authAPI.register(data)
        .then(res => {
            dispatch(setRegistrationAC(true))
        })
     .catch(e => {
         const error = e.response
             ? e.response.data.error
             : (e.message + ', more details in the console');
         dispatch(setRegistrationErrorAC(error))
 })
}