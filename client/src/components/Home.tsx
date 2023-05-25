import Cart from "./Cart";
import Pizza from "../create-pizza/Pizza";
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
