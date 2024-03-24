import constants from "../common/constants";
import { removeUserDetails } from "../redux/slices/authSlice/authSlice";
import { showMessage } from "../redux/slices/messageSlice/messageSlice";


export const handleError = (status:number,msg:string,dispatch:any)=>{
     if(status === 403) {
          localStorage.removeItem(constants.TOKEN);
          sessionStorage.removeItem(constants.TOKEN);
          localStorage.removeItem(constants.USER);
          sessionStorage.removeItem(constants.USER);
          dispatch(removeUserDetails());
          document.location.replace('/');
          dispatch(showMessage({msg:msg,show:true,error:true}));
     }else{
          dispatch(showMessage({msg:msg,show:true,error:true}));
     }
}