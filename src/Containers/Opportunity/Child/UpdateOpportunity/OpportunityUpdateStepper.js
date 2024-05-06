import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { bindActionCreators } from "redux";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { FormattedMessage } from 'react-intl';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
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
                content: <UpdateOpportunityForm/>,
            },
            {
                title: <FormattedMessage
                    id="app.catalogue"
                    defaultMessage="Catalogue List"
                />,
                icon: <PhoneOutlined style={{ color: "blue" }}/>,
                content: <AddCatalogueForm/>,
            },


        ];
        const { current } = this.state;
        return (
            <>
                <StyledSteps current={current}>
                    <Step
                        title={<AddShoppingCartIcon style={{ fontSize: "1rem" }} />}
                        description={<FormattedMessage
                            id="app.oderdetails"
                            defaultMessage="Order Details"
                        />}
                    />
                    <Step
                        title={<ControlPointDuplicateIcon style={{ fontSize: "1rem" }} />}
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
                                        <label class="text-base cursor-pointer"> Previous</label>
                                           
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
                                                <label class="text-base cursor-pointer">Complete</label> 
                                 
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
                                           <label class="text-base cursor-pointer">
                                           Proceed
                                             </label>
                                  
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
