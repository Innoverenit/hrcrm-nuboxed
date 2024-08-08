import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { resetPassword } from "./AuthAction";
import { Title } from "../../Components/UI/Elements";
import { ClockLoader } from "../../Components/Placeholder";


class ForgotPasswordValidation extends Component {
    constructor(props) {
        super(props)
    }
    handleForgotPasswordValidation = () => {
        const { history, match: { params: { userId, token, emailId, organizationId } } } = this.props;
        this.props.resetPassword(userId, token, emailId, organizationId, history);
    }
    componentDidMount() {
        this.handleForgotPasswordValidation()
    }
    render() {
        return (
            <div class="  w-1/2  min-h-[100vh] overflow-auto flex justify-center items-center ">
            <div class=" p-4 w-wk shadow-[ 0em 0.25em 0.625em -0.125em #444] border-solid bg-white self-center">
                <div class=" flex flex-col flex-wrap items-center self-start justify-center grow shrink h-auto mr-auto ">
                        <Title color='#f4f4f4' fontFamily='Abel' fontSize={'1.25em'} >Please wait while we are validating your email ...</Title>
                        <ClockLoader />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({ resetPassword }, dispatch)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordValidation));