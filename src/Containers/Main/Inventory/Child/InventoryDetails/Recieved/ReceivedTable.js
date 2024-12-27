import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button, Select, Progress, Badge } from "antd";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import {
  getReceivedUserList,
  handleReceivedModal,
  handleDeliveryDateModal,
  setEditReceiveInventory,
  handleReceivedOrderIdModal,
  updateInspection,
  handleMismatchPhoneModal,
  handleInventoryReceivedNoteOrderModal,
  addDeliveryDate,
} from "../../../InventoryAction";
import {handleProductionNotesModal} from "../../../../Refurbish/RefurbishAction"
import { getLocationList } from "../../../../Account/AccountAction"
import InfoIcon from '@mui/icons-material/Info'; 
import dayjs from "dayjs";


import { MultiAvatar, MultiAvatar2 } from "../../../../../../Components/UI/Elements";
import ReceivedOrderToggle from "./ReceivedOrderToggle";
import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import LabelOffIcon from '@mui/icons-material/LabelOff';
import ReceivedMismatchModal from "./ReceivedMismatchModal";
import RefurbishNoteAll from "../../../../Refurbish/RefurbishNoteAll";

const DeliveryDateModal = lazy(() => import("./DeliveryDateModal"));
const OpenReceivedOrderIdModal = lazy(() => import("./OpenReceivedOrderIdModal"));
const { Option } = Select;

const ReceivedTable = (props) => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  useEffect(() => {
    setPage(page + 1);
    props.getLocationList(props.orgId);
    props.getReceivedUserList(props.locationDetailsId, page)
  }, [])




  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          '672', // 0
'248', // 1
'73', // 2
'875', // 3
'1051', // 4 Inspected 
'1606', // 5 Pick up
'658', // 6

            
             
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
    const callPageMapd = props.allReceivedUser && props.allReceivedUser.length &&props.allReceivedUser[0].pageCount
    setTimeout(() => {
      const {
        getReceivedUserList,
      } = props;
      if  (props.allReceivedUser)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getReceivedUserList(props.locationDetailsId, page);
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };

  const [rowData, setRowData] = useState({})
  const handleRowData = (item) => {
    setRowData(item)
  }
  const [pause, setpause] = useState(false)

  function handlePauseResume() {
    setpause(!pause)
  }
  const [locationChange, setLocationChange] = useState(false);
  const [locationValue, setLocationValue] = useState("");

  function handleChangeLocation(id) {
    setLocationValue(id)
  }
  function handlelocation() {
    setLocationChange(!locationChange);
  }
  function handleCallback() {
    setLocationChange(false)
    setLocationValue("")
  }
  const productionLocation = props.inventory.filter((item) => {
    return item.productionInd === true
  })
  return (
    <>
      
        <div className=' flex sticky  z-auto'>
          <div class="rounded m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
            <div className=" flex max-sm:hidden  w-[100%]  p-1 bg-transparent font-bold  z-10">
              <div className=" w-[9.4rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {translatedMenuItems[0]}
                </div>
              {props.accountInfoInd && (
                <>
              <div className=" w-[10.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">
              {translatedMenuItems[1]}
                </div>
              <div className="w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {translatedMenuItems[2]}
                </div>
              </>
              )}
              <div className="w-[5.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {translatedMenuItems[3]}
                </div>
              <div className="w-[6.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {translatedMenuItems[4]}
                </div>
              <div className="w-[11.2rem]"></div>
              <div className="w-[7.12rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {translatedMenuItems[5]}
                </div>
              <div className="w-[7.21rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
              {translatedMenuItems[6]}
                </div>
              <div className="w-[2.31rem]"></div>
              <div className="w-[2.1rem]"></div>
              <div className="w-[2.01rem]"></div>
            </div>
            <InfiniteScroll
              dataLength={props.allReceivedUser.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={props.fetchingReceivedUser ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
              height={"67vh"}
              style={{overflowX:"hidden", scrollbarWidth:"thin"}}
              endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
            >
              {props.allReceivedUser.length ? <>
                {props.allReceivedUser.map((item, key) => {
                  const currentdate = dayjs().format("DD/MM/YYYY");
                  const date = dayjs(item.createAt).format("DD/MM/YYYY");
                  const percentage = Math.floor((item.phoneReceiveCount / item.phoneCount) * 100)
                  const isValidPercentage = !isNaN(percentage) && isFinite(percentage);
                  return (
                    <div>
                      <div className="flex rounded  mt-1 bg-white h-8 items-center p-1 max-sm:h-[7rem] max-sm:flex-col ">
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex w-[9.62rem] max-xl:w-[7rem] max-lg:w-[5.5rem] max-sm:w-auto  ">
                            <div class="text-xs  font-bold max-sm:text-sm  font-poppins cursor-pointer underline text-blue-600 max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                              <div class=" flex ">
                              <Badge size="small" count={`${item.phoneReceiveCount} / ${item.phoneCount}`} overflowCount={5000}>
                                <span
                                  onClick={() => {
                                    handleRowData(item);
                                    props.handleReceivedOrderIdModal(true);
                                  }}
                                >{item.newOrderNo}
                                </span>
                                </Badge>
                                &nbsp;&nbsp;
                                {date === currentdate ? (
                                  <div class="text-[0.65rem] font-bold text-[tomato] ">
                                    New
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
{props.accountInfoInd &&
<>
                          <div className=" flex w-[10.12rem] max-xl:w-[8.1rem] max-lg:w-[5.7rem]  max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.distributorName}
                             {/* <Tooltip title={`${item.distributorName}  ${item.contactPersonName}`}>
                              <InfoIcon/>
                              </Tooltip> 
                              <Tooltip title={<div className="flex flex-col">{`${item.distributorName} 
                            ${item.contactPersonName}`}</div>}>
  <InfoIcon onClick={() => alert(`${item.distributorName} ${item.contactPersonName}`)} />
</Tooltip>  */}


                            </div>
                          </div>
                          <div className=" flex w-[10.12rem] max-xl:w-[8.1rem] max-lg:w-[5.7rem]  max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.contactPersonName}
                            </div>
                          </div>
                          </>
                          }
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          {/* <div className=" flex w-[5.5rem] max-xl:w-[3.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs  font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">

                              <MultiAvatar2
                                primaryTitle={item.contactPersonName}
                                imageId={item.imageId}
                                imgWidth={"1.8rem"}
                                imgHeight={"1.8rem"}
                              />
                            </div>
                          </div> */}
                          <div className=" flex w-[4.1rem] max-xl:w-[3.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs    font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">

                              <MultiAvatar
                                primaryTitle={item.userName}
                                imageId={item.imageId}
                                imgWidth={"1.8rem"}
                                imgHeight={"1.8rem"}
                              />
                            </div>
                          </div>
                          <div className=" flex w-[6.81rem] max-xl:w-[6.21rem] max-lg:w-[4.21rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {` ${item.dialCode1 || ""} ${item.mobileNo || ""} `}
                            </div>
                          </div>
                          <div className=" flex w-[4.52rem] max-xl:w-[3rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs   font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.inspectionInd !== 0 && <MultiAvatar
                                primaryTitle={item.startInspectionUserName}
                                imageId={item.imageId}
                                imgWidth={"1.8rem"}
                                imgHeight={"1.8rem"}
                              />}
                            </div>
                          </div>
                          <div className=" flex w-[10.81rem] max-xl:w-[4rem] max-lg:w-[2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs   font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {/* {item.phoneReceiveCount}/{item.phoneCount} */}
                              {isValidPercentage ? (

                                <Progress
                                  percent={percentage}
                                  success={{percentage}}
                                  format={() => `${percentage}%`}
                                  style={{ width: "8rem", cursor: "pointer" }}
                                />
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                          <div className=" flex w-[8.5rem] max-xl:w-[5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div>
                              {item.inspectionInd === 0 ? <ReceivedOrderToggle
                                orderId={item.orderPhoneId}
                                locationId={props.locationDetailsId}
                                inventoryReceiveInd={item.inventoryReceiveInd}
                              /> : <b className="max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">Received</b>}
                            </div>
                          </div>

                          <div className=" flex  w-[5.51rem] max-xl:w-[5.01rem] max-lg:w-[3.01rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                            <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">

                              {item.productionLocationName && <MultiAvatar
                                primaryTitle={item.productionLocationName}
                                imageId={item.imageId}
                                imgWidth={"1.8rem"}
                                imgHeight={"1.8rem"}
                              />}
                            </div>
                          </div>
                          <div className=" flex w-[8rem] max-xl:w-[8rem] max-lg:w-[7rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs  font-semibold  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.inspectionInd === 0 && item.inventoryReceiveInd ?
                                <Button
                                  loading={item.orderId === rowData.orderId && props.updatingInspection}
                                  type="primary"
                                  className="w-28 text-base"
                                  onClick={() => {
                                    handleRowData(item)
                                    props.updateInspection({
                                      inspectionInd: 1,
                                      startInspectionUser: props.userId,
                                      startInspectionDate: dayjs()
                                    }, item.orderPhoneId, props.locationDetailsId)
                                  }}
                                >
                                  Start Inspection
                                </Button>
                                : item.inspectionInd === 2 && item.inventoryReceiveInd ?
                                  <Button
                                    className="cursor-pointer text-base"
                                    loading={item.orderId === rowData.orderId && props.addingDeliverDate}
                                    onClick={() => {
                                      handleRowData(item);
                                      props.addDeliveryDate({
                                        transferInd: 2,
                                        inspectionInd: 3,
                                        locationId: props.locationDetailsId,
                                        userId: props.userId,
                                        orderPhoneId: item.orderPhoneId
                                      }, handleCallback())
                                    }}
                                  >
                                    Send To Store
                                  </Button> :
                                  item.inspectionInd === 1 && item.inventoryReceiveInd ?
                                    <Button
                                      className="w-28 text-base"
                                      type="primary"
                                      onClick={handlePauseResume}>
                                      {pause ? "Resume Inspection" : "Pause Inspection"}
                                    </Button> : item.inventoryReceiveInd ? <b>Sent To Facility</b> : null}
                            </div>
                          </div>
                                    </div>
                          <div class="flex  justify-end ">
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
                          
                          <div class="flex   max-sm:flex-row max-sm:w-auto">
                            {item.mismatchOrderInd &&
                              <div>
                                <Tooltip title="Mismatch Phones">
                                  <LabelOffIcon
                                    class=" text-icon text-red-700"
                                    onClick={() => {
                                      handleRowData(item);
                                      props.handleMismatchPhoneModal(true)
                                    }}
                                  />

                                </Tooltip>
                              </div>
                       

                            }
                          </div>  </div> </div>
                        {/* </div> */}
                      </div>
                    
                  );
                })}
              </> : !props.allReceivedUser.length
                && !props.fetchingReceivedUser ? <NodataFoundPage /> : null}

            </InfiniteScroll>
          </div>
        </div>

      <DeliveryDateModal
        rowData={rowData}
        addDeliverDate={props.addDeliverDate}
        handleDeliveryDateModal={props.handleDeliveryDateModal}
      />

      <OpenReceivedOrderIdModal
        locationDetailsId={props.locationDetailsId}
        rowData={rowData}
        receivedOrdeIdModal={props.receivedOrdeIdModal}
        handleReceivedOrderIdModal={props.handleReceivedOrderIdModal}
      />
      <ReceivedMismatchModal
        rowData={rowData}
        handleMismatchPhoneModal={props.handleMismatchPhoneModal}
        mismatchPhoneModal={props.mismatchPhoneModal}
      />
       <RefurbishNoteAll
                     rowData={rowData}
                     productioNoteModal={props.productioNoteModal}
                    handleProductionNotesModal={props.handleProductionNotesModal}
                    />
    </>
  );
}


const mapStateToProps = ({ inventory, distributor, auth ,refurbish}) => ({
  updatingInspection: inventory.updatingInspection,
  fetchingReceivedUser: inventory.fetchingReceivedUser,
  allReceivedUser: inventory.allReceivedUser,
  locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
  addDeliverDate: inventory.addDeliverDate,
  receivedOrdeIdModal: inventory.receivedOrdeIdModal,
  receivedOrdeIdModal: inventory.receivedOrdeIdModal,
  invenReceivedNoteOrderModal: inventory.invenReceivedNoteOrderModal,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  inventory: inventory.inventory,
  addingDeliverDate: inventory.addingDeliverDate,
  mismatchPhoneModal: inventory.mismatchPhoneModal,
  user: auth.userDetails,
  productioNoteModal: refurbish.productioNoteModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setEditReceiveInventory,
      getReceivedUserList,
      handleMismatchPhoneModal,
      handleReceivedModal,
      handleDeliveryDateModal,
      handleReceivedOrderIdModal,
      handleInventoryReceivedNoteOrderModal,
      updateInspection,
      getLocationList,
      addDeliveryDate,
      handleProductionNotesModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedTable)

