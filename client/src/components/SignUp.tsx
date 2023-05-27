import { useState } from "react";
import Button from "../reusable/Button";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { register } from "../services/user-apis";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  });
  const modal = useAppSelector((s) => s.pizza.modal);
  const navigate = useNavigate();

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
        console.log(data);
        if (data.error)
          setValues({ ...values, error: capitalizeFirstLetter(data.error) });
        else if (data.message) {
          setValues({ ...values, error: "" });
          navigate("/login");
          setValues({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
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

  return modal.type === "signup" ? (
    <form className="signup-form" onSubmit={(e) => handleSubmit(e)}>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Name"
          className="input"
          value={values.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={values.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="input"
          value={values.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
        />
      </div>
      <hr className="hr" />
      {values.error && <div className="error-message">{values.error}</div>}
      <div className="signup-button-wrapper">
        <Button text="Sign Up" className="signup-button" type="submit"></Button>
      </div>
      <div className="already-have-account">
        Already have an account?
        <p
          onClick={() => {
            navigate("/login");
          }}
        >
          Log in
        </p>
      </div>
    </form>
  ) : null;
};

export default SignUp;
