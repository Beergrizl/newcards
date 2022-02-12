import React, {ChangeEvent, useState} from "react";
import {NavLink} from "react-router-dom";

export const PasswordRecovery: React.FC = () => {
    const [data, setData] = useState(
        {
            email: '',
            message: `<div style="background-color: lime; padding: 15px">
            password recovery link: 
            <a href='http://localhost:3000/#/set-new-password/$token$'>
link</a></div>` // хтмп-письмо, вместо $token$ бэк вставит токен,
        }
    )
    const onClickHandler = () => {
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, email: e.currentTarget.value})
    }

    return (
        <div>
            <h1> PasswordRecovery</h1>
            email <input type={'email'} onChange={onChangeHandler}/>
            <button onClick={onClickHandler}>Send</button>
            <p>Enter your email address and we will send you further instructions</p>
            <NavLink to={'/login'}>Login</NavLink>
        </div>
    )
}