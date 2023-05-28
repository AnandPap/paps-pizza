import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { register } from "../helpers/fetch-functions";
import Button from "../reusable/Button";
import ErrorMessage from "../reusable/ErrorMessage";

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
        if (data.error) setError(capitalizeFirstLetter(data.error));
        else if (data.message) {
          navigate("/login");
          setValues({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
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

  const toCamelCase = (text: string) => {
    const words = text.split("");
    let word = "";
    for (let i = 0; i < words.length; i++) {
      if (i === 0) word += words[0].charAt(0).toLowerCase() + words[0].slice(1);
      else word += words[1].charAt(0).toUpperCase() + words[1].slice(1);
    }
    return word;
  };

  return modal.type === "signup" ? (
    <form className="signup" onSubmit={(e) => handleSubmit(e)}>
      {valuesKeys.map((key, i) => (
        <input
          key={i}
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
      ></Button>
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
  ) : null;
};

export default SignUp;
