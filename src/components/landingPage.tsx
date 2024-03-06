import { useState } from "react";
import Login from "./auth/login";
import SignUp from "./auth/signup";
import { Carousel } from "antd";
import Images from "../assets";

const LandingPage = () => {
     const [authType, setAuthType] = useState<string>('login');
     return (
          <div className=" md:flex flex-row-reverse">
               <div className="pt-[60px] min-h-screen bg-gradient-to-b from-[#25294a] to-[#375b4a] md:w-1/2">
                    <div className="flex justify-center mt-2 cursor-pointer">
                         <div className="flex justify-center bg-transparent p-1 rounded-lg border-[1px]">
                              <div className={authType === 'login' ? `py-2 px-10 rounded-lg font-Ultra text-white bg-green-900` : `py-2 px-10 rounded-lg font-Ultra text-white bg-transparent`}
                                   onClick={() => setAuthType('login')}
                              >
                                   Login
                              </div>
                              <div className={authType === 'signup' ? `py-2 px-10 rounded-lg font-Ultra text-white bg-green-900` : `py-2 px-10 rounded-lg font-Ultra text-white bg-transparent`}
                                   onClick={() => setAuthType('signup')}
                              >
                                   SignUp
                              </div>
                         </div>
                    </div>
                    {
                         authType === 'login' ? (<Login />) : (<SignUp setAuthType={setAuthType} />)
                    }
               </div>
               <div className="hidden md:block w-1/2 mt-[60px]">
                    <Carousel className="z-1" autoplay autoplaySpeed={3000} speed={1000}>
                         <div className="h-screen w-[100%]">
                              <img style={{ objectFit: 'cover' }} src={`${Images.bmed3}`} />
                         </div>
                         <div className="h-screen w-[100%]">
                              <img style={{ objectFit: 'cover' }} src={`${Images.bmed4}`} />
                         </div>
                         <div className="h-screen w-[100%]">
                              <img style={{ objectFit: 'cover' }} src={`${Images.bmed2}`} />
                         </div>
                    </Carousel>
               </div>
          </div>
     )
}

export default LandingPage;