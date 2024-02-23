import "@/global.css";
import { Montserrat } from "next/font/google";

const montserrat_init = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat_init.variable}>{children}</body>
    </html>
  );
}
