import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { UserContext } from "../UserContext";
import axios from "axios";
import BookingCard from "./BookingCard";

const JSON_SERVER_URL = "http://localhost:5000/bookings";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${JSON_SERVER_URL}?userId=${user}`);
        console.log(response.data);
        setBookings(response.data);
      } catch (error) {
        console.log("Error fetching hotels:", error);
      }
    };
    fetchBookings();
  }, [user]);

  return (
    <>
      <Navbar></Navbar>
      <div
        style={{
          marginTop: "80px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginLeft: "50px",
        }}
      >
        {bookings.map((booking, index) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            index={index}
          ></BookingCard>
        ))}
      </div>
    </>
  );
};

export default Bookings;
