import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button, InputLabel, TextField } from "@mui/material";
import axios from "axios";
import Navbar from "./Navbar";
import image from "../door1.jpg";

const JSON_SERVER_URL = "http://localhost:5000/users";

const Register = () => {
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const userResponse = await axios.get(
        `${JSON_SERVER_URL}?name=${data.name}`
      );

      if (userResponse.data.length > 0) {
        setErrMsg("Name is already taken, Please try with different name.");
        return;
      }
      const response = await axios.post(JSON_SERVER_URL, data);
      console.log("User Resgistered:", response);
      setSuccessMsg("Registration Successful. You can log in.");
      setErrMsg("");
      navigate("/login");
    } catch (error) {
      console.log("Error registering user:", error);
      setSuccessMsg("");
      setErrMsg("Registration failed. Pleage try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-container">
        <div className="left-side">
          <img src={image} alt="" />
        </div>
        <div className="right-side">
          <form onSubmit={handleSubmit(onSubmit)} className="regiter-form">
            <div>
              <InputLabel style={{ color: "black" }}>Name:</InputLabel>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: true, minLength: 3 }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    {...field}
                    error={!!errors.name}
                    helperText={errors.name ? "Min 3 characters required" : ""}
                    InputLabelProps={{ style: { color: "black" } }}
                  ></TextField>
                )}
              ></Controller>
            </div>
            <br />
            <div>
              <InputLabel style={{ color: "black" }}>Address:</InputLabel>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    className="form-input"
                    {...field}
                    error={!!errors.address}
                    helperText={errors.address ? "Address is required" : ""}
                    InputLabelProps={{ style: { color: "black" } }}
                  ></TextField>
                )}
              ></Controller>
            </div>
            <br />
            <div>
              <InputLabel style={{ color: "black" }}>Phone No:</InputLabel>

              <Controller
                name="phoneNo"
                control={control}
                defaultValue=""
                rules={{ required: true, pattern: /^[0-9]{10}$/ }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    {...field}
                    error={!!errors.phoneNo}
                    helperText={errors.phoneNo ? "Invalid phone number" : ""}
                    InputLabelProps={{ style: { color: "black" } }}
                  ></TextField>
                )}
              ></Controller>
            </div>
            <br />
            <div>
              <InputLabel style={{ color: "black" }}>Email Id:</InputLabel>

              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: true, pattern: /^\S+@\S+\.\S+$/ }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    {...field}
                    error={!!errors.email}
                    helperText={errors.email ? "Invalid email format" : ""}
                    InputLabelProps={{ style: { color: "black" } }}
                  ></TextField>
                )}
              ></Controller>
            </div>
            <br />
            <div>
              <InputLabel style={{ color: "black" }}>Password:</InputLabel>

              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: true, minLength: 8, maxLength: 12 }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="password"
                    {...field}
                    error={!!errors.password}
                    helperText={
                      errors.password
                        ? "Passwordd must be 8 to 12 characters long."
                        : ""
                    }
                    InputLabelProps={{ style: { color: "black" } }}
                  ></TextField>
                )}
              ></Controller>
            </div>
            <br />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "#88685e",
                color: "white",
              }}
            >
              Register
            </Button>
          </form>
          <p>
            Already registered? <br />
            <span className="line">
              <Link to="/LogIn">Log In</Link>
            </span>
          </p>
          {successMsg && <p>{successMsg}</p>}
          {errMsg && <p>{errMsg}</p>}
        </div>
      </div>
    </>
  );
};

export default Register;
