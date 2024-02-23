import "./globals.css";
import Footer from "./ui/footer/Footer";

export const metadata = {
  title: "Candian Dairy House || Photobooth Contest",
  description: "Fictional photobooth contest for the fictional company",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
