import axios, {AxiosResponse} from 'axios'
import {FormikErrorType} from "./Login";
import {FormikRegisterErrorType} from "../registration/Registration";

const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true,
})

export const authAPI = {
    login(data: FormikErrorType) {
        return instance.post<FormikErrorType, AxiosResponse<ResponseDataType>>('/auth/login', data)
    },
    register(data: FormikRegisterErrorType) {
        return instance.post<FormikRegisterErrorType, AxiosResponse<RegisterDataType>>('/auth/register', data)
    },
    me() {
        return instance.post< AxiosResponse<ResponseDataType>>('/auth/me')
    },
    logOut() {
        return instance.delete< AxiosResponse<LogOutDataType>>('/auth/me')
    },
}
export type RegisterDataType = {
    addedUser: {},
    error?: string;
}
export type LogOutDataType = {
    info: string,
    error?: string;
}
export type ResponseDataType = {

    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;

}