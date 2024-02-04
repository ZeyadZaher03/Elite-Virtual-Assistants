import React from "react";

import "./Button.scss";

export const Button = ({
  children,
  link,
  className: externalClassName,
  onClick,
}: {
  children: React.ReactNode;
  link: string;
  className?: string;
  onClick?: () => void;
}) => {
  const internalClassName = "button_container";
  const combinedClassName = externalClassName
    ? `${internalClassName} ${externalClassName}`
    : internalClassName;

  return (
    <a onClick={onClick} className={combinedClassName} href={link}>
      {children}
    </a>
  );
};
