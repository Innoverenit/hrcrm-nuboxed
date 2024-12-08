import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { bindActionCreators } from "redux";
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import { StyledSteps } from "../../../Components/UI/Antd";
import GroupsIcon from '@mui/icons-material/Groups';
import CallIcon from '@mui/icons-material/Call';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import QuotaionStepperFormStep1 from "./QuotaionStepperFormStep1";
import QuotaionStepperFormStep2 from "./QuotaionStepperFormStep2";

const Step = StyledSteps.Step;

class QuotaionEcomStepper extends Component {
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
                content: <QuotaionStepperFormStep1  inspectionRequiredInd={this.props.inspectionRequiredInd} />,
            },
            {
                title:"Phone details",
                icon: <CallIcon
                    style={{ color: "blue" }}
                />,
                content: <QuotaionStepperFormStep2 distributorId={this.props.distributorId} inspectionRequiredInd={this.props.inspectionRequiredInd} />,
            },


        ];
        const { current } = this.state;
        return (
            <>
                <StyledSteps current={current}>
                    <Step
                        title={<AddShoppingCartIcon style={{ fontSize: "1rem" }} />}
                        description="Quotation"
                    />
                    <Step
                        title={<ControlPointDuplicateIcon style={{ fontSize: "1rem" }} />}
                        description="Item Info"
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
                                        {/* {this.props.quotationId &&  */}
                                        <Button style={{ marginRight: "3rem", marginTop: "65px" }}
                                            className=" w-16 absolute top-3/4 right-0"
                                            type="primary"
                                            onClick={() => this.next()}
                                        >
                                         Proceed
                                        </Button>
                                        {/* }  */}
                                    </>
                                )}
                            </>
                        )}

                        {current > 0 && (
                            <Button
                                className=" w-16 absolute top-3/4 right-0 mt"
                                style={{ marginRight: "1rem", marginTop: "90px" }} onClick={() => this.prev()}
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
    quotationId: distributor.orderDetailsId.quotationId,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QuotaionEcomStepper);
