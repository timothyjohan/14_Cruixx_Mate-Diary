import { useState } from "react";
import { useForm } from "react-hook-form";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { emitToast } from "../utility/toast/toast";
import axios from 'axios'
import { useCookies } from "react-cookie";

export default function Login(){
    const {register, handleSubmit} = useForm()
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
    const navigate = useNavigate()

    const signIn = async (data, e) =>{
        // console.log(data);
        setMessage(null)
        try {
            await axios.post(`http://localhost:3000/login`,data)
            emitToast(`${data.username} login succesfully !`, "success")
            setCookie('currentUser', data.username)
            navigate("/home")
            e.target.clear()
        } catch(e) {
            if(e.response.data.msg) {
                emitToast(e.response.data.msg, "error")
            } else {
                emitToast(e.response.data, "error")
            } 
        }
    }

    return(
        <>
            <div class="flex flex-col items-center justify-center px-6 text-white"  style={{marginBottom: "64px"} }>
                <div class="w-full bg-[#B99470] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl  font-bold leading-tight tracking-tight md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form onSubmit={handleSubmit(signIn)}>
                            <div className="my-2">
                                <label for="username" class="block mb-2 text-sm font-medium">Your username</label>
                                <input {...register("username")} type="text" name="username" id="username" class="text-black bg-[#F7DCB9] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Username" required="" />
                            </div>
                            <div className="my-2">
                                <label for="password" class="block mb-2 text-sm font-medium">Password</label>
                                <input {...register("password")} type="password" name="password" id="password" placeholder="••••••••" class=" bg-[#F7DCB9] text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="remember" class="text-gray-200">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <div className="my-3">
                                {
                                    message ? <div className="w-full bg-red-400 p-1.5 pl-3 text-white">{message}</div> : null
                                }
                                {
                                    success ? <div className="w-full bg-green-400 p-1.5 pl-3 text-white">{success}</div> : null
                                }
                                <button type="submit" class="w-full mt-2 text-white bg-[#DEAC80] hover:bg-[#B5C18E] focus:ring-4 focus:outline-none focus:ring-primary-00 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                <p class="text-sm font-light text-gray-200">
                                    Don’t have an account yet? <Link to={"/Register"}><a class="font-medium text-primary-300 hover:underline dark:text-primary-300">Sign up</a></Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}