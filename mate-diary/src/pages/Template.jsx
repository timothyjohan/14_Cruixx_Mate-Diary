import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Template(){
    return(
        <>
            <Navbar />
            <div className="min-h-screen w-5/6 mx-auto">
                <Outlet />

            </div>

            <Footer />
        </>
    )
}