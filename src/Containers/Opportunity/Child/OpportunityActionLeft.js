import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Tooltip, Badge ,Avatar } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { DeleteOutlined } from "@ant-design/icons";
import { CheckCircleTwoTone } from "@ant-design/icons";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  inputOpportunityDataSearch,
  getRecords,
  getOpportunityTeamRecords,
  getDeleteRecords,
  getcloseRecords,
  getlostRecords,
  getWonRecords,
  getAllRecords
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
    else if (props.viewType === "all") {
      props.getAllRecords(props.orgId);
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
            class=" mr-1 text-sm "
            onClick={() => props.setOpportunityViewType("table")}
            style={{
              color: props.viewType === "table" && "#1890ff",cursor:"pointer"
            }}
          >
            {" "}
            <Avatar style={{ background: props.viewType === "table" ? "#f279ab" : "#4bc076" }}>
            <LightbulbIcon />
            </Avatar>
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
             <Avatar style={{ background: props.viewType === "stage" ? "#f279ab" : "#4bc076" }}>
           <TableOutlined/>
           </Avatar>
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
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setOpportunityViewType("won")}
            style={{
              cursor:"pointer",
              color: props.viewType === "won" && "#1890ff",
            }}
          >
            {" "}
            <Avatar style={{ background: props.viewType === "won" ? "#f279ab" : "#4bc076" }}>
            <CheckCircleTwoTone type="check-circle" theme="twoTone" twoToneColor="#24D8A7" />
            </Avatar>
          </span>
          </Badge>
      </Tooltip>
      {user.recruitProInd === true && (
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
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setOpportunityViewType("close")}
            style={{
              cursor:"pointer",
              color: props.viewType === "close" && "#1890ff",
            }}
          >
            {" "}
            <Avatar style={{ background: props.viewType === "close" ? "#f279ab" : "#4bc076" }}>
            <LockOpenIcon />
            </Avatar>
          </span>
        </Badge>
      </Tooltip>
      )}
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
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setOpportunityViewType("lost")}
            style={{
              cursor:"pointer",
              color: props.viewType === "lost" && "#1890ff",
            }}
          >
            {" "}
            <Avatar style={{ background: props.viewType === "lost" ? "#f279ab" : "#4bc076" }}>
            <StopTwoTone type="stop" theme="twoTone" twoToneColor="red" />
            </Avatar>
          </span>
        </Badge>
      </Tooltip>
    
  {/* <div class="ml-2"> */}
  <Tooltip
          title="Teams"
        >
                 <Badge
        size="small"
        count={(viewType === "teams" && opportunityTeamRecordData.OpportunityTeam) || 0}
        overflowCount={999}
      >
          <span
            class=" mr-1 text-sm "
            onClick={() => props.setOpportunityViewType("teams")}
            style={{
              color: props.viewType === "teams" && "#1890ff",cursor:"pointer"
            }}
          >
            {" "}
            <Avatar style={{ background: props.viewType === "teams" ? "#f279ab" : "#4bc076" }}>
            <PeopleIcon/>
            </Avatar>
          </span>
          </Badge>
        </Tooltip>
  {/* </div> */}
  {/* <div class="ml-2"> */}
    {user.crmInd=== true && user.opportunityFullListInd===true && ( 
  <Tooltip
          title="All list"
        >
                       <Badge
        size="small"
         count={(viewType === "all" && props.allOpportunityRecords.opportunity) || 0}
        overflowCount={999}
      >
          <span
            class=" mr-1 text-sm "
            onClick={() => props.setOpportunityViewType("all")}
            style={{
              color: props.viewType === "all" && "#1890ff",cursor:"pointer"
            }}
          >
            {" "}
            <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#4bc076" }}>
           ALL
           </Avatar>
          </span>
          </Badge>
        </Tooltip>
    )}
  {/* </div> */}
     

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
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setOpportunityViewType("dashboard")}
            style={{
              cursor:"pointer",
              color: props.viewType === "dashboard" && "#1890ff",
            }}
          >
             <Avatar style={{ background: props.viewType === "dashboard" ? "#f279ab" : "#4bc076" }}>
            <DeleteOutlined />
            </Avatar>
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
          class=" mr-1 text-sm cursor-pointer"
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
  orgId: auth.userDetails.organizationId,
  opportunityTeamRecordData:opportunity.opportunityTeamRecordData,
  recorddeleteOpportunityData: opportunity.recorddeleteOpportunityData,
  closeOpportunityData: opportunity.closeOpportunityData,
  lostOpportunityData: opportunity.lostOpportunityData,
  wonOpportunityData: opportunity.wonOpportunityData,
  allOpportunityRecords:opportunity.allOpportunityRecords,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputOpportunityDataSearch,
      getDeleteRecords,
      getcloseRecords,
      getlostRecords,
      getWonRecords,
      getAllRecords,
      getRecords,
      getOpportunityTeamRecords,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OpportunityActionLeft)
);
