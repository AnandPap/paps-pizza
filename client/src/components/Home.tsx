import { useEffect } from "react";
import Cart from "../home/Cart";
import CreatePizza from "../home/CreatePizza";
import { Outlet, useLocation } from "react-router";
import { useAppDispatch } from "../redux/hooks";
import { closeModal, openModal } from "../redux/pizza";

const Home = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") dispatch(closeModal());
    else if (location.pathname === "/signup") dispatch(openModal("signup"));
    else if (location.pathname === "/login") dispatch(openModal("login"));
  }, [location.pathname]);

  return (
    <div className="home">
      <CreatePizza />
      <Cart />
      <Outlet />
    </div>
  );
};

export default Home;
