import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Controller, useForm } from "react-hook-form";
import { Button, FormControl, InputLabel, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

const JSON_SERVER_URL = "http://localhost:5000/hotels";

const AddReview = () => {
  const { user } = useContext(UserContext);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const hotelId = location.state?.hotelId;
  let [existingReviews, setExistingReviews] = useState([]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchExistingReviews = async () => {
      try {
        const response = await axios.get(`${JSON_SERVER_URL}/${hotelId}`);
        setExistingReviews(response.data.reviews);
        console.log("existing reviews", existingReviews);
      } catch (error) {
        console.log("Error fetching existing data", error);
      }
    };
    fetchExistingReviews();
  }, [user]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const updatedReviews = [...existingReviews, data.review];
      console.log(updatedReviews);
      const response = await axios.patch(`${JSON_SERVER_URL}/${hotelId}`, {
        reviews: updatedReviews,
      });
      console.log("Patch response", response.data);
      setSuccessMsg("Review Added Succesfully");
      setErrMsg("");
      navigate("/Hotels");
    } catch (error) {
      console.log("Error adding review", error);
      setSuccessMsg("");
      setErrMsg("Failed to add Review, Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="review-container">
        <h1 className="review-title">Your Reviews Means a Lot for Us</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputLabel style={{ color: "black" }}>Add your Review:</InputLabel>
            <br />
            <Controller
              name="review"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    error={!!errors.review}
                    helperText={errors.password ? "Review is required." : ""}
                    InputLabelProps={{ style: { color: "black" } }}
                  ></TextField>
                </FormControl>
              )}
            ></Controller>
          </div>
          <br />
          <Button
            type="submit"
            variant="contained"
            style={{
              backgroundColor: "#88685e",
              color: "white",
              marginLeft: "475px",
            }}
          >
            Add Review
          </Button>
        </form>

        {successMsg && <p>{successMsg}</p>}
        {errMsg && <p>{errMsg}</p>}
      </div>
    </>
  );
};

export default AddReview;
