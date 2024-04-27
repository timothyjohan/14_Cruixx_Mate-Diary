import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { emitToast } from "../utility/toast/toast";

export default function AddSession(){
    const {register, handleSubmit} = useForm()
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(null)
    const [maleAnimal, setMaleAnimal] = useState([])
    const [femaleAnimal, setFemaleAnimal] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(null)

    const fetchLogged = async ()  =>{
        const data = {
            username: cookies.currentUser
        }
        const result = await axios.post(`http://localhost:3000/user?username=${cookies.currentUser}`)
        setCurrentUser(result.data.msg)
    }

    
    const submitH = async (data) =>{
        console.log(data);
        try {
            const result = await axios.post(`http://localhost:3000/history?username=${currentUser.username}&password=${currentUser.password}`, data)
            emitToast(`${data.username} Success!`, "success")
        } catch (error) {
            emitToast(error.response.data.msg, "error")
            
        }
    }
    const fetchAnimals = async () =>{
        const resultFemale = await axios.get(`http://localhost:3000/animal?username=${currentUser.username}&password=${currentUser.password}&gender=FEMALE`)
        setFemaleAnimal(resultFemale.data.msg)

        const resultMale = await axios.get(`http://localhost:3000/animal?username=${currentUser.username}&password=${currentUser.password}&gender=MALE`)
        setMaleAnimal(resultMale.data.msg)

        
    }

    useEffect(()=>{
        fetchLogged()
    },[])

    useEffect(()=>{
        fetchAnimals()
    },[currentUser])

    useEffect(()=>{
        console.log(maleAnimal);
        console.log(femaleAnimal);
    },[maleAnimal])
    return(
        <>
            <div class="flex flex-col items-center justify-center px-6 text-white"  style={{marginBottom: "64px"} }>
                <div class="w-full bg-[#B99470] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl  font-bold leading-tight tracking-tight md:text-2xl">
                            Create a session
                        </h1>
                        <form onSubmit={handleSubmit(submitH)}>
                        <div className="my-2">
                            <label htmlFor="selectedAnimal" className="block mb-2 text-sm font-medium">Select a male animal</label>
                            {maleAnimal.length > 0 && (
                                <select {...register("animal_male")} name="selectedAnimal" id="selectedAnimal" className="text-black bg-[#F7DCB9] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                                    {maleAnimal.map((animal, index) => (
                                        <option key={index} value={animal.id_animal}>{animal.nama_panggilan}</option>
                                    ))}
                                </select>
                            )}
                            {maleAnimal.length === 0 && <p>Loading...</p>}
                        </div>

                        <div className="my-2">
                            <label htmlFor="selectedAnimal" className="block mb-2 text-sm font-medium">Select a female animal</label>
                            {femaleAnimal.length > 0 && (
                                <select {...register("animal_fem")} name="selectedAnimal" id="selectedAnimal" className="text-black bg-[#F7DCB9] sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                                    {femaleAnimal.map((animal, index) => (
                                        <option key={index} value={animal.id_animal}>{animal.nama_panggilan}</option>
                                    ))}
                                </select>
                            )}
                            {maleAnimal.length === 0 && <p>Loading...</p>}
                        </div>
                           
                            <div className="my-3">
                                {
                                    message ? <div className="w-full bg-red-400 p-1.5 pl-3 text-white">{message}</div> : null
                                }
                                {
                                    success ? <div className="w-full bg-green-400 p-1.5 pl-3 text-white">{success}</div> : null
                                }
                                <button type="submit" class="w-full mt-2 text-white bg-[#DEAC80] hover:bg-[#B5C18E] focus:ring-4 focus:outline-none focus:ring-primary-00 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create</button>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}