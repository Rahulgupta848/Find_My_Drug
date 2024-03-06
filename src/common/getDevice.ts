import { useEffect, useState } from "react"

const useGetDevice = () => {
     const [view, setView] = useState<String>('mobile');
     useEffect(() => {
          const handleResize = () => {
               if (window.innerWidth > 500) {
                    setView(() => 'desktop')
               } else {
                    setView(() => 'mobile')
               }
          }

          window.addEventListener('resize', handleResize);

          return () => {
               window.removeEventListener('resize', handleResize);
          };
     }, []);

     return view;
}

export default useGetDevice;