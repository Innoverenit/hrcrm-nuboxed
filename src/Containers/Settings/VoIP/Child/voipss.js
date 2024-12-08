import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Divider } from "antd";
import { MainWrapper } from "../../../Components/UI/Layout";
import { TextInput, SubTitle } from "../../../Components/UI/Elements";
import {
  addTwilioCredentials,
  getTwilioCredentials,
  updateTwilioCredentials
} from "./VoIPAction";
class Voip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sid: "",
      authorizationToken: "",
      phoneNo: ""
    };
  }
  onChange = ({ target: { name, value } }) => this.setState({ [name]: value });
  handleSubmit = () => this.props.addTwilioCredentials(this.state);
  componentDidMount() {
    this.props.getTwilioCredentials(this.props.organizationId);
  }
  render() {
    const { sid, authorizationToken, phoneNo } = this.state;
    const {
      addingTwilioCredential,
      fetchingTwilioCredential,
      updatingTwilioCredential,
      twilioCredential
    } = this.props;
    console.log(twilioCredential);
    return (
      <div class=" flex flex-row flex-wrap items-start self-start justify-center grow shrink h-auto mr-auto ">
        <MainWrapper style={{ width: "auto", padding: "1rem" }}>
          <h2>VoIP</h2>
          <Button type="primary">Add Twilio Account</Button>
          <br />
          <mt-3 />
          <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
            <TextInput
              name="sid"
              placeholder="Account SID"
              label="Account SID"
              onChange={this.onChange}
              value={sid}
            />
            <mt-3 />
            <TextInput
              name="authorizationToken"
              placeholder="Auth token"
              label="Auth token"
              onChange={this.onChange}
              value={authorizationToken}
            />
            <mt-3 />
            <TextInput
              name="phoneNo"
              placeholder="Twilio number"
              label="Twilio number"
              onChange={this.onChange}
              value={phoneNo}
            />
            <mt-3 />
            <Button
              type="primary"
              onClick={this.handleSubmit}
              Loading={addingTwilioCredential}
            >
              Submit
            </Button>
          </div>
          <Divider />
          {fetchingTwilioCredential ? (
            <p>fetching ... </p>
          ) : (
              <>
                {twilioCredential &&
                  twilioCredential.map((cred, i) => {
                    return (
                      <div key={i}>
                        <SubTitle>{`SID:  ${cred.sid}`}</SubTitle>
                        <SubTitle>{`Token:  ${cred.authorizationToken}`}</SubTitle>
                        <SubTitle>{`Phone:  ${cred.phoneNo}`}</SubTitle>
                      </div>
                    );
                  })}
              </>
            )}
        </MainWrapper>
      </div>
    );
  }
}
const mapStateToProps = ({ auth, voip }) => ({
  organizationId: auth.userDetails.organizationId,
  twilioCredential: voip.twilioCredential,
  addingTwilioCredential: voip.addingTwilioCredential,
  fetchingTwilioCredential: voip.fetchingTwilioCredential,
  updatingTwilioCredential: voip.updatingTwilioCredential
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addTwilioCredentials,
      getTwilioCredentials
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Voip);
