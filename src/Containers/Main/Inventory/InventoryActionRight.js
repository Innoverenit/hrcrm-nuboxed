import React, { useEffect,useState,Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip,Avatar,Badge, Button } from "antd";
import {handleStockUpload} from "../Inventory/InventoryAction"
import StockUploadModal from "./StockUploadModal";


const InventoryActionRight = (props) => {
  const { viewType, setInventoryViewType } = props;
  useEffect(() => {
   
  }, []);


    return (
      <>
       <Button type="primary"
          onClick={() => {
            props.handleStockUpload(true);
          }}
       >
        Upload
        </Button>
        <Suspense fallback={<div class="flex justify-center">Loading...</div>}>
                <StockUploadModal
              selectedLanguage={props.selectedLanguage}
              translateText={props.translateText}
              addStockModal={props.addStockModal}
            handleStockUpload={props.handleStockUpload}
            locationDetailsId={props.user.locationId}
        />
              </Suspense>
      </>
    );
 
}

const mapStateToProps = ({ inventory,auth }) => ({
  orgId: auth.userDetails.organizationId,
  user: auth.userDetails,
  addStockModal:inventory.addStockModal
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    handleStockUpload
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryActionRight);
