import React, { lazy, Suspense } from "react";

import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setEditPartnerContact } from "../../PartnerAction";
const UpdatePartnerContactForm = lazy(() => import("./UpdatePartnerContactForm"));

const UpdatePartnerContactModal = (props) => {
  const { updatePartnerContactModal, handleUpdatePartnerContactModal, ...formProps } = props;
  console.log("dn",props.setEditingPartnerContact.firstName)
  return (
    <>
      <StyledDrawer
        title={
           props.setEditingPartnerContact.firstName
          }

        width="60%"
        visible={props.updatePartnerContactModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"5rem"}}
        onClose={() => props.handleUpdatePartnerContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdatePartnerContactForm contactId={props.contactId} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};
const mapStateToProps = ({ auth, partner, }) => ({
  setEditingPartnerContact: partner.setEditingPartnerContact,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  partnerByUserId: partner.partnerByUserId,
 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
      setEditPartnerContact
      
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePartnerContactModal);
