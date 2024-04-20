type ButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "disabled"
>;

const CloseButton = ({ onClick, disabled }: ButtonProps) => (
  <button
    type="button"
    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
    onClick={onClick}
    disabled={disabled}
  >
    <span className="sr-only">Chiudi</span>
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
  </button>
);

export default CloseButton;
