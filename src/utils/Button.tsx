const Button = ({
  onClick,
  children,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}) => {
  return (
    <button className="flatfile-button" onClick={onClick}>
      {children}
      <svg width="3" height="24" viewBox="0 -9 3 24" className="button-arrow">
        <path
          d="M0 0L3 3L0 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
      </svg>
    </button>
  );
};

export default Button;
