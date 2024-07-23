import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { setEditLeads } from "../../LeadsAction";
 const UpdateLeadsForm = lazy(() => import("./UpdateLeadsForm"));

const UpdateLeadsModal = (props) => {
  const { updateCustomerModal, handleUpdateCustomerModal, ...formProps } = props;

  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={props.item.name}
        width={drawerWidth}
        visible={props.updateLeadsModal}
        maskClosable={false}
        destroyOnClose
        onClose={() => props.handleUpdateLeadsModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateLeadsForm leadsId={props.item.leadsId} 
          
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
         translatedMenuItems={props.translatedMenuItems}
          />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};
const mapStateToProps = ({ auth, leads }) => ({
    setEditingLeads: leads.setEditingLeads,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setEditLeads
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateLeadsModal);

