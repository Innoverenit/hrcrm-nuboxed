import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSuppliersDeletedList, emptysUPPLIERS ,deleteSupplierData,handleUpdateSupplierModal,setEditSuppliers} from "../SuppliersAction"
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import { DeleteOutlined } from "@ant-design/icons";
import {Popconfirm,Tooltip } from "antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from 'react-router-dom';
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import UpdateSupplierModal from "./UpdateSupplierModal";
import { BundleLoader } from "../../../../Components/Placeholder";

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
      <div className=' flex justify-end sticky top-28 z-auto'>
        <div class="rounded-lg m-5 max-sm:m-1 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex max-sm:hidden justify-between w-[100%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" w-[12.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">  <FormattedMessage
              id="app.name"
              defaultMessage="Name"
            /></div>
            <div className=" w-[4.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              <FormattedMessage id="app.phoneNo" defaultMessage="Phone #" />
            </div>
            <div className=" w-[13.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">  <FormattedMessage id="app.email" defaultMessage="Email" /></div>
            <div className="w-[14.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              <FormattedMessage id="app.address" defaultMessage="Address" />

            </div>
            <div className="w-[7.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              <FormattedMessage id="app.city" defaultMessage="City" />

            </div>
            <div className="w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              <FormattedMessage id="app.pinCode" defaultMessage="PinCode" />

            </div>
          </div>
          <div class="overflow-x-auto h-[89vh]">
        
              {props.supplierDeletedList.length ?
                <>
                  {props.supplierDeletedList.map((item) => {
                    const currentdate = dayjs().format("DD/MM/YYYY");
                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                    return (
                      <>
                        <div
                  className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[3rem] items-center p-3 max-sm:h-[5rem] max-sm:flex-col">
                          <div class=" flex flex-row justify-between w-wk max-sm:flex-col">
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className="font-medium  flex items-center w-[16.1rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[9rem] max-lg:w-[7rem] ">
                              <div class=" font-semibold text-[0.85rem] text-cardBody font-poppins">
                                <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm"
                                  to={`supplier/${item.supplierId}`}
                                  title={`${item.shipperName}`}
                                >{item.name}</Link>

                              </div>
                          
                                  {date === currentdate ? (
                                    <div class="text-xs  text-[tomato] font-bold"
                                    >
                                      New
                                    </div>
                                  ) : null}
                            </div>

                            
                            <div className=" flex font-medium flex-col w-[8.12rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[9rem] max-lg:w-[7rem] ">



                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {item.dialCode} {item.phoneNo}
                              </div>

                            </div>
                            </div>
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className=" flex font-medium flex-col w-[18.26rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[9rem] max-lg:w-[7rem] ">

                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {item.emailId}
                              </div>

                            </div>


                            <div className=" flex font-medium flex-col w-[17.22rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[9rem] max-lg:w-[7rem] ">
                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins max-w-[25ch] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {`${(item.address && item.address.length && item.address[0].address1) || ""}
          ${(item.address && item.address.length && item.address[0].state) || ""}
          ${(item.address && item.address.length && item.address[0].street) || ""}`}
                              </div>

                            </div>
                            </div>
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className=" flex font-medium flex-col w-[13.01rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[9rem] max-lg:w-[7rem] ">

                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {(item.address &&
                                  item.address.length &&
                                  item.address[0].city) ||
                                  ""}
                              </div>

                            </div>
                            <div className=" flex font-medium flex-col w-[4.01rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[9rem] max-lg:w-[7rem] ">
                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {(item.address &&
                                  item.address.length &&
                                  item.address[0].postalCode) ||
                                  ""}
                              </div>

                            </div>
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

      <UpdateSupplierModal
        rowdata={rowdata}
     
        updateSupplierModal={props.updateSupplierModal}
        handleRowData={handleRowData}
        handleUpdateSupplierModal={props.handleUpdateSupplierModal}
      />
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