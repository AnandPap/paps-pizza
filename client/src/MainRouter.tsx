import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Header from "./header/Header";
import SignUp from "./header/SignUp";
import LogIn from "./header/LogIn";
import Home from "./header/Home";
import Order from "./order/Order";
import OrderHistory from "./order/OrderHistory";
import ErrorMessage from "./reusable/ErrorMessage";
import { setIsLoggedIn } from "./redux/pizza";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { isAuthenticated } from "./helpers/fetch-functions";

const MainRouter = () => {
  const dispatch = useAppDispatch();
  const { pizzasPicked, totalPrice, isLoggedIn } = useAppSelector(
    (s) => s.pizza
  );

  useEffect(() => {
    async function checkIfLoggedIn() {
      const res = await isAuthenticated();
      console.log(res);
      if (typeof res === "boolean") dispatch(setIsLoggedIn(res));
      else dispatch(setIsLoggedIn(false));
    }
    checkIfLoggedIn();
  }, [isLoggedIn]);

  useEffect(() => {
    if (totalPrice !== 0)
      sessionStorage.setItem("pizzasPicked", JSON.stringify(pizzasPicked));
  }, [totalPrice]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
        </Route>
        <Route path="/order" element={<Order />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route
          path="*"
          element={
            <ErrorMessage className="not-found" text="Page not found." />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
