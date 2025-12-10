







import { useNavigate, useLocation } from "react-router-dom";
import {Menu, X} from "lucide-react";
import { supabase } from "../supabaseClient";
import { useState, useEffect, } from "react";
const Navigation = () => {
    const loc = useLocation();
    const name = loc.pathname;
    const [isLoggedIn, setLogIn] = useState(false);
   async function fetchUserData() {
    let session = await supabase.auth.getSession();
    let userData: any = await supabase.from('user_profiles').select().eq('uid', session.data.session?.user.id);
    setLogIn(session.data.session?.user.id != null)
    let isLog = session.data.session?.user.id != null
   
        setTabs(
           
               !isLog  ?  [ 'Log In'] :  name.includes(`/test/`)  ?   [ 'Log Out'] :




            userData.data[0]['role'] == 'USER' ?
            [ 'Summary', 'Log Out'] :
           
           userData.data[0]['role'] == 'ADMIN' ?
             userData.data[0]['trainer'] == 'Y' ?
             [
               
               
                'Questions',
                'Users',  'Manager', 'Summary', 'Competency', 'Log Out']
             :
               [
                 'Questions',
                'Users',  'Manager', 'Summary',  'Competency', 'Log Out']
            :
                userData.data[0]['trainer'] == 'Y' ?
             [ 'Manager', 'Summary',  'Competency', 'Log Out']
             :
            [  'Manager', 'Summary', 'Competency', 'Log Out']
            );




   }
   
    useEffect(() =>{
        fetchUserData();
    }, [])
    const navigate = useNavigate();
    const [tabs, setTabs] = useState(['Test Center',  'Summary', 'Log Out'])




   const [isOpen, setIsOpen] = useState(false);
   
    return (
        <nav className="
       items-center
        top-0 left-0 right-0 z-60 px-4 py-5 flex flex-row bg-blue-400 rounded-bl-xl rounded-br-xl">
<p onClick={()=>{navigate('/')}} className="text-white cursor-pointer font-bold text-xl ml-2 font-inter"> Kurz Training Module - V1.8.5</p>
<div className="flex-1"></div>
<div className="flex flex-row gap-10 mr-10">
<div className="md:flex flex-row items-center hidden ">
    {tabs.map((entry) =>
<p onClick={() => {




    if (isLoggedIn && (entry == 'Log In' || entry=='Log Out')){
        supabase.auth.signOut();
    }
navigate(
    entry == 'Test Center' ? '/join-test' :
    entry == 'Questions' ? '/questions' :
    entry ==
 'Competency' ? "/join-test" : entry == 'Manager' ? '/test-manager' :  entry == 'Summary' ? '/summary' :
 entry == 'Technical' ?  '/evaluation' : entry == 'Log Out' || entry == 'Log In' ? '/login' :
 entry == 'Training Topics' ? '/training-topics' : entry == 'Assesment:' ? '': entry == 'Users' ? '/users' : "/performance-review")}} className={`
 
   cursor-pointer  text-lg ${ entry == 'Log Out' || entry == 'Log In' ?
     'bg-white/50 rounded-lg p-2 px-3 text-blue-500 font-bold font-poppins ml-8'
     : entry == 'Technical' ||  entry ==
     'Performance' ? ' bg-white/30 p-2 px-3 m-0 text-blue-500 font-bold font-poppins '
     
  : entry=='Assesment:' ? ' bg-white/30 p-2 px-3 m-0 text-blue-500 font-bold  rounded-l-lg font-poppins '
     : 'text-white mr-6 font-inter'}`} >
     
     {entry}
     
     </p>
)}
</div>
<div onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white cursor-pointer flex justify-baseline"> { !isOpen ? <Menu></Menu> : <X></X>}








</div>
{isOpen &&
<div className="flex items-baseline flex-col md:hidden justify-baseline absolute left-0 mt-10 ">
    <div className="bg-blue-400 p-3 w-screen rounded-b-xl ">
{ tabs.map((entry) =>
<p onClick={() =>




    navigate(
      entry == 'Test Center' ? '/join-test' :
    entry == 'Questions' ? '/questions' :
    entry ==
 'Competency' ? "/join-test" : entry == 'Manager' ? '/test-manager' :  entry == 'Summary' ? '/summary' :
 entry == 'Technical' ?  '/evaluation' : entry == 'Log Out' || entry == 'Log In' ? '/login' :
 entry == 'Training Topics' ? '/training-topics' : entry == 'Assesment:' ? '': entry == 'Users' ? '/users' : "/performance-review")
} className="font-inter  cursor-pointer text-white text-lg ml-4 mb-3">{entry}</p>
)}
</div>
</div>
}
   
</div>
        </nav>
    )
}




export default Navigation;












// import { useNavigate, useLocation } from "react-router-dom";
// import {Menu, X} from "lucide-react";
// import { supabase } from "../supabaseClient";
// import { useState, useEffect, } from "react";
// const Navigation = () => {
//     const loc = useLocation();
//     const name = loc.pathname;
//     const [isLoggedIn, setLogIn] = useState(false);
//    async function fetchUserData() {
//     let session = await supabase.auth.getSession();
//     let userData: any = await supabase.from('user_profiles').select().eq('uid', session.data.session?.user.id);
//     setLogIn(session.data.session?.user.id != null)
//     let isLog = session.data.session?.user.id != null
   
//         setTabs(
           
//                !isLog  ?  [ 'Log In'] :  name.includes(`/test/`)  ?   [ 'Log Out'] :




//             userData.data[0]['role'] == 'USER' ?
//             [ 'Test Center', 'Summary', 'Log Out'] :
           
//            userData.data[0]['role'] == 'ADMIN' ?
//              userData.data[0]['trainer'] == 'Y' ?
//              [
               
               
//                 'Questions',
//                 'Users',  'Manager', 'Summary', 'Training Topics', 'Assesment:','Performance', 'Technical', 'Competency', 'Log Out']
//              :
//                [
//                  'Questions',
//                 'Users',  'Manager', 'Summary', 'Training Topics', 'Assesment:','Performance',  'Competency', 'Log Out']
//             :
//                 userData.data[0]['trainer'] == 'Y' ?
//              [ 'Manager', 'Summary', 'Training Topics', 'Assesment:','Performance', 'Technical', 'Competency', 'Log Out']
//              :
//             [  'Manager', 'Summary', 'Training Topics', 'Assesment:','Performance', 'Competency', 'Log Out']
//             );




//    }
   
//     useEffect(() =>{
//         fetchUserData();
//     }, [])
//     const navigate = useNavigate();
//     const [tabs, setTabs] = useState(['Test Center',  'Summary', 'Log Out'])




//    const [isOpen, setIsOpen] = useState(false);
   
//     return (
//         <nav className="
//        items-center
//         top-0 left-0 right-0 z-60 px-4 py-5 flex flex-row bg-blue-400 rounded-bl-xl rounded-br-xl">
// <p onClick={()=>{navigate('/')}} className="text-white cursor-pointer font-bold text-xl ml-2 font-inter"> Kurz Training Module - V1.2</p>
// <div className="flex-1"></div>
// <div className="flex flex-row gap-10 mr-10">
// <div className="md:flex flex-row items-center hidden ">
//     {tabs.map((entry) =>
// <p onClick={() => {




//     if (isLoggedIn && (entry == 'Log In' || entry=='Log Out')){
//         supabase.auth.signOut();
//     }
// navigate(
//     entry == 'Test Center' ? '/join-test' :
//     entry == 'Questions' ? '/questions' :
//     entry ==
//  'Competency' ? "/join-test" : entry == 'Manager' ? '/test-manager' :  entry == 'Summary' ? '/summary' :
//  entry == 'Technical' ?  '/evaluation' : entry == 'Log Out' || entry == 'Log In' ? '/login' :
//  entry == 'Training Topics' ? '/training-topics' : entry == 'Assesment:' ? '': entry == 'Users' ? '/users' : "/performance-review")}} className={`
 
//    cursor-pointer  text-lg ${ entry == 'Log Out' || entry == 'Log In' ?
//      'bg-white/50 rounded-lg p-2 px-3 text-blue-500 font-bold font-poppins ml-8'
//      : entry == 'Technical' ||  entry ==
//      'Performance' ? ' bg-white/30 p-2 px-3 m-0 text-blue-500 font-bold font-poppins '
//      :
//       entry=='Competency' ?' bg-white/30 p-2 px-3 m-0 text-blue-500 font-bold font-poppins rounded-r-lg': entry=='Assesment:' ? ' bg-white/30 p-2 px-3 m-0 text-blue-500 font-bold  rounded-l-lg font-poppins '
//      : 'text-white mr-6 font-inter'}`} >
     
//      {entry}
     
//      </p>
// )}
// </div>
// <div onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white cursor-pointer flex justify-baseline"> { !isOpen ? <Menu></Menu> : <X></X>}








// </div>
// {isOpen &&
// <div className="flex items-baseline flex-col md:hidden justify-baseline absolute left-0 mt-10 ">
//     <div className="bg-blue-400 p-3 w-screen rounded-b-xl ">
// { tabs.map((entry) =>
// <p onClick={() =>




//     navigate(
//       entry == 'Test Center' ? '/join-test' :
//     entry == 'Questions' ? '/questions' :
//     entry ==
//  'Competency' ? "/join-test" : entry == 'Manager' ? '/test-manager' :  entry == 'Summary' ? '/summary' :
//  entry == 'Technical' ?  '/evaluation' : entry == 'Log Out' || entry == 'Log In' ? '/login' :
//  entry == 'Training Topics' ? '/training-topics' : entry == 'Assesment:' ? '': entry == 'Users' ? '/users' : "/performance-review")
// } className="font-inter  cursor-pointer text-white text-lg ml-4 mb-3">{entry}</p>
// )}
// </div>
// </div>
// }
   
// </div>
//         </nav>
//     )
// }




// export default Navigation;









