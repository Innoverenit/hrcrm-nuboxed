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
import AccountQuotationSecondStep from "./AccountQuotationSecondStep";
import AccountProcureSecondStep from "./AccountOrderTab/AccountProcureSecondStep";
import AccountOrderSecondStep from "./AccountOrderTab/AccountOrderSecondStep";

const Step = StyledSteps.Step;

class AccountOpportunityStepper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.current || 0,
            resetStepperKey: props.resetStepperKey,
            thirdPageData: {},
        };
    }

    handleSubmit = (data) => {
        this.setState({ thirdPageData: data });
        this.handleComplete();
    };
    next = () => {
        // const current = this.state.current + 1;
        // this.setState({ current });
        const { current } = this.state;
        const stepsLength = this.getSteps().length;
        if (current < stepsLength - 1) {
            this.setState({ current: current + 1 });  
        }
    };

    prev = () => {
        // const current = this.state.current - 1;
        // this.setState({ current });
        const { current } = this.state;
        if (current > 0) {
            this.setState({ current: current - 1 });  
        }
    };
    handleComplete = () => {
        console.log(this.state.thirdPageData);
    };
    getSteps = () => {
        const { currentOrderType, distributorId,inspectionRequiredInd, type } = this.props;

        return [
            {
                title: "Order",
                icon: <GroupsIcon />,
                content: (
                    <AccountOpportunityForm
                        distributorId={distributorId}
                        currentOrderType={currentOrderType}
                        type={type}
                        inspectionRequiredInd={inspectionRequiredInd}
                    />
                ),
            },
            {
                title: "Phone details",
                icon: <CallIcon style={{ color: "blue" }} />,
                content:
                    currentOrderType === "Quotation" ? (
                        <AccountQuotationSecondStep 
                        distributorId={distributorId} 
                        inspectionRequiredInd={this.props.inspectionRequiredInd} 
                handleAccountOpportunityModal={this.props.handleAccountOpportunityModal}
                setIsModalOpen={this.props.setIsModalOpen}
                        />
                    ) : currentOrderType === "Commerce" ? (
                        <AccountProcureSecondStep 
                        distributorId={distributorId} 
                        inspectionRequiredInd={this.props.inspectionRequiredInd}
                        selectedLanguage={this.props.selectedLanguage}
                        translateText={this.props.translateText}
                        setIsModalOpen={this.props.setIsModalOpen}
                        />
                    ) : (
                        <AccountOrderSecondStep 
                        distributorId={distributorId} 
                        inspectionRequiredInd={this.props.inspectionRequiredInd} 
                setIsModalOpen={this.props.setIsModalOpen}
                        />
                    ),
            },
        ];
    };

    
    render() {
        const { current } = this.state; 
        const steps = this.getSteps();

        // const steps = [
        //     {
        //         title: "Order",
        //         icon: <GroupsIcon />,
        //         content: <AccountOpportunityForm 
        //         distributorId={this.props.distributorId} 
        //         inspectionRequiredInd={this.props.inspectionRequiredInd}
        //         currentOrderType={this.props.currentOrderType}
        //         type={this.props.type}
        //            current={props.current} 
        //  setCurrent={props.setCurrent} 
        //         />,
        //     },
        //     {
        //         title: "Phone details",
        //         icon: <CallIcon
        //             style={{ color: "blue" }}
        //         />,
        //         content:this.props.currentOrderType==="Quotation" ? 
        //         <AccountQuotationSecondStep 
        //         distributorId={this.props.distributorId} 
        //         inspectionRequiredInd={this.props.inspectionRequiredInd} 
        //         handleAccountOpportunityModal={this.props.handleAccountOpportunityModal}
        //         setIsModalOpen={this.props.setIsModalOpen}
        //         /> : 
        //         this.props.currentOrderType==="Commerce" ? 
        //         <AccountProcureSecondStep 
        //         distributorId={this.props.distributorId} 
        //         inspectionRequiredInd={this.props.inspectionRequiredInd}
        //         selectedLanguage={this.props.selectedLanguage}
        //         translateText={this.props.translateText}
        //         setIsModalOpen={this.props.setIsModalOpen}
        //         />:<AccountOrderSecondStep 
        //         distributorId={this.props.distributorId} 
        //         inspectionRequiredInd={this.props.inspectionRequiredInd} 
        //         setIsModalOpen={this.props.setIsModalOpen}
        //         />,
        //     },
        // ];
        // const { current } = this.state;
       
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
                                 
                                    {this.props.currentOrderType==="Quotation" && this.props.quotationId  && 
                                        <Button style={{ marginRight: "3rem", marginTop: "65px" }}
                                            className=" w-16 absolute top-3/4 right-0"
                                            // type="primary"
                                            onClick={() => this.next()}
                                        >
                                           Proceed
                                        </Button> }


                                         {this.props.currentOrderType==="Commerce" && this.props.orderId && 
                                        <Button style={{ marginRight: "3rem", marginTop: "65px" }}
                                            className=" w-16 absolute top-3/4 right-0"
                                            onClick={() => this.next()}
                                        >
                                           Proceed
                                        </Button>} 

                                        {this.props.currentOrderType==="Repair" && this.props.orderId && 
                                        <Button style={{ marginRight: "3rem", marginTop: "65px" }}
                                            className=" w-16 absolute top-3/4 right-0"  
                                            onClick={() => this.next()}
                                        >
                                           Proceed
                                        </Button>} 


                                    </>
                                )}
                            </>
                        )}

                        {current > 0 && (
                            <>
                            <Button
                                className=" w-16 absolute top-3/4 right-0 mt"
                                style={{ marginRight: "1rem", marginTop: "90px" }} onClick={() => this.prev()}
                            >
                              Previous
                            </Button>
                            
 {this.props.currentOrderType==="Commerce" &&
<Button
className=" w-16 absolute top-3/4 right-0 mt"
style={{ marginRight: "1rem", marginTop: "90px" }} onClick={() => this.props.setIsModalOpen(false)}
>
Close
</Button>}

</>
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
