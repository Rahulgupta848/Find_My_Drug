import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


type Props = {
     className?: string;
     title?: string;
     onClick?: () => void;
     loading?: boolean;
     disabled?:boolean;
}
const CButton: React.FC<Props> = ({ className, title, onClick, loading=false,disabled }) => {
     return (
          <button
               onClick={onClick}
               disabled={disabled}
               className={`${className} w-[100%] h-[40px] font-bold `}
          >
               <div className='flex items-center justify-center gap-2'>
                    {loading && (<Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: 'black' }} spin />} />)}
                    <div>{title}</div>
               </div>
          </button>
     )
}

export default CButton;