import React, {} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ContactInvestPieChart1 from "../ContactInvestTable/ContactInvestPieChart1"
import ContactInvestPieChart2 from "../ContactInvestTable/ContactInvestPieChart2"
import dayjs from "dayjs";
import { JumpStartBox, } from "../../../../Components/UI/Elements";
import CustomerPieChart from "../../../Dashboard/Child/JumpStart/CustomerPieChart"
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ContactsIcon from '@mui/icons-material/Contacts';
class ContactInvestPulseJumpStart extends React.Component{
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

render() {
  const weightedValue = `${this.props.WeightedValue.weightedValue} ${this.props.WeightedValue.tradeCurrency}`;
  const pipeLineValue = `${this.props.pipelineValue.pipeLineValue} ${this.props.pipelineValue.tradeCurrency}`;
  const OpportunityValue = `${this.props.OppValue.pipeLineValue} ${this.props.WeightedValue.tradeCurrency}`
  const { showDatelist, fetchingDatewiseReport } = this.props;
  console.log( this.props.taskperCount)
   const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
  //   const endDate = new Date(this.state.endDate);

  console.log(startDate)
  console.log(this.state.endDate.format("YYYY MM DD"))
  return(
    <>
  
   <div className=" flex ">
    <div class=" flex w-1/2" >
    <div class="flex flex-wrap " >
    <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-1 bg-green-600"><CurrencyExchangeIcon className="!text-3xl text-[#FFFF]"></CurrencyExchangeIcon></div>
                             </div>
                             <JumpStartBox
            noProgress
            title="#Open Deals"
             
   
            bgColor="#33D7FF"             
          />  
                         </div>
                     </div>
                 
                 </div> 
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-1 bg-pink-600"><CurrencyExchangeIcon className="!text-3xl text-[#FFFF]"></CurrencyExchangeIcon></div>
                               </div>
                               <JumpStartBox
            noProgress
            title="Pipe line value"
              
            bgColor="#34495E "
                   
          />
                           </div>
                       </div>
                    
                   </div>  
                                             
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                      
                      <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                          <div class="flex flex-row items-center">
                              <div class="flex-shrink pr-3">
                                  <div class="rounded-full p-1 bg-blue-600"><i class="fab fa-connectdevelop text-[#FFFF] !text-3xl"></i></div>
                              </div>
                              <JumpStartBox
        noProgress
        title="Activity"
              
        bgColor="#FF4C33"     
      />
                          </div>
                      </div>
                     
                  </div>
                  <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                      
                      <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                          <div class="flex flex-row items-center">
                              <div class="flex-shrink pr-3">
                                  <div class="rounded-full p-1 bg-blue-600"><ContactsIcon className="!text-3xl text-[#FFFF]"/></div>
                              </div>
                              <JumpStartBox
            noProgress
            title="#Contacts "
            bgColor="linear-gradient(270deg,black,grey)"                     
          /> 
                          </div>
                      </div>
                     
                  </div>                                
        </div>
        </div>
    
      <div class=" mt-1 flex flex-col w-1/2 h-[83vh] items-center" > 
      <div className="font-bold font-poppins  text-lg">Deals</div>
        <ContactInvestPieChart1/>
       
        <div className="font-bold font-poppins text-lg">Activity</div>
        <ContactInvestPieChart2/>
        </div>     
        </div>
  </>
  ); 
}
}
const mapStateToProps = ({ customer,auth }) => ({
  contactValue:customer.contactValue,
  WonCustomerWeighted:customer.WonCustomerWeighted,
  fetchingWonCusmWeightedValue:customer.fetchingWonCusmWeightedValue,
  WonCustomerPipeline:customer.WonCustomerPipeline,
  fetchingWonCusPipelineValue:customer.fetchingWonCusPipelineValue,
  WonCustomerOpp:customer.WonCustomerOpp,
  fetchingWonCustomerOppValue:customer.fetchingWonCustomerOppValue,
  fetchingContactValue:customer.fetchingContactValue,
  pipelineValue:customer.pipelineValue,
  fetchingPipelineValue:customer.fetchingPipelineValue,
  OppValue:customer.OppValue,
  fetchingOppValue:customer.fetchingOppValue,
  WeightedValue:customer.WeightedValue,
  fetchingWeightedValue:customer.fetchingWeightedValue
});

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestPulseJumpStart);
