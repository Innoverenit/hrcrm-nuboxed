import React, {lazy,Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ContactsIcon from '@mui/icons-material/Contacts';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
 import {
  getInvestorWeightedValue,
  handleInvestorActivityJumpstartModal,
  getInvestorActivityValue,
  getWonInvestorWeightedValue,
  getInvestorOppValue,
  getWonInvestorOppValue,
  getInvestorPipeLineValue,
  getWonInvestorPipeLineValue,
  getInvestorContactValue
} from "../../InvestorAction"
import { JumpStartBox, } from "../../../../Components/UI/Elements";
const InvestorPieChart1 =lazy(()=> import("../InvestorTable/InvestorPieChart1"));
const InvestorPieChart2 =lazy(()=> import("../InvestorTable/InvestorPieChart2"));
const CustomerPieLineChart =lazy(()=> import("../InvestorTable/CustomerPieLineChart"));
const AddInvestorActivityJumpstartModal =lazy(()=> import("./AddInvestorActivityJumpstartModal"));
class InvestorPulseJumpStart extends React.Component{
  constructor() {
    super();
    const startDate = dayjs().startOf("month"); 
    const endDate = dayjs();
    var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  this.state = {
    date: date,
    startDate,
    endDate
  };
}
componentDidMount() {
  // const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
  // const endDate = `${this.state.endDate.format("YYYY-MM-DD")}T20:00:00Z`
  
  this.props.getInvestorActivityValue(this.props.RowData.investorId)
   this.props.getInvestorWeightedValue(this.props.RowData.investorId)
    this.props.getInvestorOppValue(this.props.RowData.investorId); 
    this.props.getWonInvestorWeightedValue(this.props.RowData.investorId);   
     this.props.getInvestorContactValue(this.props.RowData.investorId);
     this.props.getInvestorPipeLineValue(this.props.RowData.investorId);
     this.props.getWonInvestorPipeLineValue(this.props.RowData.investorId);
     this.props.getWonInvestorOppValue(this.props.RowData.investorId);
  // console.log(`Start Date: ${this.state.startDate.format("ll")}`);
  // console.log(`End Date: ${this.state.endDate.format("ll")}`);
}

render() {
   const weightedValue = `${this.props.InvWeightedValue.weightedValue} ${this.props.InvWeightedValue.tradeCurrency}`;
   const pipeLineValue = `${this.props.InvestorPipelineValue.pipeLineValue} ${this.props.InvestorPipelineValue.tradeCurrency}`;
  //const weightedValue  = isNaN(Math.floor((this.props.InvWeightedValue.weightedValue / this.props.InvWeightedValue.tradeCurrency) * 100)) ? 0 : Math.floor((this.props.InvWeightedValue.weightedValue/ this.props.InvWeightedValue.tradeCurrency) * 100)
  const { showDatelist, fetchingDatewiseReport } = this.props;
  console.log( this.props.taskperCount)
   const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
  //   const endDate = new Date(this.state.endDate);

  console.log(startDate)
  console.log(this.state.endDate.format("YYYY MM DD"))
  const {
    handleInvestorActivityJumpstartModal,
    addInvestorActivityJumpstartModal
  } = this.props;
  return(
    <>
     <div class="flex  h-[70vh] flex-col">
    <div class="flex justify-between items-center h-[50vh]">
    <div className="w-1/2">
        <div class=" text-base flex  font-bold justify-center text-[blue] mt-1">Current</div>
    <div class=" flex flex-row w-full" >
    
    <div class="flex flex-wrap w-full" >
    <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-1 bg-green-600">
                                  <CurrencyExchangeIcon className="!text-3xl text-[#FFFF]"></CurrencyExchangeIcon></div>
                             </div>
                             <JumpStartBox
            noProgress
            title=" # Deals"
              
            bgColor="#33D7FF" 
            // bgColor="linear-gradient(270deg,#7630f0,#ad82f7)"
            value={
              this.props.InvestOppValue.opportunity

            }
            isLoading={this.props.fetchingInvestorOppValue} 
            //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          
          />
                         </div>
                     </div>
                 
                 </div> 
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-1 bg-pink-600"><CurrencyExchangeIcon className="!text-3xl text-[#FFFF]"></CurrencyExchangeIcon></div>
                               </div>
                               <JumpStartBox
            noProgress
            // bgColor="linear-gradient(270deg,#ad82f7,#3dcec7)"
            bgColor="#34495E "
            title="Pipe line"
              
          
            value={
              pipeLineValue

            }
             isLoading={this.props.fetchingInvPipelineValue} 
            //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          
          />
                           </div>
                       </div>
                    
                   </div>  
                    
                <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-1 bg-yellow-600"><CurrencyExchangeIcon className="!text-3xl text-[#FFFF]"></CurrencyExchangeIcon></div>
                               </div>
                               <JumpStartBox
            bgColor="#35CD7A"
          // bgColor="linear-gradient(270deg,#3062d8,#94a4b2)"
            noProgress
            // title="Open Tasks"
            title="Weighted Value"
              
            value={
              weightedValue

            }
            isLoading={this.props.fetchingINVWeightedValue} 
            //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          
            
          />
                           </div>
                       </div>
                     
                   </div>  
                   
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2 mt-2">
                      
                      <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                          <div class="flex flex-row items-center">
                              <div class="flex-shrink pr-3">
                                  <div class="rounded-full p-1 bg-blue-600">  <HourglassFullIcon className="text-blue-500  !text-3xl" /> </div>
                              </div>
                              <JumpStartBox
        noProgress
        title="Activity"
          
        value={
          this.props.InvestActivityValue.count

        }
        jumpstartClick={() => {
          handleInvestorActivityJumpstartModal(true);
        }}
  
        cursorData={"pointer"}
        bgColor="#FF4C33"

      
      />
                          </div>
                      </div>
                     
                  </div>
       
                  <div class="w-full md:w-1/2 xl:w-1/3 p-2 mt-2">
                      
                      <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                          <div class="flex flex-row items-center">
                              <div class="flex-shrink pr-3">
                                  <div class="rounded-full p-1 bg-blue-600"><ContactsIcon className="!text-3xl text-[#FFFF]"/></div>
                              </div>
                              <JumpStartBox
           bgColor="linear-gradient(270deg,black,grey)"
            noProgress
            title="#Contacts "
             

            value={
              this.props.InvcontactValue.contact

            }
            isLoading={this.props.fetchingInvContactValue} 
          />    
                          </div>
                      </div>
                     
                  </div>
         </div>
      </div>
      <div class=" text-base justify-center flex font-bold mt-8 text-[blue]">Past</div>
        <div class=" flex flex-row w-full mt-4" >
        <div class="flex w-full flex-wrap" >
        <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-1 bg-green-600"><CurrencyExchangeIcon className="!text-3xl text-[#FFFF]"></CurrencyExchangeIcon></div>
                             </div>
                             <JumpStartBox
             bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
                noProgress
                title="Won Deals"
               
                value={
                  this.props.WonInvestOpp.opportunityWon
    
                }
                isLoading={this.props.fetchingWonInvestorOppValue} 
                //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
              
              />
                         </div>
                     </div>
                 
                 </div> 
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-1 bg-pink-600"><CurrencyExchangeIcon className="!text-3xl text-[#FFFF]"></CurrencyExchangeIcon></div>
                               </div>
                               <JumpStartBox
               bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
                noProgress
                title="Won Pipe line value"
                 
                value={
                  this.props.WonInvestorPipeline.pipeLineWonValue
    
                }
                 isLoading={this.props.fetchingWonInvPipelineValue} 
              />
    
                           </div>
                       </div>
                    
                   </div>  
                    
                <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-1 bg-yellow-600"><CurrencyExchangeIcon className="!text-3xl text-[#FFFF]"></CurrencyExchangeIcon></div>
                               </div>
                               <JumpStartBox
               bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
                noProgress
                // title="Open Tasks"
                title="Won Weighted Value"
                  
                value={
                  this.props.WonInvWeighted.weightedWonValue
    
                }
                isLoading={this.props.fetchingWonINVWeightedValue} 
                
              />
                           </div>
                       </div>
                     
                   </div>  
           
            </div>
          </div>        
          </div>

          <div class=" mt-1 flex flex-col  items-center" > 
          <div className="font-bold font-poppins  text-lg">Line Chart</div>
        <Suspense><CustomerPieLineChart/></Suspense>   </div> 

        </div>



        <div class=" mt-1 flex justify-between items-center" > 
          <div className=" flex flex-col">
          <div className="font-bold font-poppins  text-lg">Deals</div>
          <Suspense><InvestorPieChart1/></Suspense>  
          </div>
        <div className=" flex flex-col">
        <div className="font-bold font-poppins text-lg">Activity</div>
        <Suspense><InvestorPieChart2/></Suspense> 
       
       </div>
        </div> 
        </div> 
       
          <AddInvestorActivityJumpstartModal
       RowData={this.props.RowData}
       addInvestorActivityJumpstartModal={addInvestorActivityJumpstartModal}
       handleInvestorActivityJumpstartModal={handleInvestorActivityJumpstartModal}
      />
          </>
    
  ); 
}
}
const mapStateToProps = ({ investor,auth }) => ({
  addInvestorActivityJumpstartModal:investor.addInvestorActivityJumpstartModal,
  InvestActivityValue:investor.InvestActivityValue,
  WonInvWeighted:investor.WonInvWeighted,
  fetchingWonINVWeightedValue:investor.fetchingWonINVWeightedValue,
  WonInvestorPipeline:investor.WonInvestorPipeline,
  fetchingWonInvPipelineValue:investor.fetchingWonInvPipelineValue,
  WonInvestOpp:investor.WonInvestOpp,
  fetchingWonInvestorOppValue:investor.fetchingWonInvestorOppValue,
  InvcontactValue:investor.InvcontactValue,
  fetchingInvContactValue:investor.fetchingInvContactValue,
  InvestorPipelineValue:investor.InvestorPipelineValue,
  fetchingInvPipelineValue:investor.fetchingInvPipelineValue,
  InvestOppValue:investor.InvestOppValue,
  fetchingInvestorOppValue:investor.fetchingInvestorOppValue,
  InvWeightedValue:investor.InvWeightedValue,
  fetchingINVWeightedValue:investor.fetchingINVWeightedValue
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getInvestorWeightedValue,
  getInvestorActivityValue,
  getWonInvestorWeightedValue,
getInvestorOppValue,
getWonInvestorOppValue,
getInvestorPipeLineValue, 
getWonInvestorPipeLineValue, 
getInvestorContactValue,
handleInvestorActivityJumpstartModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InvestorPulseJumpStart);
