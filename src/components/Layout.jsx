import {Header} from "./Header.jsx";
import {Outlet} from "react-router-dom";

export const Layout = () => {
    return (
        <>
            <div style={{display: "flex"}}>
                <Header />
                <div style={{marginLeft: "80px"}}>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}