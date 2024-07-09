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
import {
  DeleteOutlined, AudioOutlined
} from "@ant-design/icons";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { StyledRangePicker } from "../../../Components/UI/Antd";
import { TimeInterval } from "../../../Utils";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";

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
    <AudioOutlined
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
      <Tooltip title="My Shippers">
        <Badge size="small"
          count={props.shippeRecordCount.shipper || 0}
        >
          <span
            style={{
              marginRight: "0.5rem",
              color: props.viewType === "table" && "#1890ff",
              fontSize: "17px",
              cursor: "pointer",
            }}
            onClick={() => props.setShipperViewType("table")}
          >
            <Avatar style={{ background: props.viewType === "table" ? "#f279ab" : "#4bc076" }}>
              <TocIcon className="text-white" />
            </Avatar>
          </span>
        </Badge>
      </Tooltip>
      {user.shipperAccessInd === true && user.erpInd === true && (
        <Tooltip title="All">
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
              <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#4bc076" }}>
                ALL
              </Avatar>
            </span>
          </Badge>
        </Tooltip>
      )}
      <Tooltip title="My Shippers-Deleted">
        <Badge size="small"
          count={props.recordDeletedData.deletedShipper || 0}
        >
          <Avatar style={{ background: props.viewType === "grid" ? "#f279ab" : "#4bc076" }}>
            <DeleteOutlined
              className="!text-sm text-white cursor-pointer"
              style={{
                color: props.viewType === "grid" && "red",
              }}
              onClick={() => props.setShipperViewType("grid")}
            />
          </Avatar>
        </Badge>
      </Tooltip>
      {/* <Tooltip title="Dashboard View">
        <AreaChartOutlined
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "dashboard" && "#1890ff",
          }}
          onClick={() => props.setShipperViewType("dashboard")}
        />
      </Tooltip> */}
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
          placeholder="Search by Name or Sector"
          width={"100%"}
          suffix={suffix}
          onPressEnter={handleSearch}
          onChange={handleChange}
          value={currentData}
        /></div>
      {/* <Search
          placeholder="Search By Name"
          onSearch={(value) => {
            props.inputDataSearch(value);
            props.setCurrentData(value);
          }}
          allowClear
          enterButton
        />
      </div>
      &nbsp; &nbsp;
      <Button
        type={props.currentData ? "primary" : "default"}
        onClick={props.handleClear}
      >
        <FormattedMessage id="app.clear" defaultMessage="Clear"/>
        
      </Button> */}

      {/* &nbsp; &nbsp;
      {props.viewType === "table" ? (
        <div style={{ fontSize: "15px", fontWeight: "bold", color: "tomato" }}>
          # Records - {props.recordData.shipper || 0}{" "}
        </div>
      ) : props.viewType === "all" ? (
        <div style={{ fontSize: "15px", fontWeight: "bold", color: "tomato" }}>
          # Records - {props.recordAllData.shipper || 0}{" "}
        </div>
      ) : null} */}
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
