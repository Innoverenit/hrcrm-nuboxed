import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox } from "../../../Components/UI/Elements";
import { FlexContainer } from "../../../Components/UI/Layout";

class ShipperJumpStart extends Component {
    render() {
        const { currencyType } = this.props;

        return (
            <FlexContainer flexDirection="column" style={{ width: "100%" }}>
                <FlexContainer style={{ width: "100%" }}>
                    <JumpStartBox
                        // jumpstartClick={
                        //   subscriptionType === "PROFESSIONALPLUS"
                        //     ? () => this.props.handleAbsoluteModal(true)
                        //     : null
                        // }
                        // cursorData={
                        //   subscriptionType === "PROFESSIONALPLUS" ? "pointer" : "default"
                        // }
                        noProgress
                        currencyType={currencyType}
                        title="Weighted funnel"
                        bgColor="#005075"
                    />
                    <JumpStartBox
                        // jumpstartClick={
                        //   subscriptionType === "PROFESSIONALPLUS"
                        //     ? () => this.props.handleWinModal(true)
                        //     : null
                        // }
                        // cursorData={
                        //   subscriptionType === "PROFESSIONALPLUS" ? "pointer" : "default"
                        // }
                        noProgress
                        title="Sales Velocity"
                        bgColor="#0073a8"
                    />
                    <JumpStartBox
                        // jumpstartClick={
                        //   subscriptionType === "PROFESSIONALPLUS"
                        //     ? () => this.props.handleOppModal(true)
                        //     : null
                        // }
                        // cursorData={
                        //   subscriptionType === "PROFESSIONALPLUS" ? "pointer" : "default"
                        // }
                        noProgress
                        title="Absolute funnel"
                        bgColor="#0093d7"
                    />
                    <JumpStartBox
                        // jumpstartClick={
                        //   subscriptionType === "PROFESSIONALPLUS"
                        //     ? () => this.props.handleLifetimeModal(true)
                        //     : null
                        // }
                        // cursorData={
                        //   subscriptionType === "PROFESSIONALPLUS" ? "pointer" : "default"
                        // }
                        noProgress
                        currencyType={currencyType}
                        title="Win Rate"
                        bgColor="#24b9fe"
                    />
                    <JumpStartBox
                        // jumpstartClick={
                        //   subscriptionType === "PROFESSIONALPLUS"
                        //     ? () => this.props.handleLifetimeModal(true)
                        //     : null
                        // }
                        // cursorData={
                        //   subscriptionType === "PROFESSIONALPLUS" ? "pointer" : "default"
                        // }
                        noProgress
                        currencyType={currencyType}
                        title="Won"
                        bgColor="#4cc9f0"
                    />
                    <JumpStartBox
                        // jumpstartClick={
                        //   subscriptionType === "PROFESSIONALPLUS"
                        //     ? () => this.props.handleLifetimeModal(true)
                        //     : null
                        // }
                        // cursorData={
                        //   subscriptionType === "PROFESSIONALPLUS" ? "pointer" : "default"
                        // }
                        noProgress
                        currencyType={currencyType}
                        title="Customers Added"
                        bgColor="#92defe"
                    />
                </FlexContainer>
            </FlexContainer>
        );
    }
}
const mapStateToProps = ({ campaign, auth }) => ({
    currencyType: auth.userDetails.tradeCurrency,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShipperJumpStart);
