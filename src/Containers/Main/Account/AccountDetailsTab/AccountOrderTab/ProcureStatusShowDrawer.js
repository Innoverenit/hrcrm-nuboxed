import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
const OrderSupplierStatuShower = lazy(() =>import("./OrderSupplierStatuShower"));
const ProcureStatusShowDrawer = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "70%";
  return (
    <>
      <StyledDrawer
        title={`${props.translatedMenuItems[24]}:${props.particularRowData.newOrderNo}`}
        width={drawerWidth}
        visible={props.showStatusDrwr}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleStatuShowDrawer(false)}
        placement="right"
      >
        <Suspense fallback={<BundleLoader />}>
          <OrderSupplierStatuShower
            particularRowData={props.particularRowData}
            translatedMenuItems={props.translatedMenuItems}
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

const mapStateToProps = ({ myorder, auth }) => ({
  employee_type: auth.userDetails.employee_type,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcureStatusShowDrawer);
