import React from "react";
import Header from "./components/header/Header";
import SignUp from "./components/modals/SignUp";
import LogIn from "./components/modals/LogIn";
import Home from "./pages/Home/Home";
import Order from "./pages/Order/Order";
import OrderHistory from "./pages/Order/OrderHistory";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const MainRouter = () => {
  return (
    <BrowserRouter basename="/">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
        </Route>
        <Route path="/order" element={<Order />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
