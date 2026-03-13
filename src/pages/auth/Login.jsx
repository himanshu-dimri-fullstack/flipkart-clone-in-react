import { useContext, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/users?email=${formData.email}`);
            const data = await res.json();
            console.log(data,);
            if (data.length === 0) {
                setErrorMessage("User not found")
            }
            if (data[0].password === formData.password) {
                setUser(data[0]);
                navigate("/dashboard", { state: data[0] })
            }
            else {
                setErrorMessage("Invalid password")
            }
        }
        catch (error) {
            setErrorMessage("Login failed")
        }

    }

    return (
        <div className="container px-6 lg:px-12 my-3 mx-auto">
            <div className="grid grid-cols-1">
                <div className="max-w-lg mx-auto w-full bg-white p-6 rounded-lg shadow">
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium">Username</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="username"
                                className="w-full border border-[#ccc] px-3 py-2 rounded-lg text-sm outline-none focus:border-black"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                placeholder="password"
                                className="w-full border border-[#ccc] px-3 py-2 rounded-lg text-sm outline-none focus:border-black"
                                onChange={handleChange}
                            />
                        </div>
                        {
                            errorMessage ? <div><span className="text-sm text-red-500 font-semibold">{errorMessage}</span></div> : <></>
                        }

                        <Button type="submit" className="w-full mt-2 text-md bg-[#ffe51f] text-black py-3 rounded-lg font-semibold hover:bg-[#f7dc0a] transition">
                            Login
                        </Button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;