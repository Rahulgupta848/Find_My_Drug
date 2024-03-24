import { Modal, Spin, Tooltip } from "antd";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import CButton from "../../../common/customButton";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import Apis from "../../../api";
import { useAppDispatch } from "../../../redux/store";
import { showMessage } from "../../../redux/slices/messageSlice/messageSlice";
import { fetchPharmacyItems } from "../../../redux/slices/pharmacySlice/pharmacySlice";
import { handleError } from "../../../utils";

type Props = {
     data: any;
}

const UpdateModal: React.FC<Props> = ({ data }) => {
     const [open, setOpen] = useState<boolean>(false);
     const [quantity, setQuantitiy] = useState<number>(data?.quantity || 0);
     const [loading, setLoading] = useState<boolean>(false);
     const dispatch = useAppDispatch();


     const updateItem = async () => {
          if (quantity) {
               const payload = {
                    "drugId": data?._id,
                    "quantity": quantity
               }
               setLoading(true);
               Apis.updatePharmacyItem(payload).then((res) => {
                    dispatch(showMessage({ msg: res.data.message, show: true, error: false }));
                    dispatch(fetchPharmacyItems());
                    setOpen(false);

               }).catch((err) => {
                    handleError(err.response.status, err.response.data.message, dispatch);
               }).finally(() => setLoading(false))
          }
     }

     return (
          <>
               <div onClick={() => setOpen(true)}>
                    <Tooltip title='Edit'>
                         <FiEdit color="grey" size={20} />
                    </Tooltip>
               </div>
               <Modal
                    open={open}
                    footer={null}
                    className=""
                    closeIcon={null}
               >
                    <div className="font-Roboto relative">
                         <div className={loading ? "opacity-50" : ""}>
                              <div className="flex justify-between">
                                   <div className="font-[700] text-[22px]">
                                        Edit
                                   </div>
                                   <div className="flex gap-2">
                                        <CButton onClick={()=> updateItem()} title="Update" className="bg-[green] rounded-3xl px-5 w-[100px]" titleStyle="text-white" />
                                        <CButton onClick={() => setOpen(false)} title="Cancel" className="border-[1px] border-green-900 rounded-3xl w-[100px]" />
                                   </div>
                              </div>
                              <div className="my-5">
                                   <div className="border-t-[1px] border-t-[#c7c1c1] flex justify-between px-2 items-center">
                                        <div className="py-3 font-[700] w-[70px] border-r-[1px] border-r-[#c7c1c1]">Name </div>
                                        <div className=" grow flex justify-center font-[700]">{data?.drugName}</div>
                                   </div>
                                   <div className="border-y-[1px] border-y-[#c7c1c1] flex justify-between px-2 items-center">
                                        <div className="py-3 font-[700] w-[70px] border-r-[1px] border-r-[#c7c1c1]">Quantity </div>
                                        <div className=" grow flex justify-center items-center font-[700] gap-5">

                                             <CiCircleMinus size={24} className="mt-1 cursor-pointer" onClick={() => setQuantitiy(quantity - 1)} />
                                             <span className="text-[22px]">{quantity}</span>
                                             <CiCirclePlus size={24} className="mt-1 cursor-pointer" onClick={() => setQuantitiy(quantity + 1)} />

                                        </div>
                                   </div>
                              </div>
                         </div>
                         {
                              loading && (
                                   <div>
                                        <Spin className="absolute top-[50%] left-[50%] -translate-x-[50%]" />
                                   </div>
                              )
                         }
                    </div>

               </Modal>
          </>
     )
}

export default UpdateModal;