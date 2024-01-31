import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";

const JSON_SERVER_URL = "http://localhost:5000/hotels";

const ViewReview = () => {
  const location = useLocation();
  const hotelId = location.state?.hotelId;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${JSON_SERVER_URL}/${hotelId}`);
        setReviews(response.data.reviews || []);
      } catch (error) {
        console.log("Error fetching reviews", error);
        setReviews([]);
      }
    };
    fetchReviews();
  }, [hotelId]);

  return (
    <>
      <Navbar />
      <div className="view-review-container">
        <h1 className="view-review-title">Customers' Reviews</h1>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Card
              key={index}
              style={{ marginBottom: "20px", backgroundColor: "#ebe7e7" }}
            >
              <CardContent>
                <Typography variant="body1">{review}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <p style={{ paddingLeft: "50px" }}>No Reviews available</p>
        )}
      </div>
    </>
  );
};

export default ViewReview;
