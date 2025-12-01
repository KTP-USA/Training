
import NotFound from "./pages/NotFound";
import TestPage from "./pages/TestPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Main";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ManageTestPage from "./pages/ManageTestPage";
import JoinTestPage from "./pages/JoinTestPage";
import LogInPage from "./pages/LogInPage";
import PerformancePage from "./pages/PerformancePage";
import EvaluationPage from "./pages/EvaluationPage";
import TrainerPage from "./pages/TrainerPage";
import SummaryPage from "./pages/SummaryPage";
import UsersPage from "./pages/UserPage";
import SopsPage from "./pages/SopPage";
import QuestionsPage from "./pages/QuestionsPage";
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  }, [pathname]);

  return null;
}


const App = () => (
 
      <BrowserRouter basename="/Training">
      <ScrollToTop></ScrollToTop>
        <Routes>
          <Route path="/" element={<LogInPage/>} />
             <Route path='/training-topics' element={<TrainerPage/>}/>
             <Route  path='/questions' element={<QuestionsPage/>}></Route>
                <Route  path='/sops' element={<SopsPage/>}></Route>
        <Route path='/join-test' element={<JoinTestPage></JoinTestPage>}/>
          <Route path='/evaluation' element={<EvaluationPage/>}/>
           <Route path='/users' element={<UsersPage/>}/>  
          <Route path="/performance-review" element={<PerformancePage/>}></Route>
          <Route path="/login" element={<LogInPage/>}/>
              <Route path="/summary" element={<SummaryPage/>}/>
        <Route path='/manager' element={<Index></Index>}></Route>
        <Route path= '/test/:code' element={<TestPage></TestPage>}></Route>
            <Route path= '/test-manager' element={<ManageTestPage/>}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
);

export default App;
