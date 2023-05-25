import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import Order from "./order/Order";
import OrderHistory from "./order/OrderHistory";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
        </Route>
        <Route path="/order" element={<Order />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
