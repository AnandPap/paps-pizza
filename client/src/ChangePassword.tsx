import { FC, useState, useEffect } from "react";
import Modal from "./reusable/Modal";
import { changePassword } from "./helpers/fetch-functions";
import ErrorMessage from "./reusable/ErrorMessage";
import { useAppDispatch } from "./redux/hooks";
import { closeNotification, setNotification } from "./redux/pizza";
import { getErrorMessage } from "./helpers/error-functions";

type ChangePasswordProps = {
  openChangeModal: boolean;
  setOpenChangeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChangePassword: FC<ChangePasswordProps> = ({
  openChangeModal,
  setOpenChangeModal,
}) => {
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    setError("");
  }, [newPassword, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("Password must be 6 characters long.");
    } else if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      try {
        const res = await changePassword(newPassword);
        setOpenChangeModal(false);
        setNewPassword("");
        setConfirmPassword("");
        if (res && "message" in res) {
          dispatch(setNotification({ text: res.message, type: "success" }));
        } else {
          dispatch(
            setNotification({ text: getErrorMessage(res), type: "error" })
          );
        }
        setTimeout(() => dispatch(closeNotification()), 1500);
      } catch (err) {
        console.log(err);
        setError("Something went wrong, please try again.");
      }
    }
  };

  return (
    <Modal
      headerTitle="Change password"
      openModal={openChangeModal}
      closeModal={() => setOpenChangeModal(false)}
    >
      <form
        className="change-password-form modal-content"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label className="change-password-label" htmlFor="new-password">
          New password:
        </label>
        <input
          type="password"
          className="input"
          id="new-password"
          placeholder="New password"
          autoFocus
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <label className="change-password-label" htmlFor="password">
          Confirm new password:
        </label>
        <input
          type="password"
          className="input"
          id="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <ErrorMessage className="error-message left" text={error} />}
        <button className="button change-password-submit-button" type="submit">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default ChangePassword;
