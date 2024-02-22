import { MouseEventHandler } from "react";

interface HamburgerMenuProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const HamburgerMenu = ({ onClick }: HamburgerMenuProps) => {
  return (
    <button onClick={onClick} className="navigation__hamburger-button">
      <div></div>
      <div></div>
      <div></div>
    </button>
  );
};
