import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getAllSuppliersList,emptysUPPLIERS,deleteSupplierData,handleUpdateSupplierModal,setEditSuppliers,handleSuppliersAddress } from "../SuppliersAction"
import StoreIcon from '@mui/icons-material/Store';
import {Popconfirm,Tooltip } from "antd";
import dayjs from "dayjs";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import InfiniteScroll from "react-infinite-scroll-component";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import UpdateSupplierModal from "./UpdateSupplierModal";
import { DeleteOutlined } from "@ant-design/icons";
import SupplierSearchedData from "./SupplierSearchedData";

import { MultiAvatar, MultiAvatar2 } from "../../../../Components/UI/Elements";

import AddSuppliersAdressModal from "./AddSuppliersAdressModal";

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
    translateText={props.translateText}
    selectedLanguage={props.selectedLanguage}
    translatedMenuItems={props.translatedMenuItems}
    />
  ) : (
    <div className=" flex">
    <div className=' flex rounded w-[13vw] h-[85vh] flex-col border border-[#0000001f] items-center justify-center  '>
    <div class="flex rounded w-[92%] m-1 p-1 box-content border border-[#0000001f] h-6 bg-[#eaedf1] mt-1  items-center shadow-[#a3abb980] ">
     <div> Search team Member</div>
      </div>
      <div class="flex rounded w-[92%]  p-1 h-[73vh] box-content border bg-[#eaedf1] mt-1 border-[#0000001f]   shadow-[#a3abb980]">
       <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[4.8rem] 
                text-[#444444] m-1 w-[11.5vw] max-sm:w-wk flex flex-col scale-[0.99] hover:scale-100 ease-in duration-100   border-solid  p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
      <div class="flex items-center flex-no-wrap h-16">
        <div class=" flex basis-[15%] mr-[0.2rem] h-15" >
          <MultiAvatar
            // primaryTitle={item.opportunityName}
            // imageId={item.imageId}
            imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
          />
        </div>
        
        <div class="flex basis-[100%] overflow-hidden">
        
        <div class="font-semibold text-[#337df4] cursor-pointer text-xs " >
      
  Itisri Chaudhury

      </div> 
      </div>
        
     
      </div>
      <div className="flex flex-col max-sm:justify-between ">
        
            <div class="overflow-hidden text-ellipsis cursor-pointer text-xs flex items-center">
              97886556738              </div>
          
        <div>
        <div class="font-medium text-xs ">
     
            <div class="overflow-hidden  text-ellipsis cursor-pointer text-xs flex items-center">
             itisrichudhuryiti@gmail.com
            </div>
         
          
        </div>
        </div>
        </div>
        
    
     
    </div>

      </div>
      </div>
<div className=' flex  sticky  z-auto'>
<div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
<div className=" flex max-sm:hidden ml-4 justify-between w-[99%]  p-1 bg-transparent font-bold font-poppins text-xs sticky  z-10">
<div className=" w-[3.91rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[14.9rem] "> 
               {/* Supplier ID */}
               {props.translatedMenuItems[40]} ID
               </div>
            <div className=" w-[3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.8rem]">  {props.translatedMenuItems[0]}</div>
            <div className=" w-[3.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.8rem]">
            {props.translatedMenuItems[1]}
            </div>
            <div className=" w-[3.92rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[14.9rem] ">  {props.translatedMenuItems[2]}</div>  
            <div className=" w-[3.94rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[14.9rem] "> 
               {/* Supplier ID */}
               {props.translatedMenuItems[41]}
               </div>   
          <div className=" w-[8.91rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[14.9rem] ">Owner</div>
          </div>
        <InfiniteScroll
        dataLength={props.allSupplierList.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingSupplierList?<div class="text-center font-semibold text-xs">{props.translatedMenuItems[10]}...</div>:null}
        height={"83vh"}
        style={{scrollbarWidth:"thin"}}
      >
{props.allSupplierList.map((item) => {
    const currentdate = dayjs().format("DD/MM/YYYY");
    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
  return (
    <>
        <div
                  className="flex  rounded justify-between bg-white  items-center py-1   max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:h-[6rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                          <div class=" flex flex-row justify-between  w-wk max-sm:flex-col">
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className="border-l-2 border-green-500 bg-[#eef2f9] h-8 flex items-center w-[7.5rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[10.1rem] max-lg:w-[8.06rem] ">
                          <div class=" text-xs ml-gap font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            {item.newSuppNo}
                            
</div>


</div>
                            <div className=" h-8 flex items-center ml-gap w-[14.5rem] bg-[#eef2f9] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[10.1rem] max-lg:w-[8.06rem] ">
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
                            </div>      
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">             
                            <div className=" flex items-center h-8 ml-gap bg-[#eef2f9] w-[8.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[5.01rem] max-lg:w-[5.9rem] ">
                              <div class="  text-xs ml-gap font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-sm">
                                {item.dialCode} {item.phoneNo}
                              </div>

                            </div>
                                                    
                            <div className=" flex items-center h-8 ml-gap bg-[#eef2f9] w-[12.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[12.03rem] max-lg:w-[9.84rem] ">
                                <div class="  text-xs ml-gap font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-sm">
                                {item.emailId}
                              </div>
                            </div>
                                                        <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[17.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-evenly  max-sm:flex-row ">

{/* URL */}
                              
</div>
                     
                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.5rem] max-lg:w-[2rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">                    
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
                           </div>
                           
                            <div class="flex max-sm:justify-evenly max-sm:w-wk items-center justify-end h-8 ml-gap bg-[#eef2f9]">
                            <div>
<Tooltip title={props.translatedMenuItems[18]}>
<StoreIcon
                            className="!text-icon cursor-pointer text-[#ff66b3] max-sm:!text-2xl"
                            // onClick={() => {
                            //    props.setEditSuppliers(item);
                            //   handleRowData(item);
                            //   props.handleSuppliersPriceDrawer(true);
                            // }}
                          />
          </Tooltip>
          </div>    
          <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0] max-sm:!text-2xl"
          onClick={() => {
            props.handleSuppliersAddress(true);
            handleRowData(item);
          }}
          
        />            
 <div>
<Tooltip title={props.translatedMenuItems[19]}>
            <BorderColorIcon
             className="!text-icon cursor-pointer text-[tomato] max-sm:!text-2xl"
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
className=" !text-icon cursor-pointer text-[red] max-sm:!text-2xl"
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
  </div>
 )}
  <UpdateSupplierModal
        rowdata={rowdata}
        updateSupplierModal={props.updateSupplierModal}
        handleRowData={handleRowData}
        handleUpdateSupplierModal={props.handleUpdateSupplierModal}
        translatedMenuItems={props.translatedMenuItems}
      />
       <AddSuppliersAdressModal    
        item={rowdata}
         type="supplier"
         addSuppliersAddressModal={props.addSuppliersAddressModal}
         handleSuppliersAddress={props.handleSuppliersAddress}
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
  searchSupplierList:suppliers.searchSupplierList,
  addSuppliersAddressModal: suppliers.addSuppliersAddressModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllSuppliersList,
      emptysUPPLIERS,
      deleteSupplierData,
      setEditSuppliers,
      handleUpdateSupplierModal,
      handleSuppliersAddress
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllSuppliersCardList);