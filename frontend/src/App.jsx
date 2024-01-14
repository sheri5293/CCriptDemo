import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./component/login";
import Appointments from "./component/appointments";

const App = () => {
  const [token, setToken] = React.useState(null);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/login"
            element={
              !token ? (
                <LoginForm onLogin={handleLogin} />
              ) : (
                <Navigate to="/appointments" />
              )
            }
          />
          <Route
            path="/appointments"
            element={
              token ? <Appointments token={token} /> : <Navigate to="/login" />
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
