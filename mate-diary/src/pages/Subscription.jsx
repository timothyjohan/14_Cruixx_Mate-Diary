import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { emitToast } from "../utility/toast/toast";
import axios from 'axios'
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import subscriptionImage from '../assets/subscription.png'

export default function Subscription(){
    const [snapToken, setSnapToken] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', 'SB-Mid-client-t9vamsHp5lVGoR8Z');
        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        };
    }, []);

    const handleSnapClose = () => {
        if (document.body.style.overflowY === 'hidden') {
            document.body.style.overflowY = 'auto';
        }
        setSnapToken(null)
    };

    const handleSnapSuccess = () => {
        
    };

    useEffect(() => {
        if (snapToken) {
          window.snap.pay(snapToken, {
            onClose: handleSnapClose,
            onSuccess: handleSnapSuccess
          });
        }
    }, [snapToken])

    const sendMidtrans = async (e) => {
        e.preventDefault()
        try {
          const responseToken = await axios.post("http://localhost:3000/midtrans", {
            username: cookies.currentUser
          })
          setSnapToken(responseToken.data.token)
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
            <div class="ml-10 w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:border-gray-700">
                <div class="grid grid-cols-2">
                    <div>
                        <img src={subscriptionImage} className="w-full h-full"></img>
                    </div>
                    <div class="p-6 space-y-4 md:space-y-6">
                        <h1 class="text-3xl font-bold leading-tight tracking-tight">
                            <i>PREMIUM SUBSCRIPTION</i>
                        </h1>
                        <h1 class="text-2xl font-bold leading-tight tracking-tight">
                            <i>ONLY Rp. 299.000 / MONTH</i>
                        </h1>
                        
                        <h1 class="font-bold m-0 p-0">
                            Primary feature :
                            <ul>
                                <li>• Show family tree</li>
                                <li>• Show mating prediction success rate</li>
                            </ul>
                        </h1>

                        <h1 class="text-sm leading-tight tracking-tight md:text-md">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia deserunt voluptatibus soluta voluptate rem non. Nesciunt officia repellat aut voluptatibus facilis pariatur et assumenda optio quo corporis! Dolor pariatur, inventore incidunt facere quidem vero molestiae sapiente ducimus mollitia modi aspernatur cumque earum aperiam perspiciatis repudiandae dolorem dolore. Nisi, eligendi quas voluptates dignissimos temporibus saepe enim veritatis quis itaque aspernatur at dolor, iusto perferendis obcaecati quia repellendus, molestias illo. Repudiandae autem veritatis sed animi facilis id, eum magni eveniet repellat aut necessitatibus tempore? Eius, odio quibusdam dolores corporis necessitatibus voluptatum, sed impedit corrupti nemo accusamus quia iure consequatur dicta voluptates unde voluptate praesentium sit amet numquam quae. Sed magnam culpa iure ipsum dolor est tempore vel id accusamus dolorem? Culpa?
                        </h1>

                        <button onClick={sendMidtrans} class="bg-red-500 inline-block rounded-full bg-warning px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-warning-3 transition duration-150 ease-in-out hover:bg-warning-accent-300 hover:shadow-warning-2 focus:bg-warning-accent-300 focus:shadow-warning-2 focus:outline-none focus:ring-0 active:bg-warning-600 active:shadow-warning-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                            Subscribe now !
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}