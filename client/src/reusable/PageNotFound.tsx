import { useNavigate } from "react-router";
import ErrorMessage from "./ErrorMessage";
import BackButton from "./BackButton";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page-not-found">
      <ErrorMessage className="not-found" text="Page not found." />
      <BackButton onClick={() => navigate(-1)} />
    </div>
  );
};

export default PageNotFound;
