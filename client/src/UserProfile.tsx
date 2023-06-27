import { FC, useEffect } from "react";
import { useAppSelector } from "./redux/hooks";
import { useNavigate, useParams } from "react-router";

type UserProfileProps = {
  classname?: string;
};

const UserProfile: FC<UserProfileProps> = ({ classname }) => {
  const { username } = useAppSelector((s) => s.pizza);
  const { usernames } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (username !== null)
      if (username !== usernames) {
        navigate("/", { replace: true });
      }
  }, [username]);

  return <div>{usernames}</div>;
};

export default UserProfile;
