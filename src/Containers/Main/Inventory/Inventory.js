import React, { Suspense, lazy } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import InventoryHeader from "./InventoryHeader";
import { BundleLoader } from "../../../Components/Placeholder";
import { setInventoryViewType } from "./InventoryAction";
import InventoryLocation from "./InventoryLocation";

const InventoryCard = lazy(() => import("./InventoryCard"));

function Inventory(props) {
  return (
    <div>
      <InventoryHeader
        setInventoryViewType={props.setInventoryViewType}
        viewType={props.viewType}
      />
      <Suspense fallback={<BundleLoader />}>
        {props.viewType === "table" ? <InventoryCard /> :
        props.viewType === "zone" ? <InventoryLocation />
        : null}
      </Suspense>
    </div>
  );
}

const mapStateToProps = ({ inventory }) => ({
  viewType: inventory.viewType,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setInventoryViewType,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
