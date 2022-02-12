import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {ResponseDataType} from "../login/loginApi";
import {logOutTC} from "../login/loginReducer";
import {Navigate} from "react-router-dom";

export const Profile: React.FC = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.login.isInitialised)

    const data = useSelector<AppRootStateType, ResponseDataType>(state => state.login.data)
    const logOutHandler = () => {
        dispatch(logOutTC())
    }
    if (isInitialized && !isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div>
            <h1> Profile</h1>
            <div>{<img alt={''} src={data.avatar}/>}</div>
            <div> email: {data.email}</div>
            <div> name: {data.name}</div>
            <button onClick={logOutHandler}>LogOut</button>
        </div>
    )
}