import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Header from "./header/Header";
import SignUp from "./header/SignUp";
import Login from "./header/Login";
import Home from "./home/Home";
import Order from "./order/Order";
import OrderHistory from "./order/OrderHistory";
import { setIsLoggedIn, setUsername } from "./redux/pizza";
import { useAppDispatch } from "./redux/hooks";
import { checkLoggedIn } from "./helpers/fetch-functions";
import UserProfile from "./profile/UserProfile";
import PageNotFound from "./reusable/PageNotFound";

const MainRouter = () => {
  const dispatch = useAppDispatch();

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
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/order" element={<Order />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/user-profile/:profileName" element={<UserProfile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
