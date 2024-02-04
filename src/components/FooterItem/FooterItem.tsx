import React from "react";

import "./FooterItem.scss";

export const FooterItem = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <div className="footer-item-container">
      <h4 className="footer-item__header">{title}</h4>
      <div className="footer-item__value">
        <span>{value}</span>
      </div>
    </div>
  );
};
