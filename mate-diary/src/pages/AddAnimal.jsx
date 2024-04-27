import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { emitToast } from "../utility/toast/toast";
import axios from 'axios'
import { useCookies } from "react-cookie";

export default function AddAnimal(){
    const api_key_ninja = "gkTS6Qheb1LyvqHe3cf9uw==o0kuQj1oopyTEmaZ";
    const {register, handleSubmit} = useForm()
    const [timerId, setTimerId] = useState(null);
    const [timerId2, setTimerId2] = useState(null);
    const [isChild, setIsChild] = useState(false)
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(null)
    const [currentDropDown, setCurrentDropDown] = useState([])
    const [currentDropDown2, setCurrentDropDown2] = useState([])
    const [currentDropDown3, setCurrentDropDown3] = useState([])
    const [namaHewan, setNamaHewan] = useState("")
    const [ayahHewan, setAyahHewan] = useState("")
    const [ibuHewan, setIbuHewan] = useState("")

    const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
    const [animals, setAnimals] = useState([null])
    const [currentUser, setCurrentUser] = useState(null)

    const fetchLogged = async ()  =>{
        const result = await axios.post(`http://localhost:3000/user?username=${cookies.currentUser}`)
        setCurrentUser(result.data.msg)
    }
    const addAnimal = async (data, e) => {
        // console.log(data);
        setMessage(null)
        try {
            await axios.post(`http://localhost:3000/animal?username=${currentUser.username}&password=${currentUser.password}`, {...data, "parent_male": ayahHewan, "parent_fem": ibuHewan})
            emitToast(`${data.nama_panggilan} add animal succesfully !`, "success")
            e.target.clear()
        } catch(e) {
            if(e.response.data.msg) {
                emitToast(e.response.data.msg, "error")
            } else {
                emitToast(e.response.data, "error")
            } 
        }
    }

    const fetchNamaHewan = (nama, flag) => {
        if(nama.length === 0) {
            setCurrentDropDown([])
            return
        }
        axios.get(
        "https://api.api-ninjas.com/v1/animals?name=" + nama,
            {
                headers: {
                    "X-Api-Key": api_key_ninja,
                },
            }
        ).then((responseData) => {
            const animalData = responseData.data;
            const filteredAnimalName = { ...animalData.map((data) => data.name) };
            const animalNameList = Object.values(filteredAnimalName);
            setCurrentDropDown([...animalNameList])
        });
    }

    const fetchNamaParentHewan = (nama, flag, gender) => {
        if(nama.length === 0) {
            if(flag === 2) {
                setCurrentDropDown2([])
            } else if(flag === 3) {
                setCurrentDropDown3([])
            }
            return
        }
        axios.get(
        `http://localhost:3000/animal?username=${currentUser.username}&password=${currentUser.password}&nickname=${nama}&gender=${gender}`).then((responseData) => {
            const animalData = responseData.data.msg;
            if(flag === 2) {
                setCurrentDropDown2([...animalData])
            } else if(flag === 3) {
                setCurrentDropDown3([...animalData])
            }
        });
    }

    const debouncedFetchNamaHewan = (nama, flag) => {
        clearTimeout(timerId);
        const newTimerId = setTimeout(() => fetchNamaHewan(nama, flag), 500);
        setTimerId(newTimerId);
    }

    const debouncedFetchNamaParentHewan = (nama, flag, gender) => {
        clearTimeout(timerId2);
        const newTimerId2 = setTimeout(() => fetchNamaParentHewan(nama, flag, gender), 500);
        setTimerId(newTimerId2);
    }

    useEffect(()=>{
        fetchLogged()
    },[])

    return(
        <>
            <p class="text-2xl">
                Add Animal
            </p>
            <div class="flex flex-col items-center text-white justify-center px-6" style={{marginBottom: "64px"}}>
                <div class="w-full bg-[#B99470] rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form onSubmit={handleSubmit(addAnimal)}>
                            <div className="my-5">
                                <label for="nama_hewan" class="block mb-2 text-sm font-medium">Nama Hewan <sup>(*)</sup></label>
                                <input {...register("nama_hewan")} onChange={(e) => {
                                    register("nama_hewan").onChange(e);
                                    debouncedFetchNamaHewan(e.target.value, 1);
                                }} type="text" name="nama_hewan" id="nama_hewan" class="text-black bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#F7DCB9] dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama Hewan" required="" />
                                <div id="dropdown-states" class="overflow-y-scroll max-h-20 h-auto z-100 bg-white divide-y divide-gray-100 rounded-lg shadow w-100 dark:bg-[#F7DCB9]">
                                    {
                                        currentDropDown.length > 0 && (
                                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="states-button">
                                            {currentDropDown.map((data) => {
                                                return (
                                                <li>
                                                    <button onClick={(a) => {setNamaHewan(data); document.getElementById("nama_hewan").value = data; setCurrentDropDown(() => ([]))}} type="button" class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                                                    <div class="inline-flex items-center">            
                                                        {data}
                                                    </div>
                                                    </button>
                                                </li>
                                                )
                                            })}
                                            </ul>
                                        ) 
                                    }
                                </div>
                            </div>
                            <div className="my-5">
                                <label for="kode_hewan" class="block mb-2 text-sm font-medium">Kode Hewan <sup>(*)</sup></label>
                                <input {...register("kode_hewan")} type="text" name="kode_hewan" id="kode_hewan" class="text-black bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#F7DCB9] dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kode Hewan" required="" />
                            </div>
                            <div className="my-5">
                                <label for="gender" class="block mb-2 text-sm font-medium">Gender Hewan <sup>(*)</sup></label>
                                <select {...register("gender")} type="text" name="gender" id="gender" class="text-black bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#F7DCB9] dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Gender Hewan" required="">
                                    <option value="MALE">
                                        Male
                                    </option>
                                    <option value="FEMALE">
                                        Female
                                    </option>
                                </select>
                            </div>
                            <div className="my-5">
                                <label for="nama_panggilan" class="block mb-2 text-sm font-medium">Nama Panggilan Hewan</label>
                                <input {...register("nama_panggilan")} type="text" name="nama_panggilan" id="nama_panggilan" class="text-black bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#F7DCB9] dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama Panggilan Hewan" required="" />
                            </div>
                            <div className="my-5">
                                <label for="asal_hewan" class="block mb-2 text-sm font-medium">Asal Hewan Hewan</label>
                                <input {...register("asal_hewan")} type="text" name="asal_hewan" id="asal_hewan" class="text-black bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#F7DCB9] dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Asal Hewan" required="" />
                            </div>
                            <div className="my-5">
                                <input onClick={(e) => setIsChild(e.target.checked)} {...register("is_child")} type="checkbox" name="is_child" id="is_child" class="inline text-black bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-[#F7DCB9] dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                <label for="is_child" class="inline ml-3 mb-2 text-sm font-medium">Merupakan Child</label>
                            </div>
                            {
                                isChild
                                    && (
                                        <>
                                            <div className="my-5">
                                                <label for="parent_male" class="block mb-2 text-sm font-medium">Nama Ayah Hewan</label>
                                                <input {...register("parent_male")} onChange={(e) => {
                                                    register("parent_male").onChange(e);
                                                    debouncedFetchNamaParentHewan(e.target.value, 2, "MALE");
                                                }} type="text" name="parent_male" id="parent_male" class="text-black bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#F7DCB9] dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ayah Hewan" required="" />
                                                <div id="dropdown-states" class="overflow-y-scroll max-h-20 h-auto z-100 bg-white divide-y divide-gray-100 rounded-lg shadow w-100 dark:bg-[#F7DCB9]">
                                                {
                                                    currentDropDown2.length > 0 && (
                                                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="states-button">
                                                        {currentDropDown2.map((data) => {
                                                            return (
                                                            <li>
                                                                <button onClick={(a) => {setAyahHewan(data.id_animal); document.getElementById("parent_male").value = data.nama_panggilan; setCurrentDropDown2(() => ([]))}} type="button" class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                    <div class="inline-flex items-center">            
                                                                        {data.nama_panggilan}
                                                                    </div>
                                                                </button>
                                                            </li>
                                                            )
                                                        })}
                                                        </ul>
                                                    ) 
                                                }
                                                </div>
                                            </div>
                                            <div className="my-5">
                                                <label for="parent_fem" class="block mb-2 text-sm font-medium">Nama Ibu Hewan</label>
                                                <input {...register("parent_fem")} onChange={(e) => {
                                                    register("parent_fem").onChange(e);
                                                    debouncedFetchNamaParentHewan(e.target.value, 3, "FEMALE");
                                                }} type="text" name="parent_fem" id="parent_fem" class="text-black bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#F7DCB9] dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ibu Hewan" required="" />
                                                <div id="dropdown-states" class="overflow-y-scroll max-h-20 h-auto z-100 bg-white divide-y divide-gray-100 rounded-lg shadow w-100 dark:bg-[#F7DCB9]">
                                                    {
                                                        currentDropDown3.length > 0 && (
                                                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="states-button">
                                                                {currentDropDown3.map((data) => {
                                                                    return (
                                                                    <li>
                                                                        <button onClick={(a) => {setIbuHewan(data.id_animal); document.getElementById("parent_fem").value = data.nama_panggilan; setCurrentDropDown3(() => ([]))}} type="button" class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                            <div class="inline-flex items-center">            
                                                                                {data.nama_panggilan}
                                                                            </div>
                                                                        </button>
                                                                    </li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        ) 
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    )
                            }
                            <div className="my-3">
                                {
                                    message ? <div className="w-full bg-red-400 p-1.5 pl-3 text-white">{message}</div> : null
                                }
                                {
                                    success ? <div className="w-full bg-green-400 p-1.5 pl-3 text-white">{success}</div> : null
                                }
                                <button type="submit" class="w-full mt-2 text-white bg-[#DEAC80] hover:bg-[#B5C18E] focus:ring-4 focus:outline-none focus:ring-primary-00 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add Animal</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}