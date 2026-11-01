import { Header } from "./Header.jsx";
import { Outlet } from "react-router-dom";
import { ScrollToTop } from "./ScrollToTop.jsx";
import { Footer } from "./Footer.jsx";

export const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <div style={{ display: "flex" }}>
        <Header />
        <div
          style={{
            marginLeft: "80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Outlet />
        </div>
      </div>


      <Footer />
    </>
  );
};
