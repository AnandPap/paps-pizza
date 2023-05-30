import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../helpers/fetch-functions";
import { errorHandler } from "../helpers/error-functions";
import { setIsLoggedIn } from "../redux/pizza";
import Button from "../reusable/Button";
import ErrorMessage from "../reusable/ErrorMessage";
import Modal from "../reusable/Modal";

export interface LogInValues {
  [key: string]: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

const LogIn = () => {
  const [values, setValues] = useState<LogInValues>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const valuesKeys = ["Email", "Password"];
  const { isLoggedIn } = useAppSelector((s) => s.pizza);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };
    login(user)
      .then((data) => {
        if ("code" in data) setError(errorHandler(data));
        else if (data.token) {
          if (location.state === "buy") navigate("/order", { replace: true });
          else navigate("/");
          dispatch(setIsLoggedIn(true));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  return !isLoggedIn ? (
    <Modal headerTitle="Log In">
      <form className="login" onSubmit={(e) => handleSubmit(e)}>
        {valuesKeys.map((key, i) => (
          <input
            key={i}
            id={key}
            type={key.toLowerCase()}
            className="input"
            placeholder={key}
            value={values[key]}
            onChange={(e) => handleChange(key.toLowerCase(), e.target.value)}
          />
        ))}
        <hr className="hr" />
        {error && <ErrorMessage className="error-message" text={error} />}
        <Button
          text="Log In"
          className="login-button modal-button"
          type="submit"
        />
        <p className="dont-have-account">
          Don't have an account?
          <span
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </span>
        </p>
      </form>
    </Modal>
  ) : location.state === "buy" ? null : (
    <Navigate to="/" replace={true} />
  );
};

export default LogIn;
