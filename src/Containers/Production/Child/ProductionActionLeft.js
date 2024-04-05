import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Tooltip, Badge, Avatar } from "antd";
import { FormattedMessage } from "react-intl";
import ArchiveIcon from '@mui/icons-material/Archive';
import TocIcon from '@mui/icons-material/Toc';
import {getProductRecords} from "../ProductionAction";

const ProductionActionLeft = (props) => {
  const { setProductionViewType, viewType } = props
  useEffect(() => {
    if (props.viewType === "card") {
      props.getProductRecords(props.locationId);
    }
  }, [props.viewType, props.locationId]);
  return (
    <div class="flex items-center">
      <Tooltip
        title={<FormattedMessage id="app.listView" defaultMessage="List View" />}>
 <Badge
          size="small"
          count={(props.viewType === "card" && props.productrecordData.customer) || 0}
          overflowCount={999}
        >
        <span class=" md:mr-2 text-sm cursor-pointer"
          onClick={() => setProductionViewType("card")}
          style={{
            color: viewType === "card" && "#1890ff",
          }}
        >
          <Avatar style={{ background: viewType === "card" ? "#f279ab" : "#4bc076" }}>
            <TocIcon className="text-white" /></Avatar>

        </span>
        </Badge>
      </Tooltip>

      <Tooltip title="Archiev List">
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

const mapStateToProps = ({ auth,production }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  locationId: auth.userDetails.locationId,
  productrecordData:production.productrecordData
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProductRecords
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductionActionLeft)
);
