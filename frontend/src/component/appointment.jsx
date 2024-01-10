import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { SlRefresh } from "react-icons/sl";
import "./appointment.css";
const Appointment = () => {
  const handleLogout = () => {
    window.location.href = "/";
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
          <tr>
            <td>
              <b>8 AM</b>
            </td>
            <td>
              <div className="card">
                <h2>Abu Bakar</h2>
                <p>Reason</p>
                <p>Lorem Ipsum</p>
              </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <b>9 AM</b>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <b>10 AM</b>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <b>11 AM</b>
            </td>
            <td></td>
            <td></td>
            <td>
              <div className="card2">
                <h3>Abu Bakar</h3>
                <p>Reason</p>
                <p>Lorem Ipsum</p>
              </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <b>12 PM</b>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <b>1 PM</b>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <b>2 PM</b>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Appointment;
