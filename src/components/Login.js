import { Button, InputLabel, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { UserContext } from "../UserContext";

const JSON_SERVER_URL = "http://localhost:5000/users";

const Login = () => {
  const { handleLogin } = useContext(UserContext);

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

      if (userResponse.data.length === 1) {
        const userData = userResponse.data[0];

        if (userData.password === data.password) {
          console.log(data.name + " You are successfully Logged In");
          setSuccessMsg("You have succesfully Logged In");
          handleLogin(userData.id);
          navigate("/Home");
        } else {
          console.log("UserId or Password is not matching with our records");
          setErrMsg("UserId or Password is not matching with our records");
        }
      } else {
        console.log("User not found");
        setErrMsg("User not found");
      }
    } catch (error) {
      console.log("Error:", error);
      setErrMsg("Error during login");
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="login-container">
        <h1 className="login-title">BonStay with Us</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputLabel style={{ color: "black" }}>User Id:</InputLabel>
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
            type="submit"
            variant="contained"
            fullWidth
            style={{
              backgroundColor: "#88685e",
              color: "white",
            }}
          >
            Login
          </Button>
        </form>
        <p>
          Need an account?
          <br />
          <span className="line">
            <Link to="/Register">Register</Link>
          </span>
        </p>
        <br />
        {successMsg && <p>{successMsg}</p>}
        {errMsg && <p>{errMsg}</p>}
      </div>
    </>
  );
};

export default Login;
