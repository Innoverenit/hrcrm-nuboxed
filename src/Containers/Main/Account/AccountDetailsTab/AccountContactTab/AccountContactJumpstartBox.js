import React, {useEffect,useState} from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";
import {getPaymentClik,
  getQuationClik,
  getQuationCheckout,
  getQuationShipping,
  getLoginCount} from "../../AccountAction"
import { bindActionCreators } from "redux";
import { JumpStartBox, } from "../../../../../Components/UI/Elements";
import axios from 'axios';
import {base_url2} from "../../../../../Config/Auth";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

function AccountContactJumpstartBox (props) {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const [date, setDate] = useState(formattedDate);
  const [startDate, setStartDate] = useState(dayjs().startOf("month"));
  const [endDate, setEndDate] = useState(dayjs());

  const [error, setError] = useState(null);
 
  const [data1, setData1] = useState({});
  const [loading1, setLoading1] = useState(false);
    const fetchData1 = async () => {
      try {
        const response = await axios.get(`${base_url2}/FD1`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setData1(response.data);
        setLoading1(false);
      } catch (error) {
        setError(error);
        setLoading1(false);
      }
    };

    const [data2, setData2] = useState({});
  const [loading2, setLoading2] = useState(false);
    const fetchData2 = async () => {
      try {
        const response = await axios.get(`${base_url2}/payment/clicks`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setData2(response.data);
        setLoading2(false);
      } catch (error) {
        setError(error);
        setLoading2(false);
      }
    };

    const [data3, setData3] = useState({});
    const [loading3, setLoading3] = useState(false);
      const fetchData3 = async () => {
        try {
          const response = await axios.get(`${base_url2}/quotation/cart/clicks`,{
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
          });
          setData3(response.data);
          setLoading3(false);
        } catch (error) {
          setError(error);
          setLoading3(false);
        }
      };

      const [data4, setData4] = useState({});
      const [loading4, setLoading4] = useState(false);
        const fetchData4 = async () => {
          try {
            const response = await axios.get(`${base_url2}/quotation/checkout/clicks`,{
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
              },
            });
            setData4(response.data);
            setLoading4(false);
          } catch (error) {
            setError(error);
            setLoading4(false);
          }
        };
        const [data5, setData5] = useState({});
        const [loading5, setLoading5] = useState(false);
          const fetchData5 = async () => {
            try {
              const response = await axios.get(`${base_url2}/quotation/toShipping/clicks`,{
                headers: {
                  Authorization: "Bearer " + sessionStorage.getItem("token") || "",
                },
              });
              setData5(response.data);
              setLoading5(false);
            } catch (error) {
              setError(error);
              setLoading5(false);
            }
          };

    // useEffect(()=>{
    //  fetchData1();
    //  fetchData2();
    //  fetchData3();
    //  fetchData4();
    //  fetchData5();
    //     },[]);

//   useEffect(()=>{
//     if (props.timeRangeType === "today") {
//     props.getJumpInvestorlist(props.userId, props.startDate, props.endDate);
//     props.getJumpInvestor2list(props.userId, props.startDate, props.endDate);
//     props.getJumpInvestor3list(props.userId, props.startDate, props.endDate);
//     props.getJumpInvestor4list(props.userId, props.startDate, props.endDate);
//   }
//   else {
//     props.getJumpInvestorlist(props.userId, props.startDate, props.endDate);
//     props.getJumpInvestor2list(props.userId, props.startDate, props.endDate);
//     props.getJumpInvestor3list(props.userId, props.startDate, props.endDate);
//     props.getJumpInvestor4list(props.userId, props.startDate, props.endDate);
//   }
//   },[props.userId,props.startDate,props.endDate]);

useEffect(()=>{
  const start = `${startDate.format("YYYY-MM-DD")}T20:00:00Z`;
    const end = `${endDate.format("YYYY-MM-DD")}T20:00:00Z`;
   props.getPaymentClik(props.rowData.contactUserId,start,end)
   props.getQuationClik(props.rowData.contactUserId,start,end)
   props.getQuationCheckout(props.rowData.contactUserId,start,end)
   props.getQuationShipping(props.rowData.contactUserId,start,end)
   props.getLoginCount(props.rowData.contactUserId,start,end)
    },[props.rowData.contactUserId, startDate, endDate]);
    const { openPitchQualified,handlePitchQualifiedDrawer,openPitchAdded,handlePitchAddedDrawer,
      openDealAdded,handleDealAddedDrawer,openDealClosed,handleDealClosedDrawer
    } = props;

    return (
      <>
       <div class=" flex flex-row w-full" >
        <div class=" flex w-full max-sm:flex-col" >
        <div class="flex  w-wk">



        <div class="w-full md:w-1/2 xl:w-1/3 p-2">
        <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-1 bg-green-600"><CurrencyExchangeIcon className="!text-3xl text-[#FFFF]"></CurrencyExchangeIcon></div>
                             </div>  
        <JumpStartBox
                       bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
            noProgress
            title="Login Clicks"
            // jumpstartClick={()=>handleDealClosedDrawer(true)}
            // cursorData={"pointer"}
            value={ props.loginCount.count}
            isLoading={props.fetchingLoginCount}
          />
</div>
</div>

</div>
<div class="w-full md:w-1/2 xl:w-1/3 p-2">
<div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-1 bg-pink-600"><CurrencyExchangeIcon className="!text-3xl text-[#FFFF]"></CurrencyExchangeIcon></div>
                             </div>  
           <JumpStartBox
                       bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
            noProgress
            title="Quotation Clicks"
            // jumpstartClick={()=>handlePitchAddedDrawer(true)}
            // cursorData={"pointer"}
            value={props.quatationClick.count}
            isLoading={props.fetchingQuatationClick}
          />
          </div>
          </div>
</div>
          <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#ca8a0494] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-1 bg-yellow-600"><CurrencyExchangeIcon className="!text-3xl text-[#FFFF]"></CurrencyExchangeIcon></div>
                             </div>  
          <JumpStartBox
            noProgress
            bgColor="linear-gradient(270deg,#F15753,orange)"
            title="Checkout Clicks"
            // jumpstartClick={()=>handlePitchQualifiedDrawer(true)}
            // cursorData={"pointer"}
            value={props.paymentclick.count}
            isLoading={props.fetchingPaymentClick}
          />
</div>
</div>
         
</div>
<div class="flex w-wk">
<div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-1 bg-blue-600"><CurrencyExchangeIcon className="!text-3xl text-[#FFFF]"></CurrencyExchangeIcon></div>
                             </div>  
<JumpStartBox
                       bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
            noProgress
            title="Shipping Hits"
            // jumpstartClick={()=>handleDealClosedDrawer(true)}
            // cursorData={"pointer"}
            value={ props.quatationShipping.count}
            isLoading={props.fetchingQuatationShipping}
          />
          </div>
          </div>

          <div class="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-1 bg-green-600"><CurrencyExchangeIcon className="!text-3xl text-[#FFFF]"></CurrencyExchangeIcon></div>
                             </div>  
          <JumpStartBox
  bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
            noProgress
            title="Paid Clicks"
            // jumpstartClick={()=>handleDealAddedDrawer(true)}
            // cursorData={"pointer"}
            value={props.quatationCheckout.count}
            isLoading={props.fetchingQuatationCheckout}
          />
         
         </div>
         </div>
          </div>
        </div>
      </div>


      </>
     
    );
  }
const mapStateToProps = ({  auth,distributor }) => ({
  user: auth.userDetails,
  role: auth.userDetails.role,
  orgId: auth.userDetails.organizationId,
  recruiterId: auth.userDetails.userId,
  userId: auth.userDetails.employeeId,
  paymentclick: distributor.paymentclick,
  quatationClick: distributor.quatationClick,
  quatationCheckout: distributor.quatationCheckout,
  quatationShipping: distributor.quatationShipping,
  loginCount: distributor.loginCount,
  fetchingPaymentClick: distributor.fetchingPaymentClick,
  fetchingQuatationClick: distributor.fetchingQuatationClick,
  fetchingQuatationCheckout: distributor.fetchingQuatationCheckout,
  fetchingQuatationShipping: distributor.fetchingQuatationShipping,
  fetchingLoginCount: distributor.fetchingLoginCount,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   getJumpInvestorlist,
    //   getJumpInvestor2list,
    //   getJumpInvestor3list,
    //   getJumpInvestor4list,
    //   handlePitchQualifiedDrawer,
    //   handlePitchAddedDrawer,
    //   handleDealAddedDrawer,
    //   handleDealClosedDrawer

    getPaymentClik,
    getQuationClik,
    getQuationCheckout,
    getQuationShipping,
    getLoginCount
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountContactJumpstartBox);
