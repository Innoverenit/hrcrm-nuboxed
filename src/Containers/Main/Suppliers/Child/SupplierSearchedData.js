import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getSuppliersList, emptysUPPLIERS, deleteSupplierData,
  handleUpdateSupplierModal, setEditSuppliers,
  handleSuppliersPriceDrawer,
  handleSuppliersListDrawer
} from "../SuppliersAction"

import dayjs from "dayjs";
import StoreIcon from '@mui/icons-material/Store';
import EuroIcon from '@mui/icons-material/Euro';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Popconfirm, Tooltip } from "antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from 'react-router-dom';
import CountryFlag1 from "../../../Settings/Category/Country/CountryFlag1";
import AssignmentIcon from '@mui/icons-material/Assignment';
import SupplierPriceModal from "./SupplierPriceModal";
import SupplierAddListModal from "./SupplierAddListModal";
import SuplierPublishToggle from "./SuplierPublishToggle";
import ApartmentIcon from '@mui/icons-material/Apartment';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import PublishIcon from '@mui/icons-material/Publish';
function SupplierSearchedData(props) {

  const [hasMore, setHasMore] = useState(true);
  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});
  const [page, setPage] = useState(0);


  useEffect(() => {
    setPage(page + 1);
    props.getSuppliersList(props.userId, page);
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
        getSuppliersList,

        userId
      } = props;
      if (props.supplierList) {
        if (page < PageMapd) {
          setPage(page + 1);
          getSuppliersList(userId, page);
        }
        if (page === PageMapd) {
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
   
      <div className=' flex  sticky  z-auto'>
        <div class=" m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent  sticky items-end font-poppins font-bold !text-lm max-xl:text-[0.65rem] max-lg:text-[0.45rem]  z-10">
            <div className=" w-[6.4rem] max-mb:w-[13.4rem] text-[#34e2e5] text-sm">  
            <ApartmentIcon className="!text-icon text-[#34e2e5] "/> 
           Name
            </div>
            <div className=" w-[15.5rem] max-md:w-[15.5rem]">
            <WifiCalling3Icon className="!text-icon  text-[#4f5d75]"/> 
             Phone
            </div>
            <div className=" w-[16.91rem] max-md:w-[16.91rem] "> 
            <MarkEmailUnreadIcon className='!text-icon mr-1 text-[#ff9f1c] ' />
   
               Email
               </div>
            
            <div className="w-[8.9rem] max-md:w-[8.9rem]">
        
              Country

            </div>
            <div className="w-[10.9rem] max-xl:w-[9.5rem]">
            <PublishIcon className="!text-icon  text-[#4f5d75]"/>
              Publish

            </div>
            <div class=" w-[5rem]"></div>
          </div>
          <div class="overflow-x-auto h-[80vh]">
                <>
                  {props.searchSupplierList.map((item) => {
                    const currentdate = dayjs().format("DD/MM/YYYY");
                    const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                    // const countryCode = item.address[0].countryAlpha2Code;
                    const countryCode = item.address?.[0]?.countryAlpha2Code ?? "None";
                    console.log(countryCode)
                    return (
                      <>
                        <div
                          className="flex  rounded justify-between bg-white mt-1 h-8 items-center p-1 py-ygap  max-sm:h-[6rem] max-sm:rounded-lg max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500    ">
                           
                          <div class=" flex flex-row justify-between mt-1 w-wk max-sm:flex-col">
                            <div class="flex max-sm:justify-between max-sm:w-wk  w-[30.5rem]  max-sm:flex-row max-md:w-[10.1rem] max-lg:w-[8.06rem]">
                            <div className=" border-l-2 border-green-500 bg-[#eef2f9] h-8 flex items-center w-[9.5rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[10.1rem] max-lg:w-[8.06rem] ">
                                <div class="flex justify-center items-center font-semibold text-[0.85rem] font-poppins h-8 ml-gap bg-[#eef2f9]">
                                  <Link class="overflow-ellipsis whitespace-nowrap  h-8 text-xs p-1 underline text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-text-xs max-sm:text-sm"
                                    to={`supplier/${item.supplierId}`}
                                    title={`${item.shipperName}`}
                                  >{item.name}</Link>
                                </div>

                                {date === currentdate ? (
                                  <div class="text-[0.65rem]  text-[tomato] font-bold"
                                  >
                                    {/* New */} {props.translatedMenuItems[23]}
                                  </div>
                                ) : null}
                              </div>
                              <div className=" flex  items-center h-8 ml-gap bg-[#eef2f9] w-[19.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[5.01rem] max-lg:w-[5.9rem] ">

                                <div class="text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-text-xs max-sm:text-sm">
                                  {item.dialCode} {item.phoneNo}
                                </div>

                              </div>
                            </div>
                            
                            <div class="flex items-center max-sm:justify-between max-sm:w-wk ">
                              <div className=" flex items-center  justify-center h-8 ml-gap bg-[#eef2f9] w-[17.2rem] max-sm:justify-between max-sm:w-auto max-sm:flex-row max-xl:w-[12.03rem] max-lg:w-[9.84rem] ">

                                <div class="  text-xs ml-gap font-poppins max-xl:text-[0.65rem] max-lg:text-text-xs max-sm:text-sm">
                                  {item.emailId}
                                </div>
                              </div>      
                              <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[16.2rem]  max-xl:w-[5rem] max-lg:w-[3rem] max-sm:w-auto max-sm:justify-evenly  max-sm:flex-row ">



</div>                    
                             
                            </div>

                            <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                              <div className=" flex justify-center items-center w-[9.01rem] max-sm:justify-between max-sm:w-auto  h-8 ml-gap bg-[#eef2f9] max-sm:flex-row max-xl:w-[8.05rem] max-lg:w-[6.02rem] ">
                                <div class="  text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                <CountryFlag1 countryCode={countryCode} />
                                 &nbsp;
                                   {countryCode}
                                </div>
                              </div>
                            </div>

                            <div className=" flex items-center justify-center  w-[5.2rem] max-xl:w-[5rem] max-lg:w-[3rem]  h-8 ml-gap bg-[#eef2f9] max-sm:w-auto max-sm:justify-between  max-sm:flex-row ">
                              <div class="  text-[0.82rem] max-sm:text-[0.82rem]  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                <SuplierPublishToggle
                                  publishInd={item.publishInd}
                                  supplierId={item.supplierId}
                                />
                              </div>
                            </div>

                            <div class=" flex items-center justify-center  w-[5.2rem] max-xl:w-[5rem] max-lg:w-[3rem]  h-8 ml-gap bg-[#eef2f9] max-sm:w-auto max-sm:justify-between  max-sm:flex-row">
                              <div>
                                <Tooltip title="Purchase Order">
                                  <StoreIcon
                                    className="!text-icon cursor-pointer text-[red]"                                
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
                                   <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  />
                                  </Popconfirm>
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })}
                </> 
          </div>
        </div>
      </div>

    
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
  suppliersListOpenDrawer: suppliers.suppliersListOpenDrawer,
  userId: auth.userDetails.userId,
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

export default connect(mapStateToProps, mapDispatchToProps)(SupplierSearchedData);