import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Tooltip, Badge, Avatar } from "antd";
import { FormattedMessage } from "react-intl";
import ArchiveIcon from '@mui/icons-material/Archive';
import TocIcon from '@mui/icons-material/Toc';
import { TableOutlined } from "@ant-design/icons";
import {getProductRecords} from "../ProductionAction";
import { TableBarOutlined } from "@mui/icons-material";

const ProductionActionLeft = (props) => {
  const { setProductionViewType, viewType } = props
  useEffect(() => {
    if (props.viewType === "card") {
      props.getProductRecords(props.locationId);
    }
  }, [props.viewType, props.locationId]);
  return (
    <div class="flex items-center">
       <Tooltip title="Table ">
                    <Badge size="small"
                        // count={(viewType === "all" && suppliesCount.count) || 0}
                        //overflowCount={999}
                    >
                        <span class=" md:mr-2 text-sm cursor-pointer"
                            onClick={() => setProductionViewType("table")}
                            style={{

                                color: viewType === "table" && "#1890ff",
                            }}
                        >
                            <Avatar style={{ background: viewType === "table" ? "#f279ab" : "#4bc076" }}>
                                {/* <div className="text-white">All</div> */}
                                <TableBarOutlined/>
                                </Avatar>

                        </span>
                    </Badge>
                </Tooltip>
      <Tooltip
        title={<FormattedMessage id="app.listView" defaultMessage="List View" />}>
 <Badge
          size="small"
          count={(props.viewType === "card" && props.productrecordData.product) || 0}
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
      <Tooltip title="Archiev List">
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
