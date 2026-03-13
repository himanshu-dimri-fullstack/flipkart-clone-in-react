import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        return savedUser ? savedUser : null;
    })

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user))
        } else {
            localStorage.removeItem("user")
        }
    }, [user])

    const logoutUser = () => {
        setUser(null);
        console.log(user);
        navigate("/login");
    }

    return (
        <>
            <AuthContext.Provider value={{ user, setUser, logoutUser }}>
                {children}
            </AuthContext.Provider>
        </>

    )

}

export default AuthProvider