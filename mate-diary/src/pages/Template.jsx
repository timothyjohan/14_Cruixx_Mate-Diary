import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCookies } from "react-cookie";
import NavbarLogged from "../components/NavbarLogged";

export default function Template(){
    const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);

    return(
        <>
            {cookies.currentUser? <NavbarLogged/>: <Navbar />}
            {/* <Navbar /> */}
            <div className="min-h-screen w-5/6 mx-auto">
                <Outlet />

            </div>

            <Footer />
        </>
    )
}