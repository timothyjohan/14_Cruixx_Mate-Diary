import { useState } from "react";
import { useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { emitToast } from "../utility/toast/toast";
import axios from 'axios'

export default function Register(){
    const {register, handleSubmit} = useForm()
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(null)

    const signUp = async (data, e) => {
        setMessage(null)
        try {
            if(data.confirm_password != data.password){
                setMessage("Password mismatched !")
                return
            } else {
                await axios.post(`http://localhost:3000/register`, data)
                emitToast(`${data.username} Register succesfully !`, "success")
            }
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
            <div class="flex flex-col items-center text-gray-100 justify-center px-6" style={{marginBottom: "64px"}}>
                <div class="w-full bg-[#B99470] rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                            Sign up to your account
                        </h1>
                        <form onSubmit={handleSubmit(signUp)}>
                            <div className="my-3">
                                <label for="email" class="block mb-2 text-sm font-medium">Your email</label>
                                <input {...register("email")} type="email" name="email" id="email" class="text-black bg-[#F7DCB9]  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:] dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="youremail@mail.com" required="" />
                            </div>
                            <div className="my-3">
                                <label for="username" class="block mb-2 text-sm font-medium">Your username</label>
                                <input {...register("username")} type="text" name="username" id="username" class="text-black bg-gray-50  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#F7DCB9] dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Username" required="" />
                            </div>
                            <div className="my-3">
                                <label for="nickname" class="block mb-2 text-sm font-medium">Your nickname</label>
                                <input {...register("nickname")} type="text" name="nickname" id="nickname" class="text-black bg-gray-50  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#F7DCB9] dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Nickname" required="" />
                            </div>
                            <div className="my-3">
                                <label for="password" class="block mb-2 text-sm font-medium">Password</label>
                                <input {...register("password")} type="password" name="password" id="password" placeholder="••••••••" class="text-black bg-gray-50  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#F7DCB9] dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div className="my-3">
                                <label for="confirm_password" class="block mb-2 text-sm font-medium">Confirm Password</label>
                                <input {...register("confirm_password")} type="password" name="confirm_password" id="confirm_password" placeholder="••••••••" class="text-black bg-gray-50  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#F7DCB9] dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div className="my-3">
                                <label for="company_name" class="block mb-2 text-sm font-medium">Company Name</label>
                                <input {...register("company_name")} type="text" name="company_name" id="company_name" class="text-black bg-gray-50  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#F7DCB9] dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Company Name" required="" />
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4  rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-[#F7DCB9] dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
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
                                <button type="submit" class="w-full mt-2 text-white bg-[#DEAC80] hover:bg-[#B5C18E] focus:ring-4 focus:outline-none focus:ring-primary-00 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                                <p class="text-sm font-light text-gray-500 dark:text-gray-200">
                                    Already have account ? <Link to={"/Login"}><a class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a></Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}