
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { bindActionCreators } from "redux";
import { StyledSteps } from "../../../../../Components/UI/Antd";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { FormattedMessage } from 'react-intl';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import AddAddressDetail from "./AddAddressDetail";
import AddOrderForm from "./AddCatalogueForm";
import AddCatalogueForm from "./AddCatalogueForm";

const Step = StyledSteps.Step;

class AccountOrder1Stepper extends Component {
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
                title: <FormattedMessage
                    id="app.order"
                    defaultMessage="Order"
                />,
                icon: <UserOutlined />,
                content: <AddAddressDetail distributorId={this.props.distributorId} inspectionRequiredInd={this.props.inspectionRequiredInd} />,
            },
            {
                title: <FormattedMessage
                    id="app.catalogue"
                    defaultMessage="Catalogue List"
                />,
                icon: <PhoneOutlined
                    style={{ color: "blue" }}
                />,
                content: <AddCatalogueForm distributorId={this.props.distributorId} inspectionRequiredInd={this.props.inspectionRequiredInd} />,
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
                    <div className="steps-action">
                        {current < steps.length - 1 && (
                            <>
                                {current > 1 ? null : (
                                    <>
                                        <Button className="mt-2"
                                            type="primary"
                                            onClick={() => this.next()}

                                        >
                                            <FormattedMessage
                                                id="app.proceed"
                                                defaultMessage="Proceed"
                                            />
                                        </Button>
                                    </>
                                )}
                            </>
                        )}

                        {current > 0 && (
                            <Button className="mt-1" onClick={() => this.prev()}>
                                <FormattedMessage
                                    id="app.previous"
                                    defaultMessage="Previous"
                                />
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
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountOrder1Stepper);
