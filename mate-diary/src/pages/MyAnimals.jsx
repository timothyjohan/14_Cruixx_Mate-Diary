import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AnimalItems from "../components/AnimalItems";
import { useNavigate } from "react-router-dom";

export default function MyAnimals(){
    const [cookies, setCookie, removeCookie] = useCookies(['currentUser', 'currentAnimal']);
    const [animals, setAnimals] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const navigate = useNavigate()

    const fetchLogged = async ()  =>{
        const data = {
            username: cookies.currentUser
        }
        const result = await axios.post(`http://localhost:3000/user?username=${cookies.currentUser}`)
        setCurrentUser(result.data.msg)
    }
    const fetchAnimals = async () =>{
        console.log();
        const result = await axios.get(`http://localhost:3000/animal?username=${currentUser.username}&password=${currentUser.password}`)
        setAnimals(result.data.msg)
    }

    const clickDetails = (row) =>{
        setCookie('currentAnimal', row)
        navigate("/tree")
    }
    

    useEffect(()=>{
        fetchLogged()
    },[])
    useEffect(()=>{
        fetchAnimals()
    },[currentUser])

    useEffect(()=>{
        console.log(animals);
    },[animals])

    return(
        <>
            <div>
                {
                    animals.length > 1 ? 
                    <>  
                        <div>
                            <h1 className="text-xl mb-16">My Animals</h1>
                            <button onClick={()=> navigate('add')} className="transition-all px-4 py-2 text-white bg-[#B5C18E] hover:bg-[#DEAC80] rounded-xl my-auto">Add Animal</button>
                        </div>
                        {
                            animals.map((data, index) => (
                                <div key={index} className="flex items-center justify-between w-full text-white p-4 my-2 bg-[#DEAC80] rounded-xl shadow-lg">
                                <div className="grid grid-flow-row-dense grid-cols-6 grid-rows-1 pl-5 text-center space-x-4 w-full">
                                    <div className="pt-2">{(data.kode_hewan)}</div>
                                    <div className="pt-2">{(data.nama_hewan)}</div>
                                    <div className="pt-2">{(data.nama_panggilan)}</div>
                                    <div className="pt-2">{(data.gender)}</div>
                                    <div className="pt-2"></div>
                                    <div className="pt-auto">
                                        <button onClick={()=> clickDetails(data)} className="transition-all px-4 py-2 text-white bg-[#B5C18E] hover:bg-[#F7DCB9] hover:text-gray-800 rounded-xl my-auto">Detail</button>
                                    </div>
                                </div>
                                </div>
                            ))
                        }
                    </>
                    :
                    <>
                        <h1>Loading..</h1>
                    </>
                }
                
            </div>
        </>
    )
}