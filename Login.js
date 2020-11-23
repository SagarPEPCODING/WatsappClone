import React from 'react'
import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from './firebase';
import { actionTypes } from './Reducer';
import {useStateValue} from './Stateprovider';


function Login() {

    const [{},dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider).then((result) => {
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
            })
        }).catch((error) => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://freepngimg.com/thumb/whatsapp/1-2-whatsapp-png-clipart.png" alt="" />
                <div className="login__text">
                    <h1>Sign in to whatsApp</h1>
                </div>
                <Button onClick={signIn}>
                    Sign in with Google...
                </Button>
            </div>
        </div>
    );
}

export default Login;
