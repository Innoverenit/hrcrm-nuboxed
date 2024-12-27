import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSuppliersDeletedList, emptysUPPLIERS ,deleteSupplierData,handleUpdateSupplierModal,setEditSuppliers} from "../SuppliersAction"

import dayjs from "dayjs";
import ApartmentIcon from '@mui/icons-material/Apartment';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CategoryIcon from '@mui/icons-material/Category';
import LinkIcon from '@mui/icons-material/Link';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { Link } from 'react-router-dom';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import { BundleLoader } from "../../../../Components/Placeholder";

const EmptyPage =lazy(()=>import("../../EmptyPage"));
const SupplierSearchedData =lazy(()=>import("./SupplierSearchedData"));
const ReInstateSuppliers =lazy(()=>import("../ReInstateSuppliers"));
function SuppliersDeletedCardList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});
  const [page, setPage] = useState(0);


  useEffect(() => {
    props.getSuppliersDeletedList();
  }, []);


  const handleRowData = (data) => {
    setrowData(data);
  };

  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
  }

  useEffect(() => {
    props.emptysUPPLIERS();
  }, []);

  if (props.fetchingSupplierDeletedList) {
    return <div><BundleLoader/></div>;
    }
  return (
    <>
     {props.searchSupplierList.length > 0 ? (
    <SupplierSearchedData
    searchSupplierList={props.searchSupplierList}
    translatedMenuItems={props.translatedMenuItems}
    />
  ) : (
      <div className=' flex  sticky  z-auto'>
        <div class="rounded m-1 max-sm:m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex ml-4 max-sm:hidden justify-between w-[98%]  p-1 bg-transparent font-bold font-poppins !text-lm sticky items-end max-lg:text-[0.45rem] max-xl:text-[0.65rem] z-10">
          <div className=" w-[8.3rem] truncate max-xl:text-[0.65rem] text-[#00A2E8]  max-xl:w-[10.9rem] text-sm"> 
               {/* Supplier ID */}
               <CategoryIcon className=" text-base"/> 
               {props.translatedMenuItems[40]} ID
               </div>
            <div className=" w-[12.9rem] truncate  "> <ApartmentIcon className="!text-icon text-[#4f5d75] "/>  {props.translatedMenuItems[0]}
              </div>
            <div className=" w-[9.8rem] truncate  ">
            <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/>  {props.translatedMenuItems[1]}
            </div>
            <div className=" w-[9.7rem] truncate   "> 
            <MailOutlineIcon className="!text-icon mr-1 text-[#4f5d75]"/> 
           Email
            </div>
               <div className=" w-[7.91rem] truncate   max-xl:w-[14.9rem] "> 
               {/* url */}
               <LinkIcon  className="!text-icon  text-[#4f5d75]"/>   {props.translatedMenuItems[41]}
               </div>
            <div className="w-[14.8rem] truncate  ">
           <AddLocationAltIcon className="!text-icon  text-[#4f5d75]"/> {props.translatedMenuItems[34]}

            </div>
           
            <div className="w-[13.9rem] truncate  ">
           <LocationCityIcon className="!text-icon  text-[#4f5d75]" /> {props.translatedMenuItems[35]}

            </div>
            <div className="w-[5.8rem] truncate  ">
            <LocationCityIcon className="!text-icon  text-[#4f5d75]" /> {props.translatedMenuItems[36]}

            </div>
            <div className="w-[5.81rem] truncate  "> <FlipCameraAndroidIcon className="!text-icon  text-[#4f5d75]" /> {props.translatedMenuItems[37]}</div>
            
          </div>
          <div class="overflow-x-auto h-[83vh]">
        
              {props.supplierDeletedList.length ?
                <>
                  {props.supplierDeletedList.map((item) => {
                    const currentdate = dayjs().format("DD/MM/YYYY");
                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                    return (
                      <>
                      <div
                  className="flex rounded md:flex row-auto py-ygap max-xl:text-[0.65rem] max-lg:text-[0.45rem]  max-sm:border-b-4 max-sm:border-blue-500 mt-1 bg-white  items-center max-sm:h-38  scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] max-sm:flex-col ">
                          <div class=" flex flex-row justify-between max-sm:flex-col">
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className="border-l-2 border-green-500 bg-[#eef2f9] h-8 flex items-center w-[8.5rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[10.1rem] max-lg:w-[8.06rem] ">
                          <div class=" text-xs ml-gap  font-poppins max-sm:text-sm max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            {item.newSuppNo}
                            
</div>


</div>
                            <div className=" h-8  ml-gap flex items-center w-[12.1rem] bg-[#eef2f9] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[9rem] max-lg:w-[7rem] ">
                              <div class=" font-semibold text-[0.85rem]  font-poppins">
                                <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm"
                                  to={`/supplier/${item.supplierId}`}
                                  title={`${item.shipperName}`}
                                >{item.name}</Link>
                              </div>
                          
                                  {date === currentdate ? (
                                    <div class="text-[0.65rem] text-[tomato] font-bold"
                                    >
                                      {/* New */} {props.translatedMenuItems[23]}
                                    </div>
                                  ) : null}
                            </div>
             
                            <div className=" flex items-center h-8 ml-gap bg-[#eef2f9] w-[8.12rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[9rem] max-lg:w-[7rem] ">
                              <div class=" font-normal text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {item.dialCode} {item.phoneNo}
                              </div>
                            </div>
                            </div>
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9] w-[9.26rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[9rem] max-lg:w-[7rem] ">

                              <div class="  text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {item.emailId}
                              </div>
                            </div>
                            <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[7.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-evenly  max-sm:flex-row ">


                              
</div>

                            <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9] w-[13.22rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[9rem] max-lg:w-[7rem] ">
                              <div class=" text-xs ml-gap font-poppins max-w-[25ch] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {`${(item.address && item.address.length && item.address[0].address1) || ""}
          ${(item.address && item.address.length && item.address[0].state) || ""}
          ${(item.address && item.address.length && item.address[0].street) || ""}`}
                              </div>

                            </div>
                            </div>
                            <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9]  w-[14.01rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[9rem] max-lg:w-[7rem] ">
                              <div class="  text-xs ml-gap  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {(item.address &&
                                  item.address.length &&
                                  item.address[0].city) ||
                                  ""}
                              </div>
                            </div>
                            <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9] w-[6.01rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[9rem] max-lg:w-[7rem] ">
                              <div class=" text-xs ml-gap  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {(item.address &&
                                  item.address.length &&
                                  item.address[0].postalCode) ||
                                  ""}
                              </div>                           
                            </div>
                            <div class="flex items-center w-[5.01rem] justify-center h-8 ml-gap bg-[#eef2f9]  text-xs max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            <Suspense fallback={<BundleLoader />}> <ReInstateSuppliers supplierId={item.supplierId} /></Suspense>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })}
                </> :
                !props.supplierDeletedList.length &&
                  !props.fetchingSupplierDeletedList ? <EmptyPage /> : null}
          </div>
        </div>
      </div>
)}
 <Suspense fallback={<BundleLoader />}>
    
      </Suspense>
    </>
  )
}
const mapStateToProps = ({ shipper, suppliers, auth }) => ({
    supplierDeletedList: suppliers.supplierDeletedList,
  userId: auth.userDetails.userId,
  fetchingSupplierDeletedList: suppliers.fetchingSupplierDeletedList,
  fetchingSupplierDeletedListError: suppliers.fetchingSupplierDeletedListError,
  updateShipperModal: shipper.updateShipperModal,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
  addShipperOrderModal: shipper.addShipperOrderModal,
  updateSupplierModal:suppliers.updateSupplierModal,
  searchSupplierList:suppliers.searchSupplierList
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getSuppliersDeletedList,
      emptysUPPLIERS,
      deleteSupplierData,
      setEditSuppliers,
      handleUpdateSupplierModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliersDeletedCardList);