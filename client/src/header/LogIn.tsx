import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../helpers/fetch-functions";
import { getErrorMessage } from "../helpers/error-functions";
import { setIsLoggedIn, setUsername } from "../redux/pizza";
import Button from "../reusable/Button";
import ErrorMessage from "../reusable/ErrorMessage";
import Modal from "../reusable/Modal";

export interface LogInValues {
  [key: string]: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

const LogIn = () => {
  const [loginValues, setLoginValues] = useState<LogInValues>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const inputKeys = ["Email", "Password"];
  const autoCompleteValues = ["email", "current-password"];
  const { isLoggedIn } = useAppSelector((s) => s.pizza);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const user = {
      email: loginValues.email || undefined,
      password: loginValues.password || undefined,
    };
    login(user)
      .then((res) => {
        if (res && "message" in res) {
          if (location.state === "buy") navigate("/order", { replace: true });
          else navigate("/");
          dispatch(setIsLoggedIn(true));
          dispatch(setUsername(res.message));
        } else setError(getErrorMessage(res));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleChange = (key: string, value: string) => {
    setLoginValues({ ...loginValues, [key]: value });
    setError("");
  };

  return !isLoggedIn ? (
    <Modal headerTitle="Log In" closeModal={() => navigate("/")}>
      <form className="login" onSubmit={(e) => handleSubmit(e)}>
        {inputKeys.map((key, i) => (
          <input
            key={i}
            id={key}
            type={key.toLowerCase()}
            className="input"
            placeholder={key}
            autoComplete={autoCompleteValues[i]}
            value={loginValues[key]}
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
