import React from "react";

import { NavigationLink } from "./NavigationLink";
import { MobileNavigation } from "./MobileNavigation/MobileNav";
import { Logo } from "./Logo";

import "./Nav.scss";

const links = [
  { title: "Home", href: "/" },
  { title: "About us ", href: "/about-us" },
  { title: "Services", href: "/services" },
  { title: "Blog", href: "/blogs" },
  { title: "Schedule a call", href: "/sales-meetings" },
  { title: "Login", href: "/login" },
];

export const Nav = ({ currentPathName }: { currentPathName: string }) => {
  return (
    <nav className="navigation">
      <div className="navigation__wrapper">
        <Logo />
        <div className="navigation__links-wrapper">
          {links.map(({ title, href }) => (
            <NavigationLink
              key={title}
              title={title}
              href={href}
              currentPathName={currentPathName}
            />
          ))}
        </div>
        <MobileNavigation links={links} currentPathName={currentPathName} />
      </div>
    </nav>
  );
};
