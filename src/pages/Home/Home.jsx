import React from "react";
import Cart from "../../components/cart/Cart";
import Pizza from "../CreatePizza/Pizza";
import "./Home.css";
import { Outlet } from "react-router";

const Home = () => {
  return (
    <div className="home">
      <Pizza />
      <Cart />
      <Outlet />
    </div>
  );
};

export default Home;
