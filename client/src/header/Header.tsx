import Button from "../reusable/Button";
import pizza from "../assets/images/pizza2.png";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setIsLoggedIn, setPizza } from "../redux/pizza";
import { useNavigate } from "react-router-dom";
import { signout } from "../helpers/fetch-functions";

const Header = () => {
  const { pizzasPicked, isLoggedIn } = useAppSelector((s) => s.pizza);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <header>
      <div onClick={() => location.pathname !== "/" && navigate("/")}>
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
                async function signOutUser() {
                  const res = await signout();
                  if (typeof res === "boolean") {
                    location.pathname !== "/" && navigate("/");
                    dispatch(setIsLoggedIn(false));
                    dispatch(setPizza({ type: "reset" }));
                    sessionStorage.removeItem("pizzasPicked");
                  } else {
                    console.log(res);
                  }
                }
                signOutUser();
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
            navigate("/login");
          }}
        />
      )}
    </header>
  );
};

export default Header;
