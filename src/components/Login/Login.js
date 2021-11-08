import React from 'react';
import './Login.css';
import { Button } from "@mui/material";
import {auth, provider} from "../../firebase";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useStateValue } from '../StateProvider/StateProvider';
import { actionTypes } from '../StateProvider/Reducer';

export default function Login() {

    const [{ }, dispatch] = useStateValue();
    const signIn = () =>  {
        signInWithPopup(auth, provider)
            .then((result) => dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            }))
            .catch((err) => alert(err.message));
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://cdn-icons-png.flaticon.com/512/174/174879.png" alt="" />

                <div className="login__text">
                    <h1> Inicia sesion en Whatsapp </h1>
                </div>

                <Button onClick={signIn}>
                    Inicia sesión con Google
                </Button>
            </div>
        </div>
    )
}
