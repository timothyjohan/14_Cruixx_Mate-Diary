import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home(){
    return(
        <>
            <Navbar />
            <h1 className="">hello home</h1>
            <div className="min-h-screen scrollbar scrollbar-thin">
                <Outlet />

            </div>

            <Footer />
        </>
    )
}