import { deleteOrders } from "../helpers/fetch-functions";
import Cart from "./Cart";
import CreatePizza from "./CreatePizza";
import { Outlet } from "react-router";

const Home = () => {
  return (
    <div className="home">
      <CreatePizza />
      <Cart />
      <Outlet />
      {/* <button onClick={() => deleteOrders()}>asd</button> */}
    </div>
  );
};

export default Home;
