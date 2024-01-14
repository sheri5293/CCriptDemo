/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://hiring-test-task.vercel.app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      onLogin(data.token);
      navigate("/appointments");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="body">
      <h1 className="relo">ccript</h1>
      <form>
        <label>Username</label>
        <br />
        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br />
        <label>Password</label>
        <br />
        <input
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />
        <button className="color" type="button" onClick={handleLogin}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
