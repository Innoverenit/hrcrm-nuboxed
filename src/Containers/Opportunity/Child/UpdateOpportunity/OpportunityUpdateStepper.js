import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { bindActionCreators } from "redux";
import {  UserOutlined } from "@ant-design/icons";
import { FormattedMessage } from 'react-intl';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CallIcon from '@mui/icons-material/Call';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import { StyledSteps } from "../../../../Components/UI/Antd";
import AddCatalogueForm from "../AddCatalogueForm";
import {handleUpdateOpportunityModal} from "../../OpportunityAction";

const UpdateOpportunityForm = lazy(() => import("./UpdateOpportunityForm"));

const Step = StyledSteps.Step;

class OpportunityUpdateStepper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            thirdPageData: {},
            showProceed: false,
    
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
        this.props.handleUpdateOpportunityModal(false);

    };



    render() {
        const {  ...formProps } = this.props;
        const steps = [
            {
                title: <FormattedMessage
                    id="app.order"
                    defaultMessage="Order"
                />,
                icon: <UserOutlined />,
                content: <UpdateOpportunityForm
                opportunityId={this.props.opportunityId}
                translateText={this.props.translateText}
                selectedLanguage={this.props.selectedLanguage}
              translatedMenuItems={this.props.translatedMenuItems}

                />,
            },
            {
                title: <FormattedMessage
                    id="app.catalogue"
                    defaultMessage="Catalogue List"
                />,
                icon: <CallIcon style={{ color: "blue" }}/>,
                content: <AddCatalogueForm/>,
            },


        ];
        const { current } = this.state;
        return (
            <>
                <StyledSteps current={current}>
                    <Step
                        title={<AddShoppingCartIcon className="!text-icon" />}
                        description={<FormattedMessage
                            id="app.oderdetails"
                            defaultMessage="Order Details"
                        />}
                    />
                    <Step
                        title={<ControlPointDuplicateIcon  className="!text-icon" />}
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
                                           
                                        </Button>
                                    )}
                                </div>
                                <div>
                                    {current === steps.length - 1 && (
                                        <>
                                            <Button
                                                type="secondary"
                                                onClick={() => this.handleComplete()}
                 
                                            >
                                                <div class="text-base cursor-pointer">Complete</div> 
                                 
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

});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    handleUpdateOpportunityModal

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityUpdateStepper);
