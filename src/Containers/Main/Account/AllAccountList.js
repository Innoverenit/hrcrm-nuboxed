import React, { useEffect, useState, lazy, Suspense } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getAllDistributorsList,
  handleUpdateAccountModal,
  handleAccountAddress
} from "./AccountAction"
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import InfiniteScroll from 'react-infinite-scroll-component';
import ExploreIcon from "@mui/icons-material/Explore";
import NodataFoundPage from '../../../Helpers/ErrorBoundary/NodataFoundPage';
import { MultiAvatar } from '../../../Components/UI/Elements';
import { BundleLoader } from "../../../Components/Placeholder";
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const AddAccountAdressModal = lazy(() => import("./AddAccountAdressModal"));
const AccountSearchedData = lazy(() => import("./AccountSearchedData"));
const AccountPulseModal = lazy(() => import("./AccountPulseModal"));
const UpdateAccountModal = lazy(() => import("./UpdateAccountModal"));
const AccountCreditToggle = lazy(() => import("./AccountCreditToggle"));



dayjs.extend(relativeTime);

const getRelativeTime = (creationDate) => {
    const now = dayjs();
    const creationDay = dayjs(creationDate);

    if (creationDay.isSame(now, 'day')) {
        return 'Today';
    } else {
        return creationDay.from(now);
    }
};

const AllAccountList = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [RowData, setRowData] = useState("");
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    props.getAllDistributorsList(props.orgId,page);
    setPage(page + 1);
  }, []);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          "110",    // 'Name', // 0
          "378",     // 'Work', // 1
          "14",    // 'Category', // 2
          "71",   // 'Type', // 3
          "668",   // 'Payment(Days)', // 4
          "1215",  // 'Tax', // 5
          "77",    // 'Owner' 6
          "100", // New 7
          "392",// "Pulse"  8
          "170",// "Edit" 9
          "76",// 'Assigned', // 10  
          "1338",// "Credit",//11
          "592",          // club    12
          "185",//Address13
          "679",//Created14
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
  function handleCurrentRowData(datas) {
    setRowData(datas);
  }
  
  const handleLoadMore = () => {
    const PageMapd = props.allDistributors && props.allDistributors.length && props.allDistributors[0].pageCount
    setTimeout(() => {  
      if  (props.allDistributors)
      {
        if (page < PageMapd) {    
          setPage(page + 1);
          props.getAllDistributorsList(props.orgId,page);
            }
              if (page === PageMapd){
                setHasMore(false)
              }
            }
            }, 100);
  };

  const {
    handleUpdateAccountModal,
  } = props;
  return (
    <>
     {props.distributorSearch.length > 0 ? (
          <Suspense fallback={<BundleLoader />}>
    <AccountSearchedData
    distributorSearch={props.distributorSearch}
    selectedLanguage={props.selectedLanguage}
    translateText={props.translateText}
     RowData={RowData}
    />
    </Suspense>
  ) : (
      <div className=' flex  sticky z-auto'>
      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex max-sm:hidden  w-[90%]   justify-between p-1 bg-transparent  sticky  z-10">
        <div class=" flex justify-between text-xs font-poppins  font-bold  w-[94%]  ">
            <div className=" w-[20.1rem] text-[#00A2E8] text-base max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[21.1rem] max-lg:w-[16.1rem]">  
            {translatedMenuItems[0]}
            {/* Name */}
            </div>
            <div className=" w-[10.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.11rem] max-lg:w-[9.11rem]">
              {translatedMenuItems[1]}
            {/* Work */}</div>
            <div className=" w-[10.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.1rem] max-lg:w-[8.1rem] ">
            {translatedMenuItems[2]}
            {/*category */}</div>
            <div className="w-[7.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.1rem] max-lg:w-[4.1rem]">
            {translatedMenuItems[3]}
            {/* type % */}</div>
            <div className="w-[10.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem] max-lg:w-[6.2rem]">
            {translatedMenuItems[4]}
            {/* Paymentdays % */}</div>
            <div className="w-[10.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem] max-lg:w-[6.2rem]">
            {/* Club */}{translatedMenuItems[12]}
          {/*Club */}
            </div>       

                <div className="w-[7.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.8rem] ">
            {translatedMenuItems[11]}
           {/* Owner */}        
            </div>
            <div className="w-[4.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.2rem] max-lg:w-[4.2rem]">
          {translatedMenuItems[10]}
            {/* Assigned */}          
            </div>
            <div className="w-[0.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.2rem] max-lg:w-[4.2rem]">
          {translatedMenuItems[14]}
            {/* Created */}          
            </div>
            </div>
          </div>
         <InfiniteScroll
            dataLength={props.allDistributors.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingAllDistributors ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
            height={"83vh"}
            style={{scrollbarWidth:"thin"}}
            endMessage={ <p class="fles text-center font-bold text-xs text-red-500">You have reached the end of page</p>}
        >
            {props.allDistributors.length ?
              <>
                {props.allDistributors.map((item) => {
                  const currentdate = dayjs().format("DD/MM/YYYY");
                  const date = dayjs(item.creationDate).format("DD/MM/YYYY");
                  const dataLoc = `${item.address && item.address.length && item.address[0].address1
                    } 
${item.address && item.address.length && item.address[0].street
                    }   
${item.address && item.address.length && item.address[0].state}
${(item.address && item.address.length && item.address[0].country) || ""
                    } 

`;
                  return (
                    <div>
                    <div className="flex rounded justify-between  bg-white mt-1 h-8 items-center  max-xl:p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className=" flex  w-[14rem] max-xl:w-[11rem] border-l-2 border-green-500 bg-[#eef2f9] max-lg:w-[8rem]   max-sm:w-auto">
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
                            <div class="w-[0.25rem] "></div>
                            <div class="max-sm:w-auto flex items-center ">
                              <Tooltip>
                                <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                  <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer flex items-center">

                                    <Link
                                      class="overflow-ellipsis whitespace-nowrap  max-sm:text-sm text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] "
                                      to={`distributor/${item.distributorId}`}
                                      title={`${item.name}`}>
                                      {item.name.substring(0, 25)}
                                    </Link>  &nbsp;&nbsp;
                                    {date === currentdate ? (
                                      <div class="text-[0.65rem] text-[tomato] font-bold" >
                                        {translatedMenuItems[7]}  {/* New */}
                                      </div>
                                    ) : null}

                                  </div>
                                </div>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                        <div className=" flex   items-center  w-[9.1rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] h-8 max-xl:w-[6.1rem] max-lg:w-[4.1rem] max-sm:flex-row  max-sm:justify-between max-sm:w-auto  ">
                          <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] items-center max-sm:text-sm ">
                            {item.dialCode} {item.phoneNo}
                          </div>

                        </div>

                      </div>
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className=" flex  max-sm:w-auto w-[9.2rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[6.2rem] max-lg:w-[4.2rem] max-sm:flex-row  max-sm:justify-between ">
                          <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {/* {item.url} */}
                            {item.dCategoryName}

                          </div>
                        </div>
                        <div className=" flex  max-sm:w-auto w-[8rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[6rem] max-lg:w-[5rem] max-sm:flex-row  max-sm:justify-between ">
                          <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {item.clientName}

                          </div>
                        </div>

                        <div className=" flex  max-sm:w-auto w-[9rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                          <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {item.payment}

                          </div>
                        </div>
                        <div className=" flex  max-sm:w-auto w-[7rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                            <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {item.clubName}

                            </div>
                          </div>
                      </div>
                      {/* <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                        <div className=" flex max-sm:w-auto  w-[3.5rem] max-xl:w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                          <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {item.countryValue}
                          </div>

                        </div>                                         
                      </div> */}
                      <div className=" flex items-center max-sm:w-auto w-[10rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                            <AccountCreditToggle distributorCreditInd={item.distributorCreditInd} distributorId={item.distributorId}/>&nbsp; &nbsp;
                            <div class=" text-xs  items-center font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                              {item.currencyPrice}

                            </div>
                          </div>  
                       <div className=" flex  items-center max-sm:w-auto flex-col w-[6rem] items-center justify-center ml-gap h-8 bg-[#eef2f9] max-xl:w-[2rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between max-sm:mb-2 ">
                          <div class="max-sm:flex justify-end">
                          {item.salesExecutive?
                            <Tooltip title={item.salesExecutive}>
                              <MultiAvatar
                                primaryTitle={item.salesExecutive}
                                imageId={item.ownerImageId}
                                imgWidth={"1.8rem"}
                                imgHeight={"1.8rem"}
                              />
                            </Tooltip>:""}
                          </div>                      
                      </div>     
                      <div className=" flex items-center w-[5rem] items-center justify-center h-8 ml-gap bg-[#eef2f9] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
<span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[6rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{getRelativeTime(item.creationDate)}
</span>

                        
                          </div>  

                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                      <div className=" flex    max-xl:w-[1.2rem] max-sm:flex-row items-center justify-center h-8 bg-[#eef2f9] max-sm:justify-between  ">
                          <div class=" text-xs  font-poppins">
                            <Tooltip title=  {translatedMenuItems[8]}>
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
                        <div class=" flex items-center justify-center h-8  bg-[#eef2f9]">
                        <Tooltip title=  {translatedMenuItems[13]}>
                        <AddLocationAltIcon
          className=" !text-icon cursor-pointer text-[#8e4bc0]"
          onClick={() => {
            props.handleAccountAddress(true);
            handleCurrentRowData(item);
          }}
          
        /> 
        </Tooltip>  
        </div>

                      <div className=" flex    max-xl:w-[1.2rem] items-center justify-center h-8 bg-[#eef2f9] max-sm:flex-row  max-sm:justify-between  ">
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
                            : <div class=" w-3">

                            </div>
                          }
                        </Tooltip>

                      </div>
                        </div>
 
                        <div className=" flex    max-xl:w-[1.25rem] max-sm:flex-row  items-center justify-center h-8  bg-[#eef2f9] max-sm:justify-between  ">
                          <div class=" text-xs  font-poppins">
                            <Tooltip title=  {translatedMenuItems[9]}>
                            {/*  "Edit"> */}
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
                      </div>
                    </div>
                  </div>
                  )
                })}
              </> : !props.allDistributors.length
                && !props.fetchingAllDistributors ?
                <NodataFoundPage /> : null}
          </InfiniteScroll>
        </div>
      </div>
          )}
            <Suspense fallback={<BundleLoader />}>
      <UpdateAccountModal
       selectedLanguage={props.selectedLanguage}
       translateText={props.translateText}
        RowData={RowData}
        updateAccountModal={props.updateAccountModal}
        handleUpdateAccountModal={handleUpdateAccountModal}
      />
      <AccountPulseModal
       selectedLanguage={props.selectedLanguage}
       translateText={props.translateText}
        RowData={RowData}
        handleAccountPulse={props.handleAccountPulse}
        showPulseModal={props.showPulseModal}
      />
       <AddAccountAdressModal   
        item={RowData}
         type="Distributor"
         addAccountAddressModal={props.addAccountAddressModal}
         handleAccountAddress={props.handleAccountAddress}
      /> </Suspense>
    </>
  )
}

const mapStateToProps = ({ distributor,auth }) => ({
  allDistributors: distributor.allDistributors,
  fetchingAllDistributors: distributor.fetchingAllDistributors,
  showPulseModal: distributor.showPulseModal,
  updateAccountModal: distributor.updateAccountModal,
  orgId: auth.userDetails.organizationId,
  distributorSearch:distributor.distributorSearch,
  addAccountAddressModal:distributor.addAccountAddressModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllDistributorsList,
      handleUpdateAccountModal,
      handleAccountAddress
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllAccountList);



