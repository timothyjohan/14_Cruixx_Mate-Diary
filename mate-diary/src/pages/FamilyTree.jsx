import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { emitToast } from "../utility/toast/toast";
import axios from 'axios'
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function FamilyTree(){
    const [valueInputAnimal, setValueInputAnimal] = useState("")
    const [animalChildData, setAnimalChildData] = useState("")
    const [animalDropdown, setAnimalDropdown] = useState([])
    const [animalTree, setAnimalTree] = useState({})
    const [animalDetail, setAnimalDetail] = useState({})
    const [timerId, setTimerId] = useState(null)
    const [kawinSuksesRate, setKawinSuksesRate] = useState("")
    const [kawinEfektifRate, setKawinEfektifRate] = useState("")
    const [premium, setPremium] = useState(false)

    const [cookies, setCookie, removeCookie] = useCookies(['currentUser', 'currentAnimal']);
    const [currentUser, setCurrentUser] = useState(null)

    const fetchLogged = async ()  =>{
        const data = {
            username: cookies.currentUser
        }
        const result = await axios.post(`http://localhost:3000/user?username=${cookies.currentUser}`)
        setCurrentUser(result.data.msg)
    }

    const checkCookie = () =>{
        if(cookies.currentAnimal){
            debouncedFetchNamaChildHewan(cookies.currentAnimal.nama_panggilan)
            fetchFamilyTree(cookies.currentAnimal.id_animal)
            setAnimalChildData(cookies.currentAnimal)
        }
    }
    const checkPremium = async () =>{
        // console.log(currentUser.id_company);
        const result = await axios.get(`http://localhost:3000/company?id=${currentUser.id_company}`)
        if(result.data.msg.status == "PREMIUM"){
            setPremium(true)
        }
        console.log(result.data.msg);
    }

    useEffect(()=>{
        fetchLogged()
        checkCookie()
    },[])

    useEffect(()=>{
        checkCookie()
        checkPremium()
    },[currentUser])

    const fetchNamaChildHewan = async (nama) => {
        if(nama.length === 0) {
            setAnimalDropdown([])
            return
        }

        axios.get(`http://localhost:3000/animal?username=${currentUser.username}&password=${currentUser.password}&nickname=${nama}`).then((responseData) => {
            const animalData = responseData.data.msg;
            setAnimalDropdown([...animalData])
        });
    }

    const fetchDetail = async (tag) => {
        try {
            const newAnimalDetail = {...animalDetail, ...animalTree[tag]};
            setAnimalDetail(newAnimalDetail);
    
            let parentFemPromise = Promise.resolve({ data: { msg: { nama_panggilan: "-" } } });
            let parentMalePromise = Promise.resolve({ data: { msg: { nama_panggilan: "-" } } });
    
            if(newAnimalDetail.parent_fem && newAnimalDetail.parent_fem > 0) {
                parentFemPromise = axios.get(`http://localhost:3000/animal/${newAnimalDetail.parent_fem}?username=${currentUser.username}&password=${currentUser.password}`);
            }
    
            if(newAnimalDetail.parent_male && newAnimalDetail.parent_male > 0) {
                parentMalePromise = axios.get(`http://localhost:3000/animal/${newAnimalDetail.parent_male}?username=${currentUser.username}&password=${currentUser.password}`);
            }
    
            const [responseFem, responseMale] = await Promise.all([parentFemPromise, parentMalePromise]);
    
            const updatedAnimalDetail = {
                ...newAnimalDetail,
                nama_ibu: responseFem.data.msg.nama_panggilan,
                nama_ayah: responseMale.data.msg.nama_panggilan
            };
    
            setAnimalDetail(updatedAnimalDetail);
    
            fetchSuccessRate(newAnimalDetail.id_animal);
            fetchEffectivity(newAnimalDetail.id_animal);
        } catch (e) {
            console.error(e);
            setAnimalDetail((prevAnimalDetail) => ({...prevAnimalDetail, nama_ibu: "-", nama_ayah: "-"}));
        }
    }

    const fetchFamilyTree = async (idAnimal) => {
        if(!idAnimal) {
            return;
        }
        try {
            const response = await axios.get(`http://localhost:3000/animal/family/${idAnimal}?username=${currentUser.username}&password=${currentUser.password}`);
            const animalTree = response.data.msg;
            setValueInputAnimal(animalTree.anak.nama_panggilan);
            setAnimalTree((prevTree) => ({...prevTree, ...animalTree}));
    
            let newAnimalDetail = {...animalTree.anak};
    
            if(animalTree.anak.parent_fem && animalTree.anak.parent_fem > 0) {
                const femParentResponse = await axios.get(`http://localhost:3000/animal/${animalTree.anak.parent_fem}?username=${currentUser.username}&password=${currentUser.password}`);
                newAnimalDetail = {...newAnimalDetail, nama_ibu: femParentResponse.data.msg.nama_panggilan};
            }
    
            if(animalTree.anak.parent_male && animalTree.anak.parent_male > 0) {
                const maleParentResponse = await axios.get(`http://localhost:3000/animal/${animalTree.anak.parent_male}?username=${currentUser.username}&password=${currentUser.password}`);
                newAnimalDetail = {...newAnimalDetail, nama_ayah: maleParentResponse.data.msg.nama_panggilan};
            }
    
            setAnimalDetail(newAnimalDetail);
            fetchSuccessRate(idAnimal);
            fetchEffectivity(idAnimal);
        } catch (e) {
            console.error(e);
        }
    }

    const fetchSuccessRate = async (idAnimal) => {
        if(!idAnimal) {
            return
        }
        axios.get(`http://localhost:3000/prediction/h_kawin?id_animal=${idAnimal}&username=${currentUser.username}&password=${currentUser.password}`).then((responseData) => {
            const kawinSuccessRate = responseData.data.msg;
            setKawinSuksesRate(kawinSuccessRate)
        });
    }

    const fetchEffectivity = async (idAnimal) => {
        if(!idAnimal) {
            return
        }
        axios.get(`http://localhost:3000/prediction/d_kawin?id_animal=${idAnimal}&username=${currentUser.username}&password=${currentUser.password}`).then((responseData) => {
            const kawinEffectivityRate = responseData.data.msg;
            setKawinEfektifRate(kawinEffectivityRate)
        });
    }

    const debouncedFetchNamaChildHewan = (nama) => {
        setValueInputAnimal(nama)
        clearTimeout(timerId);
        const newTimerId = setTimeout(() => fetchNamaChildHewan(nama), 500);
        setTimerId(newTimerId);
    }


    return(
        <>
            <p class="text-2xl">
                Animal Family Tree
            </p>
            <div>
                <p class="inline text-lg">Animal child : </p>
                <input value={valueInputAnimal} onChange={(e) => debouncedFetchNamaChildHewan(e.target.value)} type="text" name="nama_hewan" id="nama_hewan" class="text-white bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama Hewan" required="" />
                <div id="dropdown-states" class="max-h-20 overflow-y-scroll h-auto z-100 bg-white divide-y divide-gray-100 rounded-lg shadow w-1/2 dark:bg-gray-700">
                    {
                        animalDropdown.length > 0 && (
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="states-button">
                            {animalDropdown.map((data) => {
                                return (
                                <li>
                                    <button onClick={(a) => {fetchFamilyTree(data.id_animal); setAnimalChildData(data); document.getElementById("nama_hewan").value = data.nama_panggilan; setAnimalDropdown(() => ([]))}} type="button" class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
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
            
            <div class="grid grid-cols-2">
                <div className={`${premium ? '' : 'blur'}`}>
                    {(animalTree.kakek_ayah || animalTree.kakek_ibu || animalTree.nenek_ayah || animalTree.nenek_ibu) && (
                        <div class="grid grid-cols-4 gap-2 my-5">
                            {
                                animalTree.kakek_ayah && (
                                    <button
                                        type="button"
                                        class="bg-red-500 inline-block rounded-full bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-warning-3 transition duration-150 ease-in-out hover:bg-warning-accent-300 hover:shadow-warning-2 focus:bg-warning-accent-300 focus:shadow-warning-2 focus:outline-none focus:ring-0 active:bg-warning-600 active:shadow-warning-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        onClick={() => fetchDetail("kakek_ayah")}
                                    >
                                        [KAKEK AYAH: {animalTree.kakek_ayah.nama_panggilan}]
                                    </button>
                                )
                            }
                            {
                                animalTree.nenek_ayah && (
                                    <button
                                        type="button"
                                        class="bg-red-800 inline-block rounded-full bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-warning-3 transition duration-150 ease-in-out hover:bg-warning-accent-300 hover:shadow-warning-2 focus:bg-warning-accent-300 focus:shadow-warning-2 focus:outline-none focus:ring-0 active:bg-warning-600 active:shadow-warning-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        onClick={() => fetchDetail("nenek_ayah")}
                                    >
                                        [NENEK AYAH: {animalTree.nenek_ayah.nama_panggilan}]
                                    </button>
                                )
                            }
                            {
                                animalTree.kakek_ibu && (
                                    <button
                                        type="button"
                                        class="bg-red-500 inline-block rounded-full bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-warning-3 transition duration-150 ease-in-out hover:bg-warning-accent-300 hover:shadow-warning-2 focus:bg-warning-accent-300 focus:shadow-warning-2 focus:outline-none focus:ring-0 active:bg-warning-600 active:shadow-warning-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        onClick={() => fetchDetail("kakek_ibu")}
                                    >
                                        [KAKEK IBU: {animalTree.kakek_ibu.nama_panggilan}]
                                    </button>
                                )
                            }
                            {
                                animalTree.nenek_ibu && (
                                    <button
                                        type="button"
                                        class="bg-red-800 inline-block rounded-full bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-warning-3 transition duration-150 ease-in-out hover:bg-warning-accent-300 hover:shadow-warning-2 focus:bg-warning-accent-300 focus:shadow-warning-2 focus:outline-none focus:ring-0 active:bg-warning-600 active:shadow-warning-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        onClick={() => fetchDetail("nenek_ibu")}
                                    >
                                        [NENEK IBU: {animalTree.nenek_ibu.nama_panggilan}]
                                    </button>
                                )
                            }
                        </div>
                    )}
                    {(animalTree.kakek_ayah || animalTree.kakek_ibu || animalTree.nenek_ayah || animalTree.nenek_ibu) && (
                        <div class="grid grid-cols-4 gap-2 my-5">
                            {
                                animalTree.kakek_ayah && (
                                    <div class="flex justify-end mr-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
                                        </svg>
                                    </div>
                                )
                            }
                            {
                                animalTree.nenek_ayah && (
                                    <div class="flex ml-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
                                        </svg>
                                    </div>
                                )
                            }
                            {
                                animalTree.kakek_ibu && (
                                    <div class="flex justify-end mr-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
                                        </svg>
                                    </div>
                                )
                            }
                            {
                                animalTree.nenek_ibu && (
                                    <div class="flex ml-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
                                        </svg>
                                    </div>
                                )
                            }
                        </div>  
                    )}
                    {(animalTree.ayah || animalTree.ibu) && (
                        <div class="grid grid-cols-2 gap-2 my-5">
                            {
                                animalTree.ayah && (
                                    <button
                                        type="button"
                                        class="bg-yellow-500 inline-block rounded-full bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-warning-3 transition duration-150 ease-in-out hover:bg-warning-accent-300 hover:shadow-warning-2 focus:bg-warning-accent-300 focus:shadow-warning-2 focus:outline-none focus:ring-0 active:bg-warning-600 active:shadow-warning-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        onClick={() => fetchDetail("ayah")}
                                    >
                                        [FATHER: {animalTree.ayah.nama_panggilan}]
                                    </button>
                                )
                            }
                            {
                                animalTree.ibu && (
                                    <button
                                        type="button"
                                        class="bg-yellow-600 inline-block rounded-full bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-warning-3 transition duration-150 ease-in-out hover:bg-warning-accent-300 hover:shadow-warning-2 focus:bg-warning-accent-300 focus:shadow-warning-2 focus:outline-none focus:ring-0 active:bg-warning-600 active:shadow-warning-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        onClick={() => fetchDetail("ibu")}
                                    >
                                        [MOTHER: {animalTree.ibu.nama_panggilan}]
                                    </button>
                                )
                            }
                        </div>  
                    )}
                    {(animalTree.ayah || animalTree.ibu) && (
                        <div class="grid grid-cols-2 gap-2 my-5">
                            {
                                animalTree.ayah && (
                                    <div class="flex justify-end mr-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
                                        </svg>
                                    </div>
                                )
                            }
                            {
                                animalTree.ibu && (
                                    <div class="flex ml-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
                                        </svg>
                                    </div>
                                )
                            }
                        </div>  
                    )}

                    {(animalTree.anak) && (
                        <div class="grid grid-cols-1 gap-2 my-5">
                            <button
                                type="button"
                                class="bg-green-500 inline-block rounded-full bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-warning-3 transition duration-150 ease-in-out hover:bg-warning-accent-300 hover:shadow-warning-2 focus:bg-warning-accent-300 focus:shadow-warning-2 focus:outline-none focus:ring-0 active:bg-warning-600 active:shadow-warning-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                onClick={() => fetchDetail("anak")}
                            >
                                [CHILD: {animalTree.anak.nama_panggilan}]
                            </button>
                        </div>
                    )}
                    
                    
                    
                </div>
                
                <div class="ml-10 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6">
                        <h1 class="text-sm font-bold leading-tight tracking-tight md:text-lg">
                            Selected animal details :
                        </h1>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <h1 class="my-3 text-sm leading-tight tracking-tight md:text-md">
                                    Nama Panggilan : {animalDetail.nama_panggilan ?? "-"}
                                </h1>
                                <h1 class="my-3 text-sm leading-tight tracking-tight md:text-md">
                                    Nama Hewan : {animalDetail.nama_hewan ?? "-"}
                                </h1>
                                <h1 class="my-3 text-sm leading-tight tracking-tight md:text-md">
                                    Kode Hewan : {animalDetail.kode_hewan ?? "-"}
                                </h1>
                                <h1 class="my-3 text-sm leading-tight tracking-tight md:text-md">
                                    Asal Hewan : {animalDetail.asal_hewan ?? "-"}
                                </h1> 
                                <h1 class="my-3 text-sm leading-tight tracking-tight md:text-md">
                                    Nama Ayah Hewan : {animalDetail.nama_ayah ?? "-"}
                                </h1>
                                <h1 class="my-3 text-sm leading-tight tracking-tight md:text-md">
                                    Nama Ibu Hewan : {animalDetail.nama_ibu ?? "-"}
                                </h1>
                            </div>
                            <div>
                                
                                <h1 class="my-3 text-sm leading-tight tracking-tight md:text-md">
                                    Breeding success rate : <b className={premium ? "" : "blur"}>{kawinSuksesRate ?? "-"}</b>
                                </h1>
                                <h1 class="my-3 text-sm leading-tight tracking-tight md:text-md">
                                    Breeding effectivity : <b className={premium ? "" : "blur"}>{kawinEfektifRate ?? "-"}</b>
                                </h1>
                            </div>
                        </div>
                        
                        <div class="flex justify-end">
                            {
                                (animalDetail.id_animal && animalDetail.id_animal !== animalTree.anak.id_animal) && (
                                <button
                                    type="button"
                                    class="text-right bg-sky-500 inline-block rounded-full bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-warning-3 transition duration-150 ease-in-out hover:bg-warning-accent-300 hover:shadow-warning-2 focus:bg-warning-accent-300 focus:shadow-warning-2 focus:outline-none focus:ring-0 active:bg-warning-600 active:shadow-warning-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                    onClick={() => fetchFamilyTree(animalDetail.id_animal)}
                                >
                                    SET TO CHILD
                                </button>
                                )
                            }
                            
                        </div>
                        
                    </div>
                </div>
                {
                premium ? 
                <></>
                :
                <>
                    <div>
                        <h1 className="text-xl font-semibold">Want to unlock more features?</h1>
                        <Link to={"/subscription"}>
                            <button className="mt-2 text-xl text-white bg-[#DEAC80] hover:bg-[#B5C18E] focus:ring-4 focus:outline-none focus:ring-primary-00 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">GET PREMIUM</button>
                        </Link>
                    </div>
                </>
                }
                
            </div>
        </>
    )
}