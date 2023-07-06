import { FC } from "react";
import Modal from "../reusable/Modal";
import { deleteProfile } from "../helpers/fetch-functions";
import {
  closeNotification,
  setIsLoggedIn,
  setNotification,
  setPizza,
  setUsername,
} from "../redux/pizza";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../redux/hooks";
import { getErrorMessage } from "../helpers/error-functions";

type DeleteProfileProps = {
  openDeleteModal: boolean;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteProfile: FC<DeleteProfileProps> = ({
  openDeleteModal,
  setOpenDeleteModal,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const deleteHandler = async () => {
    try {
      const res = await deleteProfile();
      setOpenDeleteModal(false);
      if (res && "message" in res) {
        navigate("/", { replace: true });
        dispatch(setIsLoggedIn(false));
        dispatch(setUsername(""));
        dispatch(setPizza({ type: "reset" }));
        dispatch(setNotification({ text: res.message, type: "success" }));
      } else {
        dispatch(
          setNotification({ text: getErrorMessage(res), type: "error" })
        );
      }
      setTimeout(() => dispatch(closeNotification()), 1500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      headerTitle="Delete profile"
      openModal={openDeleteModal}
      closeModal={() => setOpenDeleteModal(false)}
    >
      <div className="delete-profile modal-content">
        <p>Are you sure that you want to delete your profile?</p>
        <div className="delete-profile-buttons">
          <button className="button" onClick={deleteHandler}>
            Yes
          </button>
          <button className="button" onClick={() => setOpenDeleteModal(false)}>
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteProfile;
