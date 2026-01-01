

 import { Mail, } from "lucide-react";
import {  useState } from "react";
import { supabase } from "../supabaseClient";
 const ForgotPass = () =>{
    const [hasSent, setHasSent] = useState(false);
    async function sendEmail() {
       
  await supabase.auth.resetPasswordForEmail(email,  {
redirectTo: 'https://ktp-usa.github.io/Training/reset-password'
  });
 
   setHasSent(true);
    }
  
   
  const [email, setEmail] = useState('');
    return ( <section  style={{ height: "calc(100vh - 200px)" }} className=" mt-15 flex items-center justify-center bg-gradient-to-r from-white to-blue-600 flex-col">
<h1 className="font-poppins  font-extrabold text-5xl text-blue-600  ">Reset Password</h1>


<div className="mt-10 bg-gradient-to-br bg-white/40 rounded-2xl py-12 px-10 w-100  font-poppins">

<p className="mt-2 mb-6 text-gray-700 text-md">Enter the email adresss. Instructions will be sent to that email.</p>
<div className="border-2   border-blue-400 font-poppins rounded-lg p-3 w-full text-blue-600 font-bold flex flex-row">
<Mail className="text-blue-500"></Mail>
<input
type="email"
onChange={(e)=>{setEmail(e.target.value)}}
placeholder="Email"
className="w-full ml-3 outline-none bg-transparent "></input>
</div>
{
    hasSent 
    ?
<button

className=" 
flex flex-row rounded-3xl  p-3  text-lg items-center justify-center
 py-2 w-full mt-8
text-white gap-2 bg-green-600 font-poppins">
Email Sent
</button>
    :
<button
onClick={()=>{
 
sendEmail();


}}
className=" hover:bg-blue-600
flex flex-row rounded-3xl  cursor-pointer p-3  text-lg items-center justify-center hover:scale-102 transition-all
duration-300 py-2 w-full mt-8
text-white gap-2 bg-blue-500 font-poppins">
Reset Password
</button>
 }
</div>
    </section>
    )
 }


 export default ForgotPass;

