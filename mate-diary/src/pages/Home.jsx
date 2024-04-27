import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home(){
    return(
        <>
            <Navbar />
            <div className="min-h-screen">
                <Outlet />

            </div>

            <Footer />
        </>
    )
}