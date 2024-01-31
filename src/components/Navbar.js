import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/Navbar.css";
import { UserContext } from "../UserContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const { handleLogout } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    console.log(user);
    if (user === null) {
      setIsLoggedIn(false);
    }
  }, [user]);

  const LogoutClick = () => {
    handleLogout();
    navigate("/Login");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">BONSTAY</div>

      {isLoggedIn && (
        <ul className="navbar-links">
          <Link to="/Home">Home</Link> &nbsp; &nbsp;
          <Link to="/Hotels">Hotels</Link>&nbsp; &nbsp;
          <Link to="/Bookings">Bookings</Link>&nbsp; &nbsp;
          <Button
            className="navbar-link button"
            style={{
              color: "white",
              textTransform: "none",
              paddingLeft: "0",
              fontSize: "1em",
              fontStyle: "italic",
            }}
            onClick={() => LogoutClick()}
          >
            Logout
          </Button>
          &nbsp; &nbsp;
        </ul>
      )}
    </div>
  );
};

export default Navbar;
