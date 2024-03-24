
type Props = {
     title?: string;
     type?: string;
     className?: string;
     width?: string;
     placeholder?: string;
     value?: string | number;
     onChange?: any;
     min?:number;
}

const CInput: React.FC<Props> = ({ title, type, className, width, placeholder, value, onChange,min }) => {
     return (
          <div style={{ width: width }} className="px-5">
               <div className="text-[12px] text-white pl-2 font-Ultra">{title}</div>
               <input
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`rounded-3xl h-[40px] bg-transparent border-[1px] ${className} text-white w-[100%] px-5`}
                    type={type}
                    min={min}
                    >
               </input>
          </div>
     )
}

export default CInput;