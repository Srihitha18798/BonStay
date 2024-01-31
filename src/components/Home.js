import React from "react";
import Navbar from "./Navbar";
import cardImage from "../card.jpg";

const Home = () => {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "100px", marginBottom: "100px" }}>
        <img
          src={cardImage}
          alt=""
          style={{ height: "100%", width: "600px" }}
        ></img>
      </div>
    </>
  );
};

export default Home;
