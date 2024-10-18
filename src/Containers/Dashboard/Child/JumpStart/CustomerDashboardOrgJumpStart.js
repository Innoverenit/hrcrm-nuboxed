import React, { useState, useEffect, lazy, Suspense } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {getJumpDistributorDetail,
  handleCustomerAddedModal,handleContactAddedModal,handleOrderAddedModal,
  handleOrderClosedModal,getCustomerAddedList,getContactAddedList,getOrderAddedList,
  getOrderClosedList
} from "../../DashboardAction";
import { JumpStartBox, } from "../../../../Components/UI/Elements";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ContactsIcon from '@mui/icons-material/Contacts';
import axios from 'axios';
import {base_url2} from "../../../../Config/Auth";
import { BundleLoader } from "../../../../Components/Placeholder";

const OrdersClosedModal=lazy(()=>import("./OrdersClosedModal"));
const OrdersAddedModal=lazy(()=>import("./OrdersAddedModal"));
const ContactAddedModal=lazy(()=>import("./ContactAddedModal"));
const CustomerAddedModal=lazy(()=>import("./CustomerAddedModal"));
const CustomerJumpStartDrawer=lazy(()=>import("./CustomerJumpStartDrawer"));
const CustomerPieChart=lazy(()=>import("./CustomerPieChart"));

function CustomerDashboardJumpStart (props) {
  
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [startDate] = useState(dayjs().startOf('month'));
  const [endDate] = useState(dayjs());
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrderType, setCurrentOrderType] = useState("");
  const [error, setError] = useState(null);

  const [cuOrdrAdded, setcuOrdrAdded] = useState({});
  const [loading3, setLoading3] = useState(false);

    const fetchcuOrdrAdded = async () => {
      try {
        const response = await axios.get(`${base_url2}/distributor/ordersAdded/${props.orgId}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setcuOrdrAdded(response.data);
        setLoading3(false);
      } catch (error) {
        setError(error);
        setLoading3(false);
      }
    };
    const [cuOrdrComplete, setcuOrdrComplete] = useState([]);
    const [loading4, setLoading4] = useState(false);

    const fetchcuOrdrComplete = async () => {
      try {
        const response = await axios.get(`${base_url2}/distributor/ordersCompleted/${props.orgId}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
        setcuOrdrComplete(response.data);
        setLoading3(false);
      } catch (error) {
        setError(error);
        setLoading3(false);
      }
    };
  useEffect(() => {
    props.getJumpDistributorDetail(props.timeRangeType);
    fetchcuOrdrAdded();
    fetchcuOrdrComplete();
  }, [props.timeRangeType]);

  useEffect(() => {
    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  const fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        '1296', // 0 "Customer Added" 
        '1297', // 1 "Contacts Added"
        '1229', // 2 "Orders Added"
        '1298'  // 3 "Orders Completed"
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
        props.getCustomerAddedList(props.orgId,props.endDate,props.startDate);
        break;
      case 'Contact Added':
        props.getContactAddedList(props.orgId,props.endDate,props.startDate);
        break;
      case 'Orders Added':
        props.getOrderAddedList(props.orgId,props.endDate,props.startDate);
        break;
      case 'Closed':
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
            <div className="bg-gradient-to-b from-[#bbf7d082] to-green-100 border-b-4 border-[#16a34a87] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
              <div className="flex flex-row items-center  text-xs">
                <div className="flex-shrink pr-3">
                  <div className="rounded-full p-2 bg-green-600"><AcUnitIcon className='text-white'/></div>
                </div>
                <JumpStartBox
                  noProgress
                  bgColor="linear-gradient(270deg,#F15753,orange)"
                  title={translatedMenuItems[0]}
                  value={props.distributorinDashboard.totalDistributor}
                  jumpstartClick={()=> handleClick("Added")}
                  cursorData={"pointer"}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-2">
            <div className="bg-gradient-to-b from-[#fbcfe887] to-pink-100 border-b-4 border-[#ec48998f] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
              <div className="flex flex-row items-center  text-xs">
                <div className="flex-shrink pr-3">
                  <div className="rounded-full p-2 bg-pink-600"><ContactsIcon className='text-white'/></div>
                </div>
                <JumpStartBox
                  noProgress
                  bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
                  title={translatedMenuItems[1]}
                  value={props.distributorinDashboard.totalContactPerson}
                  jumpstartClick={()=> handleClick("Contact Added")}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-2">
            <div className="bg-gradient-to-b from-[#fef08a70] to-yellow-100 border-b-4 border-[#ca8a0494] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
              <div className="flex flex-row items-center text-xs">
                <div className="flex-shrink pr-3">
                  <div className="rounded-full p-2 bg-yellow-600"><DynamicFeedIcon className='text-white'/></div>
                </div>
                <JumpStartBox
                  noProgress
                  bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
                  title={translatedMenuItems[2]}
                  value={props.distributorinDashboard.totalOrder}
                  jumpstartClick={()=> handleClick("Orders Added")}
                  cursorData="pointer"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-2">
            <div className="bg-gradient-to-b from-[#bfdbfe7a] to-blue-100 border-b-4 border-[#3b82f699] rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
              <div className="flex flex-row items-center text-xs">
                <div className="flex-shrink pr-3">
                  <div className="rounded-full p-2 bg-blue-600"><DynamicFeedIcon className='text-white'/></div>
                </div>
                <JumpStartBox
                  noProgress
                  bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
                  title={translatedMenuItems[3]}
                  value={props.distributorinDashboard.completeOrder}
                  jumpstartClick={()=> handleClick("Closed")}
                  cursorData="pointer"
                />
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div class=" mt-1 flex flex-row justify-between" >
        <div>
        <div class=" font-poppins font-bold text-base ">By Sector</div>
        <Suspense fallback={<BundleLoader />}>
        <CustomerPieChart/>
        </Suspense>
        </div>
        <div>
        <div class=" font-poppins font-bold text-base ">By Source</div>
        <Suspense fallback={<BundleLoader />}>
        <CustomerPieChart/>
        </Suspense>
        </div>
        </div>
</div><Suspense fallback={<BundleLoader />}>

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
     </Suspense>
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
  orderClosedList:dashboard.orderClosedList

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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboardJumpStart);
