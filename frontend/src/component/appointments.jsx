/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { SlRefresh } from "react-icons/sl";
import "./appointments.css";

const Appointments = ({ token, setToken }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "https://hiring-test-task.vercel.app/api/appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (Array.isArray(data)) {
            setAppointments(data);
          } else if (typeof data === "object" && Object.keys(data).length > 0) {
            const dataArray = Object.values(data);
            console.log(dataArray);
            setAppointments(dataArray);
          } else {
            console.error("Appointments data is not a valid array:", data);
            console.log(data);
          }
        } else {
          console.error("Error fetching appointments:", response.statusText);
        }
      } catch (error) {
        if (error.response.status === 401) {
          // If unauthorized, attempt to refresh the token
          const refreshTokenResponse = await fetch(
            "https://hiring-test-task.vercel.app/api/refresh-token",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (refreshTokenResponse.ok) {
            const refreshedData = await refreshTokenResponse.json();
            const newToken = refreshedData.token;

            // Update the token in the state
            setToken(newToken);
          } else {
            console.error(
              "Failed to refresh token:",
              refreshTokenResponse.statusText
            );
          }
        } else {
          console.error("Failed to fetch appointments:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token, setToken]);

  Appointments.propTypes = {
    token: PropTypes.string.isRequired,
  };

  return (
    <>
      <div className="container-fluid">
        <nav className="navbar">
          <div className="logo">ccript</div>
          <Link to="/login" className="logout" onClick={handleLogout}>
            <FaSignOutAlt />
          </Link>
        </nav>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <SlRefresh className="icon" />
            </th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr key="loading">
              <td colSpan="8">Loading...</td>
            </tr>
          ) : (
            appointments.map((appointment, index) => (
              <tr key={`row-${index}-${appointment.time}`}>
                <td key={`time-${index}-${appointment.time}`}>
                  <b>{appointment.startTimeFormatted}</b>
                </td>
                <td key={`Monday-${index}-${appointment.time}`}>
                  {appointment.weekDay === "Monday" && (
                    <div className="cards">
                      <h2>{appointment.name}</h2>
                      <p>Reason: {appointment.reason}</p>
                    </div>
                  )}
                </td>
                <td key={`Tuesday-${index}-${appointment.time}`}>
                  {appointment.weekDay === "Tuesday" && (
                    <div className="cards">
                      <h2>{appointment.name}</h2>
                      <p>Reason: {appointment.reason}</p>
                    </div>
                  )}
                </td>
                <td key={`Wednesday-${index}-${appointment.time}`}>
                  {appointment.weekDay === "Wednesday" && (
                    <div className="cards">
                      <h2>{appointment.name}</h2>
                      <p>Reason: {appointment.reason}</p>
                    </div>
                  )}
                </td>
                <td key={`Thursday-${index}-${appointment.time}`}>
                  {appointment.weekDay === "Thursday" && (
                    <div className="cards">
                      <h2>{appointment.name}</h2>
                      <p>Reason: {appointment.reason}</p>
                    </div>
                  )}
                </td>
                <td key={`Friday-${index}-${appointment.time}`}>
                  {appointment.weekDay === "Friday" && (
                    <div className="cards">
                      <h2>{appointment.name}</h2>
                      <p>Reason: {appointment.reason}</p>
                    </div>
                  )}
                </td>
                <td key={`Saturday-${index}-${appointment.time}`}>
                  {appointment.weekDay === "Saturday" && (
                    <div className="cards">
                      <h2>{appointment.name}</h2>
                      <p> {appointment.reason}</p>
                    </div>
                  )}
                </td>
                <td key={`Sunday-${index}-${appointment.time}`}>
                  {appointment.weekDay === "Sunday" && (
                    <div className="cards">
                      <h2>{appointment.name}</h2>
                      <p>Reason: {appointment.reason}</p>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default Appointments;
