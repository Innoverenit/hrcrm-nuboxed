import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSuppliersDeletedList, emptysUPPLIERS ,deleteSupplierData,handleUpdateSupplierModal,setEditSuppliers} from "../SuppliersAction"
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import UpdateSupplierModal from "./UpdateSupplierModal";
import { BundleLoader } from "../../../../Components/Placeholder";
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
        <div class="rounded m-1 max-sm:m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex ml-4 max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold font-poppins text-xs sticky  z-10">
            <div className=" w-[13.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">  {props.translatedMenuItems[0]}
              </div>
            <div className=" w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            {props.translatedMenuItems[1]}
            </div>
            <div className=" w-[13.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] "> 
               <FormattedMessage id="app.email" defaultMessage="Email" /></div>
            <div className="w-[14.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            {props.translatedMenuItems[34]}

            </div>
            <div className="w-[7.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            {props.translatedMenuItems[35]}

            </div>
            <div className="w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
            {props.translatedMenuItems[36]}

            </div>
            <div className="w-[5.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">  {props.translatedMenuItems[37]}</div>
          </div>
          <div class="overflow-x-auto h-[85vh]">
        
              {props.supplierDeletedList.length ?
                <>
                  {props.supplierDeletedList.map((item) => {
                    const currentdate = dayjs().format("DD/MM/YYYY");
                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                    return (
                      <>
                      <div
                  className="flex  rounded justify-between bg-white mt-1 h-8 items-center p-1  max-sm:h-[7rem] max-sm:rounded-lg  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500 max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
                          <div class=" flex flex-row justify-between w-wk max-sm:flex-col">
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className="font-medium  flex items-center w-[16.1rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[9rem] max-lg:w-[7rem] ">
                              <div class=" font-semibold text-[0.85rem]  font-poppins">
                                <Link class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm"
                                  to={`supplier/${item.supplierId}`}
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
             
                            <div className=" flex  w-[8.12rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[9rem] max-lg:w-[7rem] ">
                              <div class=" font-normal text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {item.dialCode} {item.phoneNo}
                              </div>
                            </div>
                            </div>
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className=" flex  w-[14.26rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[9rem] max-lg:w-[7rem] ">

                              <div class="  text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {item.emailId}
                              </div>
                            </div>
                            <div className=" flex  w-[17.22rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[9rem] max-lg:w-[7rem] ">
                              <div class=" text-xs  font-poppins max-w-[25ch] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {`${(item.address && item.address.length && item.address[0].address1) || ""}
          ${(item.address && item.address.length && item.address[0].state) || ""}
          ${(item.address && item.address.length && item.address[0].street) || ""}`}
                              </div>

                            </div>
                            </div>
                            <div className=" flex  w-[13.01rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[9rem] max-lg:w-[7rem] ">

                              <div class="  text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {(item.address &&
                                  item.address.length &&
                                  item.address[0].city) ||
                                  ""}
                              </div>

                            </div>
                            <div className=" flex  w-[8.01rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[9rem] max-lg:w-[7rem] ">
                              <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {(item.address &&
                                  item.address.length &&
                                  item.address[0].postalCode) ||
                                  ""}
                              </div>
                              
                            </div>
                            <div class="  text-xs max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                            <Suspense fallback={<BundleLoader />}> <ReInstateSuppliers supplierId={item.supplierId} /></Suspense>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })}
                </> :
                !props.supplierDeletedList.length &&
                  !props.fetchingSupplierDeletedList ? <NodataFoundPage /> : null}
          </div>
        </div>
      </div>
)}
 <Suspense fallback={<BundleLoader />}>
      <UpdateSupplierModal
        rowdata={rowdata}
        updateSupplierModal={props.updateSupplierModal}
        handleRowData={handleRowData}
        handleUpdateSupplierModal={props.handleUpdateSupplierModal}
        translatedMenuItems={props.translatedMenuItems}
      />
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