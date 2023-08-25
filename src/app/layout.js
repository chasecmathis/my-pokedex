import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import ThemeRegistry from "./ThemeRegistry";

import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "MewDex",
  description: "A Pokémon encyclopedia!",
};

export default function RootLayout(props) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui" }}>
          <Nav />
          {children}
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
