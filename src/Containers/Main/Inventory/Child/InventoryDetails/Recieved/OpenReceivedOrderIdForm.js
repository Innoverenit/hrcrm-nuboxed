import React, { useEffect, lazy, useState, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Swal from "sweetalert2";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { Button, Tooltip, Input,Badge,Checkbox,Popconfirm } from "antd";
import QRCode from "qrcode.react";
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark'
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import {
  handleReceivedOrderIdPhoneNoteModal,
  updateInspection,
  setEditPhoneData,
  handlereceivePhoneModal,
  getPhonelistByOrderId,
  updateRepairStatus,
  handleInventoryexpand,
  searchOpenOrdeReceived,
  ClearReducerData
} from "../../../InventoryAction";
import { useDispatch } from 'react-redux';
import ReceivedOrderIdPhoneNoteModal from "./ReceivedOrderIdPhoneNoteModal";
import TaskIcon from '@mui/icons-material/Task';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfiniteScroll from "react-infinite-scroll-component";
import { MultiAvatar2 } from "../../../../../../Components/UI/Elements";
import ReceiveValidationToggle from "./ReceiveValidationToggle";
import dayjs from "dayjs";
import ReceivedPhoneModal from "./ReceivedPhoneModal";
import ReactToPrint from "react-to-print";
import { base_url2 } from "../../../../../../Config/Auth";
import PhoneDetailsModal from "../../../../Refurbish/ProductionTab/PhoneDetailsModal";
import { handlePhoneDetails, handleInTagDrawer } from "../../../../Refurbish/RefurbishAction"
import TagInDrawer from "../../../../Refurbish/ProductionTab/TagInDrawer";
import OpenReceivedPlusCard from "./OpenReceivedPlusCard";
import InventoryExpandListModal from "./InventoryExpandListModal";
import NodataFoundPageAccount from "../../../../Account/AccountDetailsTab/AccountOrderTab/NodataFoundPageAccount";
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import MicIcon from '@mui/icons-material/Mic';
import AddBoxIcon from '@mui/icons-material/AddBox';  
import InfoIcon from '@mui/icons-material/Info';
import UpdateIcon from '@mui/icons-material/Update';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const { Search } = Input;

function OpenReceivedOrderIdForm(props) {
  const componentRefs = useRef([]);
  const dispatch = useDispatch();
  const handlePrint = () => {
    window.print();
  };
  const [page, setPage] = useState(0);
  useEffect(() => {
    setPage(page + 1);
    props.getPhonelistByOrderId(props.rowData.orderPhoneId, page)
  }, []);
  const [hasMore, setHasMore] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);

  const [currentData, setCurrentData] = useState("");
  const [searchOnEnter, setSearchOnEnter] = useState(false); 
  const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false); 
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]); // Deselect all
    } else {
      setSelectedItems(props.phoneListById); // Select all
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxChange = (item) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(item)) {
        return prevSelected.filter((selected) => selected !== item);
      } else {
        return [...prevSelected, item];
      }
    });
  };
  const handleBulkReceiveConfirmed = async () => {
    try { 
      const payload = {
        
        mismatchInd:false,
        orderPhoneId:props.rowData.orderPhoneId,
        receivePhoneInd:true,
         receivePhoneDate:dayjs().format("YYYY-MM-DD"),
         receivePhoneUser:props.userId,
      };
      const response = await axios
      .post(`${base_url2}/phone/bulk/phoneReceive`, payload, {
        headers: {
          Authorization: "Bearer " + (sessionStorage.getItem("token") || ""),
        },
      })
      dispatch(getPhonelistByOrderId(props.rowData.orderPhoneId,"0" ));
      dispatch(ClearReducerData());
      console.log("Response:", response.data);
      Swal.fire({
        icon: 'success',
        title: 'Inventory Updated Successfully!',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.error("Error sending selected data:", error);
    }
  };

  const handleLoadMore = () => {
    const callPageMapd = props.phoneListById && props.phoneListById.length &&props.phoneListById[0].pageCount
    setTimeout(() => {
      const {
        getPhonelistByOrderId,
      } = props;
      if  (props.phoneListById)
      {
        if (page < callPageMapd) {
          setPage(page + 1);
          getPhonelistByOrderId(props.rowData.orderPhoneId, page);
      }
      if (page === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };

  const [show, setShow] = useState(false);
  const handleMismatchItem = () => {
    setShow(!show)
  };

  const [pause, setpause] = useState(false)
  function handlePauseResume() {
    setpause(!pause)
  }
  const [particularRowData, setParticularRowData] = useState({});
  function handleSetParticularOrderData(item) {
    setParticularRowData(item);
  }
  const [expand, setExpand] = useState(false);
  const [phoneId, setphoneId] = useState("");

  function handleExpand(phoneId) {
    setExpand(!expand);
    setphoneId(phoneId);
  }
  const onSearch = (value) => console.log(value);

  const [receivePhoneInd, setReceivePhoneInd] = useState({});

 useEffect(() => {
    const initialReceivePhoneInd = {};
    props.phoneListById.forEach(item => {
      if (item.receivePhoneInd) {
        initialReceivePhoneInd[item.phoneId] = true;
      }
    });
    setReceivePhoneInd(initialReceivePhoneInd);
  }, [props.phoneListById]);

  
  const handleReceiveToggleChange = (phoneId, value) => {
    setReceivePhoneInd(prevState => ({
      ...prevState,
      [phoneId]: value
    }));
  };
 const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
      // props.getCustomerRecords();
      if (transcript) {
        console.log(">>>>>>>", transcript);
        setCurrentData(transcript);
      }
      }, [ transcript]);

      const {
          viewType,
          setSuppliesViewType,
          suppliesCount,
          suppliesDeletedCount,
      } = props;

   const handleChange = (e) => {
          setCurrentData(e.target.value);
          if (searchOnEnter&& e.target.value.trim() === "") {  //Code for Search
             props.getPhonelistByOrderId(props.rowData.orderPhoneId, "0");
             props.ClearReducerData();
            setSearchOnEnter(false);
          }
        };
        const handleSearch = () => {
          if (currentData.trim() !== "") {
            // Perform the search
             props.searchOpenOrdeReceived(currentData,props.rowData.orderPhoneId);
            setSearchOnEnter(true);  //Code for Search
          } else {
            console.error("Input is empty. Please provide a value.");
          }
        };
        const handleStartListening = () => {
          setStartTime(Date.now());
          setIsRecording(true);
          SpeechRecognition.startListening();
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          timerRef.current = setTimeout(() => {
            SpeechRecognition.stopListening();
            setIsRecording(false);
          }, minRecordingTime);
        };
        const suffix = (
          <MicIcon
            onClick={handleStartListening}
            style={{
              fontSize: 16,
              color: '#1890ff',
            }}
      
          />
        );

      const handleStopListening = () => {
          SpeechRecognition.stopListening();
          setIsRecording(false);
          if (transcript.trim() !== "") {
            setCurrentData(transcript);
            props.searchOpenOrdeReceived(transcript,props.rowData.orderPhoneId);
            setSearchOnEnter(true);
          }
        };
        useEffect(() => {
          if (!listening && isRecording) {
            handleStopListening();
          }
        }, [listening]);
        useEffect(() => {
          if (isRecording && !listening) {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < minRecordingTime) {
              SpeechRecognition.startListening();
            } else {
              setIsRecording(false);
            }
          }
        }, [listening, isRecording, startTime]);
console.log(selectedItems)
  return (
    <>
      <div class=" flex justify-between">
        <div class=" w-3/6">
        <div className="flex ml-8">
 
            <Button type="primary">
              <DocumentScannerIcon className="!text-icon"/>
              Scan 
            </Button>
            <div>
            <Input
          placeholder="Search by Name "
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
        value={currentData}
        />

            </div>
          </div>
        </div>
        <div class=" w-3/6">
          <div style={{ display: "flex", marginLeft: "20rem" }}>
            {props.rowData.inspectionInd === 1 &&
              <Button type="primary"
                onClick={handlePauseResume}>
                {pause ? "Resume" : "Pause"}</Button>}
            {props.rowData.inspectionInd === 1 &&
           
              <div style={{ marginLeft: '10px' }}> 
           {Object.values(receivePhoneInd).includes(true) && (
                <Button
                  loading={props.updatingInspection}
                  onClick={() => props.updateInspection({
                    inspectionInd: 2,
                    stopInspectionUser: props.userId,
                    stopInspectionDate: dayjs()
                  },
                    props.rowData.orderPhoneId,
                    props.locationDetailsId)}
                  type="primary"
                >Inspection Completed</Button>
              )}
              </div>
                }
          </div>
        </div>
      </div>
      {/* {props.fetchingPhoneListById ? <BundleLoader /> : */}
      <div className='flex justify-center sticky ticky z-10 '>
        <div class="rounded m-1 p-1 w-[100%] h-[88vh] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex  w-[100%]  p-1 bg-transparent font-bold font-poppins !text-lm sticky items-end mt-8 z-10">
          <div className="md:w-[2.01rem]">
          {props.rowData.inspectionInd === 1 && (
          <Popconfirm
          title="Do you want to select all?"
          onConfirm={handleBulkReceiveConfirmed} 
          onCancel={() => setSelectAll(false)}
          okText="Yes"
          cancelText="No"
                    >
          <Tooltip title="Select All">
            <Checkbox checked={selectAll} onChange={handleSelectAll} />
          </Tooltip>
          </Popconfirm>
          )}
          </div>
            <div className="w-[7.20rem] text-[#00A2E8] text-sm  truncate max-md:w-[4.74rem]"><BrandingWatermarkIcon className="!text-icon" /> Brand</div>
            <div className="w-[5.7rem] truncate max-md:w-[6.73rem]"> <ModelTrainingIcon className=" !text-icon" /> Model</div>
            <div className="w-[9.07rem] truncate max-md:w-[8.07rem] ">IMEI</div>
            <div className="w-[8.71rem] truncate max-md:w-[6.71rem]">
            <InfoIcon className=" !text-icon text-[#FCA311]"  />
              Info</div>


            <div className="w-[4.5rem] truncate max-md:w-[6.75rem]">Condition</div>
            <div className="w-[21rem] truncate max-md:w-[20rem]">
            <ConfirmationNumberIcon className=" !text-icon text-[#4F772D]"   />
              Issue</div>
           
            <div className="w-[7.1rem] truncate max-md:w-[9.1rem]">
            <FactCheckIcon className=" !text-icon text-[#8338EC]"  />
             Received
            </div>
           
           
            <div className="w-[7.3rem] truncate max-md:w-[7.3rem]">
             <UpdateIcon className=" !text-icon text-[#EF476F]" />
             Status
            </div>
          </div>
          <div >
            <InfiniteScroll
              dataLength={props.phoneListById.length}
              next={handleLoadMore}
              hasMore={hasMore}
              loader={props.fetchingPhoneListById ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
              height={"77vh"}
              endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
            >
              {props.phoneListById.length === 0 ? <NodataFoundPageAccount /> :props.phoneListById.map((item, index) => {
                 const isSelected = selectedRow === item.phoneId;
                 const allSelect = (phoneId) => selectedItems.includes(phoneId);
                return (
                  <div>
                   <div
      className={`flex rounded mt-1  items-center py-ygap scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ${
        isSelected ? "bg-[#3bf6eb]" : "bg-white"
      }`}
    >
                      <div class="flex">
                      <div className="w-[2rem] max-md:w-[2rem]">
                      {item.inspectionInd === 1 && (
                      <Checkbox
                      checked={selectedItems.includes(item)}
                      
                      onChange={() => handleCheckboxChange(item)}
                    />)}
                      </div>
                        <div className=" flex   border-l-2 py-ygap border-green-500 bg-[#eef2f9] w-[2rem] max-md:w-[2rem] max-sm:flex-row  max-sm:justify-between  ">
                          {item.mismatchInd && <div class=" text-xs  font-poppins">
                             <AddBoxIcon className=" !text-icon  ml-1 items-center text-[#6f0080ad]" onClick={() => {
                              handleMismatchItem();
                              handleSetParticularOrderData(item);
                            }
                            } />
                          </div>}
                        </div>
                        <div className=" flex  items-center justify-start h-8 ml-gap bg-[#eef2f9] md:w-[5.03rem] max-sm:w-full  ">
                        <div class=" text-xs ml-gap font-poppins">
                           {item.company} 
                             </div>
                        </div>

                        <div className=" flex   items-center justify-start h-8 ml-gap bg-[#eef2f9] md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between  ">
                          <div class=" text-xs ml-gap font-poppins">
                            {item.model}
                          </div>

                        </div>
                        <div className=" flex  items-center justify-start h-8 ml-gap bg-[#eef2f9] md:w-[8.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                          <div class=" text-sm ml-gap font-poppins">
                            {item.imei}
                          </div>
                        </div>
                      </div>

                      <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[13.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs  font-poppins text-center">

                          {item.os} {item.gb}  {item.color}
                        </div>
                      </div>

                      <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[5.63rem] max-sm:flex-row w-full max-sm:justify-between truncate ">
                        <div class=" text-xs  font-poppins text-center ">
                          {item.conditions}
                        </div>
                      </div>
                      <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9]  md:w-[12.023rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs  font-poppins text-center">
                        <div class="truncate max-w-[100px] " title={item.issue}>{item.issue}</div>
                        </div>
                      </div>
                  

                      <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[7.06rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs  font-poppins text-center">
                          <Tooltip>
                            {item.inspectionInd === 1 &&
                              <ReceiveValidationToggle
                                orderPhoneId={props.rowData.orderPhoneId}
                                phoneId={item.phoneId}
                                receivePhoneInd={item.receivePhoneInd}
                                inspectionInd={item.inspectionInd}
                                onReceiveToggleChange={handleReceiveToggleChange}
                                />
                            }
                          </Tooltip>
                        </div>
                      </div>

                      <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[10.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs  font-poppins text-center">
                          {item.receivePhoneUserName !== null &&
                            <>
                              <Tooltip title={item.receivePhoneUserName}>
                                <MultiAvatar2
                                  primaryTitle={`${item.receivePhoneUserName} `}
                                  imageURL={item.imageURL}
                                  imgWidth={"1.8rem"}
                                  imgHeight={"1.8rem"}
                                />
                              </Tooltip>
                              &nbsp;
                              {` ${dayjs(item.receivePhoneDate).format("DD-MM-YY")}`}
                            </>
                          }

                        </div>
                      </div>

                      <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[1.09rem]  max-md:w-[1.09rem] max-sm:flex-row  max-sm:justify-between ">
                        <div class=" text-xs  font-poppins text-center">
                          {item.inspectionInd === 1 && item.receivePhoneInd && !item.cannotRepairInd && (
                            <VisibilityIcon
                            className="!text-icon cursor-pointer text-[orange]"
                              onClick={() => {
                                props.setEditPhoneData(item);
                                props.handlereceivePhoneModal(true);
                                handleSetParticularOrderData(item);
                              }
                              }
                            />
                          )
                          }
                        </div>
                      </div>

                      <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[7.08rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs  font-poppins text-center">
                          {item.inspectionInd !== 0 && item.receivePhoneInd &&
                            <>
                              {!item.cannotRepairInd && item.inspectionInd !== 3 ?
                                <Button
                                  type="primary"
                                  loading={particularRowData.phoneId === item.phoneId && props.updatingRepairStatus}
                                  onClick={() => {
                                    handleSetParticularOrderData(item);
                                    props.updateRepairStatus({
                                      cannotRepairInd: true,
                                      orderPhoneId: props.rowData.orderPhoneId
                                    }, item.phoneId)
                                  }}>
                                  Can't Repair
                                </Button> :
                                <Button
                                  type="primary"
                                  loading={particularRowData.phoneId === item.phoneId && props.updatingRepairStatus}
                                  onClick={() => {
                                    handleSetParticularOrderData(item);
                                    props.updateRepairStatus({
                                      cannotRepairInd: false,
                                      orderPhoneId: props.rowData.orderPhoneId
                                    }, item.phoneId)
                                  }}>
                                  Change Status
                                </Button>
                                //   <Tooltip title="Can't Repair">
                                //   <MotionPhotosOffIcon className=" !text-base cursor-pointer text-[tomato]" />
                                // </Tooltip>
                              }
                            </>}
                        </div>
                      </div>
                      <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[1.04rem]  max-md:w-[1.04rem] max-sm:flex-row  max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins">
                          {item.cannotRepairInd && "Can't Repair"}
                        </div>
                      </div>
                      <div className=" flex   items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[5.06rem] max-sm:flex-row w-full max-sm:justify-between  ">
                        <div class=" text-xs  font-poppins">
                          <Tooltip title="Print">

                            <ReactToPrint
                              trigger={() => <Button   type="primary" class=" bg-green-600 cursor-pointer text-gray-50" onClick={handlePrint}><QrCodeIcon className="!text-icon"/> Print QR  </Button>}
                              content={() => componentRefs.current[index]}
                            />
                          </Tooltip>

                        </div>
                      </div>
                      <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[7.53rem] max-xl:w-[4.12rem] max-lg:w-[3.12rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                    <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                        {item.levelCount&&item.levelCount.map((level)=>{
                                                            return(
                                                                <span 
                                                                style={{marginLeft:"9px",cursor:"pointer"}}
                                                                onClick={() => {
                                                                   props.handleRefurbishLevelModal(true);
                                                                   // handleSetCurrentOpportunityId(item);
                                                                 }}
                                                               title={level.level}
                                                               >
                                                                <Badge size="small" count={level.levelCount}>
                                                                {level.level}
                                                                </Badge>
                                                                   {/* {level.levelCount} */}
                                                                   {/* {item.issue.substring(0, 10)}{item.issue.length > 20 && '...'} */}
                                                               </span>
                                                            )
                                                        })}

                                                    </div>
                                                </div>

                      <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[5.01rem] max-sm:flex-row w-full max-sm:justify-between ">
                        {item.receivePhoneInd?(
                        <div class=" text-xs  font-poppins text-center">
                          <Tooltip title="Task">
                            <TaskIcon   className="!text-icon  text-[black]" type="file-done"
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                 handleExpand(item.phoneId);
                                 setSelectedRow(item.phoneId);
                                props.handleInventoryexpand(true);
                              }}
                            />

                          </Tooltip>
                        </div>
                         ):null}
                      </div>
                      <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] md:w-[3.06rem] max-sm:flex-row w-full max-sm:justify-between ">
                        <div class=" text-xs  font-poppins text-center">
                          <Tooltip title="Notes">
                            <NoteAltIcon
                              className="!text-icon cursor-pointer text-[green]"
                           
                              onClick={() => {
                                handleSetParticularOrderData(item);
                                props.handleReceivedOrderIdPhoneNoteModal(true);
                              }}
                            />

                          </Tooltip>
                        </div>
                      </div>
                    </div>
                    {/* 2nd part */}
                    {(show && particularRowData.phoneId === item.phoneId) && 
                    
                    <OpenReceivedPlusCard item={item} />
                    
                    }
                    <div style={{ display: "none", textAlign: "center" }}>

                      <div
                        ref={(el) => (componentRefs.current[index] = el)}
                        style={{
                          fontSize: "16px",
                          marginBottom: "20px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                            height:"-webkit-fill-available",
                                                    justifyContent:"center"
                        }}
                      >

                        <div class="mt-8" style={{ fontSize: "5rem"}}>
                          <QRCode
                            size={150}
                            value={`${base_url2}/supplies/masterName/${item.company}/${item.model}`}
                          />
                        </div>
                        <div style={{ fontSize: "1.5rem" }}><span class="font-bold">IMEI:</span> {item.imei}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </InfiniteScroll>
          </div>


          {/* {expand && (
            <AccountPhoneTaskTable
              phoneId={phoneId}
              //RowData={particularRowData}
              particularRowData={particularRowData} />
          )} */}
           <InventoryExpandListModal   
           phoneId={phoneId}         
                  particularRowData={particularRowData}
                  inventoryExpandList={props.inventoryExpandList}
                  handleInventoryexpand={props.handleInventoryexpand}
                />
          <ReceivedOrderIdPhoneNoteModal
            particularRowData={particularRowData}
            phoNoteReceivedOrderIdModal={props.phoNoteReceivedOrderIdModal}
            handleReceivedOrderIdPhoneNoteModal={props.handleReceivedOrderIdPhoneNoteModal}
          />
          <ReceivedPhoneModal
            handlereceivePhoneModal={props.handlereceivePhoneModal}
            addReceivePhone={props.addReceivePhone}
            orderPhoneId={props.rowData.orderPhoneId}
            particularRowData={particularRowData}
          />
          <PhoneDetailsModal
            handlePhoneDetails={props.handlePhoneDetails}
            showPhoneData={props.showPhoneData}
            phoneId={particularRowData.phoneId}
          />
          <TagInDrawer
            RowData={particularRowData}
            clickTagInDrawr={props.clickTagInDrawr}
            handleInTagDrawer={props.handleInTagDrawer}
          />
        </div>

      </div>
      {/* } */}
    </>
  )
}

const mapStateToProps = ({ inventory, auth, refurbish }) => ({
  phoneListById: inventory.phoneListById,
  fetchingPhoneListById: inventory.fetchingPhoneListById,
  updatingInspection: inventory.updatingInspection,
  phoneListData: inventory.phoneListData,
  userId: auth.userDetails.userId,
  addReceivePhone: inventory.addReceivePhone,
  showPhoneData: refurbish.showPhoneData,
  updatingRepairStatus: inventory.updatingRepairStatus,
  inventoryExpandList: inventory.inventoryExpandList,
  phoNoteReceivedOrderIdModal: inventory.phoNoteReceivedOrderIdModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPhonelistByOrderId,
      handleReceivedOrderIdPhoneNoteModal,
      updateInspection,
      setEditPhoneData,
      handlereceivePhoneModal,
      updateRepairStatus,
      handlePhoneDetails,
      handleInTagDrawer,
      handleInventoryexpand,
      searchOpenOrdeReceived,
      ClearReducerData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OpenReceivedOrderIdForm);
