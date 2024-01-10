import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://hiring-test-task.vercel.app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        console.log("Bearer Token:", token);

        navigate("/appointment");

        // Example: Fetch Appointments using the token
        fetchAppointments(token);
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error during authentication:", error.message);
    } finally {
      setLoading(false); // Set loading to false after login attempt
    }
  };

  const fetchAppointments = async (token) => {
    try {
      const appointmentsResponse = await fetch(
        "https://hiring-test-task.vercel.app/api/appointments",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (appointmentsResponse.ok) {
        const appointmentsData = await appointmentsResponse.json();
        console.log("Appointments:", appointmentsData);
        // Now you can use the appointments data as needed
      } else {
        console.error("Error fetching appointments");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error.message);
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
        <button
          className="color"
          type="button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
