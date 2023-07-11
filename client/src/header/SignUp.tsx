import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { signup } from "../helpers/fetch-functions";
import { toCamelCase } from "../helpers/helper-functions";
import { getErrorMessage } from "../helpers/error-functions";
import ErrorMessage from "../reusable/ErrorMessage";
import Button from "../reusable/Button";
import Modal from "../reusable/Modal";

export interface SignUpValues {
  [key: string]: string | undefined;
  username: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
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
    const user = {
      username: signUpValues.username || undefined,
      email: signUpValues.email || undefined,
      password: signUpValues.password || undefined,
      confirmPassword: signUpValues.confirmPassword || undefined,
    };
    signup(user)
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
