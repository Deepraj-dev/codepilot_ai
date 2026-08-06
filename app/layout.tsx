import type { Metadata } from "next";
import "./globals.css";
import "../styles/tokens.css";
import "../styles/base.css";

export const metadata: Metadata = {
  title: {
    default: "CodePilot AI",
    template: "%s · CodePilot AI",
  },
  description: "An intelligent workspace for understanding, building, and shipping software.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
