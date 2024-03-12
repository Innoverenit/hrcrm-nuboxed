import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Tooltip, Badge,Avatar } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { DeleteOutlined } from "@ant-design/icons";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PeopleIcon from '@mui/icons-material/People';
import { CheckCircleTwoTone } from "@ant-design/icons";
import {getdealsRecord,getdealsAllRecord,getdealsTeamRecord,getlostRecords} from "../DealAction";
import { StopTwoTone, TableOutlined } from "@ant-design/icons";

const DealActionLeft = (props) => {

  useEffect(() => {
    if (props.viewType === "table") {
      props.getdealsRecord(props.userId);
    } else if (props.viewType === "all") {
      props.getdealsAllRecord(props.userId);
    } else if (props.viewType === "lost") {
      props.getlostRecords(props.userId);
      
    } else if (props.viewType === "teams") {
      props.getdealsTeamRecord(props.userId);
    } 
  }, [props.viewType, props.userId]);
  
  const {
    viewType,
    lostDealData,
   setDealViewType,
    dealsTeamRecord,
  } = props;

  return (
    <div class=" flex items-center">
      <Badge
        size="small"
         count={(viewType === "table" &&   props.dealsRecord.opportunityDetails) || 0}
        overflowCount={999}
      >
        <Tooltip
          title={
            <FormattedMessage
              id="app.listView"
              defaultMessage="List View"
            />
          }
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => setDealViewType("table")}
            style={{
              color: viewType === "table" && "#1890ff",
            }}
          >
            {" "}
            <Avatar style={{ background: props.viewType === "table" ? "#f279ab" : "#4bc076" }}>
            <CurrencyExchangeIcon/>
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
        //  count={(viewType === "table" &&   props.dealsRecord.opportunityDetails) || 0}
        overflowCount={999}
      >
          <span
          class="mr-1 text-sm cursor-pointer"
            style={{
              color: viewType === "stage" && "#1890ff",
            }}
            // iconType="table"
            tooltipTitle="Stage View"
            onClick={() => props.setDealViewType("stage")}
          >
             <Avatar style={{ background: props.viewType === "stage" ? "#f279ab" : "#4bc076" }}>
           <TableOutlined/>
           </Avatar>
          </span>
          </Badge>
        </Tooltip>
        <Tooltip 
        title={   <FormattedMessage
          id="app.won"
          defaultMessage="Won"
        />}
   >
      <Badge
          size="small"
          // count={
          //   (viewType === "won" &&
          //   wonOpportunityData.OpportunityDetailsbyWonInd) ||
          //   0
          // }
          overflowCount={999}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setDealViewType("won")}
            style={{
           
              color: props.viewType === "won" && "#1890ff",
              // cursor:"pointer"
            }}
          >
            {" "}
            <Avatar style={{ background: props.viewType === "won" ? "#f279ab" : "#4bc076" }}>
            <CheckCircleTwoTone type="check-circle" theme="twoTone" twoToneColor="#24D8A7" />
            </Avatar>
          </span>
          </Badge>
      </Tooltip>
        <Tooltip
          title={   <FormattedMessage
            id="app.close"
            defaultMessage="Close"
          />}>
        {" "}
        <Badge
          size="small"
        //   count={
        //     (viewType === "close" &&
        //       closeOpportunityData.OpportunityDetailsByCloseInd) ||
        //     0
        //   }
          overflowCount={999}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            // onClick={() => props.setOpportunityViewType("close")}
            style={{
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
      <Tooltip 
        title={   <FormattedMessage
          id="app.lost"
          defaultMessage="Lost"
        />}>
        <Badge
          size="small"
          count={
            (viewType === "lost" &&
            lostDealData.OpportunityDetailsByLostInd) ||
            0
          }
          overflowCount={999}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
             onClick={() => props.setDealViewType("lost")}
            style={{
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
   
      
        <Tooltip
          title={   <FormattedMessage
            id="app.teams"
            defaultMessage="Teams"
          />}
        >
           <Badge
          size="small"
          count={
            (viewType === "teams" &&
            dealsTeamRecord.InvestorOpportunityTeam) ||
            0
          }
          overflowCount={999}
        >
          <span
          class="mr-1 text-sm cursor-pointer"
            style={{
        
              color: viewType === "teams" && "#1890ff",
           
            }}
            // iconType="table"
            tooltipTitle="Teams"
            onClick={() => props.setDealViewType("teams")}
          >
            <Avatar style={{ background: props.viewType === "teams" ? "#f279ab" : "#4bc076" }}>
         <PeopleIcon/>
         </Avatar>
          </span>
          </Badge>
        </Tooltip>
        {(props.dealFullListInd===true || props.user.role==="ADMIN") && (
        <Tooltip
          title={   <FormattedMessage
            id="app.all"
            defaultMessage="ALL"
          />}
        >
     <Badge
        size="small"
         count={(viewType === "all" &&   props.dealsAllRecord.opportunityDetails) || 0}
        overflowCount={999}
      >
          <span
          class="mr-1 text-sm cursor-pointer"
            style={{
              color: viewType === "all" && "#1890ff",
              cursor:"pointer"
            }}
            // iconType="table"
            tooltipTitle="All"
            onClick={() => props.setDealViewType("all")}
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
        //   count={
        //     (viewType === "dashboard" &&
        //       recorddeleteOpportunityData.opportunityDetails) ||
        //     0
        //   }
          overflowCount={999}
        >
          <span
            class=" mr-1 text-sm cursor-pointer"
            // onClick={() => props.setOpportunityViewType("dashboard")}
            style={{
              // cursor:"pointer"
              //color: props.viewType === "dashboard" && "#1890ff",
            }}
          >
             <Avatar style={{ background: props.viewType === "" ? "#f279ab" : "#4bc076" }}>
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
const mapStateToProps = ({ deal, auth, opportunity }) => ({
  user: auth.userDetails,
  recordData: opportunity.recordData,
  lostDealData:deal.lostDealData,
  dealsTeamRecord:deal.dealsTeamRecord,
  dealsAllRecord:deal.dealsAllRecord,
  userId: auth.userDetails.userId,
  dealsRecord:deal.dealsRecord,
  recorddeleteOpportunityData: opportunity.recorddeleteOpportunityData,
  closeOpportunityData: opportunity.closeOpportunityData,
  lostOpportunityData: opportunity.lostOpportunityData,
  dealFullListInd:auth.userDetails.dealFullListInd
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getdealsRecord,
      getlostRecords,
      getdealsTeamRecord,
      getdealsAllRecord
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DealActionLeft)
);