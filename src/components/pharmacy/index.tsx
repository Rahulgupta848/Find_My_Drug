import CTable from "../../common/customTable";
import UpdateModal from "./actionModals/updateModal";
import DeleteModal from "./actionModals/deleteModal";
import { Pagination } from "antd";
import { pageState } from "../../redux/types";
import { useEffect, useState } from "react";
import CButton from "../../common/customButton";
import AddItemModal from "./actionModals/AddItemModal";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchPharmacyItems } from "../../redux/slices/pharmacySlice/pharmacySlice";

const PharmacyMainPage = () => {
     const dispatch = useAppDispatch();
     const { items, loading,itemCount } = useAppSelector((state) => state.pharmacy);
     const [pageData, setPageData] = useState<pageState>({
          pageNo: 1,
          pageSize: 10
     })
     const columns = [
          {
               title: 'Drug Name',
               dataIndex: 'drugName',
               key: 'name',
          },
          {
               title: 'Quantity',
               dataIndex: 'quantity',
               key: 'quantity',
               width: 200,
               render: (text: any) => {
                    return <div className="flex justify-center">{text}</div>
               }
          },
          {
               title: 'Availiblity Status',
               dataIndex: 'status',
               key: 'status',
               width: 200,
               render: (text: any, record: any) => {
                    return <div className="flex justify-center">
                         <div className={
                              record?.quantity > 0 ?
                                   "bg-green-600 text-white py-1 w-[100px] flex justify-center rounded-lg" :
                                   "bg-red-600 text-white py-1 w-[100px] flex justify-center rounded-lg"}>
                              {
                                   record?.quantity > 0 ? 'Available' : 'Not Available'
                              }
                         </div>
                    </div>
               }
          },
          {
               title: 'Action',
               dataIndex: 'action',
               key: 'action',
               width: 200,
               render: (text: any, record: any) => {
                    return <div className="flex justify-center gap-5 items-center">
                         <UpdateModal data={record} />
                         <DeleteModal data={record} />
                    </div>
               }
          }
     ]

     useEffect(() => {
          dispatch(fetchPharmacyItems());
     }, [])

     return (
          <div className="pt-[60px] px-3">

               <div className="flex justify-between items-center my-5">
                    <div className="flex items-center font-Roboto">
                         <input className="h-[40px] w-[300px] border-[1px] border-[#454444] outline-none rounded-l-3xl pl-5" placeholder="Enter Drug Name" />
                         <CButton title="Search" className="text-white bg-green-900 h-[40px] w-[100px] rounded-r-3xl" />
                    </div>
                    <div>
                         <AddItemModal />
                    </div>
               </div>

               <CTable data={items?.myDrugs || []} columns={columns} loading={loading} />
               <div className='flex justify-end py-2'>
                    <Pagination
                         current={pageData?.pageNo}
                         total={itemCount}
                         onChange={(e) => {
                              setPageData({
                                   ...pageData,
                                   pageNo: e
                              })
                         }}
                         showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
                         showSizeChanger={true}
                         onShowSizeChange={(e, i) => {
                              setPageData({
                                   ...pageData,
                                   pageSize: i
                              })
                         }}
                         pageSizeOptions={[10, 20, 50, 100]}
                    />
               </div>
          </div>
     )
}

export default PharmacyMainPage;
