import React from "react";
import { FooterItem } from "./../FooterItem/FooterItem";

import "./Footer.scss";

export const Footer = () => {
  const email = "salesteam@eliteva.com";
  const address = "301 N Main St, Suite 900 Winston-Salem, NC 27101";
  const logoLink =
    "https://firebasestorage.googleapis.com/v0/b/agency-b6787.appspot.com/o/Layer%202.png?alt=media&token=55af84a6-0b72-4e44-a650-b0ba49d429b2";
  const logoAlt = "Elite Virtual Assistant, EliteVA";

  return (
    <div className="footer__wrapper">
      <div className="footer__logo-container">
        <img className="footer__logo" alt={logoAlt} src={logoLink} />
      </div>
      <div className="footer__content">
        <FooterItem title={"Email"} value={email} />
        <FooterItem title={"Address"} value={address} />
      </div>
      <div className="footer__copyright">
        © Elite Virtual Assistant 2023. All rights reserved
      </div>
    </div>
  );
};
