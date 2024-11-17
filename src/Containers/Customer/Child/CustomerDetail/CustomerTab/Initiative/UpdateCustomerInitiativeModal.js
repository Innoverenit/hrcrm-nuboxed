import React, { lazy, Suspense } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../../../Components/UI/Antd";
import UpdateCustomerInititativeForm from "./UpdateCustomerInititativeForm";

const UpdateCustomerInitiativeModal = (props) => {
  const { updateCustomerInitiativeModal, handleUpdateCustomerInitiativeModal, ...formProps } = props;
  console.log(props.skillList);
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.updatecustomer"
          defaultMessage="Initiative"
        />}
        width="60%"
        visible={props.updateCustomerInitiativeModal}
        destroyOnClose
        style={{marginTop:"5rem"}}
        onClose={() => props.handleUpdateCustomerInitiativeModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateCustomerInititativeForm  
          initiativeDetailsId={props.initiativeDetailsId}
          skillList={props.skillList}
          description={props.description}
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
)(UpdateCustomerInitiativeModal);

