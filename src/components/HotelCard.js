import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <Card
      style={{
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        width: "800px",
        height: "150px",
        backgroundColor: "#ebe7e7",
      }}
    >
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <CardMedia
          component="img"
          height="40"
          image={require(`../${hotel.imageUrl}`)}
          alt=""
          style={{
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            objectFit: "cover",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        ></CardMedia>
        <CardContent>
          <Typography variant="h6">{hotel.hotelName}</Typography>
          <Typography variant="body2">City: {hotel.city}</Typography>
          <Typography variant="body2">Amenities: {hotel.amenities}</Typography>
          <Typography variant="body2">Address: {hotel.address}</Typography>
          <Typography variant="body2">Contact No: {hotel.phoneNo}</Typography>
        </CardContent>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          marginTop: "10px",
          marginRight: "10px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{
            marginBottom: "10px",
            paddingLeft: "25px",
            backgroundColor: "#88685e",
            color: "white",
          }}
          onClick={() =>
            navigate("/BookRoom", {
              state: {
                hotelId: hotel.id,
                hotelName: hotel.hotelName,
                userId: user,
              },
            })
          }
        >
          Book a Room
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{
            marginBottom: "10px",
            paddingLeft: "24px",
            backgroundColor: "#88685e",
            color: "white",
          }}
          onClick={() =>
            navigate("/AddReview", {
              state: {
                hotelId: hotel.id,
              },
            })
          }
        >
          Add a Review
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{
            marginBottom: "10px",
            paddingLeft: "20px",
            backgroundColor: "#88685e",
            color: "white",
          }}
          onClick={() =>
            navigate("/ViewReview", {
              state: {
                hotelId: hotel.id,
              },
            })
          }
        >
          View Reviews
        </Button>
      </div>
    </Card>
  );
};

export default HotelCard;
