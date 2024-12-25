import React, { useState, lazy, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Button,Badge } from "antd";
import { getAllShipper } from "../../../../Shipper/ShipperAction";
import dayjs from "dayjs";
import DispatchPhoneListModalInventory from "../../InventoryDetails/Dispatch/DispatchPhoneListModalInventory"
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import {
  getDispatchList,
  addFinalDispatchData,
  handlePickupDateModal,
  updateDispatchInspectionButton,
  handleCreateAWB,
  handleInventoryDispatchModal
} from "../../../InventoryAction"
import {handleProductionNotesModal} from "../../../../Refurbish/RefurbishAction"

import InfiniteScroll from "react-infinite-scroll-component";
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import SubOrderList from "../../../../Account/AccountDetailsTab/AccountOrderTab/SubOrderList";
import RefurbishNoteAll from "../../../../Refurbish/RefurbishNoteAll";

const DispatchPhoneListModal = lazy(() => import("./DispatchPhoneListModal"));
const DispatchPackedToggle = lazy(() => import("./DispatchPackedToggle"));
const DispatchValidationToggle = lazy(() => import("./DispatchValidationToggle"));
const DispatchOrderAwbModal = lazy(() => import("./DispatchOrderAwbModal"));

function DispatchTable(props) {
  const [pageNo, setPageNo] = useState(0);
  const [loading, setLoading] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  useEffect(() => {
    setPageNo(pageNo + 1);
    props.getDispatchList(props.locationDetailsId,pageNo);
    props.getAllShipper()
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
    const callPageMapd = props.allDispatchList && props.allDispatchList.length &&props.allDispatchList[0].pageCount
    setTimeout(() => {
      const {
        getDispatchList,
       // userDetails: { employeeId },
      } = props;
      if  (props.allDispatchList)
      {
        if (pageNo < callPageMapd) {
            setPageNo(pageNo + 1);
            getDispatchList(props.locationDetailsId,pageNo); 
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
const AWBtst=[
  {
      "userId": "EMP16818052295222021",
      "orderPhoneId": "ORDPG71890357520182024",
      "locationId": "LDS65468903772222023",
      "orderInventoryLocationLinkId": "OILLG87418979421182024",
      "createAt": "2024-07-18T05:55:42.818Z",
      "activeInd": true,
      "transferInd": 2,
      "phoneCount": 0,
      "count": 0,
      "contactPersonId": "COIG1030765006232024",
      "newOrderNo": "000118072024",
      "inspectionInd": 0,
      "phoneReceiveCount": 6,
      "repairRemainingQuantity": 0,
      "phoneRemainingQuantity": 0,
      "qcStartInd": 3,
      "qcRepairInd": 3,
      "dispatchPhoneCount": 6,
      "dispatchInspectionInd": 3,
      "dispatchedBy": "null",
      "dispatchDate": "null",
      "shipperId": "null",
      "pickedInd": false,
      "stopDispatchInspectionUser": "EMP88224136459212024",
      "stopDispatchInspectionDate": "2024-07-18T06:09:23.663Z",
      "stopDispatchInspectionUserName": "Test Ku Manager",
      "unloadingAddresses": [
          {
              "addressId": null,
              "addressType": null,
              "address1": null,
              "address2": null,
              "houseNo": null,
              "town": null,
              "street": null,
              "city": "Nilamskj",
              "postalCode": null,
              "country": null,
              "longitude": null,
              "latitude": null,
              "creatorId": null,
              "state": null,
              "employeeId": null,
              "contactPersonId": null,
              "countryCode": null,
              "countryAlpha2Code": null,
              "countryAlpha3Code": null
          }
      ],
      "pickUpAddress": [
          {
              "addressId": "ADIF24591555098182024",
              "addressType": null,
              "address1": "",
              "address2": null,
              "houseNo": null,
              "town": null,
              "street": null,
              "city": "",
              "postalCode": null,
              "country": "",
              "longitude": "",
              "latitude": "",
              "creatorId": null,
              "state": "",
              "employeeId": null,
              "contactPersonId": null,
              "countryCode": null,
              "countryAlpha2Code": "IN",
              "countryAlpha3Code": "IND"
          }
      ],
      "dispatchReceivedInd": false,
      "newAwbNo": "4354564",
      "weight": 0.0,
      "materialCount": 0,
      "inventoryReceiveInd": false,
      "offerPrice": 0.0,
      "finalPrice": 0.0,
      "expectedPrice": 0.0,
      "mismatchOrderInd": false,
      "cannotRepairCount": 0,
      "pickUpDate": "2024-07-17T18:30:00Z",
      "orderCompleteInd": false,
      "pageCount": 6,
      "dataCount": 20,
      "listCount": 102
  },
  {
      "userId": "EMP16818052295222021",
      "orderPhoneId": "ORDPG4586083473992024",
      "locationId": "LDS65468903772222023",
      "orderInventoryLocationLinkId": "OILLG8438439003992024",
      "createAt": "2024-07-09T05:37:32.026Z",
      "activeInd": true,
      "transferInd": 2,
      "phoneCount": 0,
      "count": 0,
      "contactPersonId": "COIG1030765006232024",
      "newOrderNo": "000109072024",
      "inspectionInd": 0,
      "phoneReceiveCount": 6,
      "repairRemainingQuantity": 6,
      "phoneRemainingQuantity": 6,
      "qcStartInd": 3,
      "qcRepairInd": 3,
      "dispatchPhoneCount": 6,
      "dispatchInspectionInd": 4,
      "dispatchedBy": "null",
      "dispatchDate": "null",
      "shipperId": "null",
      "pickedInd": false,
      "stopDispatchInspectionUser": "EMP88224136459212024",
      "stopDispatchInspectionDate": "2024-07-09T06:11:51.817Z",
      "stopDispatchInspectionUserName": "Test Ku Manager",
      "unloadingAddresses": [
          {
              "addressId": null,
              "addressType": null,
              "address1": null,
              "address2": null,
              "houseNo": null,
              "town": null,
              "street": null,
              "city": "Chamilkens",
              "postalCode": null,
              "country": null,
              "longitude": null,
              "latitude": null,
              "creatorId": null,
              "state": null,
              "employeeId": null,
              "contactPersonId": null,
              "countryCode": null,
              "countryAlpha2Code": null,
              "countryAlpha3Code": null
          }
      ],
      "pickUpAddress": [
          {
              "addressId": "ADIF244566826392024",
              "addressType": null,
              "address1": "",
              "address2": null,
              "houseNo": null,
              "town": null,
              "street": null,
              "city": "",
              "postalCode": null,
              "country": "",
              "longitude": "",
              "latitude": "",
              "creatorId": null,
              "state": "",
              "employeeId": null,
              "contactPersonId": null,
              "countryCode": null,
              "countryAlpha2Code": "IN",
              "countryAlpha3Code": "IND"
          }
      ],
      "dispatchReceivedInd": false,
      "newAwbNo": "null",
      "weight": 0.0,
      "materialCount": 0,
      "inventoryReceiveInd": false,
      "offerPrice": 0.0,
      "finalPrice": 0.0,
      "expectedPrice": 0.0,
      "mismatchOrderInd": false,
      "cannotRepairCount": 0,
      "pickUpDate": "2024-07-08T18:30:00Z",
      "orderCompleteInd": false,
      "pageCount": 6,
      "dataCount": 20,
      "listCount": 102
  },
  {
      "userId": "EMP16818052295222021",
      "orderPhoneId": "ORDPG1567078640632024",
      "locationId": "LDS65468903772222023",
      "orderInventoryLocationLinkId": "OILLG7738984419032024",
      "createAt": "2024-07-03T12:29:20.164Z",
      "activeInd": true,
      "transferInd": 2,
      "phoneCount": 0,
      "count": 0,
      "contactPersonId": "COIG1030765006232024",
      "newOrderNo": "000103072024",
      "inspectionInd": 0,
      "phoneReceiveCount": 5,
      "repairRemainingQuantity": 6,
      "phoneRemainingQuantity": 6,
      "qcStartInd": 3,
      "qcRepairInd": 3,
      "dispatchPhoneCount": 5,
      "dispatchInspectionInd": 4,
      "dispatchedBy": "null",
      "dispatchDate": "null",
      "shipperId": "null",
      "pickedInd": false,
      "stopDispatchInspectionUser": "EMP3230714710282024",
      "stopDispatchInspectionDate": "2024-07-03T13:34:08.966Z",
      "stopDispatchInspectionUserName": "Rakesh sahoo",
      "unloadingAddresses": [
          {
              "addressId": null,
              "addressType": null,
              "address1": null,
              "address2": null,
              "houseNo": null,
              "town": null,
              "street": null,
              "city": null,
              "postalCode": null,
              "country": null,
              "longitude": null,
              "latitude": null,
              "creatorId": null,
              "state": null,
              "employeeId": null,
              "contactPersonId": null,
              "countryCode": null,
              "countryAlpha2Code": null,
              "countryAlpha3Code": null
          }
      ],
      "pickUpAddress": [
          {
              "addressId": "ADIF2753392581032024",
              "addressType": null,
              "address1": "",
              "address2": null,
              "houseNo": null,
              "town": null,
              "street": null,
              "city": "",
              "postalCode": null,
              "country": "",
              "longitude": "",
              "latitude": "",
              "creatorId": null,
              "state": "",
              "employeeId": null,
              "contactPersonId": null,
              "countryCode": null,
              "countryAlpha2Code": "IN",
              "countryAlpha3Code": "IND"
          }
      ],
      "dispatchReceivedInd": false,
      "newAwbNo": "765644",
      "weight": 0.0,
      "materialCount": 0,
      "inventoryReceiveInd": false,
      "offerPrice": 0.0,
      "finalPrice": 0.0,
      "expectedPrice": 0.0,
      "mismatchOrderInd": false,
      "cannotRepairCount": 0,
      "pickUpDate": "2024-07-02T18:30:00Z",
      "orderCompleteInd": false,
      "pageCount": 6,
      "dataCount": 20,
      "listCount": 102
  },
  {
    "userId": "EMP16818052295222021",
    "orderPhoneId": "ORDPG6454078640632024",
    "locationId": "LDS65468903772222023",
    "orderInventoryLocationLinkId": "OILLG7738984419032024",
    "createAt": "2024-07-03T12:29:20.164Z",
    "activeInd": true,
    "transferInd": 2,
    "phoneCount": 0,
    "count": 0,
    "contactPersonId": "COIG1030765006232024",
    "newOrderNo": "000103072024",
    "inspectionInd": 0,
    "phoneReceiveCount": 5,
    "repairRemainingQuantity": 6,
    "phoneRemainingQuantity": 6,
    "qcStartInd": 3,
    "qcRepairInd": 3,
    "dispatchPhoneCount": 5,
    "dispatchInspectionInd": 4,
    "dispatchedBy": "null",
    "dispatchDate": "null",
    "shipperId": "null",
    "pickedInd": false,
    "stopDispatchInspectionUser": "EMP3230714710282024",
    "stopDispatchInspectionDate": "2024-07-03T13:34:08.966Z",
    "stopDispatchInspectionUserName": "Rakesh sahoo",
    "unloadingAddresses": [
        {
            "addressId": null,
            "addressType": null,
            "address1": null,
            "address2": null,
            "houseNo": null,
            "town": null,
            "street": null,
            "city": null,
            "postalCode": null,
            "country": null,
            "longitude": null,
            "latitude": null,
            "creatorId": null,
            "state": null,
            "employeeId": null,
            "contactPersonId": null,
            "countryCode": null,
            "countryAlpha2Code": null,
            "countryAlpha3Code": null
        }
    ],
    "pickUpAddress": [
        {
            "addressId": "ADIF2753392581032024",
            "addressType": null,
            "address1": "",
            "address2": null,
            "houseNo": null,
            "town": null,
            "street": null,
            "city": "",
            "postalCode": null,
            "country": "",
            "longitude": "",
            "latitude": "",
            "creatorId": null,
            "state": "",
            "employeeId": null,
            "contactPersonId": null,
            "countryCode": null,
            "countryAlpha2Code": "IN",
            "countryAlpha3Code": "IND"
        }
    ],
    "dispatchReceivedInd": false,
    "newAwbNo": "null",
    "weight": 0.0,
    "materialCount": 0,
    "inventoryReceiveInd": false,
    "offerPrice": 0.0,
    "finalPrice": 0.0,
    "expectedPrice": 0.0,
    "mismatchOrderInd": false,
    "cannotRepairCount": 0,
    "pickUpDate": "2024-07-02T18:30:00Z",
    "orderCompleteInd": false,
    "pageCount": 6,
    "dataCount": 20,
    "listCount": 102
}
]

  return (
    <>
    
        <div className=' flex justify-end sticky  z-auto'>
          <div class="rounded max-sm:m-1 m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
            <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
              <div className=" w-[12.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.5rem]">
              {translatedMenuItems[0]}
                </div>
              <div className="w-[3.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.5rem]">
               {translatedMenuItems[1]}
                </div>
              <div className="w-[5.01rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.001rem]">
                {translatedMenuItems[2]}
                </div>

              <div className="w-[6.03rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.03rem]">
              {translatedMenuItems[3]}
                </div>
              <div className="w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.3rem]">
                {translatedMenuItems[4]}
                </div>
              <div className=" w-[5.03rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[6.03rem]">
                {translatedMenuItems[5]}
                </div>
              < div className=" w-[6.5rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[5.5rem]">
              {translatedMenuItems[6]}
              </div>
              <div className=" w-[4.10rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.10rem]">
                {translatedMenuItems[7]}
                </div>
              <div className=" w-[3.20rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[4.20rem]">
               {translatedMenuItems[8]}
                </div>
              <div className="w-[3.51rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[3.5rem]">
                {translatedMenuItems[9]}
                </div>
              <div className="w-[0.5%]"></div>
            </div>
            <InfiniteScroll
              dataLength={props.allDispatchList.length}
              // dataLength={AWBtst.length}
               next={handleLoadMore}
               hasMore={hasMore}
               loader={props.fetchingDispatchList ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
              height={"67vh"}
              style={{ overflowX: "hidden", scrollbarWidth:"thin" }}
              endMessage={ <div class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </div>}
            >
              {
              props.allDispatchList.length 
              // AWBtst.length
              ? 
              <>
                {
                props.allDispatchList
                .map((item) => {
                  const currentdate = dayjs().format("DD/MM/YYYY");
                  const date = dayjs(item.createAt).format("DD/MM/YYYY");
                  return (
                    <div>
                      <div className="flex rounded justify-between mt-1 bg-white h-8 items-center p-1 max-sm:h-[7rem] max-sm:flex-col ">
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                          <div className=" flex  w-[7.2rem] max-xl:w-[5.2rem] max-lg:w-[3.7rem] max-sm:w-auto  ">
                            <div class="text-sm flex  font-bold underline font-poppins cursor-pointer  max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm text-blue-600">
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
                          <div className=" flex font-medium  md:w-[4.9rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                        <div class=" text-xs  font-poppins text-center">
                                                            <Badge
                                                                class=" ml-2"
                                                                size="small"
                                                                count={item.awbCount || 0}
                                                                overflowCount={999}
                                                            >
                                                                <Button
                                                                    style={{ boxShadow: "#faad14 1px 2px 0px 0px" }}
                                                                    class=" bg-green-500"
                                                                    onClick={() => {
                                                                        handleCheckAwb();
                                                                        handleSetParticularOrderData(item)
                                                                    }
                                                                    }
                                                                ><span className='!text-[#faad14]'>AWB</span></Button>
                                                            </Badge>
                                                        </div>
                                                    </div>

                        </div>

                        <div class="flex max-sm:justify-between max-sm:w-wk items-center ">


                          <div className=" flex  w-[5.4rem] max-xl:w-[2.6rem] max-lg:w-[2.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs   font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.dispatchPhoneCount}/{item.phoneReceiveCount}
                            </div>
                          </div>
                          <div className=" flex  w-[6.5rem] max-xl:w-[5rem] max-lg:w-[3.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs   font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.dispatchInspectionInd === 0 ?
                                <Button
                                  loading={rowData.orderPhoneId === item.orderPhoneId && props.updatingDispatchInspectionButton}
                                  onClick={() => {
                                    handleRowData(item);
                                    props.updateDispatchInspectionButton({ dispatchInspectionInd: 1 }, item.orderPhoneId, props.locationDetailsId)
                                  }}
                                  style={{ backgroundColor: "#33ad33", color: "white", fontWeight: "500" }}>
                                  Start
                                </Button>
                                : item.dispatchInspectionInd === 2 ||
                                  item.dispatchInspectionInd === 3 ||
                                  item.dispatchInspectionInd === 4 ?
                                  <div class=" text-[green]">Completed</div>
                                  : item.dispatchInspectionInd === 1 ?
                                    <div class=" text-[tomato]">
                                  In Progress
                                    </div> :
                                    null}
                            </div>
                          </div>
                          <div className=" flex  w-[4.8rem] max-xl:w-[4.8rem] max-lg:w-[4.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs   font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.dispatchInspectionInd === 0 || item.dispatchInspectionInd === 1 ?
                                null : <DispatchPackedToggle
                                  locationDetailsId={props.locationDetailsId}
                                  item={item}
                                />}
                            </div>
                          </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
{/* 
                          <div className=" flex  w-[7.76rem] max-xl:w-[4.26rem] max-lg:w-[3.26rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs   font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.unloadingAddresses && item.unloadingAddresses[0].city || ""}
                            </div>
                          </div> */}

                          <div className=" flex  w-[6.78rem] max-xl:w-[4.58rem] max-lg:w-[3.58rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs   font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.shipperName === "null" ? "" : item.shipperName}
                            </div>
                          </div>
                          <div className=" flex  w-[5.51rem] max-xl:w-[4.2rem] max-lg:w-[3.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs   font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.pickUp === "null" ? "" : dayjs(item.pickUp).format("DD-MM-YYYY")}
                            </div>
                          </div>
                        </div>
                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                       
                          <div className=" flex  w-[7.01rem] max-xl:w-[5.01rem] max-lg:w-[3.71rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs   font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {/* {item.unloadingAddresses && item.unloadingAddresses[0].city && item.newAwbNo==="null" ? <Button type="primary"
                                onClick={() => {
                                  handleRowData(item);
                                  props.handleCreateAWB(true)
                                  
                                }}disabled={item.dispatchReceivedInd} >Create AWB</Button> : item.newAwbNo=== "null" ? "" :item.newAwbNo} */}
                            </div>
                          </div>
                    
                          <div className=" flex  w-[5.2rem] max-xl:w-[4.2rem] max-lg:w-[2.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs   font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.status === "null" ? "" : item.status}
                            </div>
                          </div>
                          <div className=" flex  w-[5rem] max-xl:w-[4rem] max-lg:w-[3.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                            <div class=" text-xs   font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                              {item.dispatchInspectionInd === 4 && item.newAwbNo &&
                                <DispatchValidationToggle
                                  locationDetailsId={props.locationDetailsId}
                                  item={item}
                                />}
                            </div>
                          </div>
                          <div class="flex  md:w-[2rem] max-sm:flex-row max-sm:w-[6%]">
                            <div>
                            <Tooltip title="Notes">
                                                        <NoteAltIcon
                                                            className="!text-icon cursor-pointer"
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
                      {checkAwb && (item.orderId === particularRowData.orderId) &&
                   
                                                <SubOrderList orderId={particularRowData.orderId} />
                                            }
                    </div>
                  );
                })}
              </>
                : !props.allDispatchList.length
                  && !props.fetchingDispatchList ? <NodataFoundPage /> : null}
            </InfiniteScroll>
          </div>
        </div>


        <RefurbishNoteAll
                     rowData={rowData}
                     productioNoteModal={props.productioNoteModal}
                    handleProductionNotesModal={props.handleProductionNotesModal}
                    />
      <DispatchPhoneListModalInventory
        rowData={rowData}
        handleInventoryDispatchModal={props.handleInventoryDispatchModal}
        inventoryDispatchModal={props.inventoryDispatchModal}
      />
      <DispatchOrderAwbModal
        rowData={rowData}
        addCreateAwb={props.addCreateAwb}
        handleCreateAWB={props.handleCreateAWB}
      />
    </>
  );
}

const mapStateToProps = ({ shipper, inventory, auth, dispatch,refurbish }) => ({
  allDispatchList: inventory.allDispatchList,
  allShipper: shipper.allShipper,
  inventoryDispatchModal:inventory.inventoryDispatchModal,
  openPickupDateModal: inventory.openPickupDateModal,
  updatingDispatchInspectionButton: inventory.updatingDispatchInspectionButton,
  pickUpModal: inventory.pickUpModal,
  userId: auth.userDetails.userId,
  fetchingDispatchList: inventory.fetchingDispatchList,
  addCreateAwb: inventory.addCreateAwb,
  productioNoteModal: refurbish.productioNoteModal,
  locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllShipper,
      getDispatchList,
      handlePickupDateModal,
      updateDispatchInspectionButton,
      addFinalDispatchData,
      handleCreateAWB,
      handleInventoryDispatchModal,
      handleProductionNotesModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DispatchTable)

