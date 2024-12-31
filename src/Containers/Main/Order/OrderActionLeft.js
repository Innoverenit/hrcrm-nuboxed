import React, { useEffect, useState,useRef } from "react";
import {  StyledSelect } from "../../../Components/UI/Antd";
import { connect } from "react-redux";
import { Button, Input, Badge, Tooltip, Avatar } from "antd";
import { bindActionCreators } from "redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import HistoryIcon from '@mui/icons-material/History';  
import MicIcon from '@mui/icons-material/Mic';
import { getOrderCount, getAllOrderCount,inputOrderNoSearch,getAllHighOrderList,ClearSearchedOrder,
  getAllMediumOrderList,getAllLowOrderList, getCompletedHighOrderList,
  getCompletedMediumOrderList,
  getCompletedLowOrderList,
 } from "../Order/OrderAction";
import { FlexContainer } from "../../../Components/UI/Layout";

const { Search } = Input;
const Option = StyledSelect.Option;

function OrderActionLeft (props) {
 
  const [currentData, setCurrentData] = useState("");
  const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
  const [pageNo, setPage] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false); //Code for Search
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);

  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);


  // useEffect(() => {
  //   const fetchMenuTranslations = async () => {
  //     try {
  //       setLoading(true); 
  //       const itemsToTranslate = [
  //       "941",  // List View 0
  //       "203",   // Production 1
  //       "667",  // Complete Orders 2
  //       "228",  // ALL 3
  //       "663",   // My Repair Orders 4
  //       "661",   // Repair 5
  //       "664",   // my Repair Orders-Completed 6
  //       "856",   // trade 7 
  //       "1518",   // Ecom 8
  //       "1212",  // Commerce 9
  //       "667",  // Completed Orders 10
  //         "668",  // Cancelled Orders 11
  //         "1280",// Search by OrderId 12
  //        "665",   // My Repair Orders-Deleted
  //       ];

  //       const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
  //       setTranslatedMenuItems(translations);
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       console.error('Error translating menu items:', error);
  //     }
  //   };

  //   fetchMenuTranslations();
  // }, [props.selectedLanguage]);


  useEffect(() => {
    if (props.viewType === "list") {
      props.getOrderCount(props.userId);
    } else if (props.viewType === "all") {
      props.getAllOrderCount();
    }
  }, [props.viewType, props.userId]);

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
  }, [transcript]);
  const handleChange = (e) => {
    setCurrentData(e.target.value);

    if (searchOnEnter && e.target.value.trim() === "") {  //Code for Search
      setPage(pageNo + 1);
    //   props.getRepairHighOrderList(props.userId, pageNo,"High");
    // props.getRepairMediumOrderList(props.userId, pageNo,"Medium");
    // props.getRepairLowOrderList(props.userId, pageNo,"Low");
    //   props.getAllHighOrderList(props.orgId,pageNo,"High");
    //   props.getAllMediumOrderList(props.orgId,pageNo,"Medium");
    //   props.getAllLowOrderList(props.orgId,pageNo,"Low");
    //   props.getCompletedHighOrderList(props.userId, pageNo,"High");
    //   props.getCompletedMediumOrderList(props.userId, pageNo,"Medium");
    //   props.getCompletedLowOrderList(props.userId, pageNo,"Low");
    //   props.getDeletedHighOrderList(props.userId, pageNo,"High");
    //   props.getDeletedMediumOrderList(props.userId, pageNo,"Medium");
    //   props.getDeletedLowOrderList(props.userId, pageNo,"Low");
    //   props.getAllProcure(props.orgId, pageNo);
    //   props.getEcomList(props.orgId, pageNo);
      props.ClearSearchedOrder();
      setSearchOnEnter(false);
    }
  };
  const handleSearch = () => {
    if (currentData.trim() !== "") {
      // Perform the search
      props.inputOrderNoSearch(currentData);
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
      props.inputOrderNoSearch(transcript);
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

  return (
    <FlexContainer alignItems="center">
      <>
      {props.user.moduleMapper.productionInd === true && props.user.moduleMapper.orderManagementInd === true &&  (
      <div className="">
        <Tooltip title={props.translatedMenuItems[0]}>
          <Badge
            size="small"
            count={(props.viewType === "production" && props.orderCount.order) || 0}

            overflowCount={999}
          >

            <span class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.handleViewChange("production")}
              style={{
                color: props.viewType === "production" && "#1890ff",
              }}
            >
              
              <Button type={props.viewType === "production" ? "primary" : ""} style={{ backgroundColor: props.viewType === "production" ? "" : "tomato" }}>
             <div class="text-white ">{props.translatedMenuItems[1]}</div></Button>
            </span>
          </Badge>
        </Tooltip>
        <Tooltip title={props.translatedMenuItems[2]}>
          <Badge
            size="small"
            // count={(props.viewType === "complete" && orderCount.order) || 0}

            overflowCount={999}
          >

            <span class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.handleViewChange("complete")}
              style={{
                color: props.viewType === "complete" && "#1890ff",
              }}
            >
              <Avatar style={{ background: props.viewType === "complete" ? "#f279ab" : "#28a355",
                 boxShadow: props.viewType === "card" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "card" ? "scale(1.05)" : "scale(1)"
               }}>
                <HistoryIcon className="text-white !text-icon" /></Avatar>

            </span>
          </Badge>
        </Tooltip>
        <Tooltip title={props.translatedMenuItems[3]}>
          <Badge
            size="small"
            count={(props.viewType === "productionAll" && props.allOrderCount.order) || 0}

            overflowCount={999}
          >

            <span class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.handleViewChange("productionAll")}
              style={{
                color: props.viewType === "productionAll" && "#1890ff",
              }}
            >
              <Avatar style={{ background: props.viewType === "productionAll" ? "#f279ab" : "#28a355",
                 boxShadow: props.viewType === "card" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "card" ? "scale(1.05)" : "scale(1)"
               }}>
                <div className="text-white ">{props.translatedMenuItems[3]}</div></Avatar>

            </span>
          </Badge>
        </Tooltip>
      </div>
     
     
)}

      <div className=" cursor-pointer">
      {props.user.moduleMapper.repairInd === true && props.user.moduleMapper.orderManagementInd === true && (
        <>
        <Tooltip title={props.translatedMenuItems[4]}>
          <Badge
            size="small"
            count={(props.viewType === "list" && props.orderCount.order) || 0}

            overflowCount={999}
          >

            <span class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.handleViewChange("list")}
              style={{
                color: props.viewType === "list" && "#1890ff",
              }}
            >
              {/* <Avatar style={{ background: props.viewType === "list" ? "#f279ab" : "#28a355" }}>
                <TocIcon className="text-white" /></Avatar> */}
<Button type={props.viewType === "list" ? "primary" : ""} style={{ backgroundColor: props.viewType === "list" ? "" : "tomato",
      boxShadow: props.viewType === "card" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "card" ? "scale(1.05)" : "scale(1)"
 }}>
                
                <div class="text-white ">{props.translatedMenuItems[5]}</div></Button>
                
            </span>
          </Badge>
        </Tooltip>
      
        <Tooltip title={props.translatedMenuItems[6]}>
          <Badge
            size="small"
            // count={(props.viewType === "allcomplete" && orderCount.order) || 0}

            overflowCount={999}
          >

            <span class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.handleViewChange("allcomplete")}
              style={{
                color: props.viewType === "allcomplete" && "#1890ff",
              }}
            >
              <Avatar style={{ background: props.viewType === "allcomplete" ? "#f279ab" : "#28a355",
                    boxShadow: props.viewType === "card" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "card" ? "scale(1.05)" : "scale(1)"
               }}>
                <HistoryIcon className="text-white !text-icon" /></Avatar>

            </span>
          </Badge>
        </Tooltip>
        <Tooltip title= {props.translatedMenuItems[13]}>
                {/* <Badge
          size="small"
          count={(props.viewType === "delete" && props.deletedCountSupplier.deletedSupplier) || 0}
          overflowCount={999}
        > */}
                    <span class=" mr-2 text-sm cursor-pointer"
                        onClick={() => props.handleViewChange("delete")}
                        style={{
                            color: props.viewType === "delete" && "#1890ff",
                        }}
                    >
                        <Avatar style={{ background: props.viewType === "delete" ? "#f279ab" : "#28a355",
                              boxShadow: props.viewType === "card" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "card" ? "scale(1.05)" : "scale(1)"
                         }}>
                       <DeleteOutlineIcon ClassName="!text-icon text-[tomato] cursor-pointer"  /></Avatar>

                    </span>
                    {/* </Badge> */}
                </Tooltip>
                {props.user.erpInd === true && props.user.repairInd === true && props.user.orderFullListInd === true && props.user.orderManagementInd === true && (  
                <>
                <Tooltip title={props.translatedMenuItems[3]}>
          <Badge
            size="small"
            count={(props.viewType === "all" && props.allOrderCount.order) || 0}

            overflowCount={999}
          >

            <span class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.handleViewChange("all")}
              style={{
                color: props.viewType === "all" && "#1890ff",
              }}
            >
              <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#28a355" ,
                    boxShadow: props.viewType === "card" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "card" ? "scale(1.05)" : "scale(1)"
              }}>
                <div className="text-white ">{props.translatedMenuItems[3]}</div></Avatar>

            </span>
          </Badge>
        </Tooltip>
        </>
      )}
                </>
              )}
          {props.user.moduleMapper.tradingInd === true && props.user.moduleMapper.orderManagementInd === true &&  (
            <>
            <Tooltip title={props.translatedMenuItems[7]}>
            {/* <Badge
              size="small"
              count={(props.viewType === "list" && props.orderCount.order) || 0}
  
              overflowCount={999}
            > */}
  
              <span class=" mr-1 text-sm cursor-pointer"
                onClick={() => props.handleViewChange("procure")}
                style={{
                  color: props.viewType === "procure" && "#1890ff",
                }}
              >         
  <Button type={props.viewType === "procure" ? "primary" : ""} style={{ backgroundColor: props.viewType === "procure" ? "" : "tomato" }}>
                  
                  <div class="text-white ">{props.translatedMenuItems[7]}</div></Button>
                  
              </span>
            {/* </Badge> */}
          </Tooltip>
          </>
          )}     
         {props.user.moduleMapper.ecomModInd === true && props.user.moduleMapper.orderManagementInd === true &&  (
          <>     
        
        <Tooltip title={props.translatedMenuItems[8]}>

<span class=" mr-1 text-sm cursor-pointer"
  onClick={() => props.handleViewChange("ecom")}
  style={{
    color: props.viewType === "ecom" && "#1890ff",
  }}
>         
<Button type={props.viewType === "ecom" ? "primary" : ""} style={{ backgroundColor: props.viewType === "ecom" ? "" : "tomato" }}>
    
    <div class="text-white">{props.translatedMenuItems[9]}</div></Button>
    
</span>

</Tooltip>
        <Tooltip title={props.translatedMenuItems[10]}>
          {/* <Badge
            size="small"
            count={(props.viewType === "list" && props.orderCount.order) || 0}

            overflowCount={999}
          > */}

            <span class=" mr-2 text-sm cursor-pointer"
              onClick={() => props.handleViewChange("completedorders")}
              style={{
                color: props.viewType === "completedorders" && "#1890ff",
              }}
            >         
<Avatar style={{ backgroundColor: props.viewType === "completedorders" ? "#f279ab" : "#28a355" ,
      boxShadow: props.viewType === "card" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "card" ? "scale(1.05)" : "scale(1)"
}}>
                
<HistoryIcon  className="text-white !text-icon" /> </Avatar>
                
            </span>
          {/* </Badge> */}
        </Tooltip>

        <Tooltip title={props.translatedMenuItems[11]}>
          {/* <Badge
            size="small"
            count={(props.viewType === "list" && props.orderCount.order) || 0}

            overflowCount={999}
          > */}

            <span class=" mr-2 text-sm cursor-pointer"
              onClick={() => props.handleViewChange("cancelledorders")}
              style={{
                color: props.viewType === "cancelledorders" && "#1890ff",
              }}
            >         
<Avatar  style={{ backgroundColor: props.viewType === "cancelledorders" ? "#f279ab" : "#28a355",
      boxShadow: props.viewType === "card" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                  transform: props.viewType === "card" ? "scale(1.05)" : "scale(1)"
 }}>
                
<DeleteOutlineIcon className="text-white !text-icon" /></Avatar>
                
            </span>
          {/* </Badge> */}
        </Tooltip>
        </> 
  )}
      
      </div>
     
  
     
    
      <div class=" w-72 md:ml-4 max-sm:w-16 ml-0">
          <Input
            placeholder={props.translatedMenuItems[12]}
            class="w-96"
            suffix={suffix}
            onPressEnter={handleSearch}
            onChange={handleChange}
            value={currentData}
          />
        </div>
        </>
    </FlexContainer>
  );
};

const mapStateToProps = ({ auth, order }) => ({
  user: auth.userDetails,
  orderCount: order.orderCount,
  allOrderCount: order.allOrderCount,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getOrderCount,
  getAllOrderCount,
  inputOrderNoSearch,
  getAllHighOrderList,
  ClearSearchedOrder,
  getAllMediumOrderList,
  getAllLowOrderList,
  getCompletedHighOrderList,
  getCompletedMediumOrderList,
  getCompletedLowOrderList,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(OrderActionLeft);
