import {
    createContext, useEffect, useState,
    useContext
} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            setLoading(true);
            try {
                const { data: res } = await axios.get('https://github-20-backend.vercel.app/api/auth/check',
                    { withCredentials: true }
                );
                setAuthUser(res.user);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }

        }
        checkUserLoggedIn();
    }, [])


    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}