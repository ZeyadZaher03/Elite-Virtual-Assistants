"use client";

import { useUser } from "@/firebase/login";
import NotFound from "../not-found";

import "./../globals.css";
import { Montserrat } from "next/font/google";

const montserrat_init = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();
  if (!user) {
    return (
      <html lang="en">
        <body className={montserrat_init.variable}>
          <NotFound />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={montserrat_init.variable}>{children}</body>
    </html>
  );
}
