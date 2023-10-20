import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import CourseDetails from "./Pages/CourseDetails";
import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses/:code" element={<CourseDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
