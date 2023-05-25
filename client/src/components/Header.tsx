import Button from "../reusable/Button";
import pizza from "../assets/images/pizza2.png";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setShowLogInModal, setIsLoggedIn, resetPizzas } from "../redux/pizza";
import { useNavigate } from "react-router-dom";
import { clearJWT } from "../services/auth-helpers";

const Header = () => {
  const { pizzasPicked, isLoggedIn } = useAppSelector((s) => s.pizza);

  const history = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <div className="logo-and-title-container">
        <div
          onClick={() => history("/", { replace: true })}
          className="logo-and-title-wrapper"
        >
          <img className="logo" src={pizza} alt="" />
          <h2 className="title">Pap's Pizza</h2>
        </div>
      </div>
      {pizzasPicked.length > 0 ? (
        <i className="bi bi-cart-fill cart-icon"></i>
      ) : (
        <i className="bi bi-cart4 cart-icon"></i>
      )}
      {isLoggedIn ? (
        <div className="dropdown">
          <i className="bi bi-person-circle avatar"></i>
          <div className="dropdown-content">
            {/* <p onClick={() => history("/orderhistory")}>Order History</p> */}
            <p
              onClick={() => {
                clearJWT();
                dispatch(setIsLoggedIn(false));
                history("/");
                dispatch(resetPizzas());
              }}
            >
              Sign out
            </p>
          </div>
        </div>
      ) : (
        <Button
          text="Log In"
          className="signin-button"
          onClick={() => {
            dispatch(setShowLogInModal(true));
            history("/login");
          }}
        />
      )}
      <hr />
    </header>
  );
};

export default Header;
