import { Link } from "react-router-dom";
import { emitToast } from "../utility/toast/toast";
import axios from 'axios'

export default function Home(){
    const signUp = async () => {
        const username = document.getElementById('username').value;
        const nickname = document.getElementById('nickname').value;
        const password = document.getElementById('password').value;
        const confirm_password = document.getElementById('confirm_password').value;
        const email = document.getElementById('email').value;
        
        try {
            const response = await axios.post('http://localhost:3000/register', { username, nickname, password, confirm_password, email });
            if (response.data.status == "1") {
                emitToast(response.data.msg, "success")
            } else {
                emitToast(response.data, "error")
            }
        } catch (error) {
            emitToast(error.message.toString(), "error")
        }
    }

    return(
        <>
            <div class="flex flex-col items-center justify-center px-6" style={{marginBottom: "64px"}}>
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                            Sign up to your account
                        </h1>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium">Your email</label>
                            <input type="email" name="email" id="email" class="text-white bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="youremail@mail.com" required="" />
                        </div>
                        <div>
                            <label for="username" class="block mb-2 text-sm font-medium">Your username</label>
                            <input type="text" name="username" id="username" class="text-white bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required="" />
                        </div>
                        <div>
                            <label for="nickname" class="block mb-2 text-sm font-medium">Your nickname</label>
                            <input type="text" name="nickname" id="nickname" class="text-white bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required="" />
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class="text-white bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <div>
                            <label for="confirm_password" class="block mb-2 text-sm font-medium">Confirm Password</label>
                            <input type="password" name="confirm_password" id="confirm_password" placeholder="••••••••" class="text-white bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>
                        <button class="w-full text-white bg-black hover:bg-black-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={signUp}>Sign up</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have account ? <Link to={"/Login"}><a class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a></Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}