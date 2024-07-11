import React from "react";
import { Popconfirm, Switch } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import { moveProductionQuality } from "../Main/Inventory/InventoryAction";
import dayjs from "dayjs";

function MoveToggleQualityProduct(props) {

//   function handleDispatchToggle() {
//     props.moveProductionQuality(
//       {

        
//         // dispatchInd: true,
//         // userId:props.item.userId,
//         roomRackId:props.selectedZone,
//         roomRackChamberLinkId:props.selectedRack
       
//       },
//       props.item.productionProductId,
//       props.userId
//     );
//   }

  return (
    <div>
      <Popconfirm
        title="Confirm status change?"
        // onConfirm={handleDispatchToggle}
        onCancel={null}
        okText="Ok"
        cancelText="Cancel"
      >
        <Switch
        //   checked={props.item.dispatchInd}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
      </Popconfirm>

    </div>
  );

}

const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
//   locationId: auth.userDetails.locationId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   moveProduction
    // moveProductionQuality
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MoveToggleQualityProduct);
