import React,{lazy } from "react";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PaymentFinanceTable from "./PaymentFinanceTable"
import Vat from "../../../Category/Vat/Vat";
import VatForm from "../../../../Leads/Child/VatForm";
import DiscountCategory from "./DiscountCategory";
const CurrencyCoversionForm = lazy(() => import("./CurrencyCoversionForm"));
const CurrencyCoversionForm2 = lazy(() => import("./CurrencyCoversionForm2"));
const OneTimeTable = lazy(() => import("./OneTimeTable"));

const TabPane = StyledTabs.TabPane;
function DistributionTab(props) {
    return (
        <>
            <TabsWrapper>
                <StyledTabs defaultActiveKey="1" type="card">
                    <TabPane tab={`Currency`} key="1">
                        <div class=" mt-3">
                        <CurrencyCoversionForm/>
                        {/* <CurrencyCoversionForm2/> */}
                        <OneTimeTable/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Payment`} key="2">
                        <div class=" mt-3">
                       
                        
                        <PaymentFinanceTable/>
                        </div>
                    </TabPane>
                    <TabPane tab={`Vat`} key="3">
                        <div class=" mt-3">
                       
                        <VatForm/>
                        <Vat /> 
                        </div>
                    </TabPane>
                    <TabPane tab={`Discount`} key="4">
                        <div class=" mt-3">
                       <DiscountCategory/>
                      
                  
                        </div>
                    </TabPane>
                    {/* <TabPane tab={`Fiscal`} key="2">
                       fiscla
                    </TabPane> */}
                </StyledTabs>
            </TabsWrapper>
        </>
    );
}

const mapStateToProps = ({ settings, auth }) => ({

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({

    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DistributionTab);


