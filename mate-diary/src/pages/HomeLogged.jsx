import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

export default function HomeLogged(){
    const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
    const [currentUser, setCurrentUser] = useState(null)

    const fetchLogged = async ()  =>{
        const data = {
            username: cookies.currentUser
        }
        const result = await axios.get(`http://localhost:3000/user?username=${cookies.currentUser}`)
        setCurrentUser(result.data.msg)
    }

    useEffect(()=>{
        fetchLogged()
    },[])

    useEffect(()=>{
        console.log(currentUser);
    },[currentUser])
    return(
        <>
            <div className="">
                {currentUser 
                ?
                    <>
                        <h1 className="text-2xl font-bold mb-10">Welcome, {currentUser.nickname}</h1>

                        <div className="xl:ml-32 grid grid-cols-1 xl:grid-cols-3 mx-auto grid-center grid-flow-row mx-auto">
                            <Link className="mb-24 xl:mb-0">
                                <div className="h-80 w-80 bg-[#DEAC80] p-2 rounded-xl hover:scale-110 transition-all">
                                    <div className=" flex justify-center items-center">
                                        <img src="/animals.png" className="max-w-full max-h-full" />
                                    </div>
                                    <div className="py-8">
                                        <h1 className="text-center text-xl text-white font-bold">My Animals</h1>
                                        
                                    </div>
                                    
                                </div>
                            </Link>
                            <Link className="mb-24 xl:mb-0">
                                <div className="h-80 w-80 bg-[#FDE3A8] p-2 rounded-xl hover:scale-110 transition-all">
                                    <div className=" flex justify-center items-center">
                                        <img src="/add_animal.jpg" className="max-w-52 max-w-52 " />
                                    </div>
                                    <div className="py-8">
                                        <h1 className="text-center text-xl text-gray-600 font-bold">Add Animals</h1>
                                        
                                    </div>
                                    
                                </div>
                            </Link>

                            <Link className="mb-24 xl:mb-0">
                                <div className="h-80 w-80 bg-[#FDCBCC] p-2 rounded-xl hover:scale-110 transition-all">
                                    <div className=" flex justify-center items-center">
                                        <img src="/mate.png" className="max-w-52 max-w-52" />
                                    </div>
                                    <div className="py-8">
                                        <h1 className="text-center text-xl text-white font-bold">Mating Session</h1>
                                        
                                    </div>
                                    
                                </div>
                            </Link>
                            
                        </div>
                    </>
                    
                :
                <h1 className="text-2xl">Loading...</h1>
                }

            </div>
            
        </>
    )
}