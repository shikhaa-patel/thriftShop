import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../baseurl";
import axios from "axios";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null);
    const [user, setUser] = useState(() => localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null);
    const [loading, setLoading] = useState(false);

    const history = useNavigate();

    const loginUser = async (credential) => {
        setLoading(true)
        let url = baseurl + 'auth/token/'
        try {
            const response = await axios.post(url, credential)
            if (response.status === 200) {
                setAuthTokens(response.data);
                setUser(jwt_decode(response.data.access));
                localStorage.setItem("authTokens", JSON.stringify(response.data));
                history("/");
            }
            setLoading(false);
            return 200;
        }
        catch (err) {
            setLoading(false)
            if (err.response ? err.response.status : '' === 401) {
                return 401;
            }
            return err.message
        }
    };

    const registerUser = async (credential) => {
        setLoading(true)
        try {
            let url = baseurl + 'auth/register/'
            const response = await axios.post(url, credential)
            if (response.status === 201) {
                history('/login');
                // setAuthTokens(response.data);
                // setUser(jwt_decode(response.data.access));
                // localStorage.setItem("authTokens", JSON.stringify(response.data));
                // history("/");
            }
            setLoading(false);
            return 'registered';
        }
        catch (err) {
            setLoading(false)
            if ((err.response.data.username ? err.response.data.username[0] : '') === 'A user with that username already exists.') {
                return 'userexist'
            }
            else if ((err.response.data.password ? err.response.data.password[0] : '') === 'This password is too common.') {
                return 'passCommon'
            }
            return err.message
        }
    };

    const checkUser = () => {
        if (!user) {
            history('/login')
        }
    }

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        checkUser,
        loading,
        setLoading
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access));
        }
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};