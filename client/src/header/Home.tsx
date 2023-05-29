import Cart from "../home/Cart";
import CreatePizza from "../home/CreatePizza";
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
