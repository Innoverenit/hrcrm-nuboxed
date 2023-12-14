import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { setEditCustomer } from "../../CustomerAction";
const UpdateCustomerForm = lazy(() => import("./UpdateCustomerForm"));

const UpdateCustomerModal = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "55%";
  const { updateCustomerModal, handleUpdateCustomerModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={props.setEditingCustomer.name}
        width={drawerWidth}
        visible={props.updateCustomerModal}
        maskClosable={false}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"5rem"}}
        onClose={() => props.handleUpdateCustomerModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateCustomerForm customerId={props.customerId} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};
const mapStateToProps = ({ auth, customer }) => ({
  setEditingCustomer: customer.setEditingCustomer,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
      setEditCustomer
      
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateCustomerModal);

