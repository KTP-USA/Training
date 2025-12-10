

 import { Mail, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
 const ResetPass = () =>{
    async function wheretogo() {
   await supabase.auth.updateUser({

  password: password,
});

navigate('/login') 
    }
    const navigate = useNavigate();
    async function handleHash(){
const hash = window.location.hash;
console.log('the hashs', hash)
if (hash.includes('access_token')){
    await supabase.auth.exchangeCodeForSession(hash)
}
    }
 useEffect(() => {
handleHash();
 }, []

 );
  const [password, setPassword] = useState('');
    return ( <section  style={{ height: "calc(100vh - 200px)" }} className=" mt-15 flex items-center justify-center bg-gradient-to-r from-white to-blue-600 flex-col">
<h1 className="font-poppins  font-extrabold text-5xl text-blue-600  ">Reset Password</h1>


<div className="mt-10 bg-gradient-to-br bg-white/40 rounded-2xl py-12 px-10 w-100  font-poppins">

<p className="mt-2 mb-2">New Password</p>
<div className="border-2   border-blue-400 font-poppins rounded-lg p-3 w-full text-blue-600 font-bold flex flex-row">
<Lock className="text-blue-500"></Lock>
<input
type="password"
onChange={(e)=>{setPassword(e.target.value)}}
placeholder="New Password"
className="w-full ml-3 outline-none bg-transparent "></input>
</div>
<button
onClick={()=>{
   
   
//     supabase.auth.signInWithPassword({
// email,
// password
// })
wheretogo();


}}
className=" hover:bg-blue-600
flex flex-row rounded-3xl  cursor-pointer p-3  text-lg items-center justify-center hover:scale-102 transition-all
duration-300 py-2 w-full mt-8
text-white gap-2 bg-blue-500 font-poppins">
Reset
</button>
</div>
    </section>
    )
 }


 export default ResetPass;

