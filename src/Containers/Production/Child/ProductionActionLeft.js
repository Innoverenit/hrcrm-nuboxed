import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Tooltip, Badge, Avatar } from "antd";
import { FormattedMessage } from "react-intl";
import ArchiveIcon from '@mui/icons-material/Archive';
import TokenIcon from '@mui/icons-material/Token';
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
       <Tooltip title="My Workspace ">
                    <Badge size="small"
                        // count={(viewType === "all" && suppliesCount.count) || 0}
                        //overflowCount={999}
                    >
                        <span class=" mr-1 text-sm cursor-pointer"
                            onClick={() => setProductionViewType("table")}
                            style={{

                                color: viewType === "table" && "#1890ff",
                            }}
                        >
                            <Avatar style={{ background: viewType === "table" ? "#f279ab" : "#4bc076" }}>
                                {/* <div className="text-white">All</div> */}
                                <TableBarOutlined className=" text-white !text-icon"/>
                                </Avatar>

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
          <span class=" mr-1 cursor-pointer"
            style={{
              
              color: props.viewType === "stage" && "#1890ff",
            }}
            onClick={() => props.setProductionViewType("stage")}
          >
             <Avatar style={{ background: props.viewType === "stage" ? "#f279ab" : "#4bc076" }}>
           <TableOutlined className=" text-white !text-icon"/>
           </Avatar>
          </span>
          </Badge>
        </Tooltip>
      <Tooltip title="Archive">
        <span class=" mr-1 cursor-pointer"
          onClick={() => setProductionViewType("arch")}
          style={{
            color: viewType === "arch" && "#1890ff",
          }}
        >
          <Avatar style={{ background: viewType === "arch" ? "#f279ab" : "#4bc076" }}>
            <ArchiveIcon className=" text-white !text-icon" />
          </Avatar>

        </span>
      </Tooltip>
      <Tooltip title="All ">
                    <Badge size="small"
                        // count={(viewType === "all" && suppliesCount.count) || 0}
                        overflowCount={999}
                    >
                        <span class=" mr-1 !text-icon cursor-pointer"
                            onClick={() => setProductionViewType("all")}
                            style={{

                                color: viewType === "all" && "#1890ff",
                            }}
                        >
                            <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#4bc076" }}>
                                <div className=" text-white ">ALL</div></Avatar>

                        </span>
                    </Badge>
                </Tooltip>


                <Tooltip title="Cell">
                    {/* <Badge size="small"
                        // count={(viewType === "all" && suppliesCount.count) || 0}
                        overflowCount={999}
                    > */}
                        <span class=" mr-1  cursor-pointer"
                            onClick={() => setProductionViewType("cell")}
                            style={{

                                color: viewType === "cell" && "#1890ff",
                            }}
                        >
                           
                            <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#4bc076" }}>
                                <div className="text-white !text-icon "> <TokenIcon  /></div></Avatar>


                        </span>
                    {/* </Badge> */}
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
