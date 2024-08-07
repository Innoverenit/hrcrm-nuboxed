import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { validateEmail } from "./AuthAction";
import { AuthContainer, FormContainer } from "./styled";
import { Title } from "../../Components/UI/Elements";
import { ClockLoader } from "../../Components/Placeholder";
// import background5 from "../../Assets/Images/background5.png";

class EmailValidation extends Component {
  constructor(props) {
    super(props)
  }
  handleEmailValidation = () => {
    const { history, match: { params: { employeeId, token, emailId, organizationId } } } = this.props;
    this.props.validateEmail(employeeId, token, emailId, organizationId, history);
  }
  componentDidMount() {
    this.handleEmailValidation()
  }
  render() {
    return (
      <AuthContainer
      //  backgroundImage={background5}
       >
        <FormContainer style={{ alignSelf: 'center' }}>
        <div class=" flex flex-col flex-wrap items-center self-start justify-center grow shrink h-auto mr-auto ">
            <Title color='#f4f4f4' fontFamily='Abel' fontSize={'1.25em'} >Please wait while we are validating your email ...</Title>
            <ClockLoader />
          </div>
        </FormContainer>
      </AuthContainer>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ validateEmail }, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EmailValidation)
);
