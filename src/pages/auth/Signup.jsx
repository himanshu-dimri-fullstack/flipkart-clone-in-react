import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/Button";

const Signup = () => {

    const { loginUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        setErrorMessage(null);

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        try {
            const trimmedEmail = formData.email.trim();

            const checkRes = await fetch(`https://flipkart-server-09gl.onrender.com/users?email=${trimmedEmail}`);
            if (!checkRes.ok) throw new Error("Server check failed");

            const existingUsers = await checkRes.json();
            if (existingUsers.length > 0) {
                setErrorMessage("Email already present");
                return;
            }

            const response = await fetch("https://flipkart-server-09gl.onrender.com/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: trimmedEmail,
                    password: formData.password
                })
            });

            if (response.ok) {
                const newUser = await response.json();
                loginUser(newUser);
            } else {
                throw new Error("Failed to create account");
            }

        } catch (error) {
            console.error("Signup Error:", error);
            setErrorMessage("Signup failed");
        }
    };

    return (
        <div className="container px-6 lg:px-12 my-3 mx-auto">
            <div className="grid grid-cols-1">
                <div className="max-w-lg mx-auto w-full bg-white p-6 rounded-lg shadow">
                    <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                placeholder="Name"
                                className="w-full border border-[#ccc] px-3 py-2 rounded-lg text-sm outline-none focus:border-black"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Email</label>
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

                        <div>
                            <label className="block mb-1 text-sm font-medium">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                placeholder="confirm password"
                                className="w-full border border-[#ccc] px-3 py-2 rounded-lg text-sm outline-none focus:border-black"
                                onChange={handleChange}
                            />
                        </div>

                        {
                            errorMessage ?
                                <div><span className="text-sm font-semibold text-red-500">{errorMessage}</span></div>
                                :
                                <></>
                        }

                        <Button type="submit" className="w-full mt-2 text-md bg-[#ffe51f] text-black py-3 rounded-lg font-semibold hover:bg-[#f7dc0a] transition">
                            Signup
                        </Button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup