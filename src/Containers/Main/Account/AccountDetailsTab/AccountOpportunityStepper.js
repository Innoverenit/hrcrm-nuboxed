import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { bindActionCreators } from "redux";
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import { StyledSteps } from "../../../../Components/UI/Antd";
import CallIcon from '@mui/icons-material/Call';
import GroupsIcon from '@mui/icons-material/Groups';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountOpportunityForm from "./AccountOpportunityForm";
import AccountRepairSecondStep from "./AccountRepairSecondStep";
import AccountProcureSecondStep from "./AccountOrderTab/AccountProcureSecondStep";
import AccountOrderSecondStep from "./AccountOrderTab/AccountOrderSecondStep";

const Step = StyledSteps.Step;

class AccountOpportunityStepper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            resetStepperKey: props.resetStepperKey,
            thirdPageData: {},
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.resetStepperKey !== prevState.resetStepperKey) {
            return {
                current: 0, // Reset to first step
                resetStepperKey: nextProps.resetStepperKey, // Update key
            };
        }
        return null;
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
                content: <AccountOpportunityForm 
                distributorId={this.props.distributorId} 
                inspectionRequiredInd={this.props.inspectionRequiredInd}
                currentOrderType={this.props.currentOrderType}
                type={this.props.type}
                />,
            },
            {
                title: "Phone details",
                icon: <CallIcon
                    style={{ color: "blue" }}
                />,
                content:this.props.currentOrderType==="Quotation" ? 
                <AccountRepairSecondStep distributorId={this.props.distributorId} 
                inspectionRequiredInd={this.props.inspectionRequiredInd} 
                handleAccountOpportunityModal={this.props.handleAccountOpportunityModal}
                /> : this.props.currentOrderType==="Commerce" ? <AccountProcureSecondStep distributorId={this.props.distributorId} inspectionRequiredInd={this.props.inspectionRequiredInd}
                selectedLanguage={this.props.selectedLanguage}
                translateText={this.props.translateText}
                />:<AccountOrderSecondStep distributorId={this.props.distributorId} inspectionRequiredInd={this.props.inspectionRequiredInd} />,
            },
        ];
        const { current } = this.state;
        return (
            <>
                <StyledSteps className="w-[100%]"current={current}>
                    <Step
                        title={<AddShoppingCartIcon className="!text-icon" />}
                        description={`${this.props.currentOrderType}`}
                    />
                    <Step
                        title={<ControlPointDuplicateIcon className=" !text-icon" />}
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
                                         {this.props.quotationId || this.props.orderId && 
                                        <Button style={{ marginRight: "3rem", marginTop: "65px" }}
                                            className=" w-16 absolute top-3/4 right-0"
                                            // type="primary"
                                            onClick={() => this.next()}
                                        >
                                           Proceed
                                        </Button>
                                  } 
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
    orderId: distributor.orderDetailsId.orderId,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountOpportunityStepper);
