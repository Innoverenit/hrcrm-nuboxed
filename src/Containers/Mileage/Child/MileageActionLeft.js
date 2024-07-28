import React from 'react'
import GridViewIcon from '@mui/icons-material/GridView';
import { FormattedMessage } from "react-intl";
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import { Tooltip, Avatar, Badge } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

const MileageActionLeft = (props) => {
  return (
    <div class=" flex items-center" >
      <Tooltip
        title={<FormattedMessage id="app.myMileageVouchers" defaultMessage="My Mileage Vouchers" />}
      >
        <Badge
          size="small"
          // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
          overflowCount={999}
        >
          <span class=" mr-1 text-sm cursor-pointer"
            onClick={() => props.setMileageViewType("card")}
            style={{
              color: props.viewType === "card" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "card" ? "#f279ab" : "#4bc076" }}>
              <GridViewIcon className="text-white !text-icon" />
            </Avatar>
          </span>
        </Badge>
      </Tooltip>

      
      <Tooltip title="Category">
        <Badge
          size="small"
          // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
          overflowCount={999}
        >
          <span class=" mr-1 cursor-pointer !text-icon"
            onClick={() => props.setMileageViewType("list")}
            style={{
              color: props.viewType === "list" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "list" ? "#f279ab" : "#4bc076" }}>
              <ViewWeekIcon className="text-white !text-icon" />
            </Avatar>
          </span>
        </Badge>
      </Tooltip>
      {props.user.mileageFullListInd === true && (
        <Tooltip
          title="All"
        >
          <Badge
            size="small"
            // count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
            overflowCount={999}
          >
            <span class=" mr-1 cursor-pointer !text-icon]"
              onClick={() => props.setExpenseViewType("all")}
              style={{
                color: props.viewType === "all" && "#1890ff",
              }}
            >
              <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#4bc076" }}>
                <FormattedMessage id="app.all" defaultMessage="ALL" />

              </Avatar>
            </span>
          </Badge>
        </Tooltip>
      )}

    </div>
  )
}

const mapStateToProps = ({ customer, auth, candidate }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MileageActionLeft)
);