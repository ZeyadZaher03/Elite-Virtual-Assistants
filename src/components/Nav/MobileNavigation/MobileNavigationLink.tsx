import classnames from "classnames";
import Link from "next/link";

interface MobileNavigationLinkProps {
  currentPathName: string;
  href: string;
  title: string;
}
export const MobileNavigationLink = ({
  currentPathName,
  href,
  title,
}: MobileNavigationLinkProps) => {
  const isActive = currentPathName === href;
  const classes = classnames("nav-hamburger__list-item", {
    "nav-hamburger__list-item--active": isActive,
  });

  return (
    <Link className={classes} key={title} href={href}>
      {title}
    </Link>
  );
};
