export type HamburgerButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "disabled"
> & {
  open: boolean;
};
