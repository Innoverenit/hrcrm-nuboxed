import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GridViewIcon from '@mui/icons-material/GridView';
import { FlexContainer } from "../../../Components/UI/Layout";
import TocIcon from '@mui/icons-material/Toc';
import { Input, Button, Tooltip,Badge,Avatar  } from "antd";
import {
  inputDataSearch,
  getRecords,
  getAllRecords,
  getShipperRecords,
  setShipperDashboardType,
  setSelectedTimeInterval,
  setTimeRange,
  getShipperByUserId
} from "./ShipperAction";
import {
  DeleteOutlined,AudioOutlined
} from "@ant-design/icons";
import SpeechRecognition, { useSpeechRecognition} from 'react-speech-recognition';
import { StyledRangePicker } from "../../../Components/UI/Antd";
import { TimeInterval } from "../../../Utils";
import moment from "moment";
import { FormattedMessage } from "react-intl";

const { Search } = Input;

const ShipperActionLeft = (props) => {

  const [currentData, setCurrentData] = useState("");
  const [searchOnEnter, setSearchOnEnter] = useState(false);  //Code for Search
  const [pageNo, setPage] = useState(0);

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
      props.getAllRecords();
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
    }, [ transcript]);
    const handleChange = (e) => {
      setCurrentData(e.target.value);
  
      if (searchOnEnter&&e.target.value.trim() === "") {  //Code for Search
        
        props.getShipperByUserId(props.userId);
        props.ClearReducerDataOfLead()
        setSearchOnEnter(false);
      }
    };
    const handleSearch = () => {
      if (currentData.trim() !== "") {
        // Perform the search
        props.inputDataSearch(currentData);
        setSearchOnEnter(true);  //Code for Search
      } else {
        console.error("Input is empty. Please provide a value.");
      }
    };
    const suffix = (
      <AudioOutlined
        onClick={SpeechRecognition.startListening}
        style={{
          fontSize: 16,
          color: '#1890ff',
        }}
  
      />
    );
  return (
    <FlexContainer alignItems="center">
      <Tooltip title="List View">
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
      { user.shipperAccessInd === true && user.erpInd === true  && (
        <Tooltip title="All Shipper">
           <Badge size="small" 
            count={props.recordAllData.shipper || 0}
            >
          <span
            style={{
              marginRight: "0.5rem",
              color: props.viewType === "all" && "#1890ff",
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
      <Tooltip title="Deleted Shipper">
      <Avatar style={{ background: props.viewType === "grid" ? "#f279ab" : "#4bc076" }}>
        <DeleteOutlined
        className="!text-2xl cursor-pointer"
          style={{
            color: props.viewType === "grid" && "red",
          }}
          onClick={() => props.setShipperViewType("grid")}
        />
        </Avatar>
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
              moment(date).isBefore(creationDate) ||
              moment(date).isAfter(moment())
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
  dateRangeList: shipper.dateRangeList,
  startDate: shipper.startDate,
  endDate: shipper.endDate,
  shippeRecordCount:shipper.shippeRecordCount,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputDataSearch,
      getRecords,
      getAllRecords,
      setShipperDashboardType,
      setSelectedTimeInterval,
      setTimeRange,
      getShipperRecords,
      getShipperByUserId

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperActionLeft);
