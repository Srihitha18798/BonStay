import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import HotelCard from "./HotelCard";
import { UserContext } from "../UserContext";

const JSON_SERVER_URL = "http://localhost:5000/hotels";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(JSON_SERVER_URL);
        setHotels(response.data);
      } catch (error) {
        console.log("Error fetching hotels:", error);
      }
    };
    fetchHotels();
  }, [user]);

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "80px" }}>
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel}></HotelCard>
        ))}
      </div>
    </>
  );
};

export default Hotels;
