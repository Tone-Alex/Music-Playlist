import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    USER_ERROR: "USER_ERROR",
    GUEST_LOGIN: "GUEST_LOGIN"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorMessage: "",
        guest: false
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: "",
                    guest: false            // SHOULD THIS BE !payload.loggedIn
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMessage: "",
                    guest: false
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: "",
                    guest: false
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: false,
                    errorMessage: "",
                    guest: false
                })
            }
            case AuthActionType.USER_ERROR: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: payload.errorMessage,
                    guest: false
                })
            }
            case AuthActionType.GUEST_LOGIN: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: "",
                    guest: true
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                // type: AuthActionType.SET_LOGGED_IN,         // SHOULD BE GET LOGGED IN????
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(firstName, lastName, username, email, password, passwordVerify) {
        try {
            const response = await api.registerUser(firstName, lastName, username, email, password, passwordVerify);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/login");
                // history.push("/");
            }
        } catch (error) {
            console.log("REGISTER UNSUCCESSFUL: " + error.response.data.errorMessage);
            auth.setErrorMessage(error.response.data.errorMessage);
        }
    }

    auth.loginUser = async function(email, password) {
        try {
            const response = await api.loginUser(email, password);
            if (response.status === 200) {
                console.log("LOGIN SUCCESSFUL: " + response.data.user.firstName);
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
            }
        } catch (error) {
            console.log("LOGIN UNSUCCESSFUL: " + error.response.data.errorMessage);
            auth.setErrorMessage(error.response.data.errorMessage);
        }
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history.push("/");
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        console.log("user initials: " + initials);
        return initials;
    }

    auth.setErrorMessage = function(message) {
        authReducer({
            type: AuthActionType.USER_ERROR,
            payload: {
                errorMessage: message
            }
        });
    }

    auth.guestLogin = function() {
        authReducer({
            type: AuthActionType.GUEST_LOGIN,
            payload: null
        });
        history.push("/");
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };