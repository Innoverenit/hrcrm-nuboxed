import React, { useState, useEffect ,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import dayjs from "dayjs";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import {
  getCompleteDispatchList,
  clearCompleteDispatch
} from "./InventoryAction"

import InfiniteScroll from "react-infinite-scroll-component";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import UpdateIcon from '@mui/icons-material/Update';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RvHookupIcon from '@mui/icons-material/RvHookup';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
const EmptyPage = lazy(() =>import("../EmptyPage"));


function DispatchTableOut(props) {
  const [pageNo, setPageNo] = useState(0);
  const [loading, setLoading] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  useEffect(() => {
    setPageNo(pageNo + 1);
    // props.getCompleteDispatchList(props.locationDetailsId,pageNo,"Repair");
    if (props.viewType === "repair") {
        props.getCompleteDispatchList(props.locationDetailsId,pageNo,"Repair");
      } else if (props.viewType === "commerce") {
        props.getCompleteDispatchList(props.locationDetailsId,pageNo,"Procure");
      }
    props.clearCompleteDispatch()
  }, []);


  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          '672', // 0
'260', // 1
'780', // 2
'1408', // 3 Packed by
'772', // 4
'887', // 5
"1606",// 'Pick up', // 6
'1486', // 6 Track
'142', // 6 status


            
             
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
  
  const [hasMore, setHasMore] = useState(true);
  const handleLoadMore = () => {
    const callPageMapd = props.completeDispatchList && props.completeDispatchList.length &&props.completeDispatchList[0].pageCount
    setTimeout(() => {
      const {
        getCompleteDispatchList,
       // userDetails: { employeeId },
      } = props;
      if  (props.completeDispatchList)
      {
        if (pageNo < callPageMapd) {
            setPageNo(pageNo + 1);
            // getCompleteDispatchList(props.locationDetailsId,pageNo); 
            if (props.viewType === "repair") {
                getCompleteDispatchList(props.locationDetailsId,pageNo,"Repair");
              } else if (props.viewType === "commerce") {
                getCompleteDispatchList(props.locationDetailsId,pageNo,"Procure");
              }
      }
      if (pageNo === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };
  const [rowData, setRowData] = useState({})
  const [particularRowData, setParticularRowData] = useState({});
  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
}
  const handleRowData = (item) => {
    setRowData(item)
  }
  const [checkAwb, setCheckAwb] = useState(false)

  const handleCheckAwb = () => {
      setCheckAwb(!checkAwb)
  }


  return (
    <>
    
        <div className=' flex  sticky  z-auto'>
          <div class="rounded max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
            <div className=" flex max-sm:hidden justify-between w-[98%]  p-1 bg-transparent font-bold !text-lm font-poppins sticky items-end max-xl:text-[0.65rem] max-lg:text-[0.45rem] z-10">
              <div className=" w-[6.51rem] text-sm text-[#00A2E8] truncate max-md:w-[6.51rem] max-xl:w-[5.5rem]">
              <DynamicFeedIcon className='!text-icon  text-[#3ac427]'/> {translatedMenuItems[0]}
                </div>
             
              <div className="w-[5.01rem] truncate max-md:w-[5.01rem] max-xl:w-[5.001rem]">
               
              <BookmarkAddedIcon className="!text-icon  text-[#d64933]"/> {translatedMenuItems[2]}
                </div>

              <div className="w-[4.03rem] truncate max-md:w-[4.03rem] max-xl:w-[5.03rem]">
                
              <AccountCircleIcon className="!text-icon  text-[#d64933]"/> {translatedMenuItems[3]}
                </div>
              <div className="w-[10.2rem] truncate max-md:w-[10.2rem] max-xl:w-[5.3rem]">
                <LocalShippingIcon className='!text-icon  text-[#832161]'/> {translatedMenuItems[4]}
                </div>
              <div className=" w-[5.03rem] truncate max-md:w-[5.03rem] max-xl:w-[6.03rem]">
                <LocalShippingIcon className='!text-icon  text-[#6ba368]'/>{translatedMenuItems[5]}
                </div>
              < div className=" w-[6.5rem] truncate max-md:w-[6.5rem] max-xl:w-[5.5rem]">
              <   RvHookupIcon className='!text-icon mr-1 text-[#6ba368]'/> {translatedMenuItems[6]}
              </div>
             
              <div className=" w-[4.20rem] truncate max-md:w-[4.20rem] max-xl:w-[4.20rem]">
                <UpdateIcon className='!text-icon text-[#ff66b3]' /> {translatedMenuItems[8]}
                </div>
              <div className="w-[3.51rem] truncate max-md:w-[3.51rem] max-xl:w-[3.5rem]">
                
               {translatedMenuItems[9]}
                </div>
             
            </div>
            <InfiniteScroll
              dataLength={props.completeDispatchList.length} 
               next={handleLoadMore}
               hasMore={hasMore}
               loader={props.fetchingCompleteDispatchList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
              height={"75vh"}
              style={{ overflowX: "hidden", scrollbarWidth:"thin" }}
              endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
            >
              {
              props.completeDispatchList.length 
              ? 
              <>
                {
                props.completeDispatchList
                .map((item) => {
                  const currentdate = dayjs().format("DD/MM/YYYY");
                  const date = dayjs(item.createAt).format("DD/MM/YYYY");
                  const date1 = dayjs(item.pickUpDate).format("DD/MM/YYYY");
                  return (
                    <div>
                      <div className="flex rounded justify-between mt-1 bg-white items-center py-ygap max-xl:text-[0.65rem] max-lg:text-[0.45rem]  max-sm:h-[7rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                          <div className=" flex  w-[7.2rem] border-l-2  h-8 border-green-500 bg-[#eef2f9] max-xl:w-[5.2rem] max-lg:w-[3.7rem] max-sm:w-auto  ">
                            <div class="text-xs flex items-center ml-gap font-bold underline font-poppins cursor-pointer   max-sm:text-sm text-blue-600">
                              <div
                                onClick={() => {
                                  handleRowData(item);
                                  props.handleInventoryDispatchModal(true);
                                }}
                              >{item.newOrderNo}</div>&nbsp;&nbsp;
                              {date === currentdate ? (
                                <div class="text-[0.65rem] font-bold text-[tomato]">
                                  New
                                </div>
                              ) : null}
                            </div>
                          </div>
                     
                                                 
                                                   
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center ">
                          <div className=" flex items-center  h-8 ml-gap bg-[#eef2f9]  w-[6.14rem] max-xl:w-[2.6rem] max-lg:w-[2.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs  ml-gap font-poppins  max-sm:text-sm">
                              {item.dispatchPhoneCount}/{item.phoneReceiveCount}
                            </div>
                          </div>
                        </div>
                        
                        
                       
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                       
                          <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[10.01rem] max-xl:w-[5.01rem] max-lg:w-[3.71rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs   font-poppins  max-sm:text-sm">
                                {date1}
                            </div>
                          </div>
                    
                          <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.2rem] max-xl:w-[4.2rem] max-lg:w-[2.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs   font-poppins  max-sm:text-sm">
                              {item.status === "null" ? "" : item.status}
                            </div>
                          </div>
                          
                          <div class="flex items-center justify-end h-8 ml-gap bg-[#eef2f9] md:w-[2rem] max-sm:flex-row max-sm:w-[6%]">
                            <div>
                            <Tooltip title="Notes">
                                                        <NoteAltIcon
                                                            className="!text-icon text-[green] cursor-pointer"
                                                            // style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                handleRowData(item);
                                                                props.handleProductionNotesModal(true);
                                                            }}
                                                        />

                                                    </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  );
                })}
              </>
                : !props.completeDispatchList.length
                  && !props.fetchingCompleteDispatchList ? <EmptyPage /> : null}
            </InfiniteScroll>
          </div>
        </div>

     
    </>
  );
}

const mapStateToProps = ({ shipper, inventory, auth, dispatch,refurbish }) => ({
  completeDispatchList: inventory.completeDispatchList,
  userId: auth.userDetails.userId,
  fetchingCompleteDispatchList:inventory.fetchingCompleteDispatchList,
  orgId: auth.userDetails.organizationId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCompleteDispatchList,
      clearCompleteDispatch
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DispatchTableOut)

