type BackButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <button className="go-back-btn" onClick={onClick}>
      <div className="back-button-arrow"></div>
      <p>Go back</p>
    </button>
  );
};

export default BackButton;
