import Navigation from "../components/Navigation";

import Questions from "../components/questions";

const QuestionsPage = () => {
  return (
    <div className="h-screen  bg-gradient-to-r from-sky-50 to-blue-400 ">
      <Navigation />
      <Questions/>
      {/* <Form />
      <About />
    
      <Locations /> */}
       {/* <Footer /> */}
    </div>
  );
};

export default QuestionsPage;