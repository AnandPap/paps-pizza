import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setIsLoggedIn } from "../redux/pizza";
import { login } from "../services/user-apis";
import { authenticate } from "../services/auth-helpers";
import Button from "../reusable/Button";
import ErrorMessage from "../reusable/ErrorMessage";

interface LogInValues {
  [key: string]: string;
  email: string;
  password: string;
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
        if (data.error) setError(data.error);
        else if (data.token) {
          authenticate(data, () => navigate("/"));
          dispatch(setIsLoggedIn(true));
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
          className="input"
          placeholder={key.toLowerCase()}
          value={values[key]}
          onChange={(e) => handleChange(key.toLowerCase(), e.target.value)}
        />
      ))}
      <hr className="hr" />
      {error && <ErrorMessage className="error-message" text={error} />}
      <Button text="Log In" className="login-button" type="submit"></Button>
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
