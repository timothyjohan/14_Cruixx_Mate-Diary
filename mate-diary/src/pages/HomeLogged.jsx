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
        const result = await axios.post(`http://localhost:3000/user?username=${cookies.currentUser}`)
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

                        <div className=" xl:ml-64  grid grid-cols-1 xl:grid-cols-2 mx-auto grid-center grid-flow-row mx-auto">
                            <Link to={"/myanimals"}  className="mb-24 xl:mb-0">
                                <div className="xl:h-96 xl:w-96 bg-[#DEAC80] p-2 rounded-xl hover:scale-110 transition-all">
                                    <div className=" flex justify-center items-center">
                                        <img src="/animals.png" className="max-w-full max-h-full" />
                                    </div>
                                    <div className="py-8">
                                        <h1 className="text-center text-xl text-white font-bold">My Animals</h1>
                                        
                                    </div>
                                    
                                </div>
                            </Link>
                            

                            <Link to={"/history"} className="mb-24 xl:mb-0">
                                <div className="xl:h-96 xl:w-96 bg-[#FDCBCC] p-2 rounded-xl hover:scale-110 transition-all">
                                    <div className=" flex justify-center items-center">
                                        <img src="/mate.png" className="max-h-52 xl:max-w-64 xl:max-h-64" />
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