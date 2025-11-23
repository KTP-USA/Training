import Navigation from "../components/Navigation";

import Footer from "../components/Footer";
import JoinTest from "../components/JoinTest";

const JoinTestPage = () => {
  return (
    <div className="h-screen  bg-gradient-to-r from-sky-50 to-blue-400 ">
      <Navigation />

      <JoinTest/>
      
      {/* <Form />
      <About />
    
      <Locations /> */}
       {/* <Footer /> */}
    </div>
  );
};

export default JoinTestPage;