import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {getJumpDistributorDetail,
  handleCustomerAddedModal,handleContactAddedModal,handleOrderAddedModal,
  handleOrderClosedModal,getCustomerAddedList,getContactAddedList,getOrderAddedList,
  getOrderClosedList
} from "../../DashboardAction";
import { JumpStartBox, } from "../../../../Components/UI/Elements";
import CustomerJumpStartDrawer from "./CustomerJumpStartDrawer";
import CustomerAddedModal from "./CustomerAddedModal";
import ContactAddedModal from "./ContactAddedModal";
import OrdersAddedModal from "./OrdersAddedModal";
import OrdersClosedModal from "./OrdersClosedModal";
import axios from 'axios';
import {base_url} from "../../../../Config/Auth";
import DynamicPieChart from "./DynamicPieChart";
function InvestorDashboardJumpStart (props) {
  
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrderType, setCurrentOrderType,setError] = useState("");

  const [invesortAdded, setinvesortAdded] = useState([]);
  const [loading1, setLoading1] = useState(false);

    const fetchInvesortAdded = async () => {
      try {
        const response = await axios.get(`${base_url}/investor/report/all-investor/self/count/${props.userId}?endDate=${props.endDate}&startDate=${props.startDate}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setinvesortAdded(response.data);
        setLoading1(false);
      } catch (error) {
        setError(error);
        setLoading1(false);
      }
    };
    const [contactAdded, setcontactAdded] = useState([]);
    const [loading2, setLoading2] = useState(false);

    const fetchContacttAdded = async () => {
      const type="Investor";
      try {
        const response = await axios.get(`${base_url}/contact/added/selfCount/date-wise/${props.userId}/${type}?endDate=${props.endDate}&startDate=${props.startDate}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setcontactAdded(response.data);
        setLoading2(false);
      } catch (error) {
        setError(error);
        setLoading2(false);
      }
    };

    const [dealsAdded, setdealsAdded] = useState([]);
    const [loading3, setLoading3] = useState(false);

    const fetchDealsAdded = async () => {
      const type="add";
      try {
        const response = await axios.get(`${base_url}/investorOpportunity/self/report/count/${props.userId}/${type}?endDate=${props.endDate}&startDate=${props.startDate}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setdealsAdded(response.data);
        setLoading3(false);
      } catch (error) {
        setError(error);
        setLoading3(false);
      }
          };
          const [dealsWon, setdealsWon] = useState([]);
          const [loading4, setLoading4] = useState(false);
      
          const fetchDealsWon = async () => {
            const type="won";
            try {
              const response = await axios.get(`${base_url}/investorOpportunity/self/report/count/${props.userId}/${type}?endDate=${props.endDate}&startDate=${props.startDate}`,{
                headers: {
                  Authorization: "Bearer " + sessionStorage.getItem("token") || "",
                },
              });
              setdealsWon(response.data);
              setLoading4(false);
            } catch (error) {
              setError(error);
              setLoading4(false);
            }
                };

  useEffect(() => {
    props.getJumpDistributorDetail(props.timeRangeType);
    fetchMenuTranslations();
    fetchInvesortAdded();
    fetchContacttAdded();
    fetchDealsAdded();
    fetchDealsWon();
  }, [props.timeRangeType]);

  useEffect(() => {
    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  const fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        '1538', // 0 "Investor Added"
        '1297', // 1 "Contacts Added"
        '1539', // 2 "Deals Added"
        '1554' , // 3 "Deals Won"
        "1596",    // By Order Value 4
        "1597",    // By Order Volume 5
      ];

      const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
      setTranslatedMenuItems(translations);
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };


  useEffect(() => {
    if (props.contactAddedList) {
      setModalData(props.contactAddedList);
    }
  }, [props.contactAddedList]);

  useEffect(() => {
    if (props.customerAddedList) {
      setModalData(props.customerAddedList);
    }
  }, [props.customerAddedList]);

  useEffect(() => {
    if (props.orderAddedList) {
      setModalData(props.orderAddedList);
    }
  }, [props.orderAddedList]);

  useEffect(() => {
    if (props.orderClosedList) {
      setModalData(props.orderClosedList);
    }
  }, [props.orderClosedList]);





  const handleClick = (type) => {
    setCurrentOrderType(type);
    setIsModalOpen(true);

    switch(type) {
      case 'Added':
        props.getCustomerAddedList(props.userId,props.endDate,props.startDate);
        break;
      case 'Contact Added':
        props.getContactAddedList(props.userId,props.endDate,props.startDate);
        break;
      case 'Deals Added':
        props.getOrderAddedList(props.userId,props.endDate,props.startDate);
        break;
      case 'Deals Won':
        props.getOrderClosedList(props.userId,props.endDate,props.startDate);
        break;
      default:
        break;
    }
  };


  return(
    <><div class=" flex flex-col" >
    <div className="flex flex-row w-full">
        <div className="flex w-full max-sm:flex-col">
          <div className="w-full md:w-1/2 xl:w-1/3 p-2">
            <div className="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
              <div className="flex flex-row items-center text-xs">
                <div className="flex-shrink pr-1">
                  <div className="rounded-full p-2 bg-green-600"><i className="fa fa-wallet fa-2x fa-inverse"></i></div>
                </div>
                <JumpStartBox
                  noProgress
                  bgColor="linear-gradient(270deg,#F15753,orange)"
                  title={translatedMenuItems[0]}
                  value={invesortAdded.investorAdded}
                  jumpstartClick={()=> handleClick("Added")}
                  cursorData={"pointer"}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-2">
            <div className="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
              <div className="flex flex-row items-center text-xs">
                <div className="flex-shrink pr-1">
                  <div className="rounded-full p-2 bg-pink-600"><i className="fas fa-users fa-2x fa-inverse"></i></div>
                </div>
                <JumpStartBox
                  noProgress
                  bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
                  title={translatedMenuItems[1]}
                  value={contactAdded.count}
                  jumpstartClick={()=> handleClick("Contact Added")}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-2">
            <div className="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
              <div className="flex flex-row items-center text-xs">
                <div className="flex-shrink pr-1">
                  <div className="rounded-full p-2 bg-yellow-600"><i className="fas fa-user-plus fa-2x fa-inverse"></i></div>
                </div>
                <JumpStartBox
                  noProgress
                  bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
                  title={translatedMenuItems[2]}
                  value={dealsAdded.investorOppAdded}
                  jumpstartClick={()=> handleClick("Deals Added")}
                  cursorData="pointer"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-2">
            <div className="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
              <div className="flex flex-row items-center text-xs">
                <div className="flex-shrink pr-1">
                  <div className="rounded-full p-2 bg-blue-600"><i className="fas fa-server fa-2x fa-inverse"></i></div>
                </div>
                <JumpStartBox
                  noProgress
                  bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
                  title={translatedMenuItems[3]}
                  value={dealsWon.investorOppWon}
                  jumpstartClick={()=> handleClick("Deals Won")}
                  cursorData="pointer"
                />
              </div>
            </div>
          </div>
        </div>
        </div>
        <div class=" mt-1 flex flex-row justify-between" >
        <div>
        <div class=" font-poppins font-bold text-base ">{translatedMenuItems[4]}</div>
        <DynamicPieChart dtype={"RepairOrderValue"} 
        userId={props.userId} timeRangeType={props.timeRangeType}/>
        </div>
        <div>
        <div class=" font-poppins font-bold text-base ">{translatedMenuItems[5]}</div>
        <DynamicPieChart dtype={"RepairOrder"}
         userId={props.userId} timeRangeType={props.timeRangeType}/>
        </div>
      </div>
      </div>

<CustomerJumpStartDrawer
 selectedLanguage={props.selectedLanguage}
 translateText={props.translateText}
 isModalOpen={isModalOpen}
 setIsModalOpen={() => setIsModalOpen(false)}
 modalData={modalData}
 title={currentOrderType}
/>
        
         <CustomerAddedModal
       customerAddedModal={props.customerAddedModal}
       handleCustomerAddedModal={props.handleCustomerAddedModal}
      />

<ContactAddedModal
       contactAddedModal={props.contactAddedModal}
       handleContactAddedModal={props.handleContactAddedModal}
      />
        <OrdersAddedModal
       orderAddedModal={props.orderAddedModal}
       handleOrderAddedModal={props.handleOrderAddedModal}
      />
      <OrdersClosedModal
       orderClosedModal={props.orderClosedModal}
       handleOrderClosedModal={props.handleOrderClosedModal}
      />
     
   </>
  ); 
}
const mapStateToProps = ({ dashboard,auth ,leave}) => ({
  user: auth.userDetails,
  role: auth.userDetails.role,
  leaveFetching:leave.leaveFetching,
  showDatelist:dashboard.showDatelist,
  orgId:auth.userDetails.organizationId,
  showSalesDatelist:dashboard.showSalesDatelist,
  fetchingSalesDatewiseReport:dashboard.fetchingSalesDatewiseReport,
  fetchingSalesDatewiseReportError:dashboard.fetchingSalesDatewiseReportError,
  fetchingDatewiseReport:dashboard.fetchingDatewiseReport,
  fetchingDatewiseReportError:dashboard.fetchingDatewiseReportError,
  recruiterId:auth.userDetails.userId,
  fetchingTaskper:dashboard.fetchingTaskper,
  userId: auth.userDetails.employeeId,
  dateOfJoining: auth.userDetails && auth.userDetails.dateOfJoining,
  taskperCount:dashboard.taskperCount,
  avgHour:dashboard.avgHour,
  fetchingAvgHour:dashboard.fetchingAvgHour,
  timeRangeType: dashboard.timeRangeType,
  distributorinDashboard:dashboard.distributorinDashboard,
  customerAddedModal:dashboard.customerAddedModal,
  contactAddedModal:dashboard.contactAddedModal,
  orderAddedModal:dashboard.orderAddedModal,
  orderClosedModal:dashboard.orderClosedModal,
  contactAddedList:dashboard.contactAddedList,
  customerAddedList:dashboard.customerAddedList,
  orderAddedList:dashboard.orderAddedList,
  orderClosedList:dashboard.orderClosedList,
  startDate: dashboard.startDate,
  endDate:dashboard.endDate,

});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getJumpDistributorDetail,
  handleCustomerAddedModal,
  handleContactAddedModal,
  handleOrderAddedModal,
  handleOrderClosedModal,
  getCustomerAddedList,
  getContactAddedList,
  getOrderAddedList,
  getOrderClosedList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InvestorDashboardJumpStart);
