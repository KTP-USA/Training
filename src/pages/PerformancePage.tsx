import Navigation from "../components/Navigation";

import Footer from "../components/Footer";
import PerformanceReview from "../components/performancereview";

const PerformancePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <PerformanceReview/>
      {/* <Form />
      <About />
    
      <Locations /> */}
       {/* <Footer /> */}
    </div>
  );
};

export default PerformancePage;