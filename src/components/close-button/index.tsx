import type { HamburgerButtonProps } from "@/components/close-button/types";

const HamburgerButton = ({ open, onClick, disabled }: HamburgerButtonProps) => (
  <button
    type="button"
    className="bg-white rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
    onClick={onClick}
    disabled={disabled}
  >
    <span className="sr-only">Chiudi</span>
    <div className="w-10 h-10 relative">
      <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span
          aria-hidden="true"
          className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
            open ? "rotate-45" : "-translate-y-1.5"
          }`}
        />
        <span
          aria-hidden="true"
          className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          aria-hidden="true"
          className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
            open ? "-rotate-45" : "translate-y-1.5"
          }`}
        />
      </div>
    </div>
  </button>
);

export default HamburgerButton;
