import React from "react";
import {Navigate, Route, Routes } from 'react-router-dom';
import {PasswordNew} from "../../components/passwordNew/PasswordNew";
import {Profile} from "../../components/profile/Profile";
import {PasswordRecovery} from "../../components/passwordRecovery/PasswordRecovery";
import {Registration} from "../../components/registration/Registration";
import {Login} from "../../components/login/Login";
import {SuperComponents} from "../../components/superComponents/SuperComponents";
import {Page404} from "../../components/page404/Page404";
import styles from './Main.module.css'


export const Main: React.FC = () => {
    return (
        <div className={styles.Main}>
            <Routes>

                <Route path='/login' element={<Login/>}/>

                <Route path='/' element={<Navigate to='/profile'/>}/>
                <Route path='/profile' element={<Profile/>}/>

                <Route path='/registration' element={<Registration/>}/>
                <Route path='/passwordRecovery' element={<PasswordRecovery/>}/>
                <Route path='/passwordNew' element={<PasswordNew/>}/>
                <Route path='/superComponents' element={<SuperComponents/>}/>

                <Route path='404' element={<Page404/>}/>
                <Route path='*' element={<Navigate to='/404'/>}/>
            </Routes>
        </div>
    )
}