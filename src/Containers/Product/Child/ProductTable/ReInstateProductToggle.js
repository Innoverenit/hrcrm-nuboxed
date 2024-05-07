import React, { useState } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteCatalogData } from "../../ProductAction";

function ReInstateProductToggle(props) {
  const [isChecked, setIsChecked] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleToggle = () => {
    // Show confirmation dialog
    setConfirmVisible(true);
  };

  const handleConfirm = (confirmed) => {
    if (confirmed) {
      props.deleteCatalogData({
        active:true,
        productId: props.item.productId,
      },props.item.productId);
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
  bindActionCreators({ deleteCatalogData }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReInstateProductToggle);