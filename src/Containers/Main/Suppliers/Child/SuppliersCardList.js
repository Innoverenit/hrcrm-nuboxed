import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSuppliersList, emptysUPPLIERS ,deleteSupplierData,
  handleUpdateSupplierModal,setEditSuppliers,
  handleSuppliersPriceDrawer,
  handleSuppliersListDrawer} from "../SuppliersAction"
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import EuroIcon from '@mui/icons-material/Euro';
import { DeleteOutlined } from "@ant-design/icons";
import {Popconfirm,Tooltip } from "antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
import UpdateSupplierModal from "./UpdateSupplierModal";
import SupplierPriceModal from "./SupplierPriceModal";
import SupplierAddListModal from "./SupplierAddListModal";

function SuppliersCardList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});
  const [page, setPage] = useState(0);


  useEffect(() => {
    setPage(page + 1);
    props.getSuppliersList(props.userId,page);
  }, []);


  const handleRowData = (item) => {
    setrowData(item);
  };

  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
  }
  const handleLoadMore = () => {
    const PageMapd = props.supplierList && props.supplierList.length &&props.supplierList[0].pageCount
    setTimeout(() => {
      const {
        getSuppliersList,

        userId
      } = props;
      if  (props.supplierList)
      {
        if (page < PageMapd) {
          setPage(page + 1);
          getSuppliersList(userId, page);
      }
      if (page === PageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };

  useEffect(() => {
    props.emptysUPPLIERS();
  }, []);


  return (
    <>
      <div className=' flex justify-end sticky top-28 z-auto'>
        <div class="rounded-lg m-5 max-sm:m-1 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex max-sm:hidden justify-between w-[100%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" w-[11.4rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.8rem]">  <FormattedMessage
              id="app.name"
              defaultMessage="Name"
            /></div>
            <div className=" w-[6.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.8rem]">
              <FormattedMessage id="app.phoneNo" defaultMessage="Phone #" />
            </div>
            <div className=" w-[15.91rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[14.9rem] ">  <FormattedMessage id="app.email" defaultMessage="Email" /></div>
            <div className="w-[15.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[15.9rem]">
              <FormattedMessage id="app.address" defaultMessage="Address" />

            </div>
            <div className="w-[10.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.5rem]">
              <FormattedMessage id="app.city" defaultMessage="City" />

            </div>
            <div className="w-[5.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem]">
              <FormattedMessage id="app.pinCode" defaultMessage="PinCode" />

            </div>
            <div class=" w-[2rem]"></div>
          </div>
          <div class="overflow-x-auto h-[89vh]">
            <InfiniteScroll
              dataLength={props.supplierList.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={props.fetchingSupplierList ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
              height={"80vh"}
            >
              {props.supplierList.length ?
                <>
                  {props.supplierList.map((item) => {
                    const currentdate = dayjs().format("DD/MM/YYYY");
                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                    return (
                      <>
                        <div
                  className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[3rem] items-center  max-sm:h-[6rem] max-sm:flex-col">
                          <div class=" flex flex-row justify-between mt-1 w-wk max-sm:flex-col">
                          <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className="font-medium  flex items-center w-[13.9rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[10.1rem] max-lg:w-[8.06rem] ">
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

                            
                            <div className=" flex font-medium flex-col w-[7.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[5.01rem] max-lg:w-[5.9rem] ">



                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {item.dialCode} {item.phoneNo}
                              </div>

                            </div>
                            </div>
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className=" flex font-medium flex-col w-[18.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[12.03rem] max-lg:w-[9.84rem] ">

                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {item.emailId}
                              </div>

                            </div>


                            <div className=" flex font-medium flex-col w-[16.22rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[10.04rem] max-lg:w-[10.03rem] ">
                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins max-w-[25ch] truncate max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {`${(item.address && item.address.length && item.address[0].address1) || ""}
          ${(item.address && item.address.length && item.address[0].state) || ""}
          ${(item.address && item.address.length && item.address[0].street) || ""}`}
                              </div>

                            </div>
                            </div>
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                            <div className=" flex font-medium flex-col w-[13.01rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[8.05rem] max-lg:w-[6.02rem] ">

                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {(item.address &&
                                  item.address.length &&
                                  item.address[0].city) ||
                                  ""}
                              </div>

                            </div>
                            <div className=" flex font-medium flex-col w-[7.01rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[4.06rem] max-lg:w-[5.61rem] ">
                              <div class=" font-normal text-[0.85rem] text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                {(item.address &&
                                  item.address.length &&
                                  item.address[0].postalCode) ||
                                  ""}
                              </div>

                            </div>
                            </div>
                            <div class="flex max-sm:justify-end max-sm:w-wk items-center">
                        <div class="flex flex-col items-center w-[3%] max-sm:flex-row max-sm:w-[10%]">
 <div>
<Tooltip title="Price">
<EuroIcon
                            className="!text-base cursor-pointer text-[blue]"
                            onClick={() => {
                               props.setEditSuppliers(item);
                              handleRowData(item);
                              props.handleSuppliersPriceDrawer(true);
                            }}
                          />
          </Tooltip>
          </div>
          <div>
<Tooltip title="">
<AssignmentIcon
                            className="!text-base cursor-pointer text-[green]"
                            onClick={() => {
                               props.setEditSuppliers(item);
                              handleRowData(item);
                              props.handleSuppliersListDrawer(true);
                            }}
                          />
          </Tooltip>
          </div>
            </div> 
            </div>
                            <div class="flex max-sm:justify-end max-sm:w-wk items-center">
                        <div class="flex flex-col items-center w-[3%] max-sm:flex-row max-sm:w-[10%]">
 <div>
<Tooltip title="Edit">
            <BorderColorIcon
             className="!text-[1rem] cursor-pointer text-[tomato]"
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
              title="Do you want to delete?"
             onConfirm={() => props.deleteSupplierData(item.supplierId)}
            >
              <DeleteOutlined

className=" !text-[1rem] cursor-pointer text-[red]"
              />
            </Popconfirm>
            </div>
            </div> 
            </div>

                          </div>




                        </div>
                      </>
                    )
                  })}
                </> :
                !props.supplierList.length &&
                  !props.fetchingSupplierList ? <NodataFoundPage /> : null}
            </InfiniteScroll>
          </div>
        </div>
      </div>

      <UpdateSupplierModal
        rowdata={rowdata}
     
        updateSupplierModal={props.updateSupplierModal}
        handleRowData={handleRowData}
        handleUpdateSupplierModal={props.handleUpdateSupplierModal}
      />
            <SupplierPriceModal
        rowdata={rowdata}
     
        suppliersPriceOpenDrawer={props.suppliersPriceOpenDrawer}
        handleRowData={handleRowData}
        handleSuppliersPriceDrawer={props.handleSuppliersPriceDrawer}
      />
            <SupplierAddListModal
        rowdata={rowdata}
     
        suppliersListOpenDrawer={props.suppliersListOpenDrawer}
        handleRowData={handleRowData}
        handleSuppliersListDrawer={props.handleSuppliersListDrawer}
      />
    </>
  )
}
const mapStateToProps = ({ shipper, suppliers, auth }) => ({
  supplierList: suppliers.supplierList,
  suppliersListOpenDrawer:suppliers.suppliersListOpenDrawer,
  userId: auth.userDetails.userId,
  fetchingSupplierList: suppliers.fetchingSupplierList,
  suppliersPriceOpenDrawer:suppliers.suppliersPriceOpenDrawer,
  fetchingSupplierListError: suppliers.fetchingSupplierListError,
  updateShipperModal: shipper.updateShipperModal,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
  addShipperOrderModal: shipper.addShipperOrderModal,
  updateSupplierModal:suppliers.updateSupplierModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSuppliersList,
      emptysUPPLIERS,
      deleteSupplierData,
      setEditSuppliers,
      handleUpdateSupplierModal,
      handleSuppliersPriceDrawer,
      handleSuppliersListDrawer
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliersCardList);