import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import { Tooltip, Badge, Avatar } from "antd";
import {getReaasignProduct} from "../ProductionAction"
import ArchiveIcon from '@mui/icons-material/Archive';
import TokenIcon from '@mui/icons-material/Token';
import GridOnIcon from '@mui/icons-material/GridOn';
import {getProductRecords} from "../ProductionAction";
import { TableBarOutlined } from "@mui/icons-material";

const ProductionActionLeft = (props) => {
  const { setProductionViewType, viewType } = props
  useEffect(() => {
    if (props.viewType === "card") {
      props.getProductRecords(props.locationId);
    }
  }, [props.viewType, props.locationId]);
  useEffect(() => {
    props.getReaasignProduct(props.userId);
    // setPage(page + 1);
    // props.getRoomRackByLocId(props.locationId, props.orgId);
}, []);
  return (
    <div class="flex items-center">
       <Tooltip title="My Workspace ">
                    <Badge size="small"
                        // count={(viewType === "all" && suppliesCount.count) || 0}
                        //overflowCount={999}
                    >
                        <span class=" mr-1  cursor-pointer"
                            onClick={() => setProductionViewType("table")}
                            style={{

                                color: viewType === "table" && "#1890ff",
                            }}
                        >
                            <Avatar style={{ background: viewType === "table" ? "#f279ab" : "#28a355" }}>
                                {/* <div className="text-white">All</div> */}
                                <TableBarOutlined className=" text-white !text-icon"/>
                                </Avatar>

                        </span>
                    </Badge>
                </Tooltip>
  
      <Tooltip
          title="Stage View" 
        >
             <Badge
        size="small"
        // count={(viewType === "stage" && recordData.opportunityDetails) || 0}
        overflowCount={999}
      >
          <span class=" mr-1 "
            style={{
              
              color: props.viewType === "stage" && "#1890ff",
            }}
            onClick={() => props.setProductionViewType("stage")}
          >
             <Avatar style={{ background: props.viewType === "stage" ? "#f279ab" : "#28a355" }}>
           <GridOnIcon className=" text-white !text-icon  cursor-pointer"/>
           </Avatar>
          </span>
          </Badge>
        </Tooltip>
      <Tooltip title="Archive">
        <span class=" mr-1 "
          onClick={() => setProductionViewType("arch")}
          style={{
            color: viewType === "arch" && "#1890ff",
          }}
        >
          <Avatar style={{ background: viewType === "arch" ? "#f279ab" : "#28a355" }}>
            <ArchiveIcon className=" text-white !text-icon cursor-pointer " />
          </Avatar>

        </span>
      </Tooltip>
      <Tooltip title="All ">
                    <Badge size="small"
                        // count={(viewType === "all" && suppliesCount.count) || 0}
                        overflowCount={999}
                    >
                        <span class=" mr-1 text-sm "
                            onClick={() => setProductionViewType("all")}
                            style={{

                                color: viewType === "all" && "#1890ff",
                            }}
                        >
                            <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#28a355" }}>
                                <div className=" text-white  cursor-pointer ">ALL</div></Avatar>

                        </span>
                    </Badge>
                </Tooltip>


                <Tooltip title="Cell">
                    {/* <Badge size="small"
                        // count={(viewType === "all" && suppliesCount.count) || 0}
                        overflowCount={999}
                    > */}
                        <span class=" mr-1  "
                            onClick={() => setProductionViewType("cell")}
                            style={{

                                color: viewType === "cell" && "#1890ff",
                            }}
                        >
                           
                            <Avatar style={{ background: viewType === "all" ? "#f279ab" : "#28a355" }}>
                       <TokenIcon className="text-white !text-icon cursor-pointer" /></Avatar>


                        </span>
                    {/* </Badge> */}
                </Tooltip>


                <Tooltip title="Batch">
                    {/* <Badge size="small"
                        // count={(viewType === "all" && suppliesCount.count) || 0}
                        overflowCount={999}
                    > */}
                        <span class=" mr-1  "
                            onClick={() => setProductionViewType("batch")}
                            style={{

                                color: viewType === "batch" && "#1890ff",
                            }}
                        >
                           
                            <Avatar style={{ background: viewType === "batch" ? "#f279ab" : "#28a355" }}>
                       <BatchPredictionIcon className="text-white !text-icon cursor-pointer" /></Avatar>


                        </span>
                    {/* </Badge> */}
                </Tooltip>



             <div style={{fontWeight:"bold"}}> Items Reassigned:{props.reassignProduct.rejectProduct}</div>  
               
    </div>
  );
};

const mapStateToProps = ({ auth,production }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  locationId: auth.userDetails.locationId,
  productrecordData:production.productrecordData,
  reassignProduct:production.reassignProduct
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getProductRecords,
      getReaasignProduct
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductionActionLeft)
);
