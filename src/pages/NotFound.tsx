import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import {SearchX} from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
<div className="min-h-screen flex flex-col ">
  <Navigation></Navigation>
    <div className=" flex-1 flex items-center justify-center min-h-110 ">
      <div className="text-center flex items-center justify-center flex-col">
        <h1 className="text-9xl mb-4 text-blue-500 font-poppins font-extrabold">404</h1>
        <p className="text-3xl font-poppins  text-gray-900 mb-4 flex flex-row items-center gap-3">Page Not Found <SearchX 
        size={30}
        className="text-blue-500"></SearchX></p>
         <button 
   onClick={()=>{navigate('/')}}
   className="mt-3
   cursor-pointer
   text-white bg-blue-400 rounded-2xl font-normal text-xl font-poppins flex items-center justify-center py-3 px-9">
Home
   </button>
      </div>
    </div>
    
    <Footer></Footer>
    </div>
    
  );
};

export default NotFound;