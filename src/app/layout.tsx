import Providers from "./Providers";
import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Partner Portal",
  description: "Partner Portal for Nevtis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 h-[100vh] w-[100vw]">
        <Providers>
{/*           <Navbar /> */}
          <div className="h-full w-full">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
