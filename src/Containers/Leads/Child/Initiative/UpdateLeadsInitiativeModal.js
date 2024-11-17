import React, { lazy, Suspense } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer, StyledModal } from "../../../../Components/UI/Antd";
import UpdateLeadsInititativeForm from "./UpdateLeadsInititativeForm";
// import UpdateCustomerInititativeForm from "./UpdateCustomerInititativeForm";

const UpdateLeadsInitiativeModal = (props) => {
  const { updateLeadsInitiativeModal, handleUpdateLeadsInitiativeModal, ...formProps } = props;
  console.log(props.skillList);
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.updateleads"
          defaultMessage="Update Leads"
        />}
        width="60%"
        visible={props.updateLeadsInitiativeModal}
        // maskClosable={false}
        destroyOnClose
        style={{ top: "1.2em" }}
        onClose={() => props.handleUpdateLeadsInitiativeModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateLeadsInititativeForm  
          initiativeDetailsId={props.initiativeDetailsId}
          skillList={props.skillList}
          
          />
        </Suspense>
      </StyledDrawer>
    </>
  );
};
const mapStateToProps = ({ auth, customer }) => ({
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
)(UpdateLeadsInitiativeModal);

