import { useCookies } from "react-cookie";

export default function HomeLogged(){
    const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
    return(
        <>
            <h1>{cookies.currentUser}</h1>
        </>
    )
}