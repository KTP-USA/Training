
 import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
 const LogIn = () =>{
    async function wheretogo() {
       
        const { data, error } = await supabase.auth.signInWithPassword({
  email: email,
  password: password,
});

    let userData: any = await supabase.from('user_profiles').select().eq('uid', data.user?.id);
    console.log('ussss', userData)
    if (userData.data[0]['role'] == 'USER'){
        navigate('/summary')
    } else {
        navigate('/test-manager')
    }    
    }
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    return ( <section  style={{ height: "calc(100vh - 200px)" }} className=" mt-15 flex items-center justify-center bg-gradient-to-r from-white to-blue-600 flex-col">
<h1 className="font-poppins  font-extrabold text-5xl text-blue-600  ">Log In</h1>

<div className="mt-10 bg-gradient-to-br bg-white/40 rounded-2xl py-12 px-10 w-100 ">
<div className="border-2 border-blue-400 font-poppins rounded-lg p-3 w-full text-blue-600 font-bold flex flex-row">
    <Mail className="text-blue-500"></Mail>
<input 
onChange={(e)=>{setEmail(e.target.value)}}
type="email"
placeholder="Email"
className="w-full ml-3 outline-none bg-transparent"></input>
</div>
<div className="border-2 mt-4 border-blue-400 font-poppins rounded-lg p-3 w-full text-blue-600 font-bold flex flex-row">
<Lock className="text-blue-500"></Lock>
<input 
type="password"
onChange={(e)=>{setPassword(e.target.value)}}
placeholder="Password"
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
Log In
</button> 
</div>
    </section>
    )
 }

 export default LogIn;