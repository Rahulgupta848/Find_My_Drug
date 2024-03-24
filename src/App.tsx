import { useLocation, useNavigate } from "react-router-dom"
import Apis from "./api"
import NavBar from "./common/NavBar"
import constants from "./common/constants"
import Message from "./common/message"
import { userDetails } from "./redux/slices/authSlice/authSlice"
import { useAppDispatch } from "./redux/store"
import RootRoutes from "./routes"
import { useEffect } from "react"
import { setJwtToken } from "./api/apiServices"
import { handleError } from "./utils"

function App() {
  const dispatch = useAppDispatch();
  const naviagte = useNavigate();
  const location = useLocation();
  const fetchUser = async () => {
    try {
      const token = await localStorage.getItem(constants.TOKEN) || await sessionStorage.getItem(constants.TOKEN);
      if (token) {
        setJwtToken(token);
        const data = await Apis.fetchUser();
        dispatch(userDetails(data?.data?.data));
        naviagte(location.pathname);
      } else {
        naviagte('/');
      }
    } catch (error: any) {
      handleError(error?.response?.status, error?.response?.data?.message, dispatch);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <div className="">
      <Message />
      <NavBar />
      <RootRoutes />
    </div>
  )
}

export default App
