import { useState } from "react";
import Button from "../reusable/Button";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setIsLoggedIn } from "../redux/pizza";
import { login } from "../services/user-apis";
import { authenticate } from "../services/auth-helpers";

const LogIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
  });
  const modal = useAppSelector((s) => s.pizza.modal);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };
    login(user)
      .then((data) => {
        console.log(data);
        if (data.error) setValues({ ...values, error: data.error });
        else if (data.token) {
          authenticate(data, () => navigate("/"));
          dispatch(setIsLoggedIn(true));
          setValues({
            email: "",
            password: "",
            error: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  return modal.type === "login" ? (
    <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
      <div className="input-wrapper">
        <input
          className="input"
          placeholder="Email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={values.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
      </div>
      <hr className="hr" />
      {values.error && <div className="error-message">{values.error}</div>}
      <div className="login-button-wrapper">
        <Button text="Log In" className="login-button" type="submit"></Button>
      </div>
      <div className="dont-have-account-wrapper">
        <div className="dont-have-account">
          Don't have an account?
          <p
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </p>
        </div>
      </div>
    </form>
  ) : null;
};

export default LogIn;
