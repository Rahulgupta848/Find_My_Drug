import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { IoMdAlert } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import CButton from "../../../common/customButton";

type Props = {
     data:any
}

const DeleteModal:React.FC<Props> = ({data}) => {
     const [open, setOpen] = useState<boolean>(false);
     return (
          <>
               <div>
                    <Tooltip title='Delete'>
                         <MdOutlineDelete color="red" size={22} onClick={() => setOpen(true)} />
                    </Tooltip>
               </div>
               <Modal
                    open={open}
                    closeIcon={null}
                    footer={null}
                    width={400}
               >
                    <div className="flex gap-1 items-center">
                         <div className=""><IoMdAlert color="orange" size={26} /></div>
                         <div className="font-Roboto font-[500]">Are you sure you wants to delete this item?</div>
                    </div>
                    <div className="font-[700] font-Roboto text-[16px] flex justify-center mb-2">({data?.name})</div>
                    <div className="flex gap-2 justify-center mt-5 font-Roboto">
                         <CButton title="Delete" className="bg-[#d94d4d] rounded-3xl  px-5 w-[100px]" titleStyle="text-white" />
                         <CButton onClick={() => setOpen(false)} title="Cancel" className="border-[1px] border-green-900 rounded-3xl w-[100px]" />
                    </div>
               </Modal>
          </>

     )
}

export default DeleteModal;