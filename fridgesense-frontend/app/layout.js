import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "FridgeSense",
  description: "What's in your fridge is enough.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-playfair)]">
        {children}
      </body>
    </html>
  );
}