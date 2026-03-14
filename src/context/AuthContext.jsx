import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        return savedUser ? savedUser : null;
    })

    const loginUser = (newUser) => {
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser))
        navigate("/dashboard");
    }

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("user")
        navigate("/login");
    }

    return (
        <>
            <AuthContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
                {children}
            </AuthContext.Provider>
        </>

    )

}

export default AuthProvider