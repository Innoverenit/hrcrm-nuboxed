import React, {lazy,Suspense,useState, useEffect} from "react";
import { connect } from "react-redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { bindActionCreators } from "redux";
import { JumpStartBox,  } from "../../../Components/UI/Elements";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ContactsIcon from '@mui/icons-material/Contacts';
import PaidIcon from '@mui/icons-material/Paid';
import { base_url2 } from "../../../Config/Auth";
import axios from "axios";
const SummaryTable= lazy(() => import("./AccountDetailsTab/SummaryTable"));


function AccountPulseForm (props) {
  
//    const startDate: dayjs().startOf("year").toISOString(),
//     endDate: dayjs().endOf("year").toISOString(),
    const [CustomerOrderCount, setCustomerOrderCount] = useState({});
    const [loading1, setLoading1] = useState(false);
    const [error, setError] = useState(null);

    const fetchCutomerOrderCount = async () => {
      try {
        const response = await axios.get(`${base_url2}/distributor/order/${props.RowData.distributorId}/year`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setCustomerOrderCount(response.data);
        setLoading1(false);
      } catch (error) {
        setError(error);
        setLoading1(false);
      }
    };
    const [CustomerContactCount, setCustomerContactCount] = useState({});
    const [loading2, setLoading2] = useState(false);
    const [error2, setError2] = useState(null);

    const fetchCutomerContactCount = async () => {
      try {
        const response = await axios.get(`${base_url2}/distributor/contact/${props.RowData.distributorId}/year`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setCustomerContactCount(response.data);
        setLoading2(false);
      } catch (error) {
        setError2(error);
        setLoading2(false);
      }
    };

    useEffect(() => {
        fetchCutomerOrderCount();
        fetchCutomerContactCount();  
      }, [props.timeRangeType]);
    

        return (
            <>
            <div class=" flex flex-row w-1/2" >
                <div class="flex w-full" >
                <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-1 bg-green-600"><DynamicFeedIcon className="!text-3xl text-[#FFFF]" /></div>
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
                       
                       <div class="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-1 bg-pink-600"><PaidIcon className="!text-3xl text-[#FFFF]"/></div>
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
                       
                       <div class="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-1 bg-yellow-600"><ReceiptIcon className="!text-3xl text-[#FFFF]"/></div>
                               </div>
                               <JumpStartBox
                        noProgress
                        bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
                        
                        title="Revenue Realised"
                   />
                           </div>
                       </div>
                     
                   </div>  
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                      
                      <div class="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
                          <div class="flex flex-row items-center">
                              <div class="flex-shrink pr-3">
                                  <div class="rounded-full p-1 bg-blue-600"><ContactsIcon className="!text-3xl text-[#FFFF]" /></div>
                              </div>
                              <JumpStartBox
                        noProgress
                        bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
                        title="#Contacts "
                           
   />
                          </div>
                      </div>
                     
                  </div>
                   


                   
                   
                   
                </div>
            </div>
            <div class="mt-4">
            <Suspense fallback={<BundleLoader />}>
            <SummaryTable
             RowData={props.RowData}
             userId={props.userId} timeRangeType={props.timeRangeType}
             distributorId={props.RowData.distributorId}
            /></Suspense>
            </div>
                               </>
        );
}

const mapStateToProps = ({ dashboard, auth }) => ({
    startDate: dashboard.startDate,
    endDate:dashboard.endDate,
    userId: auth.userDetails.userId,
    timeRangeType: dashboard.timeRangeType,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountPulseForm);
