import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getAllSuppliersList,emptysUPPLIERS,deleteSupplierData,handleUpdateSupplierModal,setEditSuppliers } from "../SuppliersAction"
import StoreIcon from '@mui/icons-material/Store';
import {Popconfirm,Tooltip } from "antd";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import UpdateSupplierModal from "./UpdateSupplierModal";
import { DeleteOutlined } from "@ant-design/icons";
import SupplierSearchedData from "./SupplierSearchedData";
import { MultiAvatar2 } from "../../../../Components/UI/Elements";

function AllSuppliersCardList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(page + 1);
    props.getAllSuppliersList(props.orgId,page);
  }, []);

  const handleRowData = (data) => {
    setrowData(data);
  };

  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
  }
  const handleLoadMore = () => {
    const PageMapd = props.allSupplierList && props.allSupplierList.length &&props.allSupplierList[0].pageCount
    setTimeout(() => {
      const {
        getAllSuppliersList,
        orgId
      } = props;
      if  (props.allSupplierList)
      {
        if (page < PageMapd) {
          setPage(page + 1);
          getAllSuppliersList(orgId, page);
      }
      if (page === PageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };

return(
<>
{props.searchSupplierList.length > 0 ? (
    <SupplierSearchedData
    searchSupplierList={props.searchSupplierList}
    translatedMenuItems={props.translatedMenuItems}
    />
  ) : (
<div className=' flex  sticky  z-auto'>
<div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
<div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
            <div className=" w-[10.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.8rem]">  {props.translatedMenuItems[0]}</div>
            <div className=" w-[10.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.8rem]">
            {props.translatedMenuItems[1]}
            </div>
            <div className=" w-[8.91rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[14.9rem] ">  {props.translatedMenuItems[2]}</div>
            {/* <div className="w-[15.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[15.9rem]">
             Address
               {props.translatedMenuItems[34]}

            </div>
            <div className="w-[10.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.5rem]">
            City
              {props.translatedMenuItems[35]}
            </div> */}
          
            <div class=" w-[22rem]">Owner</div>
          </div>
        <InfiniteScroll
        dataLength={props.allSupplierList.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingSupplierList?<div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]}...</div>:null}
        height={"80vh"}
        style={{scrollbarWidth:"thin"}}
      >
{props.allSupplierList.map((item) => {
    const currentdate = dayjs().format("DD/MM/YYYY");
    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
  return (
    <>
        <div
                  className="flex  rounded justify-between bg-white mt-1 h-8 items-center p-1  max-sm:h-[6rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                          <div class=" flex flex-row justify-between mt-1 w-wk max-sm:flex-col">
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className="font-medium  flex items-center w-[18.5rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[10.1rem] max-lg:w-[8.06rem] ">
                              <div >
                              <a class="overflow-ellipsis whitespace-nowrap h-8 p-1 text-[#042E8A] text-xs  underline font-bold font-poppins cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm" 
                            href={`supplier/${item.supplierId}`}>{item.name}</a>
                              </div>
                          
                                  {date === currentdate ? (
                                    <div class="text-[0.65rem]  text-[tomato] font-bold"
                                    >
                                      {/* New */}               {props.translatedMenuItems[23]}
                                    </div>
                                  ) : null}
                            </div>                          
                            <div className=" flex  w-[7.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[5.01rem] max-lg:w-[5.9rem] ">
                              <div class="  text-xs  font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-sm">
                                {item.dialCode} {item.phoneNo}
                              </div>

                            </div>
                            </div>
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className=" flex  w-[18.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[12.03rem] max-lg:w-[9.84rem] ">
                                <div class="  text-xs  font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-sm">
                                 {item.emailId}
                              </div>
                            </div>
                            <div className=" flex w-20 max-lg:w-[2rem] max-sm:w-auto max-sm:flex-row  mb-1 max-sm:justify-between ">
                     


                     <Tooltip title={item.userName}>
                 <span>
                   <MultiAvatar2
                     primaryTitle={item.userName}
                     imageId={item.ownerImageId}
                       imageURL={item.imageURL}
                       imgWidth={"1.8rem"}
                       imgHeight={"1.8rem"}
                     />
                   </span>
                     </Tooltip>
                           </div>
                            {/* <div className=" flex  w-[16.22rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[10.04rem] max-lg:w-[10.03rem] ">
                              <div class="  text-xs  font-poppins max-w-[25ch] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {`${(item.address && item.address.length && item.address[0].address1) || ""}
          ${(item.address && item.address.length && item.address[0].state) || ""}
          ${(item.address && item.address.length && item.address[0].street) || ""}  ${(item.address && item.address.length && item.address[0].postalCode) || ""}`}
                              </div>
                            </div> */}
                            </div>
                            {/* <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className=" flex w-[13.01rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[8.05rem] max-lg:w-[6.02rem] ">

                              <div class="  text-xs  font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-sm">
                                {(item.address &&
                                  item.address.length &&
                                  item.address[0].city) ||
                                  ""}
                              </div>
                            </div>                       
                            </div> */}
                            <div class="flex max-sm:justify-end max-sm:w-wk items-center">
                            <div>
<Tooltip title={props.translatedMenuItems[18]}>
<StoreIcon
                            className="!text-icon cursor-pointer text-[red]"
                            // onClick={() => {
                            //    props.setEditSuppliers(item);
                            //   handleRowData(item);
                            //   props.handleSuppliersPriceDrawer(true);
                            // }}
                          />
          </Tooltip>
          </div>            
 <div>
<Tooltip title={props.translatedMenuItems[19]}>
            <BorderColorIcon
             className="!text-icon cursor-pointer text-[tomato]"
              onClick={() => {
                 props.setEditSuppliers(item);
                handleRowData(item);
                props.handleUpdateSupplierModal(true);            
              }}
            />
          </Tooltip>
          </div>
          <div>
          <Popconfirm
              title={`${props.translatedMenuItems[22]} ?`}
             onConfirm={() => props.deleteSupplierData(item.supplierId)}
            >
              <DeleteOutlined
className=" !text-icon cursor-pointer text-[red]"
              />
            </Popconfirm>
            </div>
            </div> 
            </div>
           </div>
    </>
  )
})}
</InfiniteScroll>
  </div>
  </div>
 )}
  <UpdateSupplierModal
        rowdata={rowdata}
        updateSupplierModal={props.updateSupplierModal}
        handleRowData={handleRowData}
        handleUpdateSupplierModal={props.handleUpdateSupplierModal}
        translatedMenuItems={props.translatedMenuItems}
      />
</>
)
}
const mapStateToProps = ({ shipper, suppliers,auth }) => ({
  allSupplierList: suppliers.allSupplierList,
  userId: auth.userDetails.userId,
  fetchingSupplierList: suppliers.fetchingSupplierList,
  fetchingSupplierListError: suppliers.fetchingSupplierListError,
  updateShipperModal: shipper.updateShipperModal,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
  addShipperOrderModal: shipper.addShipperOrderModal,
  orgId:auth.userDetails.organizationId,
  updateSupplierModal:suppliers.updateSupplierModal,
  searchSupplierList:suppliers.searchSupplierList
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllSuppliersList,
      emptysUPPLIERS,
      deleteSupplierData,
      setEditSuppliers,
      handleUpdateSupplierModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllSuppliersCardList);