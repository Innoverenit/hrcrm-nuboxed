import React from "react";
import { Popconfirm, Switch } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {moveProductQuality} from "../../ProductAction"

function MoveToggleQualityProduct(props) {

  function handleDispatchToggle() {
    props.moveProductQuality(
      {

        
       
        mandatoryInd:!props.item.mandatoryInd
       
       
      },
      props.item.qualityCheckBuilderId,
      
    );
  }

  return (
    <div>
      <Popconfirm
        title="Confirm status change?"
        onConfirm={handleDispatchToggle}
        onCancel={null}
        okText="Ok"
        cancelText="Cancel"
      >
        <Switch
        checked={props.item.mandatoryInd}
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
      moveProductQuality
    //   moveProduction
    // moveProductionQuality
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(MoveToggleQualityProduct);
