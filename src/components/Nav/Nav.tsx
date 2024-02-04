"use client";

import React, { useEffect, useState } from "react";
import classnames from "classnames";

import "./Nav.scss";

export const Nav = ({ currentPathName }: { currentPathName: string }) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    updateScreenWidth();
    window.addEventListener("resize", updateScreenWidth);
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  const links = [
    { title: "Home", href: "/" },
    { title: "About us ", href: "/about-us" },
    { title: "Services", href: "/services" },
    { title: "Blog", href: "/blogs" },
    { title: "Schedule a call", href: "/sales-meetings" },
    { title: "Login", href: "/login" },
  ];

  const logoLink =
    "https://firebasestorage.googleapis.com/v0/b/agency-b6787.appspot.com/o/Layer%202.png?alt=media&token=55af84a6-0b72-4e44-a650-b0ba49d429b2";
  const logoAlt = "Elite Virtual Assistant, EliteVA";

  const isMobile = screenWidth <= 600;
  const burgerMenuClasses = classnames("nav-hamburger__wrapper", {
    "nav-hamburger__wrapper--active": menuOpened,
  });

  useEffect(() => {
    if (menuOpened) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
  }, [menuOpened]);

  return (
    <nav className="nav">
      <div className="wrapper">
        <a className="logo_container" href="/">
          <img className="logo" alt={logoAlt} src={logoLink} />
        </a>
        {!isMobile && (
          <div className="links_wrapper">
            {links.map(({ title, href }) => {
              const isActive = currentPathName === href;
              const classes = classnames("nav_link", {
                "nav_link--active": isActive,
              });
              return (
                <a className={classes} key={title} href={href}>
                  {title}
                </a>
              );
            })}
          </div>
        )}
        {isMobile && (
          <>
            <button
              onClick={() => setMenuOpened((p) => !p)}
              className="nav-hamburger__button"
            >
              <div></div>
              <div></div>
              <div></div>
            </button>
            <div className={burgerMenuClasses}>
              <span className="nav-hamburger__header">Menu</span>
              <ul className="nav-hamburger__list">
                {links.map(({ title, href }) => {
                  const isActive = currentPathName === href;
                  const classes = classnames("nav-hamburger__list-item", {
                    "nav-hamburger__list-item--active": isActive,
                  });
                  return (
                    <a className={classes} key={title} href={href}>
                      {title}
                    </a>
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
