import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Jost } from "next/font/google";
import "./globals.css";
import "rsuite/dist/rsuite-no-reset.min.css";
import Providers from "@/utils/provider";
import { InternetDisconnectedMessage } from "@/components/Alert/InternetDisconnectMessage";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
});
const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "E.T. Phone Home",
  description: "Easy Tap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={nunito.className}>
        <InternetDisconnectedMessage />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
