import {Mail, Phone} from "lucide-react";
const Footer = () => {
    return (
<div className="w-full   bg-gray-700 p-10">
    <div className="flex md:flex-row flex-col gap-2  mb-2">
        <div className="flex flex-col ">
    <p className="text-blue-400 font-extrabold text-lg font-inter">Our Mission</p>
    <p className="text-white mt-2 text-sm font-poppins">This website's mission is to make local resources easy to find and accessible for everyone. 
        <br/>
        We highlight programs, services, and opportunities in the community <br/>so residents can connect, get support, and thrive.</p>
        </div>
        <div className="flex flex-1"></div>
        <div className="flex flex-col "> 
       <p className="text-blue-400 font-extrabold text-lg font-inter">Connect</p>
       <div className="flex mt-3 gap-2 flex-row text-white font-poppins">
        <Mail size={20}/> contact@WSCommunityHub.com
       </div>
       <div className="flex mt-3  gap-2 flex-row text-white font-poppins">
        <Phone size={20}/> 123 (456) 789
       </div>
       </div>
       </div>
</div>

    );
}

export default Footer;