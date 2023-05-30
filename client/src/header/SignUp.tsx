import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { register } from "../helpers/fetch-functions";
import { toCamelCase } from "../helpers/helper-functions";
import { errorHandler } from "../helpers/error-functions";
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
  const [values, setValues] = useState<SignUpValues>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const valuesKeys = ["Username", "Email", "Password", "Confirm password"];
  const { isLoggedIn } = useAppSelector((s) => s.pizza);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const user = {
      username: values.username || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      confirmPassword: values.confirmPassword || undefined,
    };
    register(user)
      .then((data) => {
        if ("code" in data) setError(errorHandler(data));
        else if (data.message) navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  return !isLoggedIn ? (
    <Modal headerTitle="Sign Up" className="signup-modal">
      <form className="signup" onSubmit={(e) => handleSubmit(e)}>
        {valuesKeys.map((key, i) => (
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
            placeholder={key}
            className="input"
            value={values[key]}
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
