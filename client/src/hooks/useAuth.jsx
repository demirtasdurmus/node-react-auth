import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { UserContext } from '../context/UserContext';
import Notification from "../components/helpers/Notification";


export default function useAuth() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    //set user in context and push them home
    const setUserContext = () => {
        axios.get("/api/v1/auth/check-auth")
            .then(res => {
                if (res.data.status === "success") {
                    console.log(res.data)
                    setUser(res.data.data);
                    navigate('/skills');
                };
            })
            .catch(() => {
                Cookies.remove('__session');
                navigate('/');
            });
    };

    const loginUser = (values) => {
        const { email, password } = values;
        axios.post("/api/v1/auth/login", {
            email,
            password
        })
            .then((res) => {
                Cookies.set('__session',
                    window.btoa(`rT94VTe11Y1aTg8D5UKZ5C9wSa1CVwjp${res.data.token.split('.')[1]}${process.env.REACT_APP_CLIENT_UNIFIER}${Date.now() * 1523654}`),
                    {
                        expires: 1,
                        // httpOnly: process.env.NODE_ENV === "production" ? true : false,
                        secure: true,
                        sameSite: 'strict'
                    });
                setUserContext();
            })
            .catch((err) => Notification("error", err.response.data.message));
    };

    const logoutUser = () => {
        axios.get("/api/v1/auth/logout")
            .then((res) => {
                if (res.data.status === "success") {
                    setUser(null);
                    Cookies.remove('__session');
                    Notification("success", "Logged out successfully");
                };
            })
            .catch((err) => Notification("error", err.response.data.message));
    };
    return {
        loginUser,
        logoutUser
    };
}