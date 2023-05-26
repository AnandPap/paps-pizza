import { useState } from "react";
import Button from "../reusable/Button";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { closeModal, openModal, setIsLoggedIn } from "../redux/pizza";
import { login } from "../services/user-apis";
import { authenticate } from "../services/auth-helpers";

const LogInModal = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
  });
  const modal = useAppSelector((s) => s.pizza.modal);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
          dispatch(dispatch(closeModal()));
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

  const closeLogInModal = () => {
    setValues({
      email: "",
      password: "",
      error: "",
    });
    dispatch(dispatch(closeModal()));
    navigate("/");
  };

  let className = "modal";

  return (
    <div className={className} onClick={closeLogInModal}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Log In</h2>
          <span onClick={closeLogInModal}>&times;</span>
        </div>
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
            <Button
              text="Log In"
              className="login-button"
              type="submit"
            ></Button>
          </div>
          <div className="dont-have-account-wrapper">
            <div
              onClick={() => {
                dispatch(dispatch(openModal("signup")));
                closeLogInModal();
                navigate("/signup");
              }}
              className="dont-have-account"
            >
              Don't have an account?<p>Sign Up</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogInModal;
