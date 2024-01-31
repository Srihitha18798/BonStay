import React, { useState } from "react";
import Navbar from "./Navbar";
import { Controller, useForm } from "react-hook-form";
import { Button, FormControl, InputLabel, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const JSON_SERVER_URL = "http://localhost:5000/bookings";

const RescheduleBooking = () => {
  const location = useLocation();
  const bookingId = location.state?.bookingId;

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);

    try {
      const existedResponse = await axios.get(
        `${JSON_SERVER_URL}/${bookingId}`
      );
      const updatedData = { ...existedResponse.data, ...data };
      const response = await axios.put(
        `${JSON_SERVER_URL}/${bookingId}`,
        updatedData
      );
      console.log("PUT request response", response);
      if (response.status === 200) {
        setSuccessMsg("Rescheduled Succesfully");
        setErrMsg("");
        navigate("/Bookings");
      } else {
        setSuccessMsg("");
        setErrMsg("Failed to Reschedule Booking. Please try again.");
      }
    } catch (error) {
      console.log("Error reschedule booking", error);
      setSuccessMsg("");
      setErrMsg("Failed to Reschedule Booking. Please try again.");
    }
  };
  return (
    <>
      <Navbar />
      <div className="booking-container">
        <h1 className="booking-title">Book A Room</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputLabel style={{ color: "black" }}>Start date:</InputLabel>
            <Controller
              name="startDate"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                validate: {
                  greaterThanToday: (value) =>
                    (value !== "" && value > today) ||
                    "Start Date should be greater than today",
                },
              }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    type="date"
                    {...field}
                    error={!!errors.startDate}
                    helperText={errors.startDate && errors.startDate.message}
                    InputLabelProps={{ style: { color: "black" } }}
                  ></TextField>
                </FormControl>
              )}
            ></Controller>
          </div>
          <br />
          <div>
            <InputLabel style={{ color: "black" }}>End date:</InputLabel>
            <Controller
              name="endDate"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                validate: {
                  greaterThanStartDate: (value) =>
                    (value !== "" && value >= watch("startDate")) ||
                    "The end date should be greater than or equal to startDate.",
                },
              }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    type="date"
                    {...field}
                    error={!!errors.endDate}
                    helperText={errors.endDate && errors.endDate.message}
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
            fullWidth
            style={{
              backgroundColor: "#88685e",
              color: "white",
            }}
          >
            Reschedule
          </Button>
        </form>
        <br />
        <br />
        {successMsg && <p>{successMsg}</p>}
        {errMsg && <p>{errMsg}</p>}
      </div>
    </>
  );
};

export default RescheduleBooking;
