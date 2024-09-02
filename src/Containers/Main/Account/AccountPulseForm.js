import React, { lazy,Suspense } from "react";
import { connect } from "react-redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { JumpStartBox,  } from "../../../Components/UI/Elements";
const SummaryTable= lazy(() => import("./AccountDetailsTab/SummaryTable"));
class AccountPulseForm extends React.Component {
  
    componentDidMount() {
       
    }

    render() {
      
        return (
            <>
            <div class=" flex flex-row w-full" >
                <div class="flex w-full" >
                <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-2 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                             </div>
                             <JumpStartBox
                        noProgress
                        title="#Open Orders"
                        bgColor="linear-gradient(270deg,#F15753,orange)"
                                     />
                         </div>
                     </div>
                 
                 </div> 
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-pink-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
                        noProgress
                        title="Revenue Booked"
                        bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
                    />

                           </div>
                       </div>
                    
                   </div>  
         
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-yellow-600"><i class="fas fa-user-plus fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
                        noProgress
                        bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
                        
                        title="Revenue Relised"
                   />
                           </div>
                       </div>
                     
                   </div>  
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                      
                      <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                          <div class="flex flex-row items-center">
                              <div class="flex-shrink pr-3">
                                  <div class="rounded-full p-2 bg-blue-600"><i class="fas fa-server fa-2x fa-inverse"></i></div>
                              </div>
                              <JumpStartBox
                        noProgress
                        bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
                        title={
                            <FormattedMessage
                                id="app.#Contacts"
                                defaultMessage="#Contacts "
                            />
                        }
   />
                          </div>
                      </div>
                     
                  </div>
                   


                   
                   
                   
                </div>
            </div>
            <div class="mt-4">
            <Suspense fallback={<BundleLoader />}>
            <SummaryTable
             RowData={this.props.RowData}
            /></Suspense>
            </div>
                               </>
        );
    }
}
const mapStateToProps = ({ customer, auth }) => ({


});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    //   getProspectWeightedValue,
    //   getProspectOppValue,
    //   getProspectPipeLineValue,
    //   getProspectContactValue
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountPulseForm);
