import { useCookies } from "react-cookie";

export default function MyAnimals(){
    const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);

    return(
        <>
            <h1>Myanimals</h1>
        </>
    )
}