import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Tooltip, Badge, Avatar } from "antd";
import { FormattedMessage } from "react-intl";
import ArchiveIcon from '@mui/icons-material/Archive';
import TocIcon from '@mui/icons-material/Toc';

const ProductionActionLeft = (props) => {
  const { setProductionViewType, viewType } = props
  return (
    <div class="flex items-center">
      <Tooltip
        title={<FormattedMessage id="app.cardview" defaultMessage="Card View" />}>

        <span class=" md:mr-2 text-sm cursor-pointer"
          onClick={() => setProductionViewType("card")}
          style={{
            color: viewType === "card" && "#1890ff",
          }}
        >
          <Avatar style={{ background: viewType === "card" ? "#f279ab" : "#4bc076" }}>
            <TocIcon className="text-white" /></Avatar>

        </span>
      </Tooltip>

      <Tooltip title="Archieve List">
        <span class=" md:mr-2 text-sm cursor-pointer"
          onClick={() => setProductionViewType("all")}
          style={{
            color: viewType === "all" && "#1890ff",
          }}
        >
          <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#4bc076" }}>
            <ArchiveIcon />
          </Avatar>

        </span>
      </Tooltip>


    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductionActionLeft)
);
