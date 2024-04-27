import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function MyAnimals(){
    const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
    const [animals, setAnimals] = useState([null])
    const [currentUser, setCurrentUser] = useState(null)

    const fetchLogged = async ()  =>{
        const data = {
            username: cookies.currentUser
        }
        const result = await axios.get(`http://localhost:3000/user?username=${cookies.currentUser}`)
        setCurrentUser(result.data.msg)
    }
    const fetchAnimals = async () =>{
        console.log();
        const result = await axios.get(`http://localhost:3000/animal?username=${currentUser.username}&password=${currentUser.password}`)
        setAnimals(result.data)
    }
    

    useEffect(()=>{
        fetchLogged()
    },[])
    useEffect(()=>{
        fetchAnimals
    },[currentUser])

    useEffect(()=>{
        console.log(animals);
    },[animals])

    return(
        <>
            <h1>Myanimals</h1>
        </>
    )
}