import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MainWrapper } from "../../Components/UI/Layout";
import Piechart1 from "../../Components/Charts/PieChart1";
import { BundleLoader } from "../../Components/Placeholder";
import {setDashboardViewType,getProspectsData,getProspectLifeTime,getOpenQuotation,
  getOpenQuotationThisYear,getRegionRecords,getMultiOrgRegionRecords,
  getSourceCountAcc,
  getCategoryCountAcc
} from "./DashboardAction";

const CustomerGoogleMap=lazy(()=>import("./Child/Chart/CustomerGoogleMap"));
const CustomerViewGoogleMap=lazy(()=>import("./CustomerViewGoogleMap"));
const CustomerAccountGoogleMap=lazy(()=> import("../Dashboard/CustomerAccountGoogleMap"));
const CustomerDashboardJumpStart=lazy(()=>import("./Child/JumpStart/CustomerDashboardJumpStart"));
const CustomerDashboardOrgJumpStart=lazy(()=>import("./Child/JumpStart/CustomerDashboardOrgJumpStart"));
const DashboardProspectJumpstart=lazy(()=>import("./Child/JumpStart/DashboardProspectJumpstart"));
const DashboardInvestorJumpstart=lazy(()=>import ("./Child/JumpStart/DashboardInvestorJumpstart"));
const DashboardInvestorJumpstartOrg=lazy(()=>import ("./Child/JumpStart/DashboardInvestorJumpstartOrg"));
const DashProcureQuotaJumpstartUser=lazy(()=>import ("./Child/JumpStart/DashProcureQuotaJumpstartUser"));
const DashProcureQuotaJumpstartOrg=lazy(()=>import ("./Child/JumpStart/DashProcureQuotaJumpstartOrg"));
const DashInvPayProcureJumstartbox=lazy(()=>import ("./Child/JumpStart/DashInvPayProcureJumstartbox"));
const DashInvPayProcureJumstartboxOrg=lazy(()=>import ("./Child/JumpStart/DashInvPayProcureJumstartboxOrg"));
const DashOrdrProcureJumstartbox=lazy(()=>import ("./Child/JumpStart/DashOrdProcureJumstartbox"));
const CustomerDashJumpstart=lazy(()=>import("./Child/JumpStart/CustomerDashJumpstart"));
const  DashOrderJumpstart=lazy(()=>import("./Child/JumpStart/DashOrderJumpstart"));
const  DashOrderJumpstartOrg=lazy(()=>import("./Child/JumpStart/DashOrderJumpstartOrg"));
const DashOrderFinanceJumpstart=lazy(()=> import("./Child/JumpStart/DashOrderFinanceJumpstart"));
const InvestorFunnelTab=lazy(()=>import("./Child/InvestorFunnelTab"));
const RegionalSales =lazy(()=>import("../DashboardPage/Child/RegionalSales"));
const FullFillMentJumpstartBox=lazy(()=>import("./FullFillMentJumpstartBox"));
const InvestorRegionalJumpstartBox=lazy(()=>import("../DashboardPage/Child/InvestorRegionalJumpstartBox"));
const  MultiOrgInvestorRegionalJumpstartBox=lazy(()=>import("../DashboardPage/Child/MultiOrgInvestorRegionalJumpstartBox"));
const MultiOrgFullFillMentMJumpstartBox=lazy(()=>import("../DashboardPage/Child/MultiOrgFullFillMentMJumpstartBox"));
const MultiOrgSales=lazy(()=>import("../DashboardPage/Child/MultiOrgSales"));
const DashboardCustomerTab= lazy(()=>import("./DashboardCustomerTab"));
const FunnelChartAll= lazy(()=>import("./FunnelChartAll"));
const DashboardJumpstartAll= lazy(()=>import("../Dashboard/Child/JumpStart/DashboardJumpstartAll"));
const DashboardJumpstart= lazy(()=>import("../Dashboard/Child/JumpStart/DashboardJumpStart"));
const DashboardBulbJumpstart= lazy(()=>import("../Dashboard/Child/JumpStart/DashboardBulbJumpstart"));
const StackedClosureChart= lazy(()=>import("../Dashboard/StackedClosureChart"));
const Dashboardheader= lazy(()=>import("./Child/DashboardHeader"));
const SourceChart= lazy(()=>import("./Child/Chart/SourceChart"));
const DashboardTaskOrganizationJumpstart= lazy(()=>import("./Child/JumpStart/DashboardTaskOrganizationJumpstart"));
const DashboardTaskUserJumpstart= lazy(()=>import("./Child/JumpStart/DashboardTaskUserJumpstart"));
const TaskOrganizationTab= lazy(()=>import("./TaskOrganizationTab"));
const ProspectDashboardJumpStart= lazy(()=>import("./Child/JumpStart/ProspectDashboardJumpStart"));
const ProspectDashboardJumpStartOrg= lazy(()=>import("./Child/JumpStart/ProspectDashboardJumpStartOrg"));
const DashboardInvestorsOrgJumpstart= lazy(()=>import("./Child/JumpStart/DashboardInvestorsOrgJumpstart"));
const GantChartTab= lazy(()=>import("./Child/GantChartTab"));
const FunnelTab= lazy(()=>import("./Child/FunnelTab"));
const DashboardDetailsTab= lazy(()=>import("./DashboardDetailsTab"));
const DashboardOrderJumpstart= lazy(()=>import("./Child/JumpStart/DashboardOrderJumpstart"));
const DashboardOrderJumpstartOrg = lazy(()=>import("./Child/JumpStart/DashboardOrderJumpstartOrg"));
const DashboardProcureJumpstartUser= lazy(()=>import("./Child/JumpStart/DashboardProcureJumpstartUser"));
const DashboardProcureJumpstartOrg= lazy(()=>import("./Child/JumpStart/DashboardProcureJumpstartOrg"));
const DashboardFinanceJumpstart= lazy(()=>import("./Child/JumpStart/DashboardFinanceJumpstart"));
const DashboardFinanceJumpstartOrg= lazy(()=>import("./Child/JumpStart/DashboardFinanceJumpstartOrg"));
const FinanceDashTab=lazy(()=>import("./FinanceDashTab"));
const DashRepairOrdrLeftJumstartbox =lazy(()=>import("./Child/JumpStart/DashRepairOrdrLeftJumstartbox"));
const DashRepairOrdrLeftJumstartboxOrg =lazy(()=>import("./Child/JumpStart/DashRepairOrdrLeftJumstartboxOrg"));
const DashRepairOrdRightJumstartbox =lazy(()=>import("./Child/JumpStart/DashRepairOrdRightJumstartbox"));
const DashRepairOrdRightJumstartboxOrg =lazy(()=>import("./Child/JumpStart/DashRepairOrdRightJumstartboxOrg"));
const InvestorDashboardJumpStart= lazy(()=>import("./Child/JumpStart/InvestorDashboardJumpStart"));
const DashBoardSummary = lazy(()=>import("./Child/DashBoardSummary"));
const Totalists = lazy(()=>import("./Child/JumpStart/Totalists"));
class Dashboard extends Component {


  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      activeTab: "Q1",
      loading: false,
      tab: ["Q1", "Q2", "Q3", "Q4"],
      activeButton: "Summary",
      setInfoWindowPosition:null,
      showShareForm: false,
      dashRepairCount: "",
      error: null,
      loading: true,
      selectedCountry:null,
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
          // this.props.getProspectsData(country.long_name)
          // this.props.getProspectLifeTime(country.long_name)
          // this.props.getOpenQuotation(country.long_name)
          // this.props.getOpenQuotationThisYear(country.long_name)
          this.props.getSourceCountAcc(this.props.userId,this.props.timeRangeType,country.long_name);
          this.props.getCategoryCountAcc(this.props.userId,this.props.timeRangeType,country.long_name);
          this.setState({selectedCountry:country.long_name});
          this.setState({setInfoWindowPosition:latlng});
          console.log(country.long_name)
        }
      }
    });
  };
  
  render() {
    const { activeTab, loading, tab,selectedCountry,setInfoWindowPosition } = this.state;
    console.log("222",selectedCountry)
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
         <Suspense fallback={<BundleLoader />}>

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
            
            {viewType==="ME" && this.state.activeButton==="Summary" ?
         <div>
             <DashBoardSummary
              buttonName={buttonName} 
              selectedLanguage={this.props.selectedLanguage}
              translateText={this.props.translateText}
              viewType={viewType}
             />
              </div> :
              viewType==="ALL" && this.state.activeButton==="Summary" ? <div>
                <DashBoardSummary
              buttonName={buttonName} 
              selectedLanguage={this.props.selectedLanguage}
              translateText={this.props.translateText}
              viewType={viewType}
             />
              </div>:
              this.state.activeButton==="totaLists" ? 
                (<Totalists  selectedLanguage={this.props.selectedLanguage}
                 translateText={this.props.translateText}
                 buttonName={buttonName} 
                 />)
              
             :
             <div> 

        <MainWrapper style={{overflow:"hidden"}}>
      
          <div class=" h-[45vh] max-sm:h-[38vh] max-sm:overflow-x-auto">
         <div class="flex justify-around  max-sm:flex-col">
           <div class="w-[52.5%] max-sm:w-wk">
           <div class=" flex flex-col h-[45vh] border-[3px] box-border" >
           {viewType==="ME" ?
           (
            <div className=" text-base">Me View</div>
           && 
          //  this.state.activeButton==="test" ?
            // ( <DashboardJumpstart 
            //  selectedLanguage={this.props.selectedLanguage}
            //  translateText={this.props.translateText}/>)
            
              this.state.activeButton==="Procure" ?
             (<DashboardProcureJumpstartUser
              selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}
             />)
             :this.state.activeButton==="Accounts" ?
             (<CustomerDashboardJumpStart
              viewType={viewType}
              selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}/>)
             : this.state.activeButton==="Finance" ?
             (<DashboardFinanceJumpstart
              buttonName={buttonName} 
              selectedLanguage={this.props.selectedLanguage}
              translateText={this.props.translateText}
             />)
             :this.state.activeButton==="Tasks" ?
             (<>
             <DashboardTaskUserJumpstart 
              selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}
             />
             <TaskOrganizationTab viewType={viewType}
             selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}
             /> </>
            )
            : this.state.activeButton==="Customer" ?
             (<ProspectDashboardJumpStart
              selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}/>)

             : this.state.activeButton==="Investors" ?
             (<InvestorDashboardJumpStart
              selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}/>)

             : this.state.activeButton==="Order" &&
             (<DashboardOrderJumpstart
              selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}
             />) 
             
           )
             :
             viewType==="bulb" ? (<DashboardBulbJumpstart
              selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}/>
             )
             :viewType==="ques" ? (<DashboardDetailsTab
              selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}/>
             )
             : this.state.activeButton==="Tasks" ?
             (<DashboardTaskOrganizationJumpstart
              selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}
             />
            )
             
            

             :viewType === "ALL" && 
             this.state.activeButton==="Customer" ?
             (<ProspectDashboardJumpStartOrg
              selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}/>) :
             this.state.activeButton==="Procure" ?
             (<DashboardProcureJumpstartOrg
              selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}
             />) 
             : this.state.activeButton==="Order" ?
             <DashboardOrderJumpstartOrg
             selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}
             />
            : this.state.activeButton==="Tasks" ? (
              <TaskOrganizationTab
              selectedLanguage={this.props.selectedLanguage}
              translateText={this.props.translateText}
              />)
          //    :this.state.activeButton==="RecruitPro" ?
          //  (<DashboardJumpstartAll
          //   selectedLanguage={this.props.selectedLanguage}
          //    translateText={this.props.translateText}/>)
           
             : this.state.activeButton==="Finance" ?
             (<DashboardFinanceJumpstartOrg
              buttonName={buttonName} 
              selectedLanguage={this.props.selectedLanguage}
              translateText={this.props.translateText}
             />)
             : this.state.activeButton==="Accounts" ?
             (<CustomerDashboardOrgJumpStart
              viewType={viewType}
              selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}/>)

             : this.state.activeButton==="Investors" ?
             (<DashboardInvestorsOrgJumpstart
              selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}/>)

             : this.state.activeButton === "Regional" && activeTab  ? (
              <div class="h-[9rem] w-[21vw] rounded p-1 m-1 mt-5 bg-white border-[2px] border-[#eeeeee] text-black">
                <div className="font-bold flex-col justify-center flex text-lg">Sales</div>
                <RegionalSales 
                 tab={tab}
                 tabKey={this.state.activeTab}
                 handleTabClick={this.handleTabClick}
                 regionRecords={this.props.regionRecords}
                 selectedLanguage={this.props.selectedLanguage}
                 translateText={this.props.translateText}/>
              </div>
            ) 
            
            : this.state.activeButton === "multiOrg" && activeTab  ? (
              <div class="h-[9rem] w-[21vw] rounded p-1 m-1 mt-5 bg-white border-[2px] border-[#eeeeee] text-black">
                <div className="font-bold flex-col justify-center flex text-lg">Sales</div>
                <MultiOrgSales 
                 tab={tab}
                 tabKey={this.state.activeTab}
                 handleTabClick={this.handleTabClick}
                 multiOrgRecords={this.props.multiOrgRecords}
                 selectedLanguage={this.props.selectedLanguage}
                 translateText={this.props.translateText}
         />
              </div>
            ) 
            
             :
             (
              <>
              <DashboardJumpstart 
              selectedLanguage={this.props.selectedLanguage}
              translateText={this.props.translateText}/>

               {this.state.activeButton==="RecruitPro" &&
               (<DashboardJumpstartAll
                selectedLanguage={this.props.selectedLanguage}
                 translateText={this.props.translateText}/>)
                }
      </>
          )}
             <div class=" w-wk" >
             <div class=" flex flex-col " >
       <div class=" flex justify-between" >
       
       {/* :this.state.activeButton==="Investors" ?(
        <InvestorsPitchTab
        selectedLanguage={this.props.selectedLanguage}
        translateText={this.props.translateText}/>)
        <CustomerLeadsTab/>)
        :this.state.activeButton==="RecruitPro" ?(
          <StackedClosureChartAll
          selectedLanguage={this.props.selectedLanguage}
          translateText={this.props.translateText}/>) */}
        {
        // this.state.activeButton==="Order" ?(
        //   <OrdersDashTab
        //   selectedLanguage={this.props.selectedLanguage}
        //   translateText={this.props.translateText}/>)
          // :
          this.state.activeButton==="Finance" ?
          // (
          //   <FinanceDashTab
          //   selectedLanguage={this.props.selectedLanguage}
          //   translateText={this.props.translateText}/>)
          null
            :this.state.activeButton==="Regional" && activeTab ?(
              null)
              :this.state.activeButton==="multiOrg" && activeTab ?(
                null)
            
      //  :  this.state.activeButton==="Customer" ?(
      //   <CustomerLeadsTab
      //   selectedLanguage={this.props.selectedLanguage}
      //   translateText={this.props.translateText}/>)
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
       : null}
       
      </div>
      
    </div>
    </div>

    <div className="flex justify-between">
  {viewType === "ME" && 
  // (<StackedClosureChartAll 
  //   selectedLanguage={this.props.selectedLanguage}
  //   translateText={this.props.translateText}/> )
  //  : this.state.activeButton === "Investors" ? (
  //   // <DashInvestorsChartTab />
  //   <FunnelTab/>
  
  // ) 
  this.state.activeButton === "RecruitPro" ? (
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

     <div class="w-[47%] max-sm:w-wk border box-border">
     <div class=" flex flex-col max-sm:flex-col" >
     <div className="flex justify-between">
    {/* {this.state.activeButton === "test" && viewType !== "ALL" && (
        <TodoDashboardTab viewType={viewType} />
    )} */}
 {viewType === "ME" && this.state.activeButton==="Procure" &&
             (<DashProcureQuotaJumpstartUser
              selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}
             />)}
              {viewType === "ALL" && this.state.activeButton==="Procure" &&
             (<DashProcureQuotaJumpstartOrg
              selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}
             />)}
            
    {viewType === "ME" && this.state.activeButton === "Order" && (
        <DashOrderJumpstart
        selectedLanguage={this.props.selectedLanguage}
        translateText={this.props.translateText}
        />
    )}
{viewType === "ALL" && this.state.activeButton === "Order" && (
        <DashOrderJumpstartOrg
        selectedLanguage={this.props.selectedLanguage}
        translateText={this.props.translateText}
        />
    )}
    {this.state.activeButton === "Finance" && (
        <DashOrderFinanceJumpstart 
        selectedLanguage={this.props.selectedLanguage}
        translateText={this.props.translateText}/>
    )}
    {viewType === "bulb" && (
        <SourceChart
        selectedLanguage={this.props.selectedLanguage}
        translateText={this.props.translateText}/>
    )}

    {this.state.activeButton === "Investors" && (
        <InvestorFunnelTab 
        selectedLanguage={this.props.selectedLanguage}
        translateText={this.props.translateText}/>
    )}

    {this.state.activeButton === "Customer" && (
        <FunnelTab 
        selectedLanguage={this.props.selectedLanguage}
        translateText={this.props.translateText}/>
    )}

    {this.state.activeButton === "Accounts" && (
        <FunnelTab
        selectedLanguage={this.props.selectedLanguage}
        translateText={this.props.translateText} />
    )}

    {this.state.activeButton === "Regional" && activeTab && (
        <div class="h-[9rem] w-[21vw] rounded p-1 m-1 mt-5 bg-white border-[2px] border-[#eeeeee] text-black">
            <div className="font-bold flex-col justify-center flex text-lg">FulFillment</div>
            <FullFillMentJumpstartBox regionRecords={this.props.regionRecords}
             selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}/>
        </div>
    )}
     {this.state.activeButton === "multiOrg" && activeTab && (
       <div class="h-[9rem] w-[21vw] rounded p-1 m-1 mt-5 bg-white border-[2px] border-[#eeeeee] text-black">
            <div className="font-bold flex-col justify-center flex text-lg">FulFillment</div>
            <MultiOrgFullFillMentMJumpstartBox multiOrgRecords={this.props.multiOrgRecords}
             selectedLanguage={this.props.selectedLanguage}
             translateText={this.props.translateText}/>
        </div>
    )}

    {this.state.activeButton === "Tasks" && (
        <GantChartTab 
        selectedLanguage={this.props.selectedLanguage}
        translateText={this.props.translateText}/>
    )}

    {this.state.activeButton === "RecruitPro" && (
        <FunnelChartAll 
        selectedLanguage={this.props.selectedLanguage}
        translateText={this.props.translateText}/>
    )}
</div>

         <div class=" flex justify-between" >
                {/* {this.state.activeButton==="Customer"&&
       <PieChart/>
             } */}
         
                  {this.state.activeButton==="RecruitPro"?
     (<DashboardCustomerTab
      viewType={viewType}
      selectedLanguage={this.props.selectedLanguage}
      translateText={this.props.translateText}/>) :null
             }

      </div>
      
    </div>
    </div>
 
    </div>


  
    </div>
    </MainWrapper>

    <MainWrapper style={{marginTop:"0.5rem",overflow:"none"}}
    >
    <div class=" h-[44vh]   max-sm:h-[38vh] max-sm:overflow-x-auto">
         <div class="flex justify-between  max-sm:flex-col">
           <div class="w-[47.5%] max-sm:w-wk border box-border">
           <div class=" flex flex-col " >            

    <div class=" flex justify-between " >                                          
                    { viewType==="ALL" && this.state.activeButton==="Customer" && ( 
                      <CustomerGoogleMap
                    handleMapClick={this.handleMapClick}
                    selectedCountry={this.state.selectedCountry}
                    setInfoWindowPosition={this.state.setInfoWindowPosition}
                      />)}

{viewType==="ALL" && this.state.activeButton === "Finance" &&
                                    (<DashRepairOrdrLeftJumstartboxOrg  selectedLanguage={this.props.selectedLanguage}
                                      translateText={this.props.translateText}/>)}

                       { this.state.activeButton === "Accounts" ? (
                        <CustomerAccountGoogleMap 
                        handleMapClick={this.handleMapClick}
                        selectedCountry={selectedCountry}
                        setInfoWindowPosition={setInfoWindowPosition}
                        />)
                        : this.state.activeButton === "Regional" && activeTab  ?
                        <div class="h-[9rem] w-[21vw] rounded p-1 m-1 mt-5 bg-white border-[2px] border-[#eeeeee] text-black">
                          <div className="font-bold flex-col justify-center flex text-lg">Investment</div>
                          <InvestorRegionalJumpstartBox regionRecords={this.props.regionRecords}
                           selectedLanguage={this.props.selectedLanguage}
                           translateText={this.props.translateText}/>
                          </div>
                           : this.state.activeButton === "multiOrg" && activeTab  ?
                           <div class="h-[9rem] w-[21vw] rounded p-1 m-1 mt-5 bg-white border-[2px] border-[#eeeeee] text-black">
                           <div className="font-bold flex-col justify-center flex text-lg">Investment</div>
                           <MultiOrgInvestorRegionalJumpstartBox multiOrgRecords={this.props.multiOrgRecords}
                            selectedLanguage={this.props.selectedLanguage}
                            translateText={this.props.translateText}/>
                           </div>
                        : this.state.activeButton === "Investors" ? (
                          <CustomerGoogleMap 
                          selectedLanguage={this.props.selectedLanguage}
                          translateText={this.props.translateText}/>)
                          : this.state.activeButton === "Customer" ? (
                            <CustomerViewGoogleMap 
                            selectedLanguage={this.props.selectedLanguage}
                            translateText={this.props.translateText} />)
                          // : this.state.activeButton === "test" ? (
                          //   <StackedClosureChart />)
                            : this.state.activeButton === "Tasks" ? (
                              <StackedClosureChart 
                              selectedLanguage={this.props.selectedLanguage}
                              translateText={this.props.translateText}/>)
                              // : this.state.activeButton === "Order" ? (
                              //   <StackedClosureChart 
                              //   selectedLanguage={this.props.selectedLanguage}
                              //   translateText={this.props.translateText} />)
                              : this.state.activeButton === "Order" ? (
                                <CustomerViewGoogleMap/>)
                              

                                // : this.state.activeButton === "Finance" ? (
                                //   <StackedClosureChart 
                                //   selectedLanguage={this.props.selectedLanguage}
                                //   translateText={this.props.translateText}/>)

                                  : viewType==="ALL" && this.state.activeButton === "Procure" ?
                                  (<DashInvPayProcureJumstartboxOrg  selectedLanguage={this.props.selectedLanguage}
                                    translateText={this.props.translateText}/>)
                  //  : viewType==="ALL" || this.state.activeButton==="Customer" ? (<DashCustomerChartTab/>)               
            :(           
              null
          )} 
          {viewType==="ME" && this.state.activeButton === "Finance" &&
              (<DashRepairOrdrLeftJumstartbox  selectedLanguage={this.props.selectedLanguage}
                translateText={this.props.translateText}/>)}       

                {viewType==="ME" && this.state.activeButton === "Procure" &&
              (<DashInvPayProcureJumstartbox  selectedLanguage={this.props.selectedLanguage}
                translateText={this.props.translateText}/>)}          
            </div> 
    </div>
    </div>

     <div class="w-[52%] max-sm:w-wk border box-border">
  
     <div class=" flex flex-col " >
       <div class=" flex flex-col  justify-between" >
       {this.state.activeButton==="Accounts"&&
       <CustomerDashJumpstart
       selectedLanguage={this.props.selectedLanguage}
       translateText={this.props.translateText}
       sourceCountAcc={this.props.sourceCountAcc}
        categoryCountAcc={this.props.categoryCountAcc}
       />
             }
                  {this.state.activeButton==="Customer"&&
       <DashboardProspectJumpstart
       selectedLanguage={this.props.selectedLanguage}
       translateText={this.props.translateText}
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
               
                {viewType==="ME" && this.state.activeButton==="Investors" &&
       <DashboardInvestorJumpstart
       selectedLanguage={this.props.selectedLanguage}
       translateText={this.props.translateText}/>
             }
             {viewType==="ALL" && this.state.activeButton==="Investors" &&
       <DashboardInvestorJumpstartOrg
       selectedLanguage={this.props.selectedLanguage}
       translateText={this.props.translateText}/>
             }
              {/* {this.state.activeButton==="Order" &&
       <DashboardProspectJumpstart
       selectedLanguage={this.props.selectedLanguage}
       translateText={this.props.translateText}
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
             } */}

            {viewType==="ME" && this.state.activeButton === "Procure" &&
             (<DashOrdrProcureJumstartbox
              selectedLanguage={this.props.selectedLanguage}
              translateText={this.props.translateText}
             />)}

     {viewType==="ME" && this.state.activeButton === "Finance" &&
             (<DashRepairOrdRightJumstartbox
              selectedLanguage={this.props.selectedLanguage}
              translateText={this.props.translateText} 
             />)}
 {viewType==="ALL" && this.state.activeButton === "Finance" &&
             (<DashRepairOrdRightJumstartboxOrg
              selectedLanguage={this.props.selectedLanguage}
              translateText={this.props.translateText} 
             />)}
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

    </div> }
                      
            
    </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ dashboard, auth }) => ({
  viewType:dashboard.viewType,
  emailId: auth.userDetails.emailId,
  userId: auth.userDetails.userId,
  regionRecords:dashboard.regionRecords,
  multiOrgRecords:dashboard.multiOrgRecords,
  fetchingProspectData:dashboard.fetchingProspectData,
  prospectLifeTime:dashboard.prospectLifeTime,
  fetchingProspectLifetime:dashboard.fetchingProspectLifetime,
  prospectChart:dashboard.prospectChart,
  prospectQuotation:dashboard.prospectQuotation,
  openQuotationYear:dashboard.openQuotationYear,
  fetchingProspectQuotation:dashboard.fetchingProspectQuotation,
  fetchingOpenQuotationYear:dashboard.fetchingOpenQuotationYear,
  timeRangeType: dashboard.timeRangeType,
  sourceCountAcc:dashboard.sourceCountAcc,
  categoryCountAcc:dashboard.categoryCountAcc,

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  setDashboardViewType,
  getProspectLifeTime,
  getRegionRecords,
  getMultiOrgRegionRecords,
  getOpenQuotationThisYear,
  getProspectsData,
  getOpenQuotation,
  getSourceCountAcc,
  getCategoryCountAcc
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
