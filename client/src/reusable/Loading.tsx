const Loading = (props: { className: string }) => {
  return (
    <div className="loading-wrapper">
      <span>Loading</span>
      <div className={props.className}></div>
    </div>
  );
};

export default Loading;
