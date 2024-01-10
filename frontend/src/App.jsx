// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/login";
import Appointment from "./component/appointment";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/appointment" element={<Appointment />} />
      </Routes>
    </Router>
  );
};

export default App;
