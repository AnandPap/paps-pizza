import { useState } from "react";
import Button from "../reusable/Button";
import pizza from "../assets/images/pizza2.png";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setIsLoggedIn, setPizza } from "../redux/pizza";
import { useNavigate } from "react-router-dom";
import { signout } from "../helpers/fetch-functions";
import Spinner from "../reusable/Spinner";
import { getErrorMessage } from "../helpers/error-functions";

const Header = () => {
  const [error, setError] = useState("");
  const { pizzasPicked, isLoggedIn } = useAppSelector((s) => s.pizza);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <header>
      <div onClick={() => location.pathname !== "/" && navigate("/")}>
        <img src={pizza} alt="" />
        <h1>Pap's Pizza</h1>
      </div>
      <div>
        {pizzasPicked.length > 0 ? (
          <i className="bi bi-cart-fill cart-icon" title="Cart full"></i>
        ) : (
          <i className="bi bi-cart4 cart-icon" title="Cart empty"></i>
        )}
        {isLoggedIn ? (
          <div className="dropdown">
            <i className="bi bi-person-circle avatar" />
            <div className="dropdown-content">
              <p
                onClick={() =>
                  location.pathname !== "/order-history" &&
                  navigate("/order-history")
                }
              >
                Order History
              </p>
              <p
                onClick={() => {
                  signout()
                    .then((res) => {
                      if (res === true) {
                        location.pathname !== "/" && navigate("/");
                        dispatch(setIsLoggedIn(false));
                        dispatch(setPizza({ type: "reset" }));
                        sessionStorage.removeItem("pizzasPicked");
                      } else setError(getErrorMessage(res));
                    })
                    .catch((err) => console.log(err));
                }}
              >
                Sign out
              </p>
            </div>
          </div>
        ) : isLoggedIn === false ? (
          <Button
            text="Log In"
            className="login-button"
            onClick={() => {
              navigate("/login");
            }}
          />
        ) : (
          <Spinner size="50px" />
        )}
      </div>
    </header>
  );
};

export default Header;
