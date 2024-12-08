import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { bindActionCreators } from "redux";
import { StyledSteps } from "../../../../../Components/UI/Antd";
import GroupsIcon from '@mui/icons-material/Groups';
import CallIcon from '@mui/icons-material/Call';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import AddProcurementInAccount from "./AddProcurementInAccount";
import AccountProcureSecondStep from "./AccountProcureSecondStep";

const Step = StyledSteps.Step;

class ProcurementStepper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            thirdPageData: {},
        };
    }
    handleSubmit = (data) => {
        this.setState({ thirdPageData: data });
        this.handleComplete();
    };
    next = () => {
        const current = this.state.current + 1;
        this.setState({ current });
    };

    prev = () => {
        const current = this.state.current - 1;
        this.setState({ current });
    };
    handleComplete = () => {
        console.log(this.state.thirdPageData);
    };

    render() {
        const steps = [
            {
                title: "Order",
                icon: <GroupsIcon />,
                content: <AddProcurementInAccount distributorId={this.props.distributorId} inspectionRequiredInd={this.props.inspectionRequiredInd}
                selectedLanguage={this.props.selectedLanguage}
                translateText={this.props.translateText}
                type={this.props.type}
                />,
            },
            {
                title: "Phone details",
                icon: <CallIcon
                    style={{ color: "blue" }}
                />,
                content: <AccountProcureSecondStep distributorId={this.props.distributorId} inspectionRequiredInd={this.props.inspectionRequiredInd}
                selectedLanguage={this.props.selectedLanguage}
                translateText={this.props.translateText}
                />,
            },


        ];
        const { current } = this.state;
        return (
            <>
                <StyledSteps current={current}>
                    <Step
                        title={<AddShoppingCartIcon style={{ fontSize: "1rem" }} />}
                        description="Order Details"
                       
                    />
                    <Step
                        title={<ControlPointDuplicateIcon style={{ fontSize: "1rem" }} />}
                        description="Units Info"
                      
                    />

                </StyledSteps>
                <div
                    class="min-[45vh]"
                >{steps[current].content}</div>
                <div class="flex justify-end">
                    <div className="steps-action">
                        {current < steps.length - 1 && (
                            <>
                                {current > 1 ? null : (
                                    <>
                                        {/* {this.props.orderId &&  */}
                                        <Button style={{ marginRight: "3rem", marginTop: "65px" }}
                                            className=" w-16 absolute top-3/4 right-0"
                                            type="primary"
                                            onClick={() => this.next()}
                                        >
                                           Proceed
                                        </Button>
                                  {/* } */}
                                    </>
                                )}
                            </>
                        )}

                        {current > 0 && (
                            <Button
                                className=" w-16 absolute top-3/4 right-0 m-1 mt-20"
                                 onClick={() => this.prev()}
                            >
                               Previous
                            </Button>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = ({ auth, distributor }) => ({
    inspectionRequiredInd: auth.userDetails.inspectionRequiredInd,
    addingOrder: distributor.addingOrder,
    orderId: distributor.orderDetailsId.orderId,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProcurementStepper);
