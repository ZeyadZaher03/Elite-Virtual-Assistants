import { Footer } from "@/components/Footer/Footer";
import { Nav } from "@/components/Nav/Nav";
import Link from "next/link";

import "./not-found.scss";

export default function NotFound() {
  return (
    <>
      <Nav currentPathName="" />
      <div className="not_found_wrapper">
        <div className="not_found_container">
          <h2 className="not_found_header">404</h2>
          <Link className="not_found_link" href="/">
            Return Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
