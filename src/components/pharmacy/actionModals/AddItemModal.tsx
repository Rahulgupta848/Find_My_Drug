import { useState } from "react";
import CButton from "../../../common/customButton";
import { Modal, Spin } from "antd";
import CInput from "../../../common/customInput";
import { newDrugState } from "../../../redux/types";
import Apis from "../../../api";
import { useAppDispatch } from "../../../redux/store";
import { showMessage } from "../../../redux/slices/messageSlice/messageSlice";
import { handleError } from "../../../utils";
import { fetchPharmacyItems } from "../../../redux/slices/pharmacySlice/pharmacySlice";

const AddItemModal = () => {
     const [open, setOpen] = useState<boolean>(false);
     const [newItem, setNewItem] = useState<newDrugState>({
          name: "",
          quantity: 1,
          validate: false,
          loading: false
     })
     const dispatch =useAppDispatch();

     const handleSubmit = () => {
          setNewItem({ ...newItem, validate: true });
          if (!newItem.name || newItem.name.trim() === "" || !newItem.quantity) {
               return;
          }
          const payload = {
               "drugName": newItem?.name,
               "quantity": newItem?.quantity
          }
          setNewItem({ ...newItem, loading: true, validate: false });
          Apis.addDrugApi(payload).then((res) => {
               dispatch(showMessage({msg:res.data.message,show:true,error:false}));
               dispatch(fetchPharmacyItems());
               setOpen(false);
          }).catch((err) => {
               handleError(err.response.status,err.response.data.message,dispatch);
          }).finally(() => {
               setNewItem({ ...newItem, loading: false });
          })
     }

     return (
          <>
               <div>
                    <CButton onClick={() => setOpen(true)} title="Add Item" className=" bg-green-900 px-10 text-white rounded-3xl font-Roboto" />
               </div>
               <Modal
                    open={open}
                    footer={null}
                    closeIcon={null}

               >
                    <div className="relative">
                         <div className={newItem?.loading ? "opacity-50" : ""}>
                              <div className="font-Roboto">
                                   <div className="flex justify-between">
                                        <div className="font-[700] text-[22px]">
                                             Add Item
                                        </div>
                                        <div className="flex gap-2">
                                             <CButton onClick={handleSubmit} title="Add" className="bg-[green] rounded-3xl px-5 w-[100px]" titleStyle="text-white" />
                                             <CButton onClick={() => setOpen(false)} title="Cancel" className="border-[1px] border-green-900 rounded-3xl w-[100px]" />
                                        </div>
                                   </div>
                              </div>
                              <div className="mt-5">
                                   <div className="flex items-center">
                                        <div className="font-Roboto font-[700] w-[100px]">Drug Name : </div>
                                        <CInput
                                             value={newItem.name}
                                             placeholder="Enter Drug Name"
                                             width="100%"
                                             className="outline-none border-[2px] text-[black]"
                                             onChange={(e: any) => {
                                                  setNewItem({
                                                       ...newItem,
                                                       name: e.target.value
                                                  })
                                             }}
                                        />
                                   </div>
                                   {newItem?.validate && !newItem?.name && (<span className="err-msg">Field can not be empty.</span>)}

                                   <div className="flex justify-start items-center my-5">
                                        <div className="font-Roboto font-[700] w-[80px] ">Quantity : </div>
                                        <CInput
                                             value={newItem.quantity}
                                             placeholder="Enter Quantity"
                                             width="200px"
                                             type="number"
                                             min={1}
                                             className="outline-none border-[2px] text-[black]"
                                             onChange={(e: any) => {
                                                  setNewItem({
                                                       ...newItem,
                                                       quantity: e.target.value
                                                  })
                                             }}
                                        />
                                   </div>
                                   {newItem?.validate && !newItem?.quantity && (<span className="err-msg">Field can not be empty.</span>)}
                              </div>
                         </div>
                         {
                              newItem?.loading && (
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
export default AddItemModal;