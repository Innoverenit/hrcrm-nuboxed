import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
const AddQuotationProduct = lazy(() => import("./AddQuotationProduct"));

const OpportunitytProcureDetailsModal = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "70%";
  return (
    <>
      <StyledDrawer
        title={`Quotation : ${props.particularRowItem.newOrderNo}`}
        width={"75%"}
        visible={props.addProcureDetailsModal}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleProcureDetailsModal(false)}
        placement="right"
      >
        <Suspense fallback={<BundleLoader />}>
          <AddQuotationProduct
            translatedMenuItems={props.translatedMenuItems}
            particularRowItem={props.particularRowItem}
            selectedLanguage={props.selectedLanguage}
            translateText={props.translateText}
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
)(OpportunitytProcureDetailsModal);
