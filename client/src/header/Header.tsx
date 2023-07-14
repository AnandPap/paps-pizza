import Button from "../reusable/Button";
import pizza from "../assets/images/pizza3.png";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  setIsLoggedIn,
  setPizza,
  setUsername,
  setNotification,
  closeNotification,
} from "../redux/pizza";
import { useNavigate } from "react-router-dom";
import { signout } from "../helpers/fetch-functions";
import Spinner from "../reusable/Spinner";
import { getErrorMessage } from "../helpers/error-functions";
import NotificationBox from "../reusable/NotificationBox";

const Header = () => {
  const { pizzasPicked, isLoggedIn, username, notification } = useAppSelector(
    (s) => s.pizza
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function signoutHandler() {
    try {
      const res = await signout();
      if (res && "message" in res) {
        location.pathname !== "/" && navigate("/", { replace: true });
        dispatch(setIsLoggedIn(false));
        dispatch(setUsername(""));
        dispatch(setPizza({ type: "reset" }));
        dispatch(
          setNotification({
            text: res.message,
            type: "success",
          })
        );
      } else {
        dispatch(
          setNotification({
            text: getErrorMessage(res),
            type: "error",
          })
        );
      }
      setTimeout(() => dispatch(closeNotification()), 2000);
    } catch (err) {
      console.log(err);
    }
  }

  function navigateHandler(destination: string) {
    location.pathname !== destination && navigate(destination);
  }

  return (
    <header>
      <div onClick={() => navigateHandler("/")}>
        <img src={pizza} alt="Pizza logo" />
        <h1>Pap's Pizza</h1>
      </div>
      <div>
        <NotificationBox
          text={notification.text}
          show={notification.show}
          type={notification.type}
        />
        {pizzasPicked.length > 0 ? (
          <i className="bi bi-cart-fill cart-icon" title="Cart full"></i>
        ) : (
          <i className="bi bi-cart4 cart-icon" title="Cart empty"></i>
        )}
        {isLoggedIn ? (
          <div className="dropdown">
            <i className="bi bi-person-circle avatar" />
            <div className="dropdown-content">
              <p onClick={() => navigateHandler(`/user-profile/${username}`)}>
                {username}
              </p>
              <p onClick={() => navigateHandler("/order-history")}>
                Order History
              </p>
              <p onClick={signoutHandler}>Sign out</p>
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
