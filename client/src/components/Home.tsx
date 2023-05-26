import Cart from "./Cart";
import CreatePizza from "../create-pizza/CreatePizza";
import { Outlet } from "react-router";

const Home = () => {
  return (
    <div className="home">
      <CreatePizza />
      <Cart />
      <Outlet />
    </div>
  );
};

export default Home;
