import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useCookies } from "react-cookie";

export default function NavbarLogged(){
    const [isOpen, setIsOpen] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
    const navigate = useNavigate()

    const logoutClick = () => {
        removeCookie('currentUser')
        navigate("/")
    }
    return(
        <>
            <nav className="border-gray-200 bg-[#B99470] mb-16">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/logo.png" alt="" srcset="" className="w-10 h-10"/>
                        <span className="self-center text-2xl font-bold whitespace-nowrap text-white">Mate Diary</span>
                    </div>
                    <button onClick={() => setIsOpen(!isOpen)} type="button" className={`transition-all ${isOpen ? 'rotate-90' : ''} inline-flex items-center p-1 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600`} aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <img src="/menu-burger.png" alt="" className="h-full w-full" />
                    </button>
                    <div className={`${isOpen ? 'block' : 'hidden'} transition-all w-full md:block md:w-auto`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  border-gray-700">
                        <li>
                            <Link to={"/home"}><a className="block py-2 px-3 text-white rounded md:p-0 text-zinc-100" aria-current="page">Home</a></Link>
                        </li>

                        <li>
                            <Link onClick={logoutClick}><a className="block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:p-0 text-white hover:text-zinc-300">Logout</a></Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}
