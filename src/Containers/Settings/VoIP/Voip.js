import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import VoIPHeader from "./Child/VoIPHeader";
import AddIntegrationModal from "./Child/AddIntegrationModal";
import { handleIntegrationModal, getTwilioCredentials } from "./VoIPAction";
import { getEmailCredentials } from "../Email/EmailAction";
import { BussinessCard } from "../../../Components/UI/Elements";

class VoIP extends Component {
  componentDidMount() {
    const {
      getTwilioCredentials,
      getEmailCredentials,
      organizationId
    } = this.props;
    getTwilioCredentials(organizationId);
    getEmailCredentials();
  }
  render() {
    const {
      addIntegrationModal,
      handleIntegrationModal,
      twilioCredential,
      fetchingTwilioCredential,
      emailCredential,
      fetchingEmailCredential
    } = this.props;
    return (
      <React.Fragment>
        <VoIPHeader handleIntegrationModal={handleIntegrationModal} />
        <AddIntegrationModal
          addIntegrationModal={addIntegrationModal}
          handleIntegrationModal={handleIntegrationModal}
        />
    <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
          {twilioCredential.length
            ? twilioCredential.map(cred => (
                <BussinessCard
                  primaryTitle={"Twilio"}
                  secondaryTitle={cred.phoneNo}
                />
              ))
            : null}

          {emailCredential.hasOwnProperty("email") && (
            <BussinessCard
              primaryTitle={emailCredential.email}
              secondaryTitle={emailCredential.host}
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ auth, voip, email }) => ({
  organizationId: auth.userDetails.organizationId,
  addIntegrationModal: voip.addIntegrationModal,
  twilioCredential: voip.twilioCredential,
  emailCredential: email.emailCredential
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleIntegrationModal,
      getEmailCredentials,
      getTwilioCredentials
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(VoIP);
