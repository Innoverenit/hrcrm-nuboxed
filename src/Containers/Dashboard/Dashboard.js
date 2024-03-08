import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { MainWrapper } from "../../Components/UI/Layout";
import Piechart1 from "../../Components/Charts/PieChart1";
import TabsWrapper1 from "../../Components/UI/Layout/TabsWrapper1";
import { BundleLoader } from "../../Components/Placeholder";
import CustomerGoogleMap from "./Child/Chart/CustomerGoogleMap";
import CustomerDashboardJumpStart from "./Child/JumpStart/CustomerDashboardJumpStart";
import {setDashboardViewType} from "./DashboardAction";
import DashboardProspectJumpstart from "./Child/JumpStart/DashboardProspectJumpstart";
import CustomerDashJumpstart from "./Child/JumpStart/CustomerDashJumpstart";
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
  state = { visible: false,activeButton:"test" };

   handleButtonClick=(buttonName)=>{
    this.setState({activeButton:buttonName});
  }

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
  render() {
    const {
      viewType,
      setDashboardViewType,
      timeZone,
      level,
      highestLevel,
      dept,
      country,
    } = this.props;

    return (
      <React.Fragment>
   

        <Dashboardheader 
        viewType={viewType}
        setDashboardViewType={setDashboardViewType}
        handleButtonClick={this.handleButtonClick}
        activeButton={this.state.activeButton}
        />
        <Suspense fallback={<BundleLoader />}>
          <div class=" h-[44vh] max-sm:h-[36rem] max-sm:overflow-x-auto">
         <div class="flex justify-between  max-sm:flex-col">
           <div class="w-[53%] max-sm:w-wk">
           <div class=" flex flex-col display-block" >
           {viewType==="ME"?(
             <DashboardJumpstartAll/> )
             :viewType==="bulb" ? (<DashboardBulbJumpstart/>
             )
             :viewType==="ques" ? (<DashboardDetailsTab/>
             )
             : 
               this.state.activeButton==="Tasks" ?
             (<DashboardTaskOrganizationJumpstart/>)
             : 
             this.state.activeButton==="RecruitPro" ?
           (<DashboardJumpstartAll/>)
             : this.state.activeButton==="Investors" ?
             (<DashboardInvestorsOrgJumpstart/>)
             :viewType==="ALL" || this.state.activeButton==="Customer" ?
             (<DashboardCustomerOrgJumpstart/>)
             : this.state.activeButton==="Order" ?
             (<DashboardOrderJumpstart/>)
             : this.state.activeButton==="Finance" ?
             (<DashboardFinanceJumpstart/>)
             : this.state.activeButton==="Accounts" ?
             (<CustomerDashboardJumpStart/>)
             :
             (
              <DashboardJumpstart />
          )}
             <div class=" w-wk" >
             <div class=" flex flex-col display-block" >
       <div class=" flex justify-between" >
       {this.state.activeButton==="Tasks" ? (
       <TaskOrganizationTab/>)
       :this.state.activeButton==="Investors" ?(
        <InvestorsPitchTab/>)
        :this.state.activeButton==="RecruitPro" ?(
          <StackedClosureChartAll/>)
        :this.state.activeButton==="Order" ?(
          <OrdersDashTab/>)
          :this.state.activeButton==="Finance" ?(
            <FinanceDashTab/>)
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
       :<TaskDashboardTab
      viewType={viewType}
      />
       }
      </div>
      
    </div>
    </div>

    <div className="flex justify-between">
  {viewType === "ME" ? (
    <StackedClosureChartAll />
  ) : this.state.activeButton === "Investors" ? (
    <DashInvestorsChartTab />

  ) : this.state.activeButton === "RecruitPro" ? (
    <DashboardDetailsTab viewType={viewType} />
    ) : this.state.activeButton === "Customer" ? (
      <FunnelTab />
  ) : this.state.activeButton === "Finance" ? (
    null
  ) : this.state.activeButton === "Customer" ? (
    null // Put your condition for StackedClosureChart here if needed
  ) : (
    this.state.activeButton === "Customer" ? null : <StackedClosureChart />
  )}
</div>


    </div>
    </div>

     <div class="w-[47%] max-sm:w-wk">
     <div class=" flex flex-col display-block" >
       <div class=" flex justify-between" >
       {this.state.activeButton ==="test" && viewType !=="ALL" && (
            <TodoDashboardTab
            viewType={viewType}
            />)}

            
             {viewType==="bulb" ? (<SourceChart/>)
            
             :null
            }
                  {this.state.activeButton==="Customer"&&
       <FunnelTab/>
             }
                  {/* {this.state.activeButton==="Customer"&&
       <PieChart/>
             } */}
             {this.state.activeButton==="Tasks"&&
       <GantChartTab/>
             }
                  {this.state.activeButton==="RecruitPro"&&
       <FunnelChartAll/>
             }
                  {/* {this.state.activeButton==="RecruitPro"&&
       <GantChartTab/>
             } */}

{/* {viewType==="ALL"  &&
       <FunnelTab/>
             } */}
   
      </div>

         <div class=" flex justify-between" >
                {/* {this.state.activeButton==="Customer"&&
       <PieChart/>
             } */}
         
                  {this.state.activeButton==="RecruitPro"&&
      <DashboardCustomerTab
      viewType={viewType}
      />
             }


   
      </div>
      
    </div>
    </div>
 
    </div>


  
    </div>
    <MainWrapper style={{marginTop:"1rem",overflow:"none",height:"21rem"}}
    >
    <div class=" h-[44vh]  max-sm:h-[36rem] max-sm:overflow-x-auto">
         <div class="flex justify-between  max-sm:flex-col">
           <div class="w-[53%] max-sm:w-wk">
           <div class=" flex flex-col display-block" >
          
     

    <div class=" flex justify-between" >
                
              
                 
                    { viewType==="ALL" || this.state.activeButton==="Customer" ? ( <CustomerGoogleMap
                      />)
                       : this.state.activeButton === "Accounts" ? (
                        <CustomerGoogleMap />)
                  //  : viewType==="ALL" || this.state.activeButton==="Customer" ? (<DashCustomerChartTab/>)
            
           
            :(
              
          null
          )}
               
            </div> 

    </div>
    </div>

     <div class="w-[47%] max-sm:w-wk">
  
     <div class=" flex flex-col display-block" >
       <div class=" flex flex-col  justify-between" >
       {this.state.activeButton==="Accounts"&&
       <CustomerDashJumpstart/>
             }
                  {this.state.activeButton==="Customer"&&
       <DashboardProspectJumpstart/>
             }
                <div class=" flex flex-col justify-between" >
                     {this.state.activeButton==="Customer"&&
       <StackedClosureChart />
             }
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

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  setDashboardViewType
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


