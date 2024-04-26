import React, { useState } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createProductionLink } from "../ProductionAction";

function ProductionSearchedToggle(props) {
  const [isChecked, setIsChecked] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleToggle = () => {
    // Show confirmation dialog
    setConfirmVisible(true);
  };

  const handleConfirm = (confirmed) => {
    if (confirmed) {
      props.createProductionLink({
        productName: props.item.name,
        productId: props.item.productId,
        quantity: props.item.quantity,
        locationDetailsId: props.locationId,
        userId: props.userId,
        orgId: props.organizationId,
        workflow: props.productionWorkflowDetailsId,
        stage: props.productionStagesId
      });
      setIsChecked(!isChecked);
    }
    setConfirmVisible(false);
  };

  return (
    <div>
      <Popconfirm
        title="Are you sure you want to perform this action?"
        visible={confirmVisible}
        onConfirm={() => handleConfirm(true)}
        onCancel={() => handleConfirm(false)}
        okText="Yes"
        cancelText="No"
      >
        <Switch
          checkedChildren="Yes"
          unCheckedChildren="No"
          checked={isChecked}
          onChange={handleToggle}
        />
      </Popconfirm>
    </div>
  );
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
  locationId: auth.userDetails.locationId,
  organizationId: auth.userDetails.organizationId
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ createProductionLink }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductionSearchedToggle);