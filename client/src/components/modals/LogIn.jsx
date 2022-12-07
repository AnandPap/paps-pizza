import React, { useState } from "react";
import Button from "../../reusable/Button";
import "./Modal.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowLogInModal,
  setShowSignUpModal,
  setIsLoggedIn,
} from "../../redux/pizzas";
import { login } from "../../services/apis/user-apis";
import { authenticate } from "../../services/helperFunctions/auth-helpers";

const LogInModal = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
  });

  const { showLogInModal } = useSelector((s) => s.pizzas);

  const history = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(e) {
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
          authenticate(data, () => history("/"));
          dispatch(setShowLogInModal(false));
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

  const handleChange = (e, name) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const closeLogInModal = () => {
    setValues({
      email: "",
      password: "",
      error: "",
    });
    dispatch(setShowLogInModal(false));
    history("/");
  };

  let className = "modal";
  if (showLogInModal) className += " display-modal";

  return (
    <div className={className} onClick={closeLogInModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title-and-close-button-wrapper">
          <h1 className="modal-title">Log In</h1>
          <span className="modal-close-button" onClick={closeLogInModal}>
            &times;
          </span>
        </div>
        <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="input-wrapper">
            <input
              className="input"
              placeholder="Email"
              value={values.email}
              onChange={(e) => handleChange(e, "email")}
            />
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={values.password}
              onChange={(e) => handleChange(e, "password")}
            />
          </div>
          <hr className="hr" />
          {values.error && <div className="error-message">{values.error}</div>}
          <div className="login-button-wrapper">
            <Button
              text="Log In"
              className="login-button"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            ></Button>
          </div>
          <div className="dont-have-account-wrapper">
            <div
              onClick={() => {
                dispatch(setShowSignUpModal(true));
                closeLogInModal();
                history("/signup");
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
