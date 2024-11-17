import React, { useEffect } from "react";

import { StyledSelect } from "../../../Components/UI/Antd";
import ExploreIcon from '@mui/icons-material/Explore';
import PersonIcon from '@mui/icons-material/Person';
import { Tooltip } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Input } from "antd";

const Option = StyledSelect.Option;
const { Search } = Input;

const PublishActionLeft = (props) => {
  const dummy = ["cloud", "azure", "fgfdg"];
  return (
    <div class=" flex items-center"
    >
       <Tooltip
        title={<FormattedMessage id="app.website" defaultMessage="Website" />}
      >
        <span class="mr-2 text-sm cursor-pointer"
          style={{
            color: props.viewType === "table" && "#1890ff",
          }}
        >
          <ExploreIcon/>
        </span>
      </Tooltip>
      <Tooltip
        title={<FormattedMessage id="app.jobSites" defaultMessage="Job Sites" />}
      >
        <span  class=" mr-2 text-sm cursor-pointer"
          style={{
            color: props.viewType === "list" && "#1890ff",
          }}
        >
       <PersonIcon/>
        </span>
    
      </Tooltip>


    </div>
  );
};
const mapStateToProps = ({ publish, auth }) => ({
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PublishActionLeft)
);