import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getSuppliersNotApprovalList, 
  // emptysUPPLIERS, 
  // deleteSupplierData,
  // handleUpdateSupplierModal, 
  // setEditSuppliers,
  // handleSuppliersPriceDrawer,
  // handleSuppliersListDrawer
} from "../SuppliersAction"
import InfiniteScroll from "react-infinite-scroll-component";
import SuplierNotApprovalPublishToggle from "../Child/SuplierNotApprovalPublishToggle"
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import StoreIcon from '@mui/icons-material/Store';
import EuroIcon from '@mui/icons-material/Euro';
import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, Tooltip } from "antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from 'react-router-dom';
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import AssignmentIcon from '@mui/icons-material/Assignment';
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
// import UpdateSupplierModal from "./UpdateSupplierModal";
// import SupplierPriceModal from "./SupplierPriceModal";
// import SupplierAddListModal from "./SupplierAddListModal";
// import SuplierPublishToggle from "./SuplierPublishToggle";

function SuppliersNotApprovalList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});
  const [page, setPage] = useState(0);


  useEffect(() => {
    setPage(page + 1);
    props.getSuppliersNotApprovalList(props.userId, page);
  }, []);


  const handleRowData = (item) => {
    setrowData(item);
  };

  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
  }
  const handleLoadMore = () => {
    const PageMapd = props.supplierList && props.supplierList.length && props.supplierList[0].pageCount
    setTimeout(() => {
      const {
        getSuppliersNotApprovalList,

        userId
      } = props;
      if (props.supplierList) {
        if (page < PageMapd) {
          setPage(page + 1);
          getSuppliersNotApprovalList(userId, page);
        }
        if (page === PageMapd) {
          setHasMore(false)
        }
      }
    }, 100);
  };

//   useEffect(() => {
//     props.emptysUPPLIERS();
//   }, []);


  return (
    <>
      <div className=' flex  sticky  z-auto'>
        <div class=" m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden justify-between w-[99%] p-1 bg-transparent font-bold sticky  z-10">
            <div className=" w-[20.4rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.8rem]">  <FormattedMessage
              id="app.name"
              defaultMessage="Name"
            /></div>
            <div className=" w-[10.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.8rem]">
              <FormattedMessage id="app.phoneNo" defaultMessage="Phone " />
            </div>
            <div className=" w-[22.91rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[14.9rem] "> 
               <FormattedMessage id="app.email" defaultMessage="Email" /></div>
            
            <div className="w-[10.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[9.5rem]">
              <FormattedMessage id="app.country" defaultMessage="Country" />

            </div>

            <div class=" w-[5rem]"></div>
          </div>
         <div class="overflow-x-auto h-[80vh]">
            <InfiniteScroll
              dataLength={props.notApprovalSupplierList.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={props.fetchingNotApprovalSupplierList ? <div class="text-center font-semibold text-xs">Loading...</div> : null}
              height={"80vh"}
            >
              {props.notApprovalSupplierList.length ?
                <>
                  {props.notApprovalSupplierList.map((item) => {
                    const currentdate = dayjs().format("DD/MM/YYYY");
                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                    const countryCode = item.address[0].country_alpha2_code;
                    const dataLoc = ` Address : ${
                      item.address && item.address.length && item.address[0].address1
                    } 
                        
                       Country : ${
                         (item.address &&
                           item.address.length &&
                           item.address[0].country) ||
                         ""
                       } 
                         `;
                    return (
                      <>
                        <div
                          className="flex  rounded justify-between bg-white mt-1 h-8 items-center p-1  max-sm:h-[6rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                          <div class=" flex flex-row justify-between mt-1 w-wk max-sm:flex-col">
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                              <div className="font-medium  flex items-center w-[14.9rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[10.1rem] max-lg:w-[8.06rem] ">
                                <div class=" font-semibold text-[0.85rem]  font-poppins">
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


                              <div className=" flex font-medium items-center flex-col w-[8.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[5.01rem] max-lg:w-[5.9rem] ">



                                <div class=" font-normal text-[0.85rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                  {item.dialCode} {item.phoneNo}
                                </div>

                              </div>
                            </div>
                            <div class="flex items-center max-sm:justify-between max-sm:w-wk ">
                              <div className=" flex font-medium flex-col w-[18.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[12.03rem] max-lg:w-[9.84rem] ">

                                <div class=" font-normal text-[0.85rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                  {item.emailId}
                                </div>

                              </div>


                             
                            </div>
                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                              <div className=" flex font-medium flex-col w-[9.01rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[8.05rem] max-lg:w-[6.02rem] ">

                                <div class=" font-normal text-[0.85rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                <CountryFlag1 countryCode={countryCode} />
                                 &nbsp;
                                   {countryCode}
                                </div>

                              </div>

                            </div>

                            <div className=" flex font-medium flex-col w-[5.2rem] max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class=" font-normal text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                <SuplierNotApprovalPublishToggle
                                 approveInd={item.approveInd}
                                supplierId={item.supplierId}
                                />
                              </div>
                            </div>


                            {/* <div class="flex max-sm:justify-end max-sm:w-wk items-center">
                              <div>
                                <Tooltip title="Purchase Order">
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
                                <Tooltip title="Price">
                                  <EuroIcon
                                    className="!text-icon cursor-pointer text-[blue]"
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
                                    className="!text-icon cursor-pointer text-[green]"
                                    onClick={() => {
                                      props.setEditSuppliers(item);
                                      handleRowData(item);
                                      props.handleSuppliersListDrawer(true);
                                    }}
                                  />
                                </Tooltip>
                              </div>



                              <div>
                                <Tooltip title="Edit">
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
                                <Tooltip title="Delete">
                                  <Popconfirm
                                    title="Do you want to delete?"
                                    onConfirm={() => props.deleteSupplierData(item.supplierId, props.userId)}
                                  >
                                    <DeleteOutlined

                                      className=" !text-icon cursor-pointer text-[red]"
                                    />
                                  </Popconfirm>
                                </Tooltip>
                              </div>
                            </div> */}

                          </div>
                        </div>
                      </>
                    )
                  })}
                </> :
                !props.notApprovalSupplierList.length &&
                  !props.fetchingNotApprovalSupplierList ? <NodataFoundPage /> : null}
            </InfiniteScroll>
          </div> 
        </div>
      </div>

      {/* <UpdateSupplierModal
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
      /> */}
    </>
  )
}
const mapStateToProps = ({ shipper, suppliers, auth }) => ({
  supplierList: suppliers.supplierList,
  suppliersListOpenDrawer: suppliers.suppliersListOpenDrawer,
  userId: auth.userDetails.userId,
  fetchingNotApprovalSupplierList:suppliers.fetchingNotApprovalSupplierList,
  notApprovalSupplierList:suppliers.notApprovalSupplierList,
  fetchingSupplierList: suppliers.fetchingSupplierList,
  suppliersPriceOpenDrawer: suppliers.suppliersPriceOpenDrawer,
  fetchingSupplierListError: suppliers.fetchingSupplierListError,
  updateShipperModal: shipper.updateShipperModal,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
  addShipperOrderModal: shipper.addShipperOrderModal,
  updateSupplierModal: suppliers.updateSupplierModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSuppliersNotApprovalList
    //   getSuppliersList,
    //   emptysUPPLIERS,
    //   deleteSupplierData,
    //   setEditSuppliers,
    //   handleUpdateSupplierModal,
    //   handleSuppliersPriceDrawer,
    //   handleSuppliersListDrawer
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliersNotApprovalList);