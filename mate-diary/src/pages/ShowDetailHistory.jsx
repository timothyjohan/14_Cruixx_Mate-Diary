import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import { useCookies } from "react-cookie";
import { emitToast } from "../utility/toast/toast";

export default function ShowDetailHistory() {
  const { id_h_kawin } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
  const [currentUser, setCurrentUser] = useState(null)
  const [history, setHistory] = useState([])
  const [detail, setDetail] = useState([])

  const fetchLogged = async ()  =>{
    const data = {
      username: cookies.currentUser
    }
    const result = await axios.post(`http://localhost:3000/user?username=${cookies.currentUser}`)
    setCurrentUser(result.data.msg)
  }

  const buttonSF = async(status,id)=>{
    try {
        
        const result = await axios.put(`http://localhost:3000/history/details?username=${cookies.currentUser}&password=${currentUser.password}&id_h_kawin=${id_h_kawin}&status=${status}&id_d_kawin=${id}`)
        emitToast(`Updated Successfully`, "success")
    } catch (error) {
        if(e.response.data.msg) {
            emitToast(e.response.data.msg, "error")
        } else {
            emitToast(e.response.data, "error")
        } 
    }
  }

  const addDS = async()=>{
    try {
        
        const result = await axios.post(`http://localhost:3000/history/details?username=${cookies.currentUser}&password=${currentUser.password}&id_h_kawin=${id_h_kawin}`)
        emitToast(`Added Successfully`, "success")
    } catch (error) {
        if(e.response.data.msg) {
            emitToast(e.response.data.msg, "error")
        } else {
            emitToast(e.response.data, "error")
        } 
    }
  }

  const endS = async(status)=>{
    try {
        
        const result = await axios.put(`http://localhost:3000/history?username=${cookies.currentUser}&password=${currentUser.password}&id_h_kawin=${id_h_kawin}&status=${status}`)
        emitToast(`Updated Successfully`, "success")
    } catch (error) {
        if(e.response.data.msg) {
            emitToast(e.response.data.msg, "error")
        } else {
            emitToast(e.response.data, "error")
        } 
    }
  }
  const fetchHistory = async () => {
    console.log(currentUser);
    const listHistory = await axios.get(`http://localhost:3000/history?username=${currentUser.username}&password=${currentUser.password}`)
    console.log('listHistory:', listHistory.data.msg); // Check your data
    const listDetail = await axios.get(`http://localhost:3000/history/details?username=${currentUser.username}&password=${currentUser.password}&id_h_kawin=${id_h_kawin}`)
    console.log('listDetail:', listDetail.data.msg); // Check your data
    console.log(id_h_kawin);
    setHistory(listHistory.data.msg)
    setDetail(listDetail.data.msg)
  }

  useEffect(() => {
    fetchLogged()
    fetchHistory()
  }, [])

  useEffect(() => {
    fetchHistory()
    // alert(JSON.stringify(detail))
  }, [currentUser])

  return (
    <div className="items-center justify-center">
      {history.map((data, index) => (
        (data.id_h_kawin == id_h_kawin) ? (
          <div key={index} className="flex items-center justify-between w-full p-4 my-2 bg-white rounded shadow-lg">
            <div className="grid grid-flow-row-dense grid-cols-6 grid-rows-1 pl-5 text-center space-x-4 w-full">
              <div className="pt-2">{(data.id_h_kawin)}</div>
              <div className="pt-2">{(data.user)}</div>
              <div className="pt-2">{(data.animal_male)}</div>
              <div className="pt-2">{(data.animal_fem)}</div>
              <div className="pt-2">{(data.status)}</div>
              <div className="pt-auto">
                <Link to={`/history`}>
                  <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-800 my-auto">Back</button>
                </Link>
              </div>
            </div>
          </div>
        ) : null
      ))}
      <div  className="flex items-center justify-between w-full p-4 my-2 bg-white rounded shadow-lg">
                <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-1 pl-5 text-center space-x-4 w-full">
                  <div className="pt-2">{'No'}</div>
                  <div className="pt-2">{'ID'}</div>
                  <div className="pt-2">{('Waktu Kawin')}</div>
                  <div className="pt-2">{'Status' }</div>
                </div>
              </div>
      {
        detail.map((data, index) => (
              <div key={index} className="flex items-center justify-between w-full p-4 my-2 bg-white rounded shadow-lg">
                <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-1 pl-5 text-center space-x-4 w-full">
                  <div className="pt-2">{(index+1)}</div>
                  <div className="pt-2">{(data.id_d_kawin)}</div>
                  <div className="pt-2">{new Date(data.waktu_kawin).toLocaleString('en-GB')}</div>
                  {data.kawin_status == 0 ? (
                    <div className="pt-auto">
                        <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 my-auto mr-2" onClick={()=>{buttonSF(2,detail[detail.length-1].id_d_kawin)}}>Success</button>
                        <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 my-auto"  onClick={()=>{buttonSF(1,detail[detail.length-1].id_d_kawin)}}>Fail</button>
                    </div>
                    ) : data.kawin_status == 1 ? (
                        <div className="pt-2">FAIL</div>
                    ) : (
                        <div className="pt-2">SUCCESS</div>
                    )}
                </div>
              </div>
          ))
      }
      {
        // console.log(detail[detail.length-1].kawin_status)
        detail.length > 0 ? 
        
        <>
            {
                detail[detail.length-1].kawin_status != 0 && history.filter((data)=>data.id_h_kawin == id_h_kawin && data.status==="BEFORE").length!=0 && (
                    <div className="pt-auto">
                    <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 my-auto mr-2" onClick={()=>{addDS()}}>Add Detail Session</button>
                    <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 my-auto"  onClick={()=>{endS('ONGOING')}}>End Session</button>
                </div>
                )

            }
            {
            history.filter((data)=>data.id_h_kawin == id_h_kawin && data.status==="ONGOING").length!=0 && (
              <div className="pt-auto">
                <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 my-auto mr-2" onClick={()=>{endS('SUCCESS')}}>Success</button>
                <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 my-auto" onClick={()=>{endS('FAIL')}}>Fail</button>
              </div>
            )
          }
        </>
        :
        <>
        
        </> 
        // detail[detail.length-1].kawin_status != 0 && history.find((data)=>data.status === "BEFORE") && (
        //   <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 my-auto mr-2">Add Detail Kawin</button>
        // )
      }
    </div>
  );
}
