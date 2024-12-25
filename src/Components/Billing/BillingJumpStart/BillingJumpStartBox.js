import React, {  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { JumpStartBox } from "../../../Components/UI/Elements";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

function BillingJumpStartBox(props) {

  const Actual = props.billingByDesignation.reduce((acc, item) => {
    acc = acc + item.finalBillableAmount;
    return acc;
  }, 0);
  var actualAmount = `${Number(Actual).toFixed(2)}`;
 console.log("test",actualAmount)

  const Projected = props.billingByDesignation.reduce((acc, item) => {
    acc = acc + item.actualBillableAmount;
    return acc;
  }, 0);

  var projectedAmount = `${Number(Projected).toFixed(2)}`;

  const Deviation = props.billingByDesignation.reduce((acc, item) => {
    acc = acc + item.deviationBillableAmount;
    return acc;
  }, 0);
  console.log("deviations",Deviation)
  var deviationAmount = `${Number(Deviation).toFixed(2)}`;

  const billableCurr =
    props.billingByDesignation.length &&
    props.billingByDesignation[0].billableCurency;
  return (
    <div class=" flex flex-row  items-center  justify-center h-auto  w-[100%]">
    <div class=" flex flex-row  items-center  justify-center h-auto  w-[100%]">

    <div class="w-1/6 md:w-1/2 xl:w-1/6 p-2">
                     
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center text-xs">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-2 bg-green-600"><VolumeUpIcon className="text-white"/></div>
                             </div>
                             <JumpStartBox
                                noProgress
                                title="Actual Amount"
                                bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
                                currencyType={billableCurr}
                                value={Actual.toFixed(2) }
                              />
                         </div>
                     </div>
                 
                 </div> 
                 <div class="w-1/6 md:w-1/2 xl:w-1/6 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center text-xs">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-pink-600"><i className="fas fa-users fa-2x fa-inverse"></i></div>
                               </div>
                             
                              <JumpStartBox
                                noProgress
                                title=" Projected Amount"
                                bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
                                currencyType={billableCurr}
                                value={` ${projectedAmount || ""}`}
                              />
                                                </div>
                       </div>
                    
                   </div>  
         
                   <div class="w-1/6 md:w-1/2 xl:w-1/6 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center text-xs">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-yellow-600"><FactCheckIcon className="text-white"/></div>
                               </div>
                               <JumpStartBox
          noProgress
          title=" Deviation Amount"
          bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          currencyType={billableCurr}
          value={` ${deviationAmount || ""}`}
        />
                           </div>
                       </div>
                     
                   </div>  
                   <div class="w-1/6 md:w-1/2 xl:w-1/6 p-2">
                      
                      <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                          <div class="flex flex-row items-center text-xs">
                              <div class="flex-shrink pr-3">
                                  <div class="rounded-full p-2 bg-blue-600"><EventAvailableIcon className="text-white"/></div>
                              </div>
                              <JumpStartBox
          noProgress
          title="Amount"
          bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          currencyType={billableCurr}
        />
                          </div>
                      </div>
                     
                  </div>
       
  </div>
    </div>
  );
}
const mapStateToProps = ({ billings, auth }) => ({
  billingByDesignation: billings.billingByDesignation,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BillingJumpStartBox)

