import React, { useEffect, useState, lazy, Suspense } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getAllDistributorsList,
  handleUpdateAccountModal,

} from "./AccountAction"
import dayjs from "dayjs";
import InfiniteScroll from 'react-infinite-scroll-component';
import ExploreIcon from "@mui/icons-material/Explore";
import NodataFoundPage from '../../../Helpers/ErrorBoundary/NodataFoundPage';
import { MultiAvatar } from '../../../Components/UI/Elements';
import { BundleLoader } from "../../../Components/Placeholder";
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AccountSearchedData from './AccountSearchedData';
const AccountPulseModal = lazy(() => import("./AccountPulseModal"));
const UpdateAccountModal = lazy(() => import("./UpdateAccountModal"));

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
'Name', // 0
'Work', // 1
'Category', // 2
'Type', // 3
'Payment(Days)', // 4
'Tax', // 5
'Owner'
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
    setPage(page + 1);
    props.getAllDistributorsList(props.orgId,page);
  };
  const {
    handleUpdateAccountModal,
  } = props;
  return (
    <>
     {props.distributorSearch.length > 0 ? (
    <AccountSearchedData
    distributorSearch={props.distributorSearch}
    />
  ) : (
      <div className=' flex  sticky z-auto'>
      <div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
        <div className=" flex max-sm:hidden  w-[100%]  justify-between p-1 bg-transparent font-bold sticky  z-10">
            <div className=" w-[17.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[21.1rem] max-lg:w-[16.1rem]">  
            {translatedMenuItems[0]}
            {/* Name */}
            </div>
            <div className=" w-[10.11rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[11.11rem] max-lg:w-[9.11rem]">
              {translatedMenuItems[1]}
            {/* Work */}</div>
            <div className=" w-[8.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[12.1rem] max-lg:w-[8.1rem] ">
            {translatedMenuItems[2]}
            {/*category */}</div>
            <div className="w-[6.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.1rem] max-lg:w-[4.1rem]">
            {translatedMenuItems[3]}
            {/* type % */}</div>
            <div className="w-[10.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[8.2rem] max-lg:w-[6.2rem]">
            {translatedMenuItems[4]}
            {/* Paymentdays % */}</div>
            <div className="w-[4.24rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.24rem]">
            {translatedMenuItems[5]}
              {/* Tax*/}</div>
                <div className="w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.8rem] ">
            {translatedMenuItems[6]}
           {/* Owner */}        
            </div>
          
              {/* defaultMessage="billingaddress" */}
     
            

            <div class="w-[2rem] max-xl:w-[3rem] max-lg:w-[2.8rem]"></div>
            <div class="w-[2rem] max-xl:w-[3rem] max-lg:w-[2.8rem]"></div>
          </div>
         <InfiniteScroll
            dataLength={props.allDistributors.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={props.fetchingAllDistributors ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
            height={"80vh"}
            style={{scrollbarWidth:"thin"}}
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
                    <div className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-xl:p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] "                                >
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className=" flex font-medium flex-col w-[16rem] max-xl:w-[11rem] max-lg:w-[8rem]   max-sm:w-auto">
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
                            <div class="max-sm:w-auto flex items-center">
                              <Tooltip>
                                <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                  <div class=" text-xs text-blue-500  font-poppins font-semibold  cursor-pointer flex items-center">

                                    <Link
                                      class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 max-sm:text-sm text-[#042E8A] cursor-pointer max-xl:text-[0.65rem] max-lg:text-[0.45rem] "
                                      to={`distributor/${item.distributorId}`}
                                      title={`${item.name}`}>
                                      {item.name.substring(0, 25)}
                                    </Link>  &nbsp;&nbsp;
                                    {date === currentdate ? (
                                      <div class="text-[0.65rem] text-[tomato] font-bold" >
                                        New
                                      </div>
                                    ) : null}

                                  </div>
                                </div>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                        <div className=" flex   items-center  w-[6.1rem] max-xl:w-[6.1rem] max-lg:w-[4.1rem] max-sm:flex-row  max-sm:justify-between max-sm:w-auto  ">
                          <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] items-center max-sm:text-sm ">
                            {item.dialCode} {item.phoneNo}
                          </div>

                        </div>

                      </div>
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                        <div className=" flex  max-sm:w-auto w-[11.2rem] max-xl:w-[6.2rem] max-lg:w-[4.2rem] max-sm:flex-row  max-sm:justify-between ">
                          <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {/* {item.url} */}
                            {item.dCategoryName}

                          </div>
                        </div>
                        <div className=" flex  max-sm:w-auto w-[7rem] max-xl:w-[6rem] max-lg:w-[5rem] max-sm:flex-row  max-sm:justify-between ">
                          <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {item.clientName}

                          </div>
                        </div>

                        <div className=" flex  max-sm:w-auto w-[12rem] max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                          <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {item.payment}

                          </div>
                        </div>
                      </div>
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                        <div className=" flex max-sm:w-auto  w-[3.5rem] max-xl:w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                          <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                            {item.countryValue}
                          </div>

                        </div>                                         
                      </div>
                       <div className=" flex  items-center max-sm:w-auto flex-col w-24 max-xl:w-[2rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between max-sm:mb-2 ">
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
                      </div>                

                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">


                      <div className=" flex    max-xl:w-[1.2rem] max-sm:flex-row  max-sm:justify-between  ">
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

                        <div className=" flex    max-xl:w-[1.2rem] max-sm:flex-row  max-sm:justify-between  ">
                          <div class=" text-xs  font-poppins">
                            <Tooltip title="Pulse">
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
                        <div className=" flex    max-xl:w-[1.25rem] max-sm:flex-row  max-sm:justify-between  ">
                          <div class=" text-xs  font-poppins">
                            <Tooltip title="Edit">
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
      /></Suspense>
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
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllDistributorsList,
      handleUpdateAccountModal,

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllAccountList);



