"use client";

import { useEffect, useState } from "react";
import classnames from "classnames";
import { HamburgerMenu } from "./HamburgerMenu";
import { MobileNavigationLink } from "./MobileNavigationLink";

interface MobileNavigationProps {
  links: { title: string; href: string }[];
  currentPathName: string;
}

export const MobileNavigation = ({
  links,
  currentPathName,
}: MobileNavigationProps) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const burgerMenuClasses = classnames("navigation__hamburger-wrapper", {
    "navigation__hamburger-wrapper--active": menuOpened,
  });

  const onClickOnHamburgerMenu = () => setMenuOpened((p) => !p);

  useEffect(() => {
    document.body.style.overflow = menuOpened ? "hidden" : "";
    document.body.style.height = menuOpened ? "100vh" : "";
  }, [menuOpened]);

  return (
    <>
      <HamburgerMenu onClick={onClickOnHamburgerMenu} />
      <div className={burgerMenuClasses}>
        <span className="nav-hamburger__header">Menu</span>
        <ul className="nav-hamburger__list">
          {links.map(({ title, href }) => (
            <MobileNavigationLink
              key={title}
              currentPathName={currentPathName}
              href={href}
              title={title}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
