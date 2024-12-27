
import React, { useEffect, useState, lazy, Suspense,useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MultiAvatar, MultiAvatar2 } from "../../../Components/UI/Elements";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { Tooltip, Button, Badge,Input } from "antd";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
    getProductionOrderId,
    getProductionUrgent,
    getProductionHigh,
    getProductionNormal,
    handleProductionNotesModal,
    handleAssignOrderById,
    handleAssignRepairModal,
    handleTechnicianModal,
    handlePhoneByTechnician,
    handleOrderPhone,
    updateFinalPrice,
    handleProductBuilder,
    handleAllSpareList,
    handleRefurbishLead,
    refurbishRejectPhone,
    inputAllDataSearch,
    ClearSearchedDataOfAll
} from "./RefurbishAction";

import dayjs from "dayjs";
import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';

import { BundleLoader } from "../../../Components/Placeholder";
import CategoryIcon from '@mui/icons-material/Category'
import InfiniteScroll from "react-infinite-scroll-component";
import { BorderColorOutlined, PersonAddAlt1 } from "@mui/icons-material";
import AddLeadInRefurbish from "./AddLeadInRefurbish";
import RefurbishRejectModal from "./RefurbishRejectModal";
const TechnicianModal = lazy(() => import("./TechnicianModal"));
const AssignOrderModal = lazy(() => import("./AssignOrderModal"));
const AddAssignRepairModal = lazy(() => import("./AddAssignRepairModal"));
const AllSpareListByOrder = lazy(() => import("./AllSpareListByOrder"));
const ShowProductBuilderModal = lazy(() => import("./ShowProductBuilderModal"));

const SearchedDataRefurbish = (props) => {
    const [rowData, setRowData] = useState({})
    const handleRowData = (item) => {
        setRowData(item)
    }
    const [pageNo, setPageNo] = useState(0);
    const [currentData, setCurrentData] = useState("");
    const [searchOnEnter, setSearchOnEnter] = useState(false);
    const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false); //Code for Search
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);
    useEffect(() => {
        setPageNo(pageNo + 1);
        props.getProductionOrderId(props.userId,pageNo)
        props.getProductionUrgent(props.userId,pageNo,"High")
        props.getProductionHigh(props.userId,pageNo,"Medium")
        props.getProductionNormal(props.userId,pageNo,"Low")
    }, [])
    const [hasMore, setHasMore] = useState(true);
    // const handleLoadMore = () => {
    //     setPageNo(pageNo + 1);
    //     props.getProductionOrderId(props.userId)
    // };

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
    
      const handleChange = (e) => {
        setCurrentData(e.target.value);
    
        if (searchOnEnter&&e.target.value.trim() === "") {  //Code for Search
          //setPage(pageNo + 1);
          props.getProductionOrderId(props.userId,pageNo)
          //props.ClearReducerDataOfLead()
          props.ClearSearchedDataOfAll()
          setSearchOnEnter(false);
        }
      };
      const handleSearch = () => {
        if (currentData.trim() !== "") {
          // Perform the search
          props.inputAllDataSearch(currentData);
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
          props.inputAllDataSearch(transcript);
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
          // If recording was stopped but less than 5 seconds have passed, restart listening
          const elapsedTime = Date.now() - startTime;
          if (elapsedTime < minRecordingTime) {
            SpeechRecognition.startListening();
          } else {
            setIsRecording(false);
          }
        }
      }, [listening, isRecording, startTime]);




    const handleLoadMore = () => {
        const callPageMapd = props.productionUrgent && props.productionUrgent.length &&props.productionUrgent[0].pageCount
        setTimeout(() => {
          const {
            getProductionUrgent,
           // userDetails: { employeeId },
          } = props;
          if  (props.productionUrgent)
          {
            if (pageNo < callPageMapd) {
                setPageNo(pageNo + 1);
                getProductionUrgent(props.userId,pageNo,"High"); 
          }
          if (pageNo === callPageMapd){
            setHasMore(false)
          }
        }
        }, 100);
      };

      const handleLoadMore1 = () => {
        const callPageMapd = props.productionHigh && props.productionHigh.length &&props.productionHigh[0].pageCount
        setTimeout(() => {
          const {
            getProductionHigh,
           // userDetails: { employeeId },
          } = props;
          if  (props.productionOrder)
          {
            if (pageNo < callPageMapd) {
                setPageNo(pageNo + 1);
                getProductionHigh(props.userId,pageNo,"Medium"); 
          }
          if (pageNo === callPageMapd){
            setHasMore(false)
          }
        }
        }, 100);
      };

      const handleLoadMore2 = () => {
        const callPageMapd = props.productionNormal && props.productionNormal.length &&props.productionNormal[0].pageCount
        setTimeout(() => {
          const {
            getProductionNormal,
           // userDetails: { employeeId },
          } = props;
          if  (props.productionNormal)
          {
            if (pageNo < callPageMapd) {
                setPageNo(pageNo + 1);
                getProductionNormal(props.userId,pageNo,"Low"); 
          }
          if (pageNo === callPageMapd){
            setHasMore(false)
          }
        }
        }, 100);
      };
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(props.productionOrder)
    }, [props.productionOrder])



    return (
        <div>
            
        <>
            <div className=' flex justify-end sticky  z-auto'>
                <div class="rounded-lg  max-sm:m-1 m-2 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
               
                    <div className=" flex max-sm:hidden  justify-between w-[82%] p-2 bg-transparent font-bold sticky top-0 z-10">
                    <div className=" md:w-[3.54rem] text-[white] flex justify-center mr-1 bg-[black]">Type </div>
                        <div className=" w-[15.9rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">orderid</div>
                        <div className=" w-[14.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">customer</div>
                        <div className=" w-[5.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">contact</div>
                        <div className="w-[3.621rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Lead </div>
                        <div className="w-[6.62rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Assigned </div>
                        <div className="w-[4.81rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">owner </div>

                        <div className="w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Quoted</div>
                        <div className="md:w-[5.8rem]"> Final</div>
                        <div className="w-[21.7rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Delivery</div>
                        <div className="w-[7.2rem]"></div>
                    </div>
                    {/* <InfiniteScroll
                        dataLength={props.productionUrgent.length}
                        next={handleLoadMore}
                        hasMore={hasMore}
                        loader={props.fetchingProductionUrgent ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                        height={"22vh"}
                        style={{ overflowX: "hidden" }}
                        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
                    > */}
                        {props.searchRefurbish.map((item) => {
                            const currentdate = dayjs().format("DD/MM/YYYY");
                            const date = dayjs(item.createAt).format("DD/MM/YYYY");
                            return (
                                <div>
                                    <div className="flex rounded  mt-1 bg-white h-8 items-center justify-between p-1  max-sm:h-[8rem] max-sm:flex-col" >
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                        <div className=" flex font-medium items-center md:w-[3.26rem] max-sm:w-full  ">
                                                        <Tooltip>
                                                            <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                                <div class=" text-sm text-blue-500  font-poppins font-semibold  cursor-pointer">

                                                                    {item.priority === "High" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[red]"></div>
                                                                    )}
                                                                    {item.priority === "Medium" && (
                                                                        <div
                                                                            class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[orange]"></div>)}
                                                                    {item.priority === "Low" && (
                                                                        <div class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[teal]"></div>)}
                                                                </div>
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                                            <div className=" flex font-medium  w-[9.7rem] max-sm:w-auto ">
                                                <Badge size="small" count={`${item.receiveRemainingQuantity} / ${item.phoneCount}`} overflowCount={5000}>
                                                    <span
                                                        class="underline text-[#1890ff] cursor-pointer w-[7rem] flex max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs"
                                                        onClick={() => {
                                                            handleRowData(item);
                                                            props.handleProductBuilder(true)
                                                        }}>
                                                        {item.newOrderNo}
                                                    </span>
                                                </Badge>
                                                &nbsp;&nbsp;
                                                {date === currentdate ? (
                                                    <span
                                                        class="text-[tomato] font-bold">
                                                        New
                                                    </span>
                                                ) : null}
                                            </div>
                                           
                                            <div className=" flex font-medium   w-[10.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between  ">
                                                <div class=" text-xs  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.distributorName}
                                                </div>

                                            </div>
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium  w-[3.6rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">

                                                    <MultiAvatar2
                                                        primaryTitle={item.contactPersonName}
                                                        imgWidth={"2.1em"}
                                                        imgHeight={"2.1em"}
                                                    />
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  w-[3.53rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.teamLeadUserName && <MultiAvatar
                                                        primaryTitle={item.teamLeadUserName}
                                                        imgWidth={"2.1em"}
                                                        imgHeight={"2.1em"}
                                                    />}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  w-[3.84rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">

                                                    {item.supervisorUserName && <MultiAvatar
                                                        primaryTitle={item.supervisorUserName}
                                                        imgWidth={"2.1em"}
                                                        imgHeight={"2.1em"}
                                                    />}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  w-[3.7rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-sm  font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">

                                                    {item.userName && <MultiAvatar
                                                        primaryTitle={item.userName}
                                                        imgWidth={"2.1em"}
                                                        imgHeight={"2.1em"}
                                                    />}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium  w-[3.61rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.expectedPrice}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  w-[3.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                   {item.payableOfferPrice} 
                                                </div>
                                            </div>

                                            <div className=" flex font-medium  w-[5.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {dayjs(item.deliveryDate).format("DD-MM-YYYY")}
                                                </div>
                                            </div>
                                            {/* <div className=" flex font-medium  w-[4.61rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.suggestedPrice}
                                                </div>
                                            </div> */}
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">

                                            <div className=" flex font-medium  w-[9.22rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.qcStartInd === 0 ? <div class=" font-bold text-[#ff1862] text-xs text-center">QC to be approved by Sales Owner / Customer </div>
                                                        : item.qcStartInd === 1 ?
                                                            // <Badge size="small" count={`${item.totalReceiveQuantity - item.cannotRepairCount} / ${item.totalReceiveQuantity}`} overflowCount={5000}>
                                                            <Tooltip title="Assign For QC">
                                                                <Button
                                                                    className="bg-[#1685e6] text-white"
                                                                    onClick={() => {
                                                                        props.handleAssignOrderById(true);
                                                                        handleRowData(item);
                                                                    }}
                                                                >Assign For QC </Button>
                                                            </Tooltip>
                                                            // </Badge>
                                                            : item.qcStartInd === 2 ? <b style={{ color: "#ff6347" }}>QC Assigned</b>
                                                                : item.qcStartInd === 3 ? <b style={{ color: "#32CD32" }}>
                                                                    QC <CheckCircleIcon className="!text-[#03c04a]" />
                                                                    {dayjs(item.qcEndTime).format("DD-MM-YYYY")}</b> : null}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  w-[9.12rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.qcRepairInd === 1 ?
                                                        <Tooltip title="Assign For Repair">
                                                            <Button
                                                                className="bg-[#1685e6] text-white"
                                                                onClick={() => {
                                                                    props.handleAssignRepairModal(true);
                                                                    handleRowData(item);
                                                                }}
                                                            >Assign For Repair</Button>
                                                        </Tooltip>
                                                        : item.qcRepairInd === 2 ? <b style={{ color: "#ff6347" }}>Repair Assigned</b>
                                                            : item.qcRepairInd === 3 ? <b style={{ color: "#32CD32" }}>Repair
                                                                <CheckCircleIcon className="!text-[#03c04a]" /> {dayjs(item.repairEndTime).format("DD-MM-YYYY")}</b> : null}
                                                </div>
                                            </div>
                                            <div className=" flex font-medium  w-[4.22rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-xs  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    {item.rejectOrderCount > 0 &&
                                                        <Tooltip title="Reject">
                                                            <Badge size="small" count={`${item.rejectOrderCount} `} overflowCount={3000}>
                                                                <Button
                                                                    className="bg-[#1685e6] text-white"
                                                                    onClick={() => {
                                                                        props.refurbishRejectPhone(true);
                                                                        handleRowData(item);
                                                                    }}
                                                                >Reject</Button>
                                                            </Badge>
                                                        </Tooltip>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                            <div className=" flex font-medium  w-[1.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-base  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
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
                                            <div className=" flex font-medium  w-[1.5rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                <div class=" text-base  font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-xs">
                                                    <Tooltip title="Update">
                                                        <BorderColorOutlined
                                                            className="!text-icon cursor-pointer"
                                                            onClick={() => {
                                                                props.handleTechnicianModal(true)
                                                                handleRowData(item);
                                                            }}
                                                        />
                                                    </Tooltip>
                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col w-[1.5rem] max-sm:flex-row  max-sm:justify-between  ">
                                                <h4 class=" text-xs  font-poppins">
                                                    <Tooltip title="Add Lead">
                                                        <PersonAddAlt1
                                                            className="!text-icon cursor-pointer"
                                                            style={{ color: item.supervisorUserName ? "green" : "red" }}
                                                            onClick={() => {
                                                                props.handleRefurbishLead(true)
                                                                handleRowData(item)
                                                            }} />
                                                    </Tooltip>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    {/* </InfiniteScroll> */}
                </div>
</div>






                <Suspense fallback={<BundleLoader />}>
                    <AssignOrderModal
                        handleAssignOrderById={props.handleAssignOrderById}
                        assignOrderById={props.assignOrderById}
                        rowData={rowData}
                    />
                    <AllSpareListByOrder
                        handleAllSpareList={props.handleAllSpareList}
                        approveSpareModal={props.approveSpareModal}
                        rowData={rowData} />
                    <AddAssignRepairModal
                        handleAssignRepairModal={props.handleAssignRepairModal}
                        showAssignRepairModal={props.showAssignRepairModal}
                        rowData={rowData}
                    />
                    <ShowProductBuilderModal
                        rowData={rowData}
                        productBuilderList={props.productBuilderList}
                        handleProductBuilder={props.handleProductBuilder} />
                    <TechnicianModal
                        handleTechnicianModal={props.handleTechnicianModal}
                        showTechnicianModal={props.showTechnicianModal}
                        rowData={rowData}
                    />
                    <AddLeadInRefurbish
                        rowData={rowData}
                        showRefurbishLead={props.showRefurbishLead}
                        handleRefurbishLead={props.handleRefurbishLead}
                    />
                    <RefurbishRejectModal
                        rowData={rowData}
                        refurbhsReject={props.refurbhsReject}
                        refurbishRejectPhone={props.refurbishRejectPhone}
                    />
                </Suspense>
            
        </>
      
        </div>
    )

}


const mapStateToProps = ({ refurbish, auth }) => ({
    showTechnicianModal: refurbish.showTechnicianModal,
    productionOrder: refurbish.productionOrder,
    addOrderPhone: refurbish.addOrderPhone,
    fetchingProductionOrederId: refurbish.fetchingProductionOrederId,
    productioNoteModal: refurbish.productioNoteModal,
    assignOrderById: refurbish.assignOrderById,
    phoneByTechnician: refurbish.phoneByTechnician,
    showAssignRepairModal: refurbish.showAssignRepairModal,
    userId: auth.userDetails.userId,
    approveSpareModal: refurbish.approveSpareModal,
    productBuilderList: refurbish.productBuilderList,
    showRefurbishLead: refurbish.showRefurbishLead,
    refurbhsReject: refurbish.refurbhsReject,
    productionUrgent: refurbish.productionUrgent,
    productionHigh: refurbish.productionHigh,
    productionNormal: refurbish.productionNormal,
    fetchingProductionUrgent: refurbish.fetchingProductionUrgent,
    fetchingProductionHigh: refurbish.fetchingProductionHigh,
    fetchingProductionNormal: refurbish.fetchingProductionNormal,
    searchRefurbish: refurbish.searchRefurbish
    
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionOrderId,
            handleProductionNotesModal,
            handleAssignOrderById,
            handleAssignRepairModal,
            handleTechnicianModal,
            handleProductBuilder,
            handlePhoneByTechnician,
            handleOrderPhone,
            updateFinalPrice,
            handleAllSpareList,
            handleRefurbishLead,
            refurbishRejectPhone,
            inputAllDataSearch,
            ClearSearchedDataOfAll,
            getProductionUrgent,
            getProductionHigh,
            getProductionNormal,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(SearchedDataRefurbish)

