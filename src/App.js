import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import Navbar from "./components/Navbar";
import AddReview from "./components/AddReview";
import Bookings from "./components/Bookings";
import BookRoom from "./components/BookRoom";
import Hotels from "./components/Hotels";
import ViewReview from "./components/ViewReview";
import RescheduleBooking from "./components/RescheduleBooking";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/Register" element={<Register />}></Route>
          <Route exact path="/LogIn" element={<Login />}></Route>
          <Route exact path="/Home" element={<Home />}></Route>
          <Route
            exact
            path="/ForgotPassword"
            element={<ForgotPassword />}
          ></Route>
          <Route exact path="/Navbar" element={<Navbar />}></Route>
          <Route exact path="/AddReview" element={<AddReview />}></Route>
          <Route exact path="/Bookings" element={<Bookings />}></Route>
          <Route exact path="/BookRoom" element={<BookRoom />}></Route>
          <Route exact path="/Hotels" element={<Hotels />}></Route>
          <Route exact path="/ViewReview" element={<ViewReview />}></Route>
          <Route
            exact
            path="/RescheduleBooking"
            element={<RescheduleBooking />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
