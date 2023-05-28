import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setIsLoggedIn } from "../redux/pizza";
import { login } from "../helpers/fetch-functions";
import Button from "../reusable/Button";
import ErrorMessage from "../reusable/ErrorMessage";
import { errorHandler } from "../helpers/error-functions";

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
        if ("code" in data) setError(errorHandler(data));
        else if (data.token) {
          if (typeof window !== "undefined")
            sessionStorage.setItem("token", JSON.stringify(data.token));
          dispatch(setIsLoggedIn(true));
          navigate("/");
          setValues({
            email: "",
            password: "",
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
    <form className="login" onSubmit={(e) => handleSubmit(e)}>
      {valuesKeys.map((key, i) => (
        <input
          key={i}
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
  ) : null;
};

export default LogIn;
