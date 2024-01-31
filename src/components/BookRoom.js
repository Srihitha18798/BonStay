import React, { useState } from "react";
import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const JSON_SERVER_URL = "http://localhost:5000/bookings";

const BookRoom = () => {
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const roomType = ["AC", "NON-AC"];
  const location = useLocation();
  const hotelId = location.state?.hotelId;
  const hotelName = location.state?.hotelName;
  const userId = location.state?.userId;

  const today = new Date().toISOString().split("T")[0];

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);

    const bookingData = {
      ...data,
      hotelId: hotelId,
      hotelName: hotelName,
      userId: userId,
    };

    try {
      const response = await axios.post(JSON_SERVER_URL, bookingData);
      console.log("Book room:", response);
      setSuccessMsg(
        "Room is succesfully booked. You can check in your bookings."
      );
      setErrMsg("");
      navigate("/Bookings");
    } catch (error) {
      console.log("Error booking room:", error);
      setSuccessMsg("");
      setErrMsg("Room booking failed. Pleage try again.");
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
          <div>
            <InputLabel style={{ color: "black" }}>
              Number of Persons:
            </InputLabel>
            <Controller
              name="noOfPersons"
              control={control}
              defaultValue=""
              rules={{ required: true, min: 0, max: 5 }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    {...field}
                    error={!!errors.noOfPersons}
                    helperText={
                      errors.noOfPersons
                        ? "The number of persons should be greater than 0 and less than or equal to 5."
                        : ""
                    }
                    InputLabelProps={{ style: { color: "black" } }}
                  ></TextField>
                </FormControl>
              )}
            ></Controller>
          </div>
          <br />
          <div>
            <InputLabel style={{ color: "black" }}>Number of Rooms:</InputLabel>
            <Controller
              name="noOfRooms"
              control={control}
              defaultValue=""
              rules={{ required: true, min: 0, max: 3 }}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    type="number"
                    {...field}
                    error={!!errors.noOfRooms}
                    helperText={
                      errors.noOfRooms
                        ? "The number of rooms should be greater than 0 and less than or equal to 3."
                        : ""
                    }
                    InputLabelProps={{ style: { color: "black" } }}
                  ></TextField>
                </FormControl>
              )}
            ></Controller>
          </div>
          <br />
          <div>
            <InputLabel style={{ color: "black" }}>Type of Room:</InputLabel>
            <Controller
              name="typeOfRoom"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth>
                  <Select {...field}>
                    {roomType.map((type, index) => (
                      <MenuItem key={index} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
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
            Book
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

export default BookRoom;
