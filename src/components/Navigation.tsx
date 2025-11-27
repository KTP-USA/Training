
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
    let userData: any = await supabase.from('users').select().eq('uid', session.data.session?.user.id);
    setLogIn(session.data.session?.user.id != null)
    let isLog = session.data.session?.user.id != null
    
        setTabs(
            
               !isLog  ?  [ 'Log In'] :  name.includes(`/test/`)  ?   [ 'Log Out'] :

            userData.data[0]['role'] == 'USER' ? 
            [ 'Test Center', 'History', 'Log Out'] :
            
           userData.data[0]['role'] == 'ADMIN' ? 
             userData.data[0]['trainer'] == 'Y' ?
             ['Users',  'Manager', 'Summary', 'Training Topics', 'Assesment:','Performance', 'Technical', 'Competency', 'Log Out']
             : 
               ['Users',  'Manager', 'Summary', 'Training Topics', 'Assesment:','Performance',  'Competency', 'Log Out']
            : 
                userData.data[0]['trainer'] == 'Y' ?
             [ 'Manager', 'Summary', 'Training Topics', 'Assesment:','Performance', 'Technical', 'Competency', 'Log Out']
             : 
            [  'Manager', 'Summary', 'Training Topics', 'Assesment:','Performance', 'Competency', 'Log Out']
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
<p onClick={()=>{navigate('/')}} className="text-white cursor-pointer font-bold text-xl ml-2 font-inter"> Kurz Training Module </p>
<div className="flex-1"></div>
<div className="flex flex-row gap-10 mr-10">
<div className="md:flex flex-row items-center hidden ">
    {tabs.map((entry) =>
<p onClick={() => {
    if (isLoggedIn && (entry == 'Log In' || entry=='Log Out')){
        supabase.auth.signOut();
    }
navigate(entry ==
 'Competency' ? "/join-test" : entry == 'Manager' ? '/test-manager' :  entry == 'Summary' ? '/summary' : 
 entry == 'Technical' ?  '/evaluation' : entry == 'Log Out' || entry == 'Log In' ? '/login' :
 entry == 'Training Topics' ? '/training-topics' : entry == 'Assesment:' ? '': entry == 'Users' ? '/users' : "/performance-review")}} className={` 
 
   cursor-pointer  text-lg ${ entry == 'Log Out' || entry == 'Log In' ?
     'bg-white/50 rounded-lg p-2 px-3 text-blue-500 font-bold font-poppins ml-8' 
     : entry == 'Technical' ||  entry == 
     'Performance' ? ' bg-white/30 p-2 px-3 m-0 text-blue-500 font-bold font-poppins ' 
     :
      entry=='Competency' ?' bg-white/30 p-2 px-3 m-0 text-blue-500 font-bold font-poppins rounded-r-lg': entry=='Assesment:' ? ' bg-white/30 p-2 px-3 m-0 text-blue-500 font-bold  rounded-l-lg font-poppins '
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
<p onClick={() => navigate(entry == 'Upcoming' ? "/upcoming" : entry == 'About' ? '/about' :  entry == 'Blog' ? '/blog' :"/explore")} className="font-inter  cursor-pointer text-white text-lg ml-4 mb-3">{entry}</p>
)}
</div>
</div>
}
    
</div>
        </nav>
    )
}

export default Navigation;
// import { Menu, X } from "lucide-react";
// import { useState } from "react";

// const Navigation = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({
//         behavior: "smooth",
//       });
//     }
//     setIsMenuOpen(false);
//   };

//   return (
//     <nav
//   className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-lg border-b border-white/60 "
//   style={{ backdropFilter: "blur(12px)" }}
// >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <h1 className="text-xl font-bold text-[hsl(var(--primary))]">
//               FlowLeanSolutions
//             </h1>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {["home", "features", "about", "pricing", "tutorials"].map(
//               (section) => (
//                 <button
//                   key={section}
//                   onClick={() => scrollToSection(section)}
//                   className="text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors"
//                 >
//                   {section == 'tutorials' ? 'Demo' : section.charAt(0).toUpperCase() + section.slice(1)}
//                 </button>
//               )
//             )}
//  <a
//   href="https://app.flowleansolutions.com/login"
//   target="_blank"
//   rel="noopener noreferrer"
//   className="inline-block rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 shadow-md transition duration-500 hover:from-blue-600 hover:to-blue-400 hover:shadow-lg 
//   "
// >
//   <div className="bg-background rounded-md px-1 py-0.2">
//     <button className="py-0.5 px-6 text-[1rem] text-white cursor-pointer">Sign In</button>
//   </div>
// </a>

  

//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))]"
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1 bg-[hsl(var(--background))] border-t border-[hsl(var(--border))]">
//               {["home", "features", "about", "tutorials"].map((section) => (
//                 <button
//                   key={section}
//                   onClick={() => scrollToSection(section)}
//                   className="block px-3 py-2 text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors w-full text-left"
//                 >
//                   {section == 'tutorials' ? 'Demo' : section.charAt(0).toUpperCase() + section.slice(1)}
//                 </button>
//               ))}
             
//               <div className="px-3 py-2">
//                 <a
//                 href="https://app.flowleansolutions.com/login"
//                 className="block px-3 py-2 text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))] transition-colors w-full text-left"
//               >
//                 Login
//               </a>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navigation;