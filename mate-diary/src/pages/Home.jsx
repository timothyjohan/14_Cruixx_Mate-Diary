import { useEffect, useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";



export default function Home(){
    const [load, setLoad] = useState(false);
    const navigate = useNavigate()
    useEffect(()=>{
        setLoad(true);
    })

    const toLogin = () =>{
        navigate("/login")
    }
    const toRegis = () =>{
        navigate("/register")
    }
    return(
        <>
        
            <div className="grid grid-cols-1 xl:grid-cols-2 text-gray-800 mb-40">
                <div className="order-2 xl:order-1">
                    <Fade direction="left" duration={800}>
                        <h1 className=" text-4xl font-bold mb-4">Breed and record your animals online!</h1>
                        <h2 className="text-xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis dignissimos esse enim, praesentium, veniam obcaecati minus, cumque rem nulla mollitia laborum eos excepturi! Blanditiis doloremque deleniti ipsa saepe nam! Harum. </h2>
                    </Fade>
                        
                </div>
                    
                
                <div className="grid grid-cols-2 order-2 xl:order-3 mt-10 lg:-mt-72 text-xl">
                    
                    <button type="button" onClick={toRegis} className={`bg-[#B5C18E] mx-4 py-2 text-white rounded-md shadow-md xl:h-14 hover:scale-110 transition duration-700 ${load ? 'opacity-100' : 'opacity-0'}`}>Join Now</button>
                    <button type="button" onClick={toLogin} className={`bg-[#DEAC80] mx-4 text-white rounded-md shadow-md xl:h-14 hover:scale-110 transition duration-700 ${load ? 'opacity-100' : 'opacity-0'}`}>Log in</button>
                        
                </div>
                <div className="order-1 xl:order-2">
                    <Fade direction="right" duration={800}>
                        <img src="/animals.png" alt="" srcset="" className="" />

                    </Fade>
                </div>

                <div className="order-3">
                    {/* cuman tumbal */}
                </div>

                <div className="order-4 mt-40 mb-10 ">
                    <img src="/lion_jump.png" alt="" srcset="" className="xl:w-3/4 " />
                </div>

                <div className="order-5 xl:h-3/4 xl:mt-40 xl:pt-28">
                    <Slide direction="right">
                        <Fade>
                            <h1 className="text-4xl font-bold mb-4">Why Mate Diary?</h1>
                        </Fade>

                    </Slide>

                    <Fade cascade>
                       
                        <li className="text-xl">It's easy to use</li>
                        <li className="text-xl">Better data management</li>
                        <li className="text-xl">You can be access anywhere and anytime</li>
                        <li className="text-xl">lorem</li>

                    </Fade>
                </div>

            </div>
        </>
    )
}