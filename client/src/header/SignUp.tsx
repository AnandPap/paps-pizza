import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { signup } from "../helpers/fetch-functions";
import {
  capitalizeFirstLetter,
  toCamelCase,
  validateEmailFormat,
} from "../helpers/helper-functions";
import { getErrorMessage } from "../helpers/error-functions";
import ErrorMessage from "../reusable/ErrorMessage";
import Button from "../reusable/Button";
import Modal from "../reusable/Modal";

export interface SignUpValues {
  [key: string]: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [signUpValues, setSignUpValues] = useState<SignUpValues>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const inputKeys = ["Username", "Email", "Password", "Confirm password"];
  const autoCompleteValues = [
    "username",
    "email",
    "new-password",
    "new-password",
  ];
  const { isLoggedIn } = useAppSelector((s) => s.pizza);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { username, email, password, confirmPassword } = signUpValues;
    for (const key in signUpValues) {
      if (!signUpValues[key] && key !== "confirmPassword") {
        setError(`${capitalizeFirstLetter(key)} is required`);
        return;
      }
    }
    if (username.length < 2) setError("Username too short");
    else if (!validateEmailFormat(email)) setError("Invalid email");
    else if (password.length < 6)
      setError("Password but be at least 6 characters long");
    else if (/\s/.test(password))
      setError("Password must not contain any whitespaces");
    else if (!confirmPassword || password !== confirmPassword)
      setError("Password and confirm password do not match");
    else
      signup(signUpValues)
        .then((res) => {
          if (res && "message" in res) navigate("/login");
          else setError(getErrorMessage(res));
        })
        .catch((err) => {
          console.log(err);
        });
  }

  const handleChange = (key: string, value: string) => {
    setSignUpValues({ ...signUpValues, [key]: value });
    setError("");
  };

  return !isLoggedIn ? (
    <Modal headerTitle="Sign Up" closeModal={() => navigate("/")}>
      <form className="signup" onSubmit={(e) => handleSubmit(e)}>
        {inputKeys.map((key, i) => (
          <input
            key={i}
            id={key}
            type={
              key === "Username"
                ? "text"
                : key === "Confirm password"
                ? "password"
                : key.toLowerCase()
            }
            className="input"
            placeholder={key}
            autoComplete={autoCompleteValues[i]}
            value={signUpValues[key]}
            onChange={(e) => handleChange(toCamelCase(key), e.target.value)}
          />
        ))}
        <hr className="hr" />
        {error && <ErrorMessage className="error-message" text={error} />}
        <Button
          text="Sign Up"
          className="signup-button modal-button"
          type="submit"
        />
        <p className="already-have-account">
          Already have an account?
          <span
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </span>
        </p>
      </form>
    </Modal>
  ) : (
    <Navigate to="/" replace={true} />
  );
};

export default SignUp;
