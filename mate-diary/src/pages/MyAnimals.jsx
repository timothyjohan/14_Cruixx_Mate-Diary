import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import AnimalItems from "../components/AnimalItems";

export default function MyAnimals(){
    const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
    const [animals, setAnimals] = useState([])
    const [currentUser, setCurrentUser] = useState(null)

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
                        <h1 className="text-xl mb-16">My Animals</h1>
                        {
                            animals.map((element)=>{
                                return <AnimalItems {...element} />
                            })
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