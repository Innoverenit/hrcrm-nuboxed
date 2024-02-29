import React from 'react'
import GridViewIcon from '@mui/icons-material/GridView';
import TocIcon from '@mui/icons-material/Toc';
import { FormattedMessage } from "react-intl";
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import { Tooltip,Avatar } from "antd";
import { connect } from "react-redux";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

const MileageActionLeft = (props) => {
    return (
        <div class=" flex items-center" >
          <Tooltip
        title={<FormattedMessage id="app.card" defaultMessage="Card" />}
      >
       
          <span class=" mr-2 cursor-pointer"
            onClick={() => props.setMileageViewType("card")}
            style={{
              color: props.viewType === "card" && "#1890ff",
            }}
          >
             <Avatar style={{ background: props.viewType === "card" ? "#f279ab" : "#4bc076" }}>
            <GridViewIcon   />
            </Avatar>
          </span>
       
      </Tooltip>

      <Tooltip
        title={<FormattedMessage id="app.List" defaultMessage="List" />}
      >
       
       <span class=" mr-2 cursor-pointer text-4"
            onClick={() => props.setMileageViewType("tile")}
            style={{
              color: props.viewType === "tile" && "#1890ff",
            }}
          >
            <Avatar style={{ background: props.viewType === "tile" ? "#f279ab" : "#4bc076" }}>
            <TocIcon  
            // icon={solid('users')}
             />
             </Avatar>
          </span>
    
      </Tooltip>
      <Tooltip title="Category">
      <span class=" mr-2 cursor-pointer text-4"
            onClick={() => props.setMileageViewType("list")}
            style={{
              color: props.viewType === "list" && "#1890ff",
            }}
          >
              <Avatar style={{ background: props.viewType === "list" ? "#f279ab" : "#4bc076" }}>
            <ViewWeekIcon/>
            </Avatar>
          </span>
      </Tooltip>
      {props.user.mileageFullListInd === true && (
      <Tooltip
        title="All"
      >
       
       <span class=" mr-2 cursor-pointer text-[1rem]"
            onClick={() => props.setExpenseViewType("all")}
            style={{
              color: props.viewType === "all" && "#1890ff",
            }}
          >
             <Avatar style={{ background: props.viewType === "all" ? "#f279ab" : "#4bc076" }}>
            <ListAltIcon  
            // icon={solid('users')}
             />
             </Avatar>
          </span>
    
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