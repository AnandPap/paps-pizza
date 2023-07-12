import { FC, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { Navigate, useNavigate, useParams } from "react-router";
import ChangePassword from "./ChangePassword";
import DeleteProfile from "./DeleteProfile";

const UserProfile: FC = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openChangeModal, setOpenChangeModal] = useState(false);
  const { username } = useAppSelector((s) => s.pizza);
  const { profileName } = useParams();

  return username === null ? null : username !== profileName ? (
    <Navigate to="/" replace={true} />
  ) : (
    <div className="user-profile">
      <h2>
        Hi <span className="user-profile-name-wrapper">{username}</span>! 👋
      </h2>
      <p>You can:</p>
      <div className="user-profile-buttons">
        <button className="button" onClick={() => setOpenChangeModal(true)}>
          Change password
        </button>
        <span>or</span>
        <button className="button" onClick={() => setOpenDeleteModal(true)}>
          Delete your profile
        </button>
      </div>
      <DeleteProfile
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
      <ChangePassword
        openChangeModal={openChangeModal}
        setOpenChangeModal={setOpenChangeModal}
      />
    </div>
  );
};

export default UserProfile;
