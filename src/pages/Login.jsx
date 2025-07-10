// pages/Login.jsx
import { useState } from "react";
import axios from "axios";// Axios with `withCredentials: true`
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; // Custom hook to access auth context

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    const { login } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       await  axios.post("https://localhost:7259/api/Account/login", { email, password }, { withCredentials: true })
       .then((response) => {
        login(response.data.user); // Save user data in context
         navigate("/");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      })

       ;
      // go to dashboard
    } catch (error) {
      console.error("Login error:", error);
      
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md space-y-4">
        <h2 className="text-xl font-bold text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
