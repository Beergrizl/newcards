import React from "react";
import {useFormik} from "formik";
import {NavLink} from "react-router-dom";
import {loginTC} from "./loginReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Navigate} from "react-router-dom";

export type FormikErrorType = {
    email?: string,
    password?: string,
    rememberMe?: boolean
}

export const Login: React.FC = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const loginError = useSelector<AppRootStateType, string>(state => state.login.loginError)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
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
            return errors;
        },

        onSubmit: values => {
            dispatch(loginTC(values))
            //formik.resetForm();
        },
    })
    if (isLoggedIn) {
        return <Navigate to='/profile'/>
    }
    return (
        <div>
            <h1> Login</h1>
            <form onSubmit={formik.handleSubmit}>
                <div style={{color: 'red'}}>{loginError ? loginError : '  '}</div>
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
                    <input type="password"
                           {...formik.getFieldProps('password')}/>
                    {formik.touched.password && formik.errors.password &&
                        <div style={{color: 'red'}}>{formik.errors.password}</div>}
                </div>
                <div>
                    <input type="checkbox"
                           {...formik.getFieldProps('rememberMe')}
                    />
                </div>
                <div>
                    <NavLink to='/passwordRecovery'>PasswordRecovery</NavLink>
                </div>
                <button type={'submit'} color={'primary'}> Login</button>
                <div>
                    <NavLink to='/registration'>Registration</NavLink>
                </div>
            </form>
        </div>
    )
}