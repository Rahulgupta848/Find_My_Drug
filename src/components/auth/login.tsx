import Images from "../../assets";
import CInput from "../../common/customInput";
import { loginState } from "../../redux/types";
import { useState } from "react";
import CButton from "../../common/customButton";
import Apis from "../../api";
import { useAppDispatch } from "../../redux/store";
import { showMessage } from "../../redux/slices/messageSlice/messageSlice";
import { setJwtToken } from "../../api/apiServices";
import constants from "../../common/constants";
import { userDetails } from "../../redux/slices/authSlice/authSlice";
import paths from "../../routes/rootRoutes";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
     const [loginData, setLoginData] = useState<loginState>({
          email: "",
          password: "",
          rememberMe: false,
          loading: false,
          validate: false,
          role: ""
     })
     const dispatch = useAppDispatch();
     const navigate = useNavigate();
     const handleSubmit = async () => {
          setLoginData({ ...loginData, validate: true });
          if (!loginData.email || loginData.email.trim() === "" ||
               !loginData.password || loginData.password.trim() === "" ||
               !loginData.role || loginData.role.trim() === ""
          ) {
               return;
          }

          setLoginData({ ...loginData, loading: true, validate: false });
          const payload = {
               email: loginData?.email,
               password: loginData?.password,
               role: loginData?.role
          }
          try {
               const result = await Apis.loginApi(payload)
               const res = result?.data;
               if (res?.success) {
                    dispatch(showMessage({ msg: res?.message, error: false, show: true }));
                    dispatch(userDetails(res?.data));
                    setJwtToken(res?.data?.token);

                    if (loginData?.rememberMe) {
                         localStorage.setItem(constants.TOKEN, res?.data?.token);
                         localStorage.setItem(constants.USER, res?.data);
                    } else {
                         sessionStorage.setItem(constants.TOKEN, res?.data?.token);
                         sessionStorage.setItem(constants.USER, res?.data);
                    }

                    if (res?.data?.role === constants.PHARMACY) {
                         navigate(paths.PHARMACY, { replace: true })
                        //document.location.replace(paths.PHARMACY);
                    }
               }
          } catch (error: any) {
               const res = error?.response?.data
               dispatch(showMessage({ msg: res?.message, error: true, show: true }));
          }


          setLoginData({ ...loginData, loading: false });
     }

     return (
          <div className="bg-transparent flex flex-col items-center justify-center">
               <div className="mt-7">
                    <img width={100} src={Images.logo} alt="" />
               </div>
               <div className="mt-8 flex gap-5  px-7">
                    <div className="flex gap-2 items-center text-white font-Ultra text-[14px]">
                         <input
                              className="custom-radio"
                              type="radio"
                              id="role"
                              name="role"
                              value="CUSTOMER"
                              defaultChecked={loginData?.role === 'CUSTOMER' ? true : false}
                              onClick={() => setLoginData({ ...loginData, role: 'CUSTOMER' })}
                         />
                         <div>Customer</div>
                    </div>
                    <div className="flex gap-2 items-center text-white font-Ultra text-[14px]">
                         <input
                              className="custom-radio"
                              type="radio"
                              id="role"
                              name="role"
                              value="PHARMACY"
                              defaultChecked={loginData?.role === 'PHARMACY' ? true : false}
                              onClick={() => setLoginData({ ...loginData, role: 'PHARMACY' })}
                         />
                         <div>Pharmacy</div>
                    </div>
               </div>
               {loginData?.validate && !loginData?.role && (<span className="err-msg">Select either of the options.</span>)}

               <div className="mt-5 w-[100%]  lg:max-w-[600px]">
                    <CInput
                         title="Email"
                         value={loginData.email}
                         placeholder="Enter your Email"
                         onChange={(e: any) => {
                              setLoginData({
                                   ...loginData,
                                   email: e.target.value
                              })
                         }}
                    />
               </div>
               {loginData?.validate && !loginData?.email && (<span className="err-msg">Please enter email.</span>)}

               <div className="mt-5 w-[100%]  lg:max-w-[600px]">
                    <CInput
                         title="Password"
                         value={loginData.password}
                         placeholder="Enter your Password"
                         type="password"
                         onChange={(e: any) => {
                              setLoginData({
                                   ...loginData,
                                   password: e.target.value
                              })
                         }}
                    />
               </div>
               {loginData?.validate && !loginData?.password && (<span className="err-msg">Please enter password.</span>)}

               <div className="mt-10 w-[100%] px-5 lg:max-w-[600px]">
                    <CButton
                         title="Login"
                         className={loginData?.loading ? `bg-[#277e1f] text-green-950 rounded-3xl` : `bg-[#5cfd4d] text-green-950 rounded-3xl`}
                         loading={loginData?.loading}
                         disabled={loginData?.loading}
                         onClick={handleSubmit}
                    />
               </div>
               <div className="mt-2 p-5 w-[100%]  lg:max-w-[600px]">
                    <div className=" border-t-[0.1px] flex justify-center pt-2 underline text-[#bbb7b7]">
                         Forgot Password?
                    </div>
               </div>
          </div>
     )
}
export default Login;