import { Route, Routes } from "react-router-dom";
import LandingPage from "../components/landingPage";
const RootRoutes = ()=>{
     return (
          <>
               <Routes>
                    <Route path="/" element={<LandingPage/>}/>
               </Routes>
          </>
     )
}

export default RootRoutes;