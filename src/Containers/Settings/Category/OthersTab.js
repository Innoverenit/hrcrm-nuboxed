
import React, { Component,lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import {  Badge } from "antd";
import LanguageIcon from '@mui/icons-material/Language';
import PublicIcon from '@mui/icons-material/Public';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RememberMeIcon from '@mui/icons-material/RememberMe';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Currency from "./Currency/Currency";
import Region from "./Region/Region"
import ServiceLine from "./ServiceLine/ServiceLine";
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ConstructionIcon from '@mui/icons-material/Construction';
import FactoryIcon from '@mui/icons-material/Factory';
import KpiMasterList from "./KpiMasterList/KpiMasterList";
import IndustryTab from "./Industry/IndustryTab";
import Machinary from "./Machinary/Machinary";
import WorkFlowC from "./WorkFlowC";
import UOM from "./UOM";

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
            case "11":
              return     <Machinary />;
              case "12":
                return     <WorkFlowC />;
                case "13":
                  return     <UOM />;
          
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
                  <InsertDriveFileIcon className="!text-icon"/>
                  <span class="!text-tab ml-1  text-sm">Documents 
                    {/* <span className="text-red-500 font-bold">{this.props.documentCount.DocumentTypeCount}</span> */}
                    </span>
                  <Badge
                count={this.props.documentCount.DocumentTypeCount}
                overflowCount={999} offset={[ 0, -16]}
              >
                    
                    </Badge>
                  </>
                }
                key="1"
              />
               
              <TabPane
                tab={
                  <>
                    <RememberMeIcon className="!text-icon"
                    // icon={solid('id-card-clip')}
                     />
                     
                    <span class="!text-tab ml-1 text-sm" >Identity 
                  
                    </span>
                         <Badge
                count={this.props.idProofCount.IdProofTypeCount}
                overflowCount={999} offset={[ 0, -16]}
              >
                    </Badge>
                  </>
                }
                key="2"
              />
                
              <TabPane
                tab={
                  <>
                    <i class="fa fa-graduation-cap"></i>
                    <span class="!text-tab ml-1 text-sm">Education 
                    {/* <span className="text-red-500 font-bold">{this.props.educationCount.EducationTypeCount}</span> */}
                    </span>
                    <Badge
                count={this.props.educationCount.EducationTypeCount}
                overflowCount={999} offset={[ 0, -16]}
              >
                    
                    </Badge>
                  </>
                }
                key="3"
              />
               

              <TabPane
                tab={
                  <>  
                  <ReceiptIcon className="!text-icon" />
                    <span class="!text-tab ml-1 text-sm" >  Expense  </span>
                    <Badge
                count={this.props.expenseCount.ExpenseCount}
                overflowCount={999} offset={[ 0, -16]}
              >
                  
                  
                    </Badge>
                    
                  </>
                }
                key="4"
              />
               
              <TabPane
                tab={
                  <>
                 <LanguageIcon className="!text-icon text-sm"/><span class="!text-tab ml-1 text-sm">Country  </span>
                 <Badge
                count={this.props.countryCount.CountryCount}
                overflowCount={999} offset={[ 0, -16]}
              >
                    
                    </Badge>
                  </>
                }
                key="5"
              />
               
              <TabPane
                tab={
                  <>
                 <MonetizationOnIcon className="!text-icon"/><span class="!text-tab ml-1 text-sm">Currency  </span>
                 <Badge
                count={this.props.currencyCount.CurrencyCount}
                overflowCount={999} offset={[ 0, -16]}
              >
                    
                    </Badge>
                  </>
                }
                key="6"
              />
               <TabPane
                tab={
                  <>
              
                 <PublicIcon className="!text-icon"/>   <span class="!text-tab ml-1 text-sm">Region   </span>
                 <Badge
                count={this.props.regionCount.RegionsCount}
                overflowCount={999} offset={[ 0, -16]}
              >
                 
                    </Badge>
                  </>
                }
                key="7"
              />
                <TabPane
                tab={
                  <>
                 < PlaylistAddIcon className=" !text-icon"/>  <span class="!text-tab ml-1 text-sm">KPI MasterList 
                    {/* {this.props.regionCount.RegionsCount} */}
                    </span>
                 <Badge
                count={this.props.masterKpiCount.PerformanceManagementCount}
                overflowCount={999} offset={[ 0, -16]}
              >  </Badge>
                  </>
                }
                key="8"
              />

<TabPane
                tab={
                  <>
                 <MiscellaneousServicesIcon className="!text-icon"/>  <span class="!text-tab ml-1 text-sm">Service Line 
                 </span>
                 <Badge
                count={this.props.serviceLineCount.ServiceLineCount}
                overflowCount={999} offset={[ 0, -16]}
              >
                  
                    </Badge>
                  </>
                }
                key="9"
              />
             
             <TabPane
                  tab={
                    <>
                        <FactoryIcon className="!text-icon"/>  <span class="!text-tab ml-1 text-sm" >
                Industry
                      </span>
                      <Badge
                count={this.props.industryCount.IndustryCount}
                overflowCount={999} offset={[ 0, -16]}
              >
                  
                      </Badge>
                    </>
                  }
                  key="10"
                >
         
                </TabPane>
                <TabPane
                  tab={
                    <>
                    <ConstructionIcon className="!text-icon"/>   <span class="!text-tab ml-1 text-sm" >
                Machinary
                      </span>
                      <Badge
                count={this.props.machinaryCount.machinaryCount}
                overflowCount={999} offset={[ 0, -16]}
              >
                  
                      </Badge>
                    </>
                  }
                  key="11"
                >
         
                </TabPane>
                <TabPane
                  tab={
                    <>
                      <MonetizationOnIcon className="!text-icon"/>
                      {/* <Badge
                count={this.props.machinaryCount.machinaryCount}
                overflowCount={999}
              > */}
                      <span class="!text-tab ml-1 text-sm" >
                WorkFlow
                      </span>
                      {/* </Badge> */}
                    </>
                  }
                  key="12"
                >
         
                </TabPane>
                <TabPane
                  tab={
                    <>
                      <MonetizationOnIcon className="!text-icon"/>
                      <Badge
                count={this.props.UOMCount.UOMCount}
                overflowCount={999}
              >
                      <span class="!text-tab ml-1 text-sm" >
                UOM
                      </span>
                      </Badge>
                    </>
                  }
                  key="13"
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
  region,auth,settings,serviceLines,industry,masterKpi,currency,countrys,education,idProof,expenses,document,machinary
}
) => ({
  industryCount:industry.industryCount,
  machinaryCount:machinary.machinaryCount,
  UOMCount:settings.UOMCount,
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






