import classnames from "classnames";
import Link from "next/link";

interface NavigationLinkProps {
  currentPathName: string;
  href: string;
  title: string;
}
export const NavigationLink = ({
  currentPathName,
  href,
  title,
}: NavigationLinkProps) => {
  const isActive = currentPathName === href;
  const classes = classnames("navigation_link", {
    "navigation_link--active": isActive,
  });

  return (
    <Link className={classes} key={title} href={href}>
      {title}
    </Link>
  );
};
