import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Header from "./header/Header";
import SignUp from "./header/SignUp";
import LogIn from "./header/LogIn";
import Home from "./home/Home";
import Order from "./order/Order";
import OrderHistory from "./order/OrderHistory";
import ErrorMessage from "./reusable/ErrorMessage";
import { setIsLoggedIn, setUsername } from "./redux/pizza";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { checkLoggedIn } from "./helpers/fetch-functions";

const MainRouter = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((s) => s.pizza);

  useEffect(() => {
    checkLoggedIn()
      .then((res) => {
        if (res) {
          dispatch(setIsLoggedIn(true));
          dispatch(setUsername(res.message));
        } else {
          dispatch(setIsLoggedIn(false));
          dispatch(setUsername(""));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(setIsLoggedIn(false));
        dispatch(setUsername(""));
      });
  }, [isLoggedIn]);

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
