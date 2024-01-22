import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Tooltip, Badge } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import DeleteIcon from "@mui/icons-material/Delete";
import { CheckCircleTwoTone } from "@ant-design/icons";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  inputOpportunityDataSearch,
  getRecords,
  getOpportunityTeamRecords,
  getDeleteRecords,
  getcloseRecords,
  getlostRecords,
  getWonRecords
} from "../OpportunityAction";
import PeopleIcon from '@mui/icons-material/People';
import { StopTwoTone, TableOutlined } from "@ant-design/icons";


const OpportunityActionLeft = (props) => {
  const dummy = ["cloud", "azure", "fgfdg"];

  useEffect(() => {
    if (props.viewType === "table") {
      props.getRecords(props.userId);
    } else if (props.viewType === "dashboard") {
      props.getDeleteRecords(props.userId);
    } else if (props.viewType === "close") {
      props.getcloseRecords(props.userId);
    } else if (props.viewType === "lost") {
      props.getlostRecords(props.userId);
    } else if (props.viewType === "won") {
      props.getWonRecords(props.userId);
    } else if (props.viewType === "teams") {
      props.getOpportunityTeamRecords(props.userId);
    }
    else if (props.viewType === "stage") {
      props.getRecords(props.userId);
    }
    
  }, [props.viewType, props.userId]);

  const {
    viewType,
    setAccountViewType,
    recorddeleteOpportunityData,
    user,
    opportunityTeamRecordData,
    lostOpportunityData,
    wonOpportunityData,
    closeOpportunityData,
    recordData,
  } = props;

  return (
    <div class=" flex items-center">
  
      <Badge
        size="small"
        count={(viewType === "table" && recordData.opportunityDetails) || 0}
        overflowCount={999}
      >
        <Tooltip
          title={
            <FormattedMessage
              id="app.listOpportunity"
              defaultMessage="Opportunity List"
            />
          }
        >
          <span
            class=" mr-2 text-sm "
            onClick={() => props.setOpportunityViewType("table")}
            style={{
              color: props.viewType === "table" && "#1890ff",cursor:"pointer"
            }}
          >
            {" "}
            <LightbulbIcon style={{ color: "rgb(14, 149, 144)"}}/>
          </span>
        </Tooltip>
      </Badge>
      <Tooltip
          title={
            <FormattedMessage id="app.stageview" defaultMessage="Stage View" />
          }
        >
             <Badge
        size="small"
        count={(viewType === "stage" && recordData.opportunityDetails) || 0}
        overflowCount={999}
      >
          {/*<TableOutlined*/}
          <span
            style={{
              fontSize: "1.56em",
              marginRight: "0.3rem",
              cursor:"pointer",
              color: props.viewType === "stage" && "#1890ff",
            }}
            // iconType="table"
            // tooltipTitle="Stage View"
            onClick={() => props.setOpportunityViewType("stage")}
          >
           <TableOutlined/>
          </span>
          </Badge>
        </Tooltip>
      <Tooltip title={"Won"}>
      <Badge
          size="small"
          count={
            (viewType === "won" &&
            wonOpportunityData.OpportunityDetailsbyWonInd) ||
            0
          }
          overflowCount={999}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setOpportunityViewType("won")}
            style={{
              cursor:"pointer",
              color: props.viewType === "won" && "#1890ff",
            }}
          >
            {" "}
            <CheckCircleTwoTone type="check-circle" theme="twoTone" twoToneColor="#24D8A7" />
          </span>
          </Badge>
      </Tooltip>
      <Tooltip title={"Close"}>
        {" "}
        <Badge
          size="small"
          count={
            (viewType === "close" &&
              closeOpportunityData.OpportunityDetailsByCloseInd) ||
            0
          }
          overflowCount={999}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setOpportunityViewType("close")}
            style={{
              cursor:"pointer",
              color: props.viewType === "close" && "#1890ff",
            }}
          >
            {" "}
            <LockOpenIcon />
          </span>
        </Badge>
      </Tooltip>
      <Tooltip title={"Lost"}>
        <Badge
          size="small"
          count={
            (viewType === "lost" &&
              lostOpportunityData.OpportunityDetailsbyLostInd) ||
            0
          }
          overflowCount={999}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setOpportunityViewType("lost")}
            style={{
              cursor:"pointer",
              color: props.viewType === "lost" && "#1890ff",
            }}
          >
            {" "}
            <StopTwoTone type="stop" theme="twoTone" twoToneColor="red" />
          </span>
        </Badge>
      </Tooltip>
    
  <div class="ml-2">
  <Tooltip
          title="Teams"
        >
                 <Badge
        size="small"
        count={(viewType === "teams" && opportunityTeamRecordData.OpportunityTeam) || 0}
        overflowCount={999}
      >
          <span
            class=" mr-2 text-sm "
            onClick={() => props.setOpportunityViewType("teams")}
            style={{
              color: props.viewType === "teams" && "#1890ff",cursor:"pointer"
            }}
          >
            {" "}
            <PeopleIcon/>
          </span>
          </Badge>
        </Tooltip>
  </div>
  <div class="ml-2">
    {user.crmInd=== true && user.opportunityFullListInd===true && ( 
  <Tooltip
          title="All list"
        >
                       <Badge
        size="small"
        // count={(viewType === "stage" && recordData.opportunityDetails) || 0}
        overflowCount={999}
      >
          <span
            class=" mr-2 text-sm "
            onClick={() => props.setOpportunityViewType("all")}
            style={{
              color: props.viewType === "all" && "#1890ff",cursor:"pointer"
            }}
          >
            {" "}
           ALL
          </span>
          </Badge>
        </Tooltip>
    )}
  </div>
     

      <Tooltip
        title={
          <FormattedMessage
            id="app.deletedOpportunity"
            defaultMessage="Deleted Opportunity"
          />
        }
      >
        {" "}
        <Badge
          size="small"
          count={
            (viewType === "dashboard" &&
              recorddeleteOpportunityData.opportunityDetails) ||
            0
          }
          overflowCount={999}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setOpportunityViewType("dashboard")}
            style={{
              cursor:"pointer",
              color: props.viewType === "dashboard" && "#1890ff",
            }}
          >
            <DeleteIcon />
          </span>
        </Badge>
      </Tooltip>

      
      {/* <Tooltip
        title={
          <FormattedMessage
            id="app.deletedOpportunity"
            defaultMessage="Deleted Opportunity"
          />
        }
      >
        <span
          class=" mr-2 text-sm cursor-pointer"
          onClick={() => props.setOpportunityViewType("Map")}
          style={{
            color: props.viewType === "Map" && "#1890ff",
          }}
        >
          <DeleteIcon />
        </span>
       
      </Tooltip> */}
    </div>
  );
};
const mapStateToProps = ({ account, auth, opportunity }) => ({
  user: auth.userDetails,
  recordData: opportunity.recordData,
  userId: auth.userDetails.userId,
  opportunityTeamRecordData:opportunity.opportunityTeamRecordData,
  recorddeleteOpportunityData: opportunity.recorddeleteOpportunityData,
  closeOpportunityData: opportunity.closeOpportunityData,
  lostOpportunityData: opportunity.lostOpportunityData,
  wonOpportunityData: opportunity.wonOpportunityData,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputOpportunityDataSearch,
      getDeleteRecords,
      getcloseRecords,
      getlostRecords,
      getWonRecords,
      getRecords,
      getOpportunityTeamRecords,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OpportunityActionLeft)
);
