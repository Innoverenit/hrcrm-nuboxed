import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  withRouter } from "react-router-dom";
import { AuthContainer, FormWrapper, Input } from "./styled";
import { FlexContainer, MainWrapper } from "../../Components/UI/Layout";


// import FWLogo from "../../Assets/Images/Axis_logo_Big.png";
import RandomImageScreen from "./RandomImageScreen";


class AppLoginMessage extends Component {

    render() {

        return (
            <>
                <FlexContainer>
                    <AuthContainer
                        style={{
                            backgroundColor: "#F5F5F5",
                            flexDirection: "column",
                            position: "relative",


                        }}
                    >
                        {/* <img
                            className="big-logo"
                            src={FWLogo}
                            style={{ width: 200 }}
                            alt="Tekorero logo"
                        /> */}
                        <br />
                        <FormWrapper width="55%">

                            Mobile app is under development and will be ready by mid August 2020. For now Korero is best viewed in desktop mode.
                        </FormWrapper>
                       


                        <div
                            className="footer1 mt-3"
                            style={{
                                textAlign: "center",
                                fontSize: "12x",
                                fontFamily: "SFS, Arial, sans-serif",
                                position: "absolute",
                                bottom: 0
                            }}
                        >
                            © {new Date().getFullYear()}, {` `} tekorero.com, All rights
              reserved.
            </div>
                    </AuthContainer>
                    <RandomImageScreen />
                </FlexContainer>
            </>
        );
    }
}

const mapStateToProps = ({ auth }) => ({

});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppLoginMessage));
