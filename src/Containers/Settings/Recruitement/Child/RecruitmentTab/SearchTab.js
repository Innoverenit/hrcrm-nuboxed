import React, { useEffect, useMemo, useState } from "react";
import { Tooltip } from "antd";
import {StyledTabs} from "../../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addsQuoteProSearchTab,
  // getQuoteProSearchTab,
} from "../../../../Rules/RulesAction";
import { BundleLoader } from "../../../../../Components/Placeholder";
import SearchForm from "./SearchForm";
const TabPane = StyledTabs.TabPane;
function SeachTab(props) {
  const [availibility, setAvailibility] = useState(10);
  const [billing, setBilling] = useState(25);
  function handleAvailibilitySliderChange(value) {
    setAvailibility(value);
  }
  function handlebillingSliderChange(value) {
    setBilling(value);
  }
  console.log(availibility);
  console.log(billing);
  useEffect(() => {
    debugger;
    // props.getQuoteProSearchTab(props.orgId);
    setAvailibility(props.searchTabData.avilableDate || 10);
    setBilling(props.searchTabData.billing || 25);
  }, [props.searchTabData.avilableDate, props.searchTabData.billing]);
  const lessCodeThanCheckingPrevRow = useMemo(() => {
    debugger;
    setAvailibility(props.searchTabData.avilableDate);
  }, []);
  const lessCodeThanCheckingPrevRow1 = useMemo(() => {
    debugger;
    setBilling(props.searchTabData.billing);
  }, []);
  useEffect(() => {
    debugger;
    if (props.searchTabData.avilableDate !== availibility) {
      debugger;
      setAvailibility(props.searchTabData.avilableDate);
    }
  }, [props.searchTabData]);
  useEffect(() => {
    debugger;
    if (props.searchTabData.billing !== billing) {
      debugger;
      setBilling(props.searchTabData.billing);
    }
  }, [props.searchTabData]);
  
  return (
    <>
    <TabsWrapper>
    <StyledTabs
           // defaultActiveKey="1"
           // onChange={this.handleTabChange}
           // forceRender={true}
          >
            <TabPane
            tab={
              <>
                
                  <span style={{ marginLeft: '0.25em' }}>Permission</span>
                
                <>                 
                  <Tooltip title="Permission">                   
                  </Tooltip>                 
                </>
              </>
            }
            key="1">
               <div style={{ marginTop: 10 }}>
              <SearchForm />
            </div>

            </TabPane>
      </StyledTabs> 
    </TabsWrapper>
    </>
  );
}

const mapStateToProps = ({ rule, auth }) => ({
  addingQuoteSearchTab: rule.addingQuoteSearchTab,
  addingQuoteSearchTabError: rule.addingQuoteSearchTabError,

  fetchingQuoteSearchTab: rule.fetchingQuoteSearchTab,
  fetchingQuoteSearchTabError: rule.fetchingQuoteSearchTabError,
  searchTabData: rule.searchTabData,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    addsQuoteProSearchTab, 
    // getQuoteProSearchTab 
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SeachTab);
