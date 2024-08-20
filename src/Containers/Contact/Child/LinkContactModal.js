import React, {  Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import LinkedContactForm from "../Child/LinkedContactForm"
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledModal } from "../../../Components/UI/Antd";
import { handleLinkContactModal } from "../ContactAction";
const LinkContactModal = (props) => {
  const {
    linkContactModal,
    handleLinkContactModal,
    linkAction,
    accountId,
    opportunityId,
    linkContactsCheckToOpportunity,
    linkContactsCheckToAccount,
    linkType,
    ...formProps
  } = props;
  return (
    <>
      <StyledModal
        // title="Tag Contact"
        title={<FormattedMessage
          id="app.tagcontact"
          defaultMessage="Tag Contact"
        />}
        width="35%"
        visible={linkContactModal}
        maskClosable={false}
        destroyOnClose
        style={{marginTop:"5rem"}}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onCancel={() => handleLinkContactModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <LinkedContactForm {...formProps}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}
          />
          
        </Suspense>
      </StyledModal>
    </>
  );
};

const mapStateToProps = ({ contact }) => ({
  linkContactModal: contact.linkContactModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleLinkContactModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LinkContactModal);
