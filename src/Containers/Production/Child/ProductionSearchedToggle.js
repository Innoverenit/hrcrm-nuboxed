import React, { useState } from "react";
import { Switch, Modal } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createProductionLink } from "../ProductionAction";

function ProductionSearchedToggle(props) {
  const [checked, setChecked] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleToggle = () => {
    setConfirmVisible(true); // Show confirmation dialog
  };

  const handleConfirm = (confirmed) => {
    if (confirmed) {
      // User confirmed the action, update the state
      setChecked(!checked);

      // Perform the action (e.g., createProductionLink) if confirmed
      props.createProductionLink({
        productName: props.item.name,
        productId: props.item.productId,
        quantity: props.item.quantity,
        locationDetailsId: props.locationId,
        userId: props.userId,
        orgId: props.organizationId,
        productionWorkflowDetailsId: props.productionWorkflowDetailsId,
        productionStagesId:props.productionStagesId
      });
    }

    setConfirmVisible(false); // Hide the confirmation dialog
  };

  return (
    <div>
      <Switch
        checkedChildren="Yes"
        unCheckedChildren="No"
        checked={checked}
        onChange={handleToggle}
      />

      {/* Confirmation modal */}
      <Modal
        title="Confirm Action"
        visible={confirmVisible}
        onOk={() => handleConfirm(true)}
        onCancel={() => handleConfirm(false)}
      >
        <p>Are you sure you want to perform this action?</p>
      </Modal>
    </div>
  );
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
  locationId: auth.userDetails.locationId,
  organizationId: auth.userDetails.organizationId
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ createProductionLink }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductionSearchedToggle);
