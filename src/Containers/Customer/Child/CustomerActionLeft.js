import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import TocIcon from '@mui/icons-material/Toc';
import PeopleIcon from '@mui/icons-material/People';
import { getCustomerListByUserId } from "../CustomerAction"
import { StyledSelect } from "../../../Components/UI/Antd";
import { Tooltip, Badge, Avatar } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { AudioOutlined } from "@ant-design/icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  inputCustomerDataSearch,
  getRecords,
  ClearReducerDataOfCustomer,
  getCustomerTeamRecords,
  getCustomerAllRecords,
  getCategoryRecords,
} from "../CustomerAction";
import { Input } from "antd";

const Option = StyledSelect.Option;
const { Search } = Input;

const CustomerActionLeft = (props) => {
  const [filter, setFilter] = useState("creationdate")
  const [page, setPage] = useState(0);
  const [searchOnEnter, setSearchOnEnter] = useState(false);
  const [currentData, setCurrentData] = useState("");
  const dummy = ["cloud", "azure", "fgfdg"];
  const handleChange = (e) => {
    setCurrentData(e.target.value);

    if (searchOnEnter && e.target.value.trim() === "") {
      setPage(page + 1);
      props.getCustomerListByUserId(props.userId, page, "creationdate");
      props.ClearReducerDataOfCustomer();
      setSearchOnEnter(false);
    }
  };
  const handleSearch = () => {
    if (currentData.trim() !== "") {
      // Perform the search
      props.inputCustomerDataSearch(currentData);
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
        color: "#1890ff",
      }}
    />
  );
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  useEffect(() => {
    // props.getCustomerRecords();
    if (transcript) {
      console.log(">>>>>>>", transcript);
      setCurrentData(transcript);
    }
  }, [transcript]);
  console.log(transcript);
  function handleFilterChange(data) {
    setFilter(data)
    props.getCustomerListByUserId(props.userId, page, data);
    setPage(page + 1);
  }

  useEffect(() => {
    if (props.viewType === "card") {
      props.getRecords(props.userId);
    } else if (props.viewType === "teams") {
      props.getCustomerTeamRecords(props.userId);
      // props.getCustomerListByUserId("teams", page, "creationdate");
    }
    else if (props.viewType === "all") {
      props.getCustomerAllRecords(props.orgId);
      //props.getCustomerListByUserId("all", page, "creationdate");
    }

    else if (props.viewType === "table") {
      props.getRecords(props.userId);
      //props.getCustomerListByUserId(props.userId, page, "creationdate");
    } else if (props.viewType === "dashboard") {
      props.getCategoryRecords("blue");
    }

    if (transcript) {
      console.log(">>>>>>>", transcript);
      props.setCurrentData(transcript);
    }
  }, [props.viewType, props.userId, transcript]);
  // useEffect(() => {
  //   if (props.viewType === "table") {
  //     props.getCustomerListByUserId(props.userId, page, "creationdate");
  //   } else if (props.viewType === "teams") {
  //     props.getCustomerListByUserId("teams", page, "creationdate");
  //   } 
  //   else if (props.viewType === "all") {
  //     props.getCustomerListByUserId("all", page, "creationdate");
  //   } 

  // }, [])
  const { user } = props;
  return (
    <div class=" flex items-center"
    >
      <Tooltip title={<FormattedMessage id="app.list" defaultMessage="List" />}>
        <Badge
          size="small"
          count={(props.viewType === "table" && props.recordData.customer) || 0}
          overflowCount={999}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setCustomerViewType("table")}
            style={{
              color: props.viewType === "table" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "table" ? "#f279ab" : "#4bc076" }}>
              <TocIcon className="text-white" />
            </Avatar>
          </span>
        </Badge>
      </Tooltip>
      {/* <Tooltip title={<FormattedMessage id="app.card" defaultMessage="Card" />}>
        <Badge
          size="small"
          count={(props.viewType === "card" && props.recordData.customer) || 0}
          overflowCount={999}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setCustomerViewType("card")}
            style={{
              color: props.viewType === "card" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "card" ? "#f279ab" : "#4bc076" }}>
            <GridViewIcon className="text-white"/>
            </Avatar>
          </span>
        </Badge>
      </Tooltip> */}
      {user.teamsAccessInd === true && (
        <Tooltip title="Teams">
          <Badge
            size="small"
            count={(props.viewType === "teams" && props.customerTeamRecordData.CustomerTeam) || 0}
            overflowCount={999}
          >
            <span
              class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.setCustomerViewType("teams")}
              style={{
                color: props.viewType === "teams" && "#1890ff",
              }}
            >
              <Avatar style={{ background: props.viewType === "teams" ? "#f279ab" : "#4bc076" }}>
                <PeopleIcon className="text-white" />
              </Avatar>
            </span>
          </Badge>
        </Tooltip>
      )}
      {(user.crmInd === true && user.customerFullListInd === true || user.role === "ADMIN") && (
        <Tooltip title="All">
          <Badge
            size="All"
            count={(props.viewType === "all" && props.customerAllRecordData.customer) || 0}
            overflowCount={999}
          >
            <span
              class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.setCustomerViewType("all")}
              style={{
                color: props.viewType === "all" && "#1890ff",
              }}
            >
              <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#4bc076" }}>
                <FormattedMessage
                  id="app.all"
                  defaultMessage="ALL"
                />
              </Avatar>

            </span>
          </Badge>
        </Tooltip>
      )}

      {/* <Tooltip
        title={<FormattedMessage id="app.mapview" defaultMessage="Map View" />}
      >
        <Badge
          size="small"
          // count={(props.viewType === "mapView" && props.recordData.customer) || 0}
          overflowCount={999}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setCustomerViewType("mapView")}
            style={{
              color: props.viewType === "mapView" && "#1890ff",
            }}
          >
           <LanguageIcon />
          </span>
        </Badge>
      </Tooltip> */}
      {/* <Tooltip
        title={<FormattedMessage id="app.mapview" defaultMessage="Map View" />}
      >
        <Badge
          size="small"
          count={(props.viewType === "map" && props.recordData.customer) || 0}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            style={{
              color: props.viewType === "map" && "#1890ff",
            }}
            onClick={() => props.setCustomerViewType("map")}
          >
            <LanguageIcon />
          </span>
        </Badge>
      </Tooltip> */}
      <div class=" flex items-center justify-between"
      >
        <div class=" w-72 max-sm:w-24">
          <Input
            placeholder="Search by Name or Sector"

            width={"100%"}
            suffix={suffix}
            onPressEnter={handleSearch}
            onChange={handleChange}
            value={currentData}
          />
        </div>
        <div class="w-[40%] mt-2 ml-2 max-sm:w-[45%]">
          <StyledSelect placeholder={
            <span>
              <FormattedMessage
                id="app.sort"
                defaultMessage="Sort"
              />
            </span>
          } onChange={(e) => props.handleFilterChange(e)}>
            <Option value="CreationDate">Creation Date</Option>
            <Option value="ascending">A To Z</Option>
            <Option value="descending">Z To A</Option>
          </StyledSelect>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ customer, auth, candidate }) => ({
  user: auth.userDetails,
  recordData: customer.recordData,
  customerAllRecordData: customer.customerAllRecordData,
  customerTeamRecordData: customer.customerTeamRecordData,
  recordCategoryData: customer.recordCategoryData,
  recordCategoryDataBlue: customer.recordCategoryDataBlue,
  Candidatesort: candidate.Candidatesort,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputCustomerDataSearch,
      getRecords,
      ClearReducerDataOfCustomer,
      getCustomerTeamRecords,
      getCustomerAllRecords,
      getCategoryRecords,
      getCustomerListByUserId
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomerActionLeft)
);
