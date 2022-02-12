import React, {useEffect} from "react";
import {useFormik} from "formik";
import {NavLink} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Navigate} from "react-router-dom";
import {registerTC, setRegistrationErrorAC} from "./registrationReducer";

export type FormikRegisterErrorType = {
    email?: string,
    password?: string,
    passwordConfirm?: string
}

export const Registration: React.FC = () => {

    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistered)
    const registrationError = useSelector<AppRootStateType, string>(state => state.registration.registrationError)
    const dispatch = useDispatch()
    useEffect(() => {
        if (registrationError) {
            setTimeout(() => {
                setRegistrationErrorAC('')
            }, 4000)
        }
    }, [registrationError,dispatch])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirm: ''
        },
        validate: (values) => {
            const errors: FormikRegisterErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Must be 3 characters or more';
            }
            if (!values.passwordConfirm) {
                errors.passwordConfirm = 'Required';
            } else if (values.passwordConfirm !== values.password) {
                errors.passwordConfirm = 'passwords must be same';
            }
            return errors;
        },

        onSubmit: values => {
            dispatch(registerTC(values))
            //formik.resetForm();
        },
    })

    if (isRegistered) {
        return <Navigate to='/login'/>
    }
    return (
        <div>
            <div> Registration</div>
            <form onSubmit={formik.handleSubmit}>

                <div>
                    <input type="email"
                        // name="email"
                        // onBlur={formik.handleBlur}
                        // onChange={formik.handleChange}
                        // value={formik.values.email}
                           {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email &&
                        <div style={{color: 'red'}}>{formik.errors.email} </div>}

                </div>
                <div>
                    <input type="password" id='password'
                           {...formik.getFieldProps('password')}/>
                    {formik.touched.password && formik.errors.password &&
                        <div style={{color: 'red'}}>{formik.errors.password}</div>}
                </div>
                <div>
                    <input type="password" id='passwordConfirm'
                           {...formik.getFieldProps('passwordConfirm')}/>
                    {formik.touched.passwordConfirm && formik.errors.passwordConfirm &&
                        <div style={{color: 'red'}}>{formik.errors.passwordConfirm}</div>}
                </div>
                <div style={{color: 'red'}}>{registrationError ? registrationError : ''}</div>
                <button type={'submit'} color={'primary'}> Sign Up</button>
                <div>
                    <NavLink to='/login'>Login</NavLink>
                </div>
            </form>
        </div>
    )
}