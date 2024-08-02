import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from 'styled-components';
import { MainWrapper } from "../../Components/UI/Layout";
import Piechart1 from "../../Components/Charts/PieChart1";
import TabsWrapper1 from "../../Components/UI/Layout/TabsWrapper1";
import { BundleLoader } from "../../Components/Placeholder";
import CustomerGoogleMap from "./Child/Chart/CustomerGoogleMap";
import CustomerViewGoogleMap from "./CustomerViewGoogleMap"
import CustomerAccountGoogleMap from "../Dashboard/CustomerAccountGoogleMap"
import CustomerDashboardJumpStart from "./Child/JumpStart/CustomerDashboardJumpStart";
import {setDashboardViewType,getProspectsData,getProspectLifeTime,getOpenQuotation,getOpenQuotationThisYear,getRegionRecords,getMultiOrgRegionRecords} from "./DashboardAction";
import DashboardProspectJumpstart from "./Child/JumpStart/DashboardProspectJumpstart";
import CustomerDashJumpstart from "./Child/JumpStart/CustomerDashJumpstart";
// import CustomerPieChart from "../Dashboard/Child/JumpStart/CustomerPieChart"
import DashOrderJumpstart from "./Child/JumpStart/DashOrderJumpstart";
import DashOrderFinanceJumpstart from "./Child/JumpStart/DashOrderFinanceJumpstart";
import InvestorFunnelTab from "./Child/InvestorFunnelTab";
import RegionalSales from "../DashboardPage/Child/RegionalSales";
import FullFillMentJumpstartBox from "./FullFillMentJumpstartBox";
import InvestorRegionalJumpstartBox from "../DashboardPage/Child/InvestorRegionalJumpstartBox";
import MultiOrgInvestorRegionalJumpstartBox from "../DashboardPage/Child/MultiOrgInvestorRegionalJumpstartBox";
import MultiOrgFullFillMentMJumpstartBox from "../DashboardPage/Child/MultiOrgFullFillMentMJumpstartBox";
import MultiOrgSales from "../DashboardPage/Child/MultiOrgSales";
const DashboardCustomerTab= lazy(()=>import("./DashboardCustomerTab"));
const FunnelChartAll= lazy(()=>import("./FunnelChartAll"));
const DashboardJumpstartAll= lazy(()=>import("../Dashboard/Child/JumpStart/DashboardJumpstartAll"));
const DashboardJumpstart= lazy(()=>import("../Dashboard/Child/JumpStart/DashboardJumpStart"));
const DashboardBulbJumpstart= lazy(()=>import("../Dashboard/Child/JumpStart/DashboardBulbJumpstart"));
const StackedClosureChart= lazy(()=>import("../Dashboard/StackedClosureChart"));
const Dashboardheader= lazy(()=>import("./Child/DashboardHeader"));
const TodoDashboardTab= lazy(()=>import("../Dashboard/TodoDashboardTab"));
const StackedClosureChartAll= lazy(()=>import("./StackedClosureChartAll"));
const TaskDashboardTab= lazy(()=>import("./TaskDashboardTab"));
const SourceChart= lazy(()=>import("./Child/Chart/SourceChart"));
const DashboardTaskOrganizationJumpstart= lazy(()=>import("./Child/JumpStart/DashboardTaskOrganizationJumpstart"));
const TaskOrganizationTab= lazy(()=>import("./TaskOrganizationTab"));
const CustomerLeadsTab= lazy(()=>import("./CustomerLeadsTab"));
const DashboardCustomerOrgJumpstart= lazy(()=>import("./Child/JumpStart/DashboardCustomerOrgJumpstart"));
const DashCustomerChartTab= lazy(()=>import("./DashCustomerChartTab"));
const DashboardInvestorsOrgJumpstart= lazy(()=>import("./Child/JumpStart/DashboardInvestorsOrgJumpstart"));
const InvestorsPitchTab= lazy(()=>import("./InvestorsPitchTab"));
const GantChartTab= lazy(()=>import("./Child/GantChartTab"));
const DashInvestorsChartTab= lazy(()=>import("./DashInvestorsChartTab"));
const FunnelTab= lazy(()=>import("./Child/FunnelTab"));
const DashboardDetailsTab= lazy(()=>import("./DashboardDetailsTab"));
const DashboardOrderJumpstart= lazy(()=>import("./Child/JumpStart/DashboardOrderJumpstart"));
const OrdersDashTab=lazy(()=>import("./OrdersDashTab"));
const DashboardFinanceJumpstart= lazy(()=>import("./Child/JumpStart/DashboardFinanceJumpstart"));
const FinanceDashTab=lazy(()=>import("./FinanceDashTab"));
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      activeTab: "Q1",
      loading: false,
      tab: ["Q1", "Q2", "Q3", "Q4"],
      activeButton: "test",
      selectedCountry: "",
      setInfoWindowPosition:null,
      showShareForm: false,
    };
    this.toggleShareForm = this.toggleShareForm.bind(this);
  }
   handleButtonClick=(buttonName)=>{
    this.setState({activeButton:buttonName});
    
  }

  toggleShareForm() {
    this.setState(prevState => ({
      showShareForm: !prevState.showShareForm
    }));
  }


  handleTabClick = async (key) => {
    this.setState({ activeTab: key, loading: true });
    await this.loadKPIsForTab(this.props.selectedYear, key);
    this.setState({ loading: false });
  };


  loadKPIsForTab = async (year, tabKey) => {
    const currentYear = new Date().getFullYear();
    await this.props.getRegionRecords(currentYear, tabKey
   
    );
    await this.props.getMultiOrgRegionRecords(this.props.emailId,currentYear, tabKey
   
      );
    
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleCallback = () => {
    this.setState({
      visible: false,
    });
  };
  handleMapClick = (event) => {
    console.log("event",event)
    const geocoder = new window.google.maps.Geocoder();
    const latlng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const country = results[0].address_components.find(
          (component) => component.types.includes('country')
        );

        if (country) {
          this.props.getProspectsData(country.long_name)
          this.props.getProspectLifeTime(country.long_name)
          this.props.getOpenQuotation(country.long_name)
          this.props.getOpenQuotationThisYear(country.long_name)
          // setSelectedCountry(country.long_name);
          this.setState({selectedCountry:country.long_name});
          this.setState({setInfoWindowPosition:latlng});
          console.log(country.long_name)
        }
      }
    });
  };

  render() {
    const { activeTab, loading, tab } = this.state;
    console.log(this.props.prospectLifeTime)
    console.log(this.props.prospectChart.customerCountByCountry)
    const {
      viewType,
      setDashboardViewType,
      timeZone,
      level,
      highestLevel,
      dept,
      country,
    } = this.props;
    console.log(this.state.showShareForm)
    const buttonName = this.state.showShareForm ? 'Enterprise' : 'My View';

    return (
      <React.Fragment>
   

        <Dashboardheader
        buttonName={buttonName} 
        activeTab={activeTab}
        toggleShareForm={this.toggleShareForm}
        showShareForm={this.state.showShareForm}
        tab={tab}
        handleTabClick={this.handleTabClick}
        viewType={viewType}
        setDashboardViewType={setDashboardViewType}
        handleButtonClick={this.handleButtonClick}
        activeButton={this.state.activeButton}
        selectedLanguage={this.props.selectedLanguage}
        translateText={this.props.translateText}
        />
        <Suspense fallback={<BundleLoader />}>
        <MainWrapper
         style={{marginTop:"0.5rem",overflow:"hidden"}}
    >
       {/* <div className=" rounded-md shadow-[0em_0.25em_0.625em_-0.125em]
         border-[0625em] border-solid m-1 p-1 w-full font-poppins  mt-2 overflow-hidden h-[21rem] max-sm:h-[30rem]
        "></div> */}
          <div class=" h-[21rem] max-sm:h-[19rem] max-sm:overflow-x-auto">
         <div class="flex justify-between  max-sm:flex-col">
           <div class="w-[53%] max-sm:w-wk">
           <div class=" flex flex-col h-[21rem] overflow-auto " >
           {viewType==="ME"?(
             <DashboardJumpstartAll/> )
             :viewType==="bulb" ? (<DashboardBulbJumpstart/>
             )
             :viewType==="ques" ? (<DashboardDetailsTab/>
             )
             : 
               this.state.activeButton==="Tasks" ?
             (<DashboardTaskOrganizationJumpstart
              selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}
             />)
             : 
             this.state.activeButton==="RecruitPro" ?
           (<DashboardJumpstartAll/>)
             : this.state.activeButton==="Investors" ?
             (<DashboardInvestorsOrgJumpstart/>)
            // (<DashboardCustomerOrgJumpstart/>)
             :viewType === "ALL" && this.state.activeButton==="Customer" ?
             (<DashboardCustomerOrgJumpstart/>)
             : this.state.activeButton==="Order" ?
             (<DashboardOrderJumpstart
              selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}
             />)
           
             : this.state.activeButton==="Finance" ?
             (<DashboardFinanceJumpstart
              buttonName={buttonName} 
             />)
             : this.state.activeButton==="Accounts" ?
             (<CustomerDashboardJumpStart/>)

             : this.state.activeButton === "Regional" && activeTab  ? (
              <CardElement>
                <div className="font-bold flex-col justify-center flex text-lg">Sales</div>
                <RegionalSales 
                 tab={tab}
                 tabKey={this.state.activeTab}
                
                 handleTabClick={this.handleTabClick}
                regionRecords={this.props.regionRecords}/>
              </CardElement>
            ) 
            
            : this.state.activeButton === "multiOrg" && activeTab  ? (
              <CardElement>
                <div className="font-bold flex-col justify-center flex text-lg">Sales</div>
                <MultiOrgSales 
                 tab={tab}
                 tabKey={this.state.activeTab}
                
                 handleTabClick={this.handleTabClick}
                 multiOrgRecords={this.props.multiOrgRecords}
         />
              </CardElement>
            ) 
            
             :
             (
              <DashboardJumpstart />
          )}
             <div class=" w-wk" >
             <div class=" flex flex-col " >
       <div class=" flex justify-between" >
       {this.state.activeButton==="Tasks" ? (
       <TaskOrganizationTab
       selectedLanguage={this.props.selectedLanguage}
       translateText={this.props.translateText}
       />)
       :this.state.activeButton==="Investors" ?(
        <InvestorsPitchTab/>)
        // <CustomerLeadsTab/>)
        :this.state.activeButton==="RecruitPro" ?(
          <StackedClosureChartAll/>)
        :this.state.activeButton==="Order" ?(
          <OrdersDashTab/>)
          :this.state.activeButton==="Finance" ?(
            <FinanceDashTab/>)
            :this.state.activeButton==="Regional" && activeTab ?(
              null)
              :this.state.activeButton==="multiOrg" && activeTab ?(
                null)
            
       :  this.state.activeButton==="Customer" ?(
        <CustomerLeadsTab/>)
        :  viewType==="ALL" ?(
          <Piechart1
          // width={450}
          // height={390}
          // // data={opportunityAmountBySource}
          // innerRadius={40}
          // outerRadius={80}
          // textData
          // curr

      />
          // <CustomerLeadsTab/>
          )
       :
       <TaskDashboardTab viewType={viewType}
       selectedLanguage={this.props.selectedLanguage}
       translateText={this.props.translateText}
       />
       }
      </div>
      
    </div>
    </div>

    <div className="flex justify-between">
  {viewType === "ME" ? (
    <StackedClosureChartAll />
  )
  //  : this.state.activeButton === "Investors" ? (
  //   // <DashInvestorsChartTab />
  //   <FunnelTab/>
  
  // ) 
  : this.state.activeButton === "RecruitPro" ? (
    <DashboardDetailsTab viewType={viewType}
    selectedLanguage={this.props.selectedLanguage}
    translateText={this.props.translateText}
    />
    // ) : this.state.activeButton === "Customer"  ? (
    //   <FunnelTab />
   
  ) : this.state.activeButton === "Finance" ? (
    null
    ) : this.state.activeButton === "Accounts" ? (
      null
      ) : viewType==="ALL" || this.state.activeButton === "Regional" && activeTab  ? (
        null
        
  ) 
  : viewType==="ALL" || this.state.activeButton === "multiOrg" && activeTab  ? (
    null
    
) : this.state.activeButton === "Customer" ? (
    null // Put your condition for StackedClosureChart here if needed
  ) : (
    this.state.activeButton === "Customer"   ? null : null
    // null
  )}
</div>


    </div>
    </div>

     <div class="w-[47%] max-sm:w-wk">
     <div class=" flex flex-col" >
     <div className="flex justify-between">
    {/* {this.state.activeButton === "test" && viewType !== "ALL" && (
        <TodoDashboardTab viewType={viewType} />
    )} */}

    {this.state.activeButton === "Order" && (
        <DashOrderJumpstart
        selectedLanguage={this.props.selectedLanguage}
        translateText={this.props.translateText}
        />
    )}

    {this.state.activeButton === "Finance" && (
        <DashOrderFinanceJumpstart />
    )}

    {viewType === "bulb" && (
        <SourceChart />
    )}

    {this.state.activeButton === "Investors" && (
        <InvestorFunnelTab />
    )}

    {this.state.activeButton === "Customer" && (
        <FunnelTab />
    )}

    {this.state.activeButton === "Accounts" && (
        <FunnelTab />
    )}

    {this.state.activeButton === "Regional" && activeTab && (
        <CardElement>
            <div className="font-bold flex-col justify-center flex text-lg">FulFillment</div>
            <FullFillMentJumpstartBox regionRecords={this.props.regionRecords}/>
        </CardElement>
    )}
     {this.state.activeButton === "multiOrg" && activeTab && (
        <CardElement>
            <div className="font-bold flex-col justify-center flex text-lg">FulFillment</div>
            <MultiOrgFullFillMentMJumpstartBox multiOrgRecords={this.props.multiOrgRecords}/>
        </CardElement>
    )}

    {this.state.activeButton === "Tasks" && (
        <GantChartTab />
    )}

    {this.state.activeButton === "RecruitPro" && (
        <FunnelChartAll />
    )}
</div>

         <div class=" flex justify-between" >
                {/* {this.state.activeButton==="Customer"&&
       <PieChart/>
             } */}
         
                  {this.state.activeButton==="RecruitPro"?
     (<DashboardCustomerTab
      viewType={viewType}
      />) :null
             }

      </div>
      
    </div>
    </div>
 
    </div>


  
    </div>
    </MainWrapper>
   
    <MainWrapper style={{marginTop:"1rem",overflow:"none"}}
    >
    <div class=" h-[21rem]   max-sm:h-[12rem] max-sm:overflow-x-auto">
         <div class="flex justify-between  max-sm:flex-col">
           <div class="w-[47.5%] max-sm:w-wk">
           <div class=" flex flex-col " >            

    <div class=" flex justify-between " >                                          
                    { viewType==="ALL" && this.state.activeButton==="Customer" ? ( <CustomerGoogleMap
                    handleMapClick={this.handleMapClick}
                    selectedCountry={this.state.selectedCountry}
                    setInfoWindowPosition={this.state.setInfoWindowPosition}
                      />)
                       : this.state.activeButton === "Accounts" ? (
                        <CustomerAccountGoogleMap 
                        handleMapClick={this.handleMapClick}
                        selectedCountry={this.state.selectedCountry}
                        setInfoWindowPosition={this.state.setInfoWindowPosition}
                        />)
                        : this.state.activeButton === "Regional" && activeTab  ?
                          <CardElement>
                          <div className="font-bold flex-col justify-center flex text-lg">Investment</div>
                          <InvestorRegionalJumpstartBox regionRecords={this.props.regionRecords}/>
                          </CardElement>
                           : this.state.activeButton === "multiOrg" && activeTab  ?
                           <CardElement>
                           <div className="font-bold flex-col justify-center flex text-lg">Investment</div>
                           <MultiOrgInvestorRegionalJumpstartBox multiOrgRecords={this.props.multiOrgRecords}/>
                           </CardElement>
                        : this.state.activeButton === "Investors" ? (
                          <CustomerGoogleMap />)
                          : this.state.activeButton === "Customer" ? (
                            <CustomerViewGoogleMap />)
                          // : this.state.activeButton === "test" ? (
                          //   <StackedClosureChart />)
                            : this.state.activeButton === "Tasks" ? (
                              <StackedClosureChart />)
                              : this.state.activeButton === "Order" ? (
                                <StackedClosureChart />)
                                : this.state.activeButton === "Finance" ? (
                                  <StackedClosureChart />)
                  //  : viewType==="ALL" || this.state.activeButton==="Customer" ? (<DashCustomerChartTab/>)               
            :(           
          null
          )}           
            </div> 
    </div>
    </div>

     <div class="w-[47.5%] max-sm:w-wk">
  
     <div class=" flex flex-col " >
       <div class=" flex flex-col  justify-between" >
       {this.state.activeButton==="Accounts"&&
       <CustomerDashJumpstart/>
             }
                  {this.state.activeButton==="Customer"&&
       <DashboardProspectJumpstart
       selectedCountry={this.state.selectedCountry}
       fetchingProspectQuotation={this.props.fetchingProspectQuotation}
       fetchingProspectData={this.props.fetchingProspectData}
       openQuotationYear={this.props.openQuotationYear}
       fetchingOpenQuotationYear={this.props.fetchingOpenQuotationYear}
       prospectChart={this.props.prospectChart}
       fetchingProspectLifetime={this.props.fetchingProspectLifetime}
       prospectQuotation={this.props.prospectQuotation}
       prospectLifeTime={this.props.prospectLifeTime}
       />
             }
                      {this.state.activeButton==="Investors"&&
       <DashboardProspectJumpstart/>
             }
                <div class=" flex flex-col justify-between" >
                     {/* {this.state.activeButton==="Customer"&&
       <StackedClosureChart />
             } */}
                          {/* {this.state.activeButton==="Accounts"&&
       <StackedClosureChart />
             } */}
             </div>
      </div>    
    </div>
   
    </div>
 
    </div>


  
    </div>
    </MainWrapper>
    
    </Suspense>


 
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ dashboard, auth }) => ({
  viewType:dashboard.viewType,
  emailId: auth.userDetails.emailId,
  regionRecords:dashboard.regionRecords,
  multiOrgRecords:dashboard.multiOrgRecords,
  fetchingProspectData:dashboard.fetchingProspectData,
  prospectLifeTime:dashboard.prospectLifeTime,
  fetchingProspectLifetime:dashboard.fetchingProspectLifetime,
  prospectChart:dashboard.prospectChart,
  prospectQuotation:dashboard.prospectQuotation,
  openQuotationYear:dashboard.openQuotationYear,
  fetchingProspectQuotation:dashboard.fetchingProspectQuotation,
  fetchingOpenQuotationYear:dashboard.fetchingOpenQuotationYear

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  setDashboardViewType,
  getProspectLifeTime,
  getRegionRecords,
  getMultiOrgRegionRecords,
  getOpenQuotationThisYear,
  getProspectsData,
  getOpenQuotation
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const CardElement = styled.div`
 
border-radius: 0.75rem;
    border: 3px solid #EEEEEE;
    background-color: rgb(255,255,255);
    box-shadow: 0 0.25em 0.62em #aaa;
    height: 18rem;
    color: rgb(68,68,68);
    margin: 1em;
    padding: 0.2rem;
    width: 42vw;
    display: flex;
    flex-direction: column;
  @media only screen and (max-width: 600px) {
    width:  -webkit-fill-available;
    
  }
`
