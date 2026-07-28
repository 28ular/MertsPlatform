import {Header} from "./Header.jsx";
import {Outlet} from "react-router-dom";
import {ScrollToTop} from "./ScrollToTop.jsx";

export const Layout = () => {
    return (
        <>
            <ScrollToTop/>
            <div style={{display: "flex"}}>
                <Header />
                <div style={{marginLeft: "80px"}}>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}