import React, { useEffect, useState,useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlexContainer } from "../../../Components/UI/Layout";
import TocIcon from '@mui/icons-material/Toc';
import { Input, Tooltip, Badge, Avatar } from "antd";
import {
  inputDataSearch,
  getRecords,
  getShipperAllRecords,
  getShipperRecords,
  getShipperDeletedRecords,
  setShipperDashboardType,
  setSelectedTimeInterval,
  setTimeRange,
  getShipperByUserId,
  ClearReducerDataOfShipper
} from "./ShipperAction";
import MicIcon from '@mui/icons-material/Mic';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { StyledRangePicker } from "../../../Components/UI/Antd";
import { TimeInterval } from "../../../Utils";
import dayjs from "dayjs";

const { Search } = Input;

const ShipperActionLeft = (props) => {

  const [currentData, setCurrentData] = useState("");
  const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
  const [pageNo, setPage] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isRecording, setIsRecording] = useState(false); //Code for Search
  const minRecordingTime = 3000; // 3 seconds
  const timerRef = useRef(null);
  const {
    user,
    setShipperDashboardType,
    viewType,
    dateRangeList,
    setSelectedTimeInterval,
    setTimeRange,
    startDate,
    endDate,
  } = props;
  const creationDate = user.creationDate;
  useEffect(() => {
    if (props.viewType === "table") {
      props.getShipperRecords(props.userId);
    } else if (props.viewType === "all") {
      props.getShipperAllRecords(props.orgId);
    }
    else if (props.viewType === "grid") {
      props.getShipperDeletedRecords(props.userId);
    }

  }, [props.viewType, props.userId, props.orgId]);

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

      props.getShipperByUserId(props.userId);
      props.ClearReducerDataOfShipper()
      setSearchOnEnter(false);
    }
  };
  const handleSearch = () => {
    if (currentData.trim() !== "") {
      // Perform the search
     
      if (props.viewType === "table") {
        props.inputDataSearch(currentData,'table');
      } else if (props.viewType === "all") {
        props.inputDataSearch(currentData,'all');
      }
      else if (props.viewType === "grid") {
        props.inputDataSearch(currentData,'grid');
      }
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
      if (props.viewType === "table") {
        props.inputDataSearch(transcript,'table');
      } else if (props.viewType === "all") {
        props.inputDataSearch(transcript,'all');
      }
      else if (props.viewType === "grid") {
        props.inputDataSearch(transcript,'grid');
      }
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
      <Tooltip title={props.translatedMenuItems[17]}>
        <Badge size="small"
          count={props.shippeRecordCount.shipper || 0}
        >
          <span className="mr-2 cursor-pointer text-base"
            style={{         
              color: props.viewType === "table" && "#1890ff",         
            }}
            onClick={() => props.setShipperViewType("table")}
          >
            <Avatar style={{ background: props.viewType === "table" ? "#f279ab" : "#28a355",
                                    boxShadow: props.viewType === "table" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                                      transform: props.viewType === "table" ? "scale(1.05)" : "scale(1)"
             }}>
              <TocIcon className="text-white" />
            </Avatar>
          </span>
        </Badge>
      </Tooltip>
      {user.shipperAccessInd === true && user.erpInd === true && (
        <Tooltip title={props.translatedMenuItems[18]}>
          <Badge size="small"
            count={props.recordAllData.allShipper || 0}
          >
            <span
              style={{
                marginRight: "0.5rem",
                color: props.viewType === "all" && "#1890ff",
                cursor: "pointer",
              }}
              onClick={() => props.setShipperViewType("all")}
            >
              <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#28a355",
                                    boxShadow: props.viewType === "all" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                                      transform: props.viewType === "all" ? "scale(1.05)" : "scale(1)"
               }}>
                {/* ALL */}{props.translatedMenuItems[18]}
              </Avatar>
            </span>
          </Badge>
        </Tooltip>
      )}
      <Tooltip title={`${props.translatedMenuItems[17]}-${props.translatedMenuItems[19]}`}>
        <Badge size="small"
          count={props.recordDeletedData.deletedShipper || 0}
        >
          <Avatar style={{ background: props.viewType === "grid" ? "#f279ab" : "#28a355",
                                    boxShadow: props.viewType === "grid" ? "0 1px 3px 2px rgba(242, 121, 171, 0.7)" : "none",
                                      transform: props.viewType === "grid" ? "scale(1.05)" : "scale(1)"
           }}>
            <DeleteOutlineIcon
              className="!text-sm text-white cursor-pointer"
              style={{
                color: props.viewType === "grid" && "red",
              }}
              onClick={() => props.setShipperViewType("grid")}
            />
          </Avatar>
        </Badge>
      </Tooltip>
      {viewType === "dashboard" && (
        <div class="flex items-center">
          <TimeInterval
            times={dateRangeList}
            handleClick={setSelectedTimeInterval}
          />
          <StyledRangePicker
            style={{ marginLeft: 8 }}
            disabled={
              1
              // organization.subscriptionType === "FREE" ||
              // organization.subscriptionType === "STARTER"
            }
            onChange={(range) => {
              setTimeRange(range[0], range[1]);
              this.handlerangeClick();
            }}
            disabledDate={(date) =>
              dayjs(date).isBefore(creationDate) ||
              dayjs(date).isAfter(dayjs())
            }
          />
        </div>
      )}
      &nbsp;&nbsp;
      <div class="ml-[2.5rem] max-sm:w-20">
        <Input
          placeholder={props.translatedMenuItems[20]}
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
          value={currentData}
        /></div>
    </FlexContainer>
  );
};

const mapStateToProps = ({ auth, shipper }) => ({
  user: auth.userDetails,
  recordData: shipper.recordData,
  recordAllData: shipper.recordAllData,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  dateRangeList: shipper.dateRangeList,
  startDate: shipper.startDate,
  endDate: shipper.endDate,
  shippeRecordCount: shipper.shippeRecordCount,
  recordDeletedData: shipper.recordDeletedData,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputDataSearch,
      getRecords,
      getShipperAllRecords,
      setShipperDashboardType,
      setSelectedTimeInterval,
      setTimeRange,
      getShipperRecords,
      getShipperDeletedRecords,
      getShipperByUserId,
      ClearReducerDataOfShipper

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperActionLeft);
