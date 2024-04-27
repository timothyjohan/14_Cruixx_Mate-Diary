export default function Home(){
    return(
        <>
            <div className="grid grid-cols-1 xl:grid-cols-2 text-gray-800">
                <div className="order-2 xl:order-1">
                    <h1 className=" text-4xl font-bold ">Breed and record your animals online!</h1>
                    <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. </h2>
                </div>
                    
                <div className="grid grid-cols-2 order-2 xl:order-3 mt-10 xl:-mt-64 ">
                    <button type="button" className="bg-[#B5C18E] mx-4 py-2 text-white rounded-md shadow-md xl:h-14">Join Now</button>
                    <button type="button" className="bg-[#DEAC80] mx-4 text-white rounded-md shadow-md xl:h-14">Log in</button>
                </div>
                <div className="order-1 xl:order-2">
                    <img src="/animals.png" alt="" srcset="" />
                </div>
                
            </div>
        </>
    )
}