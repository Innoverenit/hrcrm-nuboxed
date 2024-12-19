import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ProspectSourcePieChart from "../JumpStart/ProspectSourcePieChart"
import ProspectSectorPieChart from "../JumpStart/ProspectSectorPieChart"
import dayjs from "dayjs";
import {getJumpDistributorDetail,
  handleCustomerAddedModal,handleContactAddedModal,handleOrderAddedModal,
  handleOrderClosedModal,getCustomerAddedList,getContactAddedList,getOrderAddedList,
  getOrderClosedList,
} from "../../DashboardAction";
import { JumpStartBox, } from "../../../../Components/UI/Elements";
import CustomerAddedModal from "./CustomerAddedModal";
import ContactAddedModal from "./ContactAddedModal";
import OrdersAddedModal from "./OrdersAddedModal";
import OrdersClosedModal from "./OrdersClosedModal";
import axios from 'axios';
import {base_url} from "../../../../Config/Auth";
import ApartmentIcon from '@mui/icons-material/Apartment';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ContactsIcon from '@mui/icons-material/Contacts';
import ProspectJumpStartDrawer from './ProspectJumpStartDrawer';

function ProspectDashboardJumpStart (props) {
  
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [startDate] = useState(dayjs().startOf('month'));
  const [endDate] = useState(dayjs());
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrderType, setCurrentOrderType] = useState("");

 const [error, setError] = useState(null);

  const [prospectAdded, setprospectAdded] = useState([]);
  const [loading1, setLoading1] = useState(false);

    const fetchProspectAdded = async () => {
      try {
        const response = await axios.get(`${base_url}/customer/report/count/self/${props.userId}?endDate=${props.endDate}&startDate=${props.startDate}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setprospectAdded(response.data);
        setLoading1(false);
      } catch (error) {
        setError(error);
        setLoading1(false);
      }
    };

    const [contactAdded, setcontactAdded] = useState([]);
    const [loading2, setLoading2] = useState(false);

    const fetchContacttAdded = async () => {
      const type="Prospect";
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
    
    const [quotationAdded, setquotationAdded] = useState([]);
    const [loading3, setLoading3] = useState(false);

    const fetchQuotationAdded = async () => {
      // const type="Prospect";
      try {
        const response = await axios.get(`${base_url}/opportunity/openList/date-range/count/self/${props.userId}?endDate=${props.endDate}&startDate=${props.startDate}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setquotationAdded(response.data);
        setLoading3(false);
      } catch (error) {
        setError(error);
        setLoading3(false);
      }
    };
    const [quotationAddedCard, setquotationAddedCard] = useState([]);
    const [loading4, setLoading4] = useState(false);

    const fetchQuotationAddedCard = async () => {
      try {
        const response = await axios.get(`${base_url}/opportunity/List/date-range/self/${props.userId}?endDate=${props.endDate}&startDate=${props.startDate}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setquotationAddedCard(response.data);
        setLoading3(false);
      } catch (error) {
        setError(error);
        setLoading3(false);
      }
    };

    useEffect(() => {
      fetchProspectAdded();
      fetchContacttAdded();
      fetchQuotationAdded();
    }, [props.userId]);

  useEffect(() => {
    props.getJumpDistributorDetail(props.timeRangeType);
    fetchMenuTranslations();
  }, [props.timeRangeType]);

  useEffect(() => {
    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  const fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        '1536', // 0 "Prospect Added"
        '1297', // 1 "Contacts Added"
        '1537', // 2 "Quotation Added"
        '1553' , // 3 "Quotation Won"
        "1594",// By sector 4 
        "1595",//5 
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
    if (quotationAddedCard) {
      setModalData(quotationAddedCard);
    }
  }, [quotationAddedCard]);

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
        props.getCustomerAddedList(props.orgId,props.endDate,props.startDate);
        break;
      case 'Contact Added':
        props.getContactAddedList(props.orgId,props.endDate,props.startDate);
        break;
      case 'Quotation Added':
        fetchQuotationAddedCard(props.userId,props.endDate,props.startDate);
        break;
      case 'Quotation Won':
        props.getOrderClosedList(props.orgId,props.endDate,props.startDate);
        break;
      default:
        break;
    }
  };


  return(
    <>
    <div class=" flex flex-col">
    <div className="flex flex-row w-full">
        <div className="flex w-full max-sm:flex-col">
          <div className="w-full md:w-1/2 xl:w-1/3 p-2">
            <div className="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
              <div className="flex flex-row items-center text-xs">
                <div className="flex-shrink pr-1">
                  <div className="rounded-full p-2 bg-green-600"><ApartmentIcon className='text-white'/></div>
                </div>
                <JumpStartBox
                  noProgress
                  bgColor="linear-gradient(270deg,#F15753,orange)"
                  title={translatedMenuItems[0]}
                  value={prospectAdded.count}
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
                  <div className="rounded-full p-2 bg-pink-600"><ContactsIcon className='text-white'/></div>
                </div>
                <JumpStartBox
                  noProgress
                  bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
                  title={translatedMenuItems[1]}
                  value={contactAdded.count}
                  jumpstartClick={() => handleClick("Contact Added")}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-2">
            <div className="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
              <div className="flex flex-row items-center text-xs">
                <div className="flex-shrink pr-1">
                  <div className="rounded-full p-2 bg-yellow-600"><LightbulbIcon className='text-white'/></div>
                </div>
                <JumpStartBox
                  noProgress
                  bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
                  title={translatedMenuItems[2]}
                  value={props.distributorinDashboard.totalOrder}
                  jumpstartClick={() => handleClick("Quotation Added")}
                  cursorData="pointer"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-2">
            <div className="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[3.5rem] w-wk flex items-center">
              <div className="flex flex-row items-center text-xs">
                <div className="flex-shrink pr-1">
                  <div className="rounded-full p-2 bg-blue-600"><LightbulbIcon className='text-white'/></div>
                </div>
                <JumpStartBox
                  noProgress
                  bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
                  title={translatedMenuItems[3]}
                  value={props.distributorinDashboard.completeOrder}
                  jumpstartClick={() => handleClick("Quotation Won")}
                  cursorData="pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class=" mt-1 flex flex-row justify-between items-center" >
        <div>
        <div class=" font-poppins font-bold text-base ">{translatedMenuItems[4]}</div>
        <ProspectSectorPieChart/>
        </div>
        <div>
        <div class=" font-poppins font-bold text-base ">{translatedMenuItems[5]}</div>
        <ProspectSourcePieChart/>
        </div>
      </div>
      </div>
<ProspectJumpStartDrawer
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
//   getSalesDateWiseList,
//   getTasklist,
//   getavgHour,
//   getleaveLeftSideDetails
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProspectDashboardJumpStart);
