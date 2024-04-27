import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";
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
  
  
      const fetchHistory = async () => {
        console.log(currentUser);
        const listHistory = await axios.get(`http://localhost:3000/history?username=${currentUser.username}&password=${currentUser.password}`)
        setHistory(listHistory.data.msg)
        setMessage(null)
    }

    useEffect(() => {
        fetchLogged()
        fetchHistory()
    }, [])
    useEffect(() => {
        fetchHistory()
    }, [currentUser])
    return (
      
        <div className="items-center justify-center">
  {history.map((data, index) => (
    (data.status === 'SUCCESS' || data.status === 'FAIL') ? (
      <div key={index} className="flex items-center justify-between w-full p-4 my-2 bg-white rounded shadow-lg">
        <div className="grid grid-flow-row-dense grid-cols-6 grid-rows-1 pl-5 text-center space-x-4 w-full">
          <div className="pt-2">{(data.id_h_kawin)}</div>
          <div className="pt-2">{(data.user)}</div>
          <div className="pt-2">{(data.animal_male)}</div>
          <div className="pt-2">{(data.animal_fem)}</div>
          <div className="pt-2">{(data.status)}</div>
          <div className="pt-auto">
          <Link to={`/mate/history/${data.id_h_kawin}`}>
                  <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 my-auto">Detail</button>
                </Link>
          </div>
        </div>
      </div>
    ) : null
  ))}
</div>

    
    );
  }
  
  