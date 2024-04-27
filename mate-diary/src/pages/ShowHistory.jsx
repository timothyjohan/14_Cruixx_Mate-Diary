import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { emitToast } from "../utility/toast/toast";
import axios from 'axios'
import { useCookies } from "react-cookie";

export default function ShowHistory() {
    const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
    const [currentUser, setCurrentUser] = useState(null)

    const fetchLogged = async ()  =>{
        const data = {
            username: cookies.currentUser
        }
        const result = await axios.post(`http://localhost:3000/user?username=${cookies.currentUser}`)
        setCurrentUser(result.data.msg)
    }
      const [message, setMessage] = useState(null)
      const [success, setSuccess] = useState(null)
      const [history, setHistory] = useState([])
      
      const navigate = useNavigate()

  
      useEffect(()=>{
        fetchLogged()
        fetchHistory()

      },[])
  
      const fetchHistory = async () => {
        const listHistory = await axios.get(`http://localhost:3000/history?username=${currentUser.username}&password=${currentUser.password}`)
        const hewan = await axios.get(`http://localhost:3000/history?username=${currentUser.username}&password=${currentUser.password}`)
        setHistory(listHistory.data.msg)
        setMessage(null)
    }

    useEffect(() => {
        fetchHistory()
        // alert(JSON.stringify(history))
    }, [currentUser])
  
    return (
      
        <div className="items-center justify-center">
            <div>
                <h1 className="text-xl mb-16 font-bold">Mating Sessions</h1>
                <button onClick={()=> navigate('add')} className="transition-all px-4 py-2 text-white bg-[#B5C18E] hover:bg-[#DEAC80] rounded-xl my-auto">Add Session</button>
            </div>
        {
            history.map((data, index) => (
                <div key={index} className="flex items-center justify-between w-full text-white p-4 my-2 bg-[#DEAC80] rounded-xl shadow-lg">
                <div className="grid grid-flow-row-dense grid-cols-6 grid-rows-1 pl-5 text-center space-x-4 w-full">
                    <div className="pt-2">{(data.id_h_kawin)}</div>
                    <div className="pt-2">{(data.user)}</div>
                    <div className="pt-2">{(data.animal_male)}</div>
                    <div className="pt-2">{(data.animal_fem)}</div>
                    <div className="pt-2">{(data.status)}</div>
                    <div className="pt-auto">
                        <button className="transition-all px-4 py-2 text-white bg-[#B5C18E] hover:bg-[#F7DCB9] hover:text-gray-800 rounded-xl my-auto">Detail</button>
                    </div>
                </div>
                </div>
            ))
        }
        </div>
    ) 
  }

    

  