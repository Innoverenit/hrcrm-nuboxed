import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Avatar,Badge, Button } from "antd";
import { FormattedMessage } from "react-intl";
import {getInventoryLocationRecords} from "../Inventory/InventoryAction"

const InventoryActionLeft = (props) => {
  const { viewType, setInventoryViewType } = props;
  useEffect(() => {
    if (viewType === "table") {
      props.getInventoryLocationRecords(props.orgId);
    } 
   
    
  }, [viewType,props.orgId]);


    return (
      <>
        <div class=" flex items-center" >
        {props.user.materialAccessInd === true &&   (
        <Tooltip title="Material">
          {/* <Badge
            size="small"
            count={(props.viewType === "production" && props.orderCount.order) || 0}

            overflowCount={999}
          > */}

            <span class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.setInventoryViewType("material")}
              style={{
                color: props.viewType === "material" && "#1890ff",
              }}
            >
              
              <Button type={props.viewType === "material" ? "primary" : ""} style={{ backgroundColor: props.viewType === "material" ? "" : "tomato" }}>
             <div class="text-white ">Material</div></Button>
            </span>
          {/* </Badge> */}
        </Tooltip>
        )}
        {props.user.repairInd === true &&   (
        <Tooltip title="Repair">
         

            <span class=" mr-1 text-sm cursor-pointer"
              onClick={() => props.setInventoryViewType("repair")}
              style={{
                color: props.viewType === "repair" && "#1890ff",
              }}
            >
              
              <Button type={props.viewType === "repair" ? "primary" : ""} style={{ backgroundColor: props.viewType === "repair" ? "" : "tomato" }}>
             <div class="text-white ">Repair</div></Button>
            </span>
         
        </Tooltip>
        )}
        {/* <Tooltip title={props.translatedMenuItems[15]}>
          
            <span class=" mr-[0.5rem] cursor-pointer"
              onClick={() => setInventoryViewType("zone")}
              style={{
       
                color: viewType === "zone" && "#1890ff",
                
              }}
            >
               <Avatar style={{ background: viewType === "zone" ? "#f279ab" : "#4bc076" }}>
               <i class="fab fa-creative-commons-remix"></i>
              </Avatar>
            </span>
          
          </Tooltip> */}

          <Tooltip title={props.translatedMenuItems[16]}>
          <Badge size="small"
           count={props.inventoryLocationCount.locCount || 0}
           >    
            <span class=" mr-[0.5rem] cursor-pointer"
              onClick={() => setInventoryViewType("table")}
              style={{
       
                color: viewType === "table" && "#1890ff",
                
              }}
            >
               <Avatar style={{ background: viewType === "table" ? "#f279ab" : "#4bc076" }}>
              <i class="fas fa-globe"></i>
              </Avatar>
            </span>
            </Badge>
          </Tooltip>
         
          {/* <Tooltip title="Catalogue">
            <span
              onClick={() => setInventoryViewType("table1")}
              style={{
                marginRight: "0.5rem",
                color: viewType === "partner" && "#1890ff",
              }}
            >
              <i class="fab fa-creative-commons-remix"></i>
            </span>
          </Tooltip>
          <Tooltip title="Material">
            <span
              onClick={() => setInventoryViewType("table2")}
              style={{
                marginRight: "0.5rem",
                color: viewType === "partner" && "#1890ff",
              }}
            >
              <i class="fas fa-cookie-bite"></i>
            </span>
          </Tooltip> */}
        </div>
      </>
    );
 
}

const mapStateToProps = ({ inventory,auth }) => ({
  inventoryLocationCount:inventory.inventoryLocationCount,
  orgId: auth.userDetails.organizationId,
  user: auth.userDetails,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getInventoryLocationRecords
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryActionLeft);
