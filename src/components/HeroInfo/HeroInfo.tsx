import React from "react";
import "./HeroInfo.scss";

export const HeroInfo = ({
  header,
  subHeader,
  body,
  guarantees,
}: {
  header: string;
  subHeader: string;
  body: string;
  guarantees: { name: string; icon: React.ReactNode }[];
}) => {
  return (
    <div className="hero-info-wrapper">
      <h1 className="hero-info-header">{header}</h1>
      <h3 className={"hero-info-sub-header"}>{subHeader}</h3>
      <p className="hero-info-body">{body}</p>
      <h2 className="hero-info-section-header">Threefold Guarantee</h2>
      <ul className="hero-info-list">
        {guarantees.map(({ name, icon }) => (
          <li className="hero-info-list-item" key={name}>
            {icon}
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
