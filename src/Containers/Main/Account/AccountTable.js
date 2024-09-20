import React, { useEffect, useState, lazy,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { BundleLoader } from "../../../Components/Placeholder";
import { Popconfirm, Tooltip,Input,Button } from "antd";
import { Link } from 'react-router-dom';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import InfiniteScroll from "react-infinite-scroll-component";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import {
  getCustomerByUser,
  setEditDistributor,
  handleUpdateDistributorModal,
  handleDistributorOrderModal,
  handleDistributorActivityTableModal,
  deleteDistributor,
  handleBillingAddressModal,
  handleUpdateAccountModal,
  handleAccountModal,
  emptyDistributor,
  handleAccountPulse,
  updateAccountPrice,
  handleAccountAddress
} from "./AccountAction";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import dayjs from "dayjs";
import NodataFoundPage from "../../../Helpers/ErrorBoundary/NodataFoundPage";
import { MultiAvatar, MultiAvatar2 } from "../../../Components/UI/Elements";
import ExploreIcon from "@mui/icons-material/Explore";
import { DeleteOutlined } from "@ant-design/icons";
import AccountSearchedData from "./AccountSearchedData";
import AccountCreditToggle from "./AccountCreditToggle";
import AddAccountAdressModal from "./AddAccountAdressModal";
const UpdateAccountModal = lazy(() => import("./UpdateAccountModal"));
const  AccountPulseModal = lazy(() => import("./AccountPulseModal"));
const AccountModal = lazy(() => import("./AccountModal"));

function AccountTable(props) {
  const [page, setPage] = useState(0);
  const [RowData, setRowData] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [particularRowData, setParticularRowData] = useState({});
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
           "110", // 'Name', // 0
         "378", // 'Work', // 1
          "14",  // 'Category', // 2
          "71",  // 'Type', // 3
           "688", // 'Payment(Days)', // 4
            "1171",// 'Payment', // 5
           "1215", // 'Tax', // 6
            "76",// 'Assigned', // 7
   
            "1338",// "Credit",//8
            "100", // New 9
            "1259",// "Save" //10
            "692", // More Info With AI 11
            "392",// "Pulse" 12
            "170",// "Edit"13
            "1259", // "Do you want to delete?"14
             "1079",// cancel15
             "1339",// Update Revised Price 16
             "592",          // club

        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);


  useEffect(() => {
    props.getCustomerByUser(props.userId, page);
    // setPage(page + 1);
  }, []);
  function handleCurrentRowData(datas) {
    setRowData(datas);
  }
  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
}
  const [visible, setVisible] = useState(false)
  const handleUpdateRevisePrice = () => {
      setVisible(!visible)
  }
  const [price, setPrice] = useState(particularRowData.dispatchPaymentPercentage)
 

  const handleChange = (val) => {
      //  setPrice(val)
      if (!isNaN(val) && val > 0 && val < 101) {
        setPrice(val);
      } else {
        setPrice(''); // Reset the input if the value is not valid
      }
  
  }
  const handleSubmitPrice = () => {
      props.updateAccountPrice(
          {
              dispatchPaymentPercentage: price,
              
          },
          particularRowData.distributorId,

      );
      setVisible(false)
  }

  const handleLoadMore = () => {
    setPage(page + 1);
    props.getCustomerByUser(props.userId, page);
  };

  const {
    handleUpdateAccountModal,
    handleAccountModal,
  } = props;
  useEffect(() => {
    return () => props.emptyDistributor();
  }, []);

  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 1.2;

  return (
    <>
    {props.distributorSearch.length > 0 ? (
    <AccountSearchedData
    distributorSearch={props.distributorSearch}
    />
  ) : (
      <div className=' flex  sticky  z-auto'>
      <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex max-sm:hidden   w-[90%]  justify-between p-1 bg-transparentsticky  z-10">
           <div class=" flex justify-between text-xs font-poppins  font-bold  w-[100%]  ">
            <div className=" w-[14.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[21.1rem] max-lg:w-[16.1rem]"> 
            {translatedMenuItems[0]}
            {/* Name */}
            </div>
            <div className=" w-[10.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.11rem] max-lg:w-[9.11rem]">
            {translatedMenuItems[1]}
           {/* Work */}
            </div>
            <div className=" w-[9.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.1rem] max-lg:w-[8.1rem] ">
            {translatedMenuItems[2]}
              {/* Category */}
              </div>
            <div className="w-[6.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.1rem] max-lg:w-[4.1rem]">
            {translatedMenuItems[3]}
          {/* Type */}
             </div>
            <div className="w-[10.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem] max-lg:w-[6.2rem]">
            {translatedMenuItems[4]}
          {/* Paymentdays   */}
            </div>
            <div className="w-[7.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem] max-lg:w-[6.2rem]">
            {/* Club */} {translatedMenuItems[17]}
          {/*Club */}
            </div>
            <div className="w-[10.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem] max-lg:w-[6.2rem]">
            {translatedMenuItems[5]}
              {/* Payment % */}
            </div>
            <div className="w-[4.24rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.24rem]">
            {translatedMenuItems[6]}
              {/* Tax */}
              </div>   
           {/* "billingaddress" */}
           <div className="w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.2rem] max-lg:w-[4.2rem]">
          {translatedMenuItems[8]}
            {/* Credit */}          
            </div>
  <div className="w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.2rem] max-lg:w-[4.2rem]">
          {translatedMenuItems[7]}
            {/* Assigned */}          
            </div>
            {/* <div className="w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.8rem] "> */}
            {/* {translatedMenuItems[8]} */}
           {/* Owner */}        
            {/* </div> */}
            
            <div class="w-[2rem] max-xl:w-[3rem] max-lg:w-[2.8rem]"></div>
            <div class="w-[2rem] max-xl:w-[3rem] max-lg:w-[2.8rem]"></div>
          </div>
          </div>
          <InfiniteScroll
            dataLength={props.customerListByUser.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingCustomerByUser ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
            height={"82vh"}
            style={{ scrollbarWidth:"thin"}}
          >
            {props.customerListByUser.length ?
              <>
                {props.customerListByUser.map((item) => {
                  const currentdate = dayjs().format("DD/MM/YYYY");
                  const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                  const diff = Math.abs(
                    dayjs().diff(dayjs(item.lastRequirementOn), "days")
                  );
                  const dataLoc = `${item.address && item.address.length && item.address[0].address1
                    } 
            ${item.address && item.address.length && item.address[0].street
                    }   
           ${item.address && item.address.length && item.address[0].state}
          ${(item.address && item.address.length && item.address[0].country) || ""
                    } 
                   ${item.address && item.address.length && item.address[0].postalCode}
            `;
                  return (
                    <div>
                      <div className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-xl:p-1 max-sm:h-[9rem] max-sm: scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "                                >
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex w-[13rem] max-xl:w-[11rem] max-lg:w-[8rem]   max-sm:w-auto">
                            <div className="flex max-sm:w-auto">
                              <div>
                                <MultiAvatar
                                  primaryTitle={item.name}
                                  imageId={item.imageId}
                                  imageURL={item.imageURL}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                              </div>
                              <div class="w-[0.25rem]"></div>
                             
                                <Tooltip>
                                  <div class="flex max-sm:flex-row justify-between w-full md:">
                                  

                                      <Link
                                        class="overflow-ellipsis whitespace-nowrap h-8 text-xs p-1 max-sm:text-xs text-[#042E8A] font-bold font-poppins flex items-center cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] "
                                        to={`distributor/${item.distributorId}`}
                                        title={`${item.name}`}>
                                        {item.name.substring(0, 25)}
                                      </Link> 
                                      {date === currentdate ? (
                                        <div class="text-[0.65rem] text-[tomato] font-bold" >
                                        {translatedMenuItems[9]}  {/* New */}
                                        </div>
                                      ) : null}

                                
                                  </div>
                                </Tooltip>
                        
                            </div>
                          </div>
                          <div className=" flex  items-center  w-[7.1rem] max-xl:w-[6.1rem] max-lg:w-[4.1rem] max-sm:flex-row  max-sm:justify-between max-sm:w-auto  ">

                            <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] items-center max-sm:text-xs ">
                              {item.dialCode} {item.phoneNo}
                            </div>

                          </div>

                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex max-sm:w-auto w-[5.2rem] max-xl:w-[6.2rem] max-lg:w-[4.2rem] max-sm:flex-row  max-sm:justify-between ">
                            <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {/* {item.url} */}
                              {item.dcategoryName}
                            </div>
                          </div>
                          <div className=" flex  max-sm:w-auto w-[8.2rem] max-xl:w-[6rem] max-lg:w-[5rem] max-sm:flex-row  max-sm:justify-between ">
                            <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {item.clientName}

                            </div>
                          </div>

                          <div className=" flex  max-sm:w-auto w-[8rem] max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                            <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {item.payment}

                            </div>
                          </div>
                          <div className=" flex  max-sm:w-auto w-[5rem] max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                            <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {item.clubName}

                            </div>
                          </div>
                          <div className=" flex  max-sm:w-auto w-[11rem] max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                            <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">       
                              {visible && (item.distributorId === particularRowData.distributorId) ?
                                                                <Input
                                                                    type='text'
                                                                    value={price}
                                                                    onChange={(e) => handleChange(e.target.value)}
                                                                />
                                                                : item.dispatchPaymentPercentage}
                            </div>
                          </div>
                          
                          <div className=" flex    md:w-[6.06rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs  font-poppins">

                                                        {visible && (item.distributorId === particularRowData.distributorId) ? (
                                                            <>
                                                                <div className=" flex justify-between ">
                                                                    <Button onClick={() => {
                                                                        handleSubmitPrice()
                                                                    }} >{translatedMenuItems[10]}
                                                                      
                                                                            {/* defaultMessage="Save" */}
                                                                        
                                                                    </Button>
                                                                    <Button onClick={() => handleUpdateRevisePrice(false)}>
                                                                    {translatedMenuItems[15]} 
                                                                        {/* defaultMessage="Cancel" */}
                                                                   
                                                                    </Button>
                                                                </div>
                                                            </>
                                                        ) : <Tooltip title={translatedMenuItems[16]}
                                                      
                                                        //     defaultMessage="Update Revised Price"
                                                         
                                                        >
                                                            <PublishedWithChangesIcon
                                                                onClick={() => {
                                                                    handleUpdateRevisePrice()
                                                                    handleSetParticularOrderData(item)
                                                                }}
                                                                className="!text-icon cursor-pointer text-[tomato]"
                                                            />
                                                        </Tooltip> }

                                                    </div>

                                                </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                          <div className=" flex  max-sm:w-auto  w-[3.5rem] max-xl:w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {item.countryValue}
                            </div>

                          </div>                       
                          <div className=" flex  items-center max-sm:w-auto   w-[3rem] max-xl:w-[7.5rem] max-lg:w-[2.1rem] max-sm:max-sm:flex-row  max-sm:justify-between ">
                        {/* <div class=" text-xs  font-poppins max-sm:hidden">Assigned</div> */}

                        <div class=" text-xs  font-poppins max-sm:text-xs max-xl:text-[0.65rem] max-lg:text-[0.45rem]">

                          <div>
                            {item.assignedTo === null ? (
                              <div class="text-xs  font-poppins">None</div>
                            ) : (
                              <>
                                {item.assignedTo === item.ownerName ? (

                                  null
                                ) : (
                                  <MultiAvatar2
                                    primaryTitle={item.assignedTo}
                                    imgWidth={"1.8rem"}
                                    imgHeight={"1.8rem"}
                                  />
                                )}
                              </>
                            )}
                          </div>

                        </div>
                      </div>
                      {/* <div className=" flex  items-center max-sm:w-auto  w-24 max-xl:w-[2rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between max-sm:mb-2 ">
                          <div class="max-sm:flex justify-end">
                            <Tooltip title={item.salesExecutive}>
                              <MultiAvatar
                                primaryTitle={item.salesExecutive}
                                imageId={item.ownerImageId}
                                imgWidth={"1.8rem"}
                                imgHeight={"1.8rem"}
                              />
                            </Tooltip>
                          </div>                      
                      </div>                 */}
                      <div className=" flex  max-sm:w-auto w-[7rem] max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                            <AccountCreditToggle distributorCreditInd={item.distributorCreditInd} distributorId={item.distributorId}/>
                          </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">            
<div className=" flex  max-xl:w-[1.25rem] max-sm:flex-row  max-sm:justify-between  ">
  <div class=" text-xs  font-poppins">
    <Tooltip title={translatedMenuItems[11]}>
    {/* "More Info With AI" */}
      <AcUnitIcon
        className=" !text-icon cursor-pointer text-[tomato]"
        onClick={() => {
          // props.setEditDistributor(item)
          handleAccountModal(true);
          handleCurrentRowData(item);
        }}
      />
    </Tooltip>
  </div>
</div>                                            
                              <div>
                                <Tooltip title={item.url}>
                                  {item.url !== "" ? (
                                    <div
                                      style={{ cursor: "pointer" }}
                                      onClick={() => { }}
                                    >
                                      {" "}
                                      <a href={`https://${item.url}`} target="_blank">
                                        <ExploreIcon
                                          className=" !text-icon cursor-pointer text-[green]"

                                        />
                                      </a>
                                    </div>
                                  )
                                    : <div class=" w-0">

                                    </div>
                                  }
                                </Tooltip>

                              </div>
                           
                            <div className=" flex    max-xl:w-[1.2rem] max-sm:flex-row  max-sm:justify-between  ">
                              <div class=" text-xs  font-poppins">
                                <Tooltip title={translatedMenuItems[12]}>
                                {/* "Pulse"> */}
                                  <MonitorHeartIcon
                                    onClick={() => {
                                      props.handleAccountPulse(true);
                                      handleCurrentRowData(item);
                                    }}
                                    className=" !text-icon cursor-pointer text-[#df9697]"
                                  />
                                </Tooltip>
                              </div>
                            </div>
      
                            <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#020103]"
          onClick={() => {
            props.handleAccountAddress(true);
            handleCurrentRowData(item);
          }}
          
        />    

                            <div className=" flex   max-xl:w-[1.25rem] max-sm:flex-row  max-sm:justify-between  ">
                              <div class=" text-xs  font-poppins">
                                <Tooltip title={translatedMenuItems[13]}>
                                {/* "Edit"> */}
                                  <BorderColorIcon
                                    className=" !text-icon cursor-pointer text-[tomato]"
                                    onClick={() => {
                                      props.setEditDistributor(item)
                                      handleUpdateAccountModal(true);
                                      handleCurrentRowData(item);
                                    }}
                                  />

                                </Tooltip>
                              </div>


                            </div>
                            <div className=" flex   max-xl:w-[1.25rem] max-sm:flex-row  max-sm:justify-between  ">
                              <div class=" text-xs  font-poppins">
                                <Popconfirm
                                loading={props.deletingDistributorById}
                                  title={translatedMenuItems[14]}
                                  // Do you want to delete?"
                                  onConfirm={() => props.deleteDistributor({}, item.distributorId,props.userId)}
                                >
                                  <DeleteOutlined
                                    className=" !text-icon cursor-pointer text-[red]"
                                  />
                                </Popconfirm>
 
                              </div>


                            </div>
                          </div>
                       
                      </div>
                    </div>


                  )
                })}
              </>
              : !props.customerListByUser.length && !props.fetchingCustomerByUser ? <NodataFoundPage /> : null}
          </InfiniteScroll>
        </div>
      </div>
        )}
          <Suspense fallback={<BundleLoader />}>
      <UpdateAccountModal
        RowData={RowData}
        updateAccountModal={props.updateAccountModal}
        handleUpdateAccountModal={handleUpdateAccountModal}
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}

      />
      <AccountPulseModal
        RowData={RowData}
        handleAccountPulse={props.handleAccountPulse}
        showPulseModal={props.showPulseModal}
        selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}

      />
        <AccountModal
        RowData={RowData}
        accountModal={props.accountModal}
        handleAccountModal={handleAccountModal}
         selectedLanguage={props.selectedLanguage}
        translateText={props.translateText}/>
         <AddAccountAdressModal    
        item={RowData}
         type="Distributor"
         addAccountAddressModal={props.addAccountAddressModal}
         handleAccountAddress={props.handleAccountAddress}
      /> 
</Suspense>
    </>  );
}
const mapStateToProps = ({ distributor, auth }) => ({
  customerListByUser: distributor.customerListByUser,
  serachedData:distributor.serachedData,
  showPulseModal: distributor.showPulseModal,
  fetchingCustomerByUser: distributor.fetchingCustomerByUser,
  fetchingDistributorsByUserIdError:
    distributor.fetchingDistributorsByUserIdError,
  userId: auth.userDetails.userId,
  updateAccountModal: distributor.updateAccountModal,
  addDistributorOrderModal: distributor.addDistributorOrderModal,
  addDistributorActivityTableModal:
    distributor.addDistributorActivityTableModal,
  addBillToAddress: distributor.addBillToAddress,
  accountModal:distributor.accountModal,
  deletingDistributorById:distributor.deletingDistributorById,
  distributorSearch:distributor.distributorSearch,
  addAccountAddressModal:distributor.addAccountAddressModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUpdateDistributorModal,
      getCustomerByUser,
      setEditDistributor,
      handleDistributorOrderModal,
      handleDistributorActivityTableModal,
      deleteDistributor,
      handleBillingAddressModal,
      handleUpdateAccountModal,
      handleAccountModal,
      emptyDistributor,
      handleAccountPulse,
      updateAccountPrice,
      handleAccountAddress
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountTable);

