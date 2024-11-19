import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { bindActionCreators } from "redux";
import { UserOutlined } from "@ant-design/icons";
import CallIcon from '@mui/icons-material/Call';
import { FormattedMessage } from 'react-intl';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import { StyledSteps } from "../../../Components/UI/Antd";
import AddCatalogueForm from "./AddCatalogueForm";
import {handleOpportunityModal} from "../OpportunityAction";

const OpportunityForm = lazy(() => import("./OpportunityForm"));
const Step = StyledSteps.Step;

class OpportunityStepper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            thirdPageData: {},
            showProceed: false,
            paymentInTerms:"",
            advancePayment:"",
            currency:"",
            priority:"High",
            deliveryDate:"",
            comments:"",
            catalogueId:"",
            unit:"",
            price:"",
            emialInd:false,
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

    handlePaymenTerm=(trm)=>{
        this.setState({
            paymentInTerms:trm
        })
    }
    handleAdvancePayment=(e)=>{
        this.setState({
            advancePayment:e.target.value
        })
    }
    handleCurrency=(crr)=>{
        this.setState({
            currency:crr
        })
    }
    handleDeliveryDate=(dtt)=>{
        this.setState({
            deliveryDate:dtt
        })}
        handleComments=(e)=>{
            this.setState({
                comments:e.target.value
            })
        }

 handleButtonClick=(type)=> {
    this.setState({
        priority:type
    })      
 }
 handleChooseCatalogue = (ctl) => {
    this.setState({ catalogueId: ctl });
};
 handleUnit=(e)=>{
    this.setState({
        unit:e.target.value
    })}
    handlePrice=(e)=>{
        this.setState({
            price:e.target.value
        })}
       

    handleComplete = () => {
        this.props.handleOpportunityModal(false);
// setTimeout(() => {
//     window.location.reload(true);
//            }, 5000);
//this.props.addCustomerOffer(this.props.offerStep1.offerId)
    };

componentDidMount(){
   // this.props.getCreatedOffers(this.props.rowItem.offerId);
};
handleEmailInd = (checked) => {
    this.setState({ emailInd: checked });
  };

    render() {
        const {  ...formProps } = this.props;
     //   console.log(this.props.offerStep1.offerId)
        const steps = [
            {
                title: <FormattedMessage
                    id="app.order"
                    defaultMessage="Order"
                />,
                icon: <UserOutlined className=" text-green-600" 
                style={{ backgroundColor:"green"}} />,
                content: <OpportunityForm {...formProps}/>,
            },
            {
                title: <FormattedMessage
                    id="app.catalogue"
                    defaultMessage="Catalogue List"
                />,
                icon: <CallIcon className=" text-green-500"/>,
                content: <AddCatalogueForm
                // handleChooseCatalogue={this.handleChooseCatalogue}
                // catalogueId={this.state.catalogueId}
                // handleUnit={this.handleUnit}
                // unit={this.state.unit}
                // handlePrice={this.handlePrice}
                // price={this.state.price}
                // addedOpportunity={this.props.addedOpportunity}
                // createdOffers={this.props.createdOffers}
            />,
            },


        ];
        const { current } = this.state;
        return (
            <>
                <StyledSteps current={current}>
                    <Step
                        title={<AddShoppingCartIcon className=" !text-icon"  />}
                        description={<FormattedMessage
                            id="app.oderdetails"
                            defaultMessage="Order Details"
                        />}
                    />
                    <Step
                        title={<ControlPointDuplicateIcon className=" !text-icon" />}
                        description={<FormattedMessage
                            id="app.unitsinfo"
                            defaultMessage="Units Info"
                        />}
                    />

                </StyledSteps>
                <div
                    class="min-[50vh]"
                >{steps[current].content}</div>
                <div class="flex justify-end">
                    <div className="steps-action flex">
                    <div >
                                    {current > 0 && (
                                        <Button 
                                            type="tertiary"
                                            
                                            onClick={() => this.prev()}>
                                        <div class="text-base cursor-pointer"> Previous</div>
                                            {/* {this.props.translatedMenuItems[1]} */}
                                        </Button>
                                    )}
                                </div>
                                <div>
                                    {current === steps.length - 1 && (
                                        <>
                                            <Button
                                                type="secondary"
                                                onClick={() => this.handleComplete()}
                                                //  disabled={!this.state.checked}
                                            >
                                                <div class="text-base cursor-pointer">Complete</div> 
                                                {/* {this.props.translatedMenuItems[2]} */}
                                            </Button>

                                        </>
                                    )}
                                    </div>
                                &nbsp;
                                <div>
                                    {current < steps.length - 1 && (
                                        <>
                                          
                                    {current === 0 ?
                                            <Button 
                                            type="tertiary"
                                                onClick={() => {
                                                    this.next()
                                                }}
                                          
                                            >
                                           <div class="text-base cursor-pointer">
                                           Proceed
                                             </div>
                                  
                                            </Button> : 
                                            null}
                                        </>
                                    )}
                                                 </div>
                              
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = ({ auth, opportunity }) => ({
//serviceId:auth.serviceDetails.serviceId,
// contactId:auth.serviceDetails.contactId,
// addedOpportunity:opportunity.addedOpportunity,
// createdOffers:customer.createdOffers
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    // addCustomerOffer,
    // getCreatedOffers
    handleOpportunityModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityStepper);
