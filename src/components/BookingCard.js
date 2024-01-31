import { Button, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const JSON_SERVER_URL = "http://localhost:5000/bookings";

const BookingCard = ({ booking, index }) => {
  const bookingId = `${String(index).padStart(0, "0")}`;
  const navigate = useNavigate();

  const deleteBooking = async (id) => {
    try {
      const response = await axios.delete(`${JSON_SERVER_URL}/${id}`);
      console.log("Delete request response", response);
      if (response.status === 200) {
        console.log("Booking deleted succesfully");
        navigate("/Home");
      }
    } catch (error) {
      console.log("Error reschedule booking", error);
    }
  };

  return (
    <Card
      style={{
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFF5EE",
        marginRight: "20px",
        width: "250px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <CardContent>
          <Typography variant="h6">B-00{bookingId}</Typography>
          <Typography variant="body2">
            Hotel Name: {booking.hotelName}
          </Typography>
          <Typography variant="body2">
            Start Date: {booking.startDate}
          </Typography>
          <Typography variant="body2">End Date: {booking.endDate}</Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="body2">
              No of Persons: {booking.noOfPersons}
            </Typography>
            <Typography variant="body2" style={{ marginLeft: "10px" }}>
              No of Rooms: {booking.noOfRooms}
            </Typography>
          </div>
          <Typography variant="body2">
            Type of Room: {booking.typeOfRoom}
          </Typography>
        </CardContent>
      </div>
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{
            marginBottom: "20px",
            backgroundColor: "#88685e",
            color: "white",
          }}
          onClick={() =>
            navigate("/RescheduleBooking", {
              state: {
                bookingId: booking.id,
              },
            })
          }
        >
          Reschedule Booking
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => deleteBooking(booking.id)}
          style={{
            backgroundColor: "#88685e",
            color: "white",
          }}
        >
          Cancel
        </Button>
      </div>
    </Card>
  );
};

export default BookingCard;
