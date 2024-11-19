
import React, { Component,lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { bindActionCreators } from "redux";
import { StyledSteps } from "../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../Components/Placeholder";
import GroupsIcon from '@mui/icons-material/Groups';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';

const ProcureStep1 = lazy(() => import('./ProcureStep1'));
const Step = StyledSteps.Step;

class UpdateProcureStepper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            thirdPageData: {},
            translatedMenuItems: [],
        };
    }
    componentDidMount() {
        this.fetchMenuTranslations();
      }
    
      componentDidUpdate(prevProps) {
        if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
          this.fetchMenuTranslations();
        }
      }
    
      fetchMenuTranslations = async () => {
        try {
          const itemsToTranslate = [
            "660",//0 "Order"
            "236",//1 "Order Details"
            "269",//2 "Units Info"
            "252",//3 "Proceed"
         "267" // "Previous"
            
          ];
    
          const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
          this.setState({ translatedMenuItems: translations });
        } catch (error) {
          console.error('Error translating menu items:', error);
        }
      };
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
                title:this.state.translatedMenuItems[0],
                icon: <GroupsIcon />,
                content: <Suspense fallback={<BundleLoader />}><ProcureStep1
                selectedLanguage={this.props.selectedLanguage}
                translateText={this.props.translateText}
                 orderId={this.props.particularRowData.orderId} inspectionRequiredInd={this.props.inspectionRequiredInd} /> </Suspense>,
            },
            // {
            //     title: <FormattedMessage
            //         id="app.phonedetails"
            //         defaultMessage="Phone details"
            //     />,
            //     icon: <CallIcon
            //         style={{ color: "blue" }}
            //     />,
            //     content: <OrderStep2 orderId={this.props.particularRowData.orderId} distributorId={this.props.distributorId} inspectionRequiredInd={this.props.inspectionRequiredInd} />,
            // },


        ];
        const { current } = this.state;
        return (
            <>
                <StyledSteps current={current}>
                    <Step
                        title={<AddShoppingCartIcon className="!text-icon" />}
                        description={this.state.translatedMenuItems[1]}
                    />
                    <Step
                        title={<ControlPointDuplicateIcon className="!text-icon" />}
                        description={this.state.translatedMenuItems[2]}
                    />
                </StyledSteps>
                <div class="min-[50vh]"
                >{steps[current].content}</div>
                <div class="flex justify-end">
                    <div className="steps-action">
                        {current < steps.length - 1 && (
                            <>
                                {current > 1 ? null : (
                                    <>
                                        <Button
                                            style={{ marginRight: "3rem", marginTop: "70px" }}
                                            className=" w-16 absolute top-3/4 right-0"
                                            type="primary"
                                            onClick={() => this.next()}


                                        >
                                            {this.state.translatedMenuItems[3]}
                                        </Button>
                                    </>
                                )}
                            </>
                        )}

                        {current > 0 && (
                            <Button
                                className=" w-16 absolute top-3/4 right-0 mt"
                                style={{ marginRight: "1rem", marginTop: "90px" }}
                                onClick={() => this.prev()}>
                               {this.state.translatedMenuItems[4]}

                            </Button>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = ({ auth }) => ({
    inspectionRequiredInd: auth.userDetails.inspectionRequiredInd,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProcureStepper);
