import { useState } from "react";
import { useNavigate } from "react-router-dom";
 const JoinTest = () =>{
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    return <section className="max-w-screen h-screen flex items-center justify-center bg-gradient-to-r from-sky-50 to-blue-400  flex-col">
<h1 className="font-poppins  font-bold text-5xl text-blue-500  ">Join Test</h1>

<div className="mt-10 bg-white  rounded-2xl py-10 px-10 w-100  ">
<input 
onChange={(e)=> setCode(e.target.value)}
placeholder="Test Code"
className="border-2 border-blue-400 font-poppins rounded-lg p-3 w-full text-blue-500 font-bold"></input>
<button
onClick={() => {navigate(`/test/${code}`)}}
className=" hover:bg-blue-600
flex flex-row rounded-3xl  cursor-pointer p-3  text-lg items-center justify-center hover:scale-102 transition-all
duration-300 py-2 w-full mt-4
text-white gap-2 bg-blue-500 font-poppins">
Enter
</button> 
</div>
    </section>
 }

 export default JoinTest;