import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  const logoLink =
    "https://firebasestorage.googleapis.com/v0/b/agency-b6787.appspot.com/o/Layer%202.png?alt=media&token=55af84a6-0b72-4e44-a650-b0ba49d429b2";
  const logoAlt = "Elite Virtual Assistant, EliteVA Logo";
  const logoHeight = 85;
  const logoWidth = logoHeight * 0.85;

  return (
    <Link className="navigation__logo-container" href="/">
      <Image
        height={logoHeight}
        width={logoWidth}
        className="logo"
        alt={logoAlt}
        src={logoLink}
      />
    </Link>
  );
};
