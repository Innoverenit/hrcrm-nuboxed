
import React, { Component,lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import LanguageIcon from '@mui/icons-material/Language';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RememberMeIcon from '@mui/icons-material/RememberMe';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Currency from "./Currency/Currency";
import Region from "./Region/Region"
const Documents = lazy(() =>
  import("../Documents/Documents")
);
const Education = lazy(() =>
  import("../Educations/Education")
);
const Expense = lazy(() =>
  import("../Expense/Expense")
);
const IdProofs = lazy(() =>
  import("../Id Proof/IdProofs")
);
const Country = lazy(() =>
  import("./Country/Country")
);
const TabPane = StyledTabs.TabPane;

class OthersTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    
    };
  }
  
  handleTabChange = (key) => this.setState({ activeKey: key });
  renderTabContent = (key) => {
    switch (key) {
      case "1":
        return <Documents/>;
      case "2":
        return <IdProofs/>;
      case "3":
        return <Education />;
      case "4":
        return  <Expense />;
        case "5":
        return   <Country />;
        case "6":
        return   <Currency />;
        case "7":
        return   <Region />;
        
      default:
        return null;
    }
  };
  render() {
    const { activeKey } = this.state;
    return (
      <>
  <div class="flex flex-nowrap" >
        <div class=" w-full">
          <TabsWrapper>
            <StyledTabs defaultActiveKey={activeKey} onChange={this.handleTabChange}>
             
              <TabPane
                tab={
                  <>
                  <InsertDriveFileIcon/>
                    <span class=" ml-1">Documents</span>
                  </>
                }
                key="1"
              />
               
              <TabPane
                tab={
                  <>
                    <RememberMeIcon 
                    // icon={solid('id-card-clip')}
                     />
                    <span class=" ml-1" >Identity</span>
                  </>
                }
                key="2"
              />
                
              <TabPane
                tab={
                  <>
                    <i class="fa fa-graduation-cap"></i>
                    <span class=" ml-1">Education</span>
                  </>
                }
                key="3"
              />
               

              <TabPane
                tab={
                  <>  
                  <ReceiptIcon  />
                    <span class=" ml-1" >
                    Expense
                     </span>
                  </>
                }
                key="4"
              />
               
              <TabPane
                tab={
                  <>
                 <LanguageIcon/>
                    <span class=" ml-1">Country</span>
                  </>
                }
                key="5"
              />
               
              <TabPane
                tab={
                  <>
                 <MonetizationOnIcon/>
                    <span class=" ml-1">Currency</span>
                  </>
                }
                key="6"
              />
               <TabPane
                tab={
                  <>
                 <MonetizationOnIcon/>
                    <span class=" ml-1">Region</span>
                  </>
                }
                key="7"
              />
              
            </StyledTabs>
            <Suspense fallback={<div className="flex justify-center">Loading...</div>}>
              {this.renderTabContent(activeKey)}
            </Suspense>
          </TabsWrapper>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OthersTab);






