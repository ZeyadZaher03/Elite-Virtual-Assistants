import { NavigationLink } from "./NavigationLink";
import { MobileNavigation } from "./MobileNavigation/MobileNav";
import { Logo } from "./Logo";
import getUser from "@/lib/getUser";

import "./Nav.scss";
import { logOut } from "@/lib/logout";

const linksWithoutAdmin = [
  { title: "Home", href: "/" },
  { title: "About us ", href: "/about-us" },
  { title: "Services", href: "/services" },
  { title: "Blog", href: "/blogs" },
  { title: "Schedule a call", href: "/sales-meetings" },
  { title: "Login", href: "/login" },
];

const linksWithAdmin = [
  { title: "Home", href: "/" },
  { title: "About us ", href: "/about-us" },
  { title: "Services", href: "/services" },
  { title: "Blog", href: "/blogs" },
  { title: "Schedule a call", href: "/sales-meetings" },
  { title: "Admin", href: "/admin" },
];

export const Nav = async ({ currentPathName }: { currentPathName: string }) => {
  const user = await getUser();
  let links = null;

  if (user) {
    links = linksWithAdmin;
  } else {
    links = linksWithoutAdmin;
  }
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
          {user && (
            <form action={logOut}>
              <button type="submit" className={"navigation_link"}>
                Logout
              </button>
            </form>
          )}
        </div>
        <MobileNavigation links={links} currentPathName={currentPathName} />
      </div>
    </nav>
  );
};
