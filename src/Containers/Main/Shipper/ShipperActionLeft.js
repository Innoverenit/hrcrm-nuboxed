import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GridViewIcon from '@mui/icons-material/GridView';
import { FlexContainer } from "../../../Components/UI/Layout";
import TocIcon from '@mui/icons-material/Toc';
import { Input, Button, Tooltip,Badge  } from "antd";
import {
  inputDataSearch,
  getRecords,
  getAllRecords,
  getShipperRecords,
  setShipperDashboardType,
  setSelectedTimeInterval,
  setTimeRange,
} from "./ShipperAction";
import {
  DeleteOutlined,
} from "@ant-design/icons";
import { StyledRangePicker } from "../../../Components/UI/Antd";
import { TimeInterval } from "../../../Utils";
import moment from "moment";
import { FormattedMessage } from "react-intl";

const { Search } = Input;

const ShipperActionLeft = (props) => {
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
             <GridViewIcon className="!text-2xl cursor-pointer"  />
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
          >   <TocIcon className="!text-2xl cursor-pointer"   />
          </span>
          </Badge>
        </Tooltip>
   )}
      <Tooltip title="Deleted Shipper">
        <DeleteOutlined
        className="!text-2xl cursor-pointer"
          style={{
            color: props.viewType === "grid" && "red",
          }}
          onClick={() => props.setShipperViewType("grid")}
        />
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
        <Search
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
        
      </Button>
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
      getShipperRecords

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperActionLeft);
