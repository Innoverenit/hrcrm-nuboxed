import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { StyledDrawer } from "../../../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../Components/Placeholder";
 const SalaryForm = lazy(() => import("./SalaryForm"));

const AddSalaryModal = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  const { addSalaryModal, handleSalaryModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title="Add Salary"
        width={drawerWidth}
        visible={addSalaryModal}
        onClose={() => handleSalaryModal(false)}
      >
        <Suspense fallback={<BundleLoader />}>
          <SalaryForm />{" "}
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
    
   
      
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSalaryModal);

