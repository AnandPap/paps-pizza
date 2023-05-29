import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Header from "./header/Header";
import SignUp from "./header/SignUp";
import LogIn from "./header/LogIn";
import Home from "./header/Home";
import Order from "./order/Order";
import OrderHistory from "./order/OrderHistory";
import Modal from "./reusable/Modal";
import ErrorMessage from "./reusable/ErrorMessage";
import { setIsLoggedIn } from "./redux/pizza";
import { useAppDispatch } from "./redux/hooks";
import { isAuthenticated } from "./helpers/fetch-functions";

const MainRouter = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function checkIsLoggedIn() {
      const res = await isAuthenticated();
      if (typeof res === "boolean") dispatch(setIsLoggedIn(res));
      else setIsLoggedIn(false);
    }
    checkIsLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route
            path="signup"
            element={
              <Modal headerTitle="Sign Up">
                <SignUp />
              </Modal>
            }
          />
          <Route
            path="login"
            element={
              <Modal headerTitle="Log In">
                <LogIn />
              </Modal>
            }
          />
        </Route>
        <Route path="/order" element={<Order />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
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
