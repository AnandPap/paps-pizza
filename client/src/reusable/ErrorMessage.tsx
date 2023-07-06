type ErrorMessageProps = {
  className?: string;
  text: string;
};

const ErrorMessage = ({ className, text }: ErrorMessageProps) => {
  return <p className={className}>{text}</p>;
};

export default ErrorMessage;
