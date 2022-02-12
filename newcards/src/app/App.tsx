import React, {useEffect} from 'react';
import './App.css';
import {Main} from "../features/main/Main";
import {Navbar} from "../features/navbar/Navbar";
import {useDispatch} from "react-redux";
import {isInitialisedTC} from "../components/login/loginReducer";


const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(isInitialisedTC())
    }, [dispatch])

    return (
        <div className="App">
            <Navbar/>
            <Main/>
        </div>
    );
}

export default App;
