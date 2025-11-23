
import Navigation from "../components/Navigation";
import {SearchX} from "lucide-react";

const NotFound = () => {

  return (
<div className="min-h-screen flex flex-col ">
  <Navigation></Navigation>
    <div className=" flex-1 flex items-center justify-center min-h-110 ">
      <div className="text-center flex items-center justify-center flex-col">
        <h1 className="text-9xl mb-4 text-blue-500 font-poppins font-extrabold">404</h1>
        <p className="text-3xl font-poppins  text-gray-900 mb-4 flex flex-row items-center gap-3">Page Not Found <SearchX 
        size={30}
        className="text-blue-500"></SearchX></p>
      
      </div>
    </div>
    
  
    </div>
    
  );
};

export default NotFound;