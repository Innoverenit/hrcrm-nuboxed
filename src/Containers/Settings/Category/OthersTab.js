
import React, { Component,lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import {  Badge } from "antd";
import LanguageIcon from '@mui/icons-material/Language';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RememberMeIcon from '@mui/icons-material/RememberMe';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Currency from "./Currency/Currency";
import Region from "./Region/Region"
import ServiceLine from "./ServiceLine/ServiceLine"
// import {getRegionCount} from "../Category/Region/RegionAction"
// import {getServiceLineCount} from "../Category/ServiceLine/ServiceLineAction"
import KpiMasterList from "./KpiMasterList/KpiMasterList";
import Industry from "./Industry/Industry";
import IndustryTab from "./Industry/IndustryTab";

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

  // componentDidMount() {
  //   this.props.getRegionCount(this.props.organizationId)
  //   this.props.getServiceLineCount(this.props.organizationId)
  // }
  
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
        case "8":
          return   <KpiMasterList />;
        case "9":
          return   <ServiceLine />;
          case "10":
            return     <IndustryTab />;
       
        
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
                  <Badge
                count={this.props.documentCount.DocumentTypeCount}
                overflowCount={999}
              >
                    <span class=" ml-1">Documents 
                    {/* <span className="text-red-500 font-bold">{this.props.documentCount.DocumentTypeCount}</span> */}
                    </span>
                    </Badge>
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
                         <Badge
                count={this.props.idProofCount.IdProofTypeCount}
                overflowCount={999}
              >
                    <span class=" ml-1" >Identity 
                    {/* <span className="text-red-500 font-bold">{this.props.idProofCount.IdProofTypeCount}</span> */}
                    </span>
                    </Badge>
                  </>
                }
                key="2"
              />
                
              <TabPane
                tab={
                  <>
                    <i class="fa fa-graduation-cap"></i>
                    <Badge
                count={this.props.educationCount.EducationTypeCount}
                overflowCount={999}
              >
                    <span class=" ml-1">Education 
                    {/* <span className="text-red-500 font-bold">{this.props.educationCount.EducationTypeCount}</span> */}
                    </span>
                    </Badge>
                  </>
                }
                key="3"
              />
               

              <TabPane
                tab={
                  <>  
                  <ReceiptIcon  />
                    <span class=" ml-1" >
                    <Badge
                count={this.props.expenseCount.ExpenseCount}
                overflowCount={999}
              >
                    Expense 
                    {/* <span className="text-red-500 font-bold">{this.props.expenseCount.ExpenseCount}</span> */}
                    </Badge>
                     </span>
                  </>
                }
                key="4"
              />
               
              <TabPane
                tab={
                  <>
                 <LanguageIcon/>
                 <Badge
                count={this.props.countryCount.CountryCount}
                overflowCount={999}
              >
                    <span class=" ml-1">Country 
                    {/* <span className="text-red-500 font-bold">{this.props.countryCount.CountryCount}</span> */}
                 
                    </span>
                    </Badge>
                  </>
                }
                key="5"
              />
               
              <TabPane
                tab={
                  <>
                 <MonetizationOnIcon/>
                 <Badge
                count={this.props.currencyCount.CurrencyCount}
                overflowCount={999}
              >
                    <span class=" ml-1">Currency 
                     {/* <span className="text-red-500 font-bold">{this.props.currencyCount.CurrencyCount}</span> */}
                    </span>
                    </Badge>
                  </>
                }
                key="6"
              />
               <TabPane
                tab={
                  <>
                 <MonetizationOnIcon/>
                 <Badge
                count={this.props.regionCount.RegionsCount}
                overflowCount={999}
              >
                    <span class=" ml-1">Region 
                    {/* {this.props.regionCount.RegionsCount} */}
                    </span>
                    </Badge>
                  </>
                }
                key="7"
              />
                <TabPane
                tab={
                  <>
                 <MonetizationOnIcon/>
                 <Badge
                count={this.props.masterKpiCount.PerformanceManagementCount}
                overflowCount={999}
              >
                    <span class=" ml-1">KPI MasterList 
                    {/* {this.props.regionCount.RegionsCount} */}
                    </span>
                    </Badge>
                  </>
                }
                key="8"
              />

<TabPane
                tab={
                  <>
                 <MonetizationOnIcon/>
                 <Badge
                count={this.props.serviceLineCount.ServiceLineCount}
                overflowCount={999}
              >
                    <span class=" ml-1">Service Line 
                    {/* {this.props.serviceLineCount.ServiceLineCount} */}
                     </span>
                    </Badge>
                  </>
                }
                key="9"
              />
             
             <TabPane
                  tab={
                    <>
                      <MonetizationOnIcon />
                      <Badge
                count={this.props.industryCount.IndustryCount}
                overflowCount={999}
              >
                      <span class=" ml-1" >
                Industry
                      </span>
                      </Badge>
                    </>
                  }
                  key="10"
                >
         
                </TabPane>
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
const mapStateToProps = ({
  region,auth,serviceLines,industry,masterKpi,currency,countrys,education,idProof,expenses,document
}
) => ({
  industryCount:industry.industryCount,
  documentCount:document.documentCount,
  masterKpiCount:masterKpi.masterKpiCount,
  currencyCount:currency.currencyCount,
  educationCount:education.educationCount,
  idProofCount:idProof.idProofCount,
  countryCount:countrys.countryCount,
  expenseCount:expenses.expenseCount,
  organizationId: auth.userDetails.organizationId,
  regionCount:region.regionCount,
  serviceLineCount:serviceLines.serviceLineCount,

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  // getRegionCount,
  // getServiceLineCount
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OthersTab);






