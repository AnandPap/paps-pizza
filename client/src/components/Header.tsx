import Button from "../reusable/Button";
import pizza from "../assets/images/pizza2.png";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { openModal, setIsLoggedIn, resetPizzas } from "../redux/pizza";
import { useNavigate } from "react-router-dom";
import { clearJWT } from "../services/auth-helpers";

const Header = () => {
  const { pizzasPicked, isLoggedIn } = useAppSelector((s) => s.pizza);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <header>
      <div onClick={() => navigate("/", { replace: true })}>
        <img src={pizza} alt="" />
        <h1>Pap's Pizza</h1>
      </div>
      {pizzasPicked.length > 0 ? (
        <i className="bi bi-cart-fill cart-icon" title="Cart full"></i>
      ) : (
        <i className="bi bi-cart4 cart-icon" title="Cart empty"></i>
      )}
      {isLoggedIn ? (
        <div className="dropdown">
          <i className="bi bi-person-circle avatar"></i>
          <div className="dropdown-content">
            {/* <p onClick={() => navigate("/orderhistory")}>Order History</p> */}
            <p
              onClick={() => {
                clearJWT();
                dispatch(setIsLoggedIn(false));
                navigate("/");
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
          className="login-button"
          onClick={() => {
            dispatch(openModal("login"));
            navigate("/login");
          }}
        />
      )}
      <hr />
    </header>
  );
};

export default Header;
