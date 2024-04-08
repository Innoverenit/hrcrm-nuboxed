import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Tooltip, Badge, Avatar } from "antd";
import { FormattedMessage } from "react-intl";
import ArchiveIcon from '@mui/icons-material/Archive';
import TocIcon from '@mui/icons-material/Toc';
import { TableOutlined } from "@ant-design/icons";


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
          onClick={() => setProductionViewType("arch")}
          style={{
            color: viewType === "arch" && "#1890ff",
          }}
        >
          <Avatar style={{ background: viewType === "arch" ? "#f279ab" : "#4bc076" }}>
            <ArchiveIcon />
          </Avatar>

        </span>
      </Tooltip>
      <Tooltip title="All ">
                    <Badge size="small"
                        // count={(viewType === "all" && suppliesCount.count) || 0}
                        overflowCount={999}
                    >
                        <span class=" md:mr-2 text-sm cursor-pointer"
                            onClick={() => setProductionViewType("all")}
                            style={{

                                color: viewType === "all" && "#1890ff",
                            }}
                        >
                            <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#4bc076" }}>
                                <div className="text-white">All</div></Avatar>

                        </span>
                    </Badge>
                </Tooltip>
                <Tooltip
          title={
            <FormattedMessage id="app.stageview" defaultMessage="Stage View" />
          }
        >
             <Badge
        size="small"
        // count={(viewType === "stage" && recordData.opportunityDetails) || 0}
        overflowCount={999}
      >
          <span
            style={{
              fontSize: "1.56em",
              marginRight: "0.3rem",
              cursor:"pointer",
              color: props.viewType === "stage" && "#1890ff",
            }}
            onClick={() => props.setProductionViewType("stage")}
          >
             <Avatar style={{ background: props.viewType === "stage" ? "#f279ab" : "#4bc076" }}>
           <TableOutlined/>
           </Avatar>
          </span>
          </Badge>
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
