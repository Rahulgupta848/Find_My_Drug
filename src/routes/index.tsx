import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LandingPage from "../components/landingPage";
import paths from "./rootRoutes";
import PharmacyMainPage from "../components/pharmacy";
import { useAppSelector } from "../redux/store";
const RootRoutes = () => {
     return (
          <>
               <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route element={<PrivateRoute rootRole={'PHARMACY'} />}>
                         <Route path={paths.PHARMACY} element={<PharmacyMainPage />} />
                    </Route>
               </Routes>
          </>
     )
}

export default RootRoutes;


export const PrivateRoute: React.FC<{ rootRole: string }> = ({ rootRole }) => {
     const user = useAppSelector((state) => state.user);
     return (
          <div>{
               user?.role === rootRole && user?.token ? <Outlet /> : <Navigate to={'/'} />
          }</div>
     )
}