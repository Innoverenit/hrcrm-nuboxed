import React, { useEffect, useState } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkComplementryToggle } from "./SuppliesAction";

function ComplementaryToggle(props) {
  const [toggle, setToggle] = useState(props.complementaryInd);

  // Synchronize toggle state with props.complementaryInd
  useEffect(() => {
    setToggle(props.complementaryInd);
  }, [props.complementaryInd]);

  function handleToggleCollection() {
    const newComplementaryInd = !toggle;
    props.linkComplementryToggle({
      suppliesId: props.suppliesId,
      complementaryItem: props.complementaryItem,
      complementaryInd: newComplementaryInd,
    });
    setToggle(newComplementaryInd);
  }

  function handleCancel() {
    setToggle(props.complementaryInd);
  }

  return (
    <>
      <Popconfirm
        title="Confirm status change?"
        onConfirm={handleToggleCollection}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <Switch
          className="toggle-clr"
          checked={toggle}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
      </Popconfirm>
    </>
  );
}

const mapStateToProps = ({ auth, supplies }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  complementaryList: supplies.complementaryList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkComplementryToggle,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ComplementaryToggle);
