import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/Button";
import { Navigate } from "react-router-dom";

const Dashboard = () => {

    const { user, logoutUser } = useContext(AuthContext);
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!user && !storedUser) {
        return <Navigate to="/login" replace />;
    }

    const currentUser = user || storedUser;
    return (
        <div className="container mx-auto flex flex-col justify-center items-center px-6 lg:px-12 py-10">
            <h1 className="text-3xl font-bold text-center mb-6">
                Welcome {currentUser.name}
            </h1>
            <Button onClick={logoutUser} className="border border-[#ffe51f] rounded-lg bg-[#ffe51f] text-sm text-black font-semibold px-6 py-3">Logout</Button>
        </div>
    );
};

export default Dashboard;