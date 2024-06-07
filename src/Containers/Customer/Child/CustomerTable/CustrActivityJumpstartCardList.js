import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Select,Timeline } from "antd";
import {getCustomerActivityTimeline} from "../../CustomerAction"
import { BundleLoader } from "../../../../Components/Placeholder";
import moment from "moment";
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function CustrActivityJumpstartCardList(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [hasMore, setHasMore] = useState(true);

  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    props.getCustomerActivityTimeline(props.customer.customerId);
   
}, []);
  const [rowdata, setrowdata] = useState("");
  const [currentCustomerId, setCurrentCustomerId] = useState("");
  const [currentCustomer, setCurrentCustomer] = useState("");
  function handleSetCurrentCustomerId(customerId) {
    setCurrentCustomerId(customerId);
    console.log(customerId);
  }
  function handleSetCurrentCustomer(item) {
    setCurrentCustomer(item);
  }
  const handleRowData = (data) => {
    setrowdata(data);
  };
  const handleConfirm = (customerId) => {
    // Call the function to change the status to "Lost" here
    props.customerToAccount(customerId);
  };


  const {
    fetchingCusActivityTimelineStatus,
    customerActivityTimeline,
  } = props;
  console.log("ee");

  if (fetchingCusActivityTimelineStatus) {
    return <BundleLoader />;
  }
  const currentDate = moment().format("DD/MM/YYYY");
  return (
    <>

<div className="mt-4 ml-4">
        <Timeline>
          {customerActivityTimeline &&
            customerActivityTimeline.map((status, index) => ( 
              <Timeline.Item key={index} > 
          
            
                 
              <div className="flex flex-row justify-between items-center">           
                <div>                
                
{currentDate === moment(status.creationDate).format("DD/MM/YYYY") ? (
                      <span className="text-xs text-[tomato] font-bold">
                        New
                      </span>
                    ) : null}    {status.category} {status.activityType} Completed by {moment(status.endDate).format('DD/MM/YYYY')}
                  </div>
                
                </div>
                
                
                </Timeline.Item>
                 


       
            ))}
           
           
        </Timeline>
 
  
        
      </div>
   
      
    
    </>
  );
}
// }
const mapStateToProps = ({
  auth,
  customer,
  sector,
  opportunity,
  employee,
}) => ({
    customerActivityTimeline: customer.customerActivityTimeline,
    fetchingCusActivityTimelineStatus:customer.fetchingCusActivityTimelineStatus,
  userId: auth.userDetails.userId,
  addDrawerCustomerContactModal: customer.addDrawerCustomerContactModal,
  addDrawerCustomerOpportunityModal: customer.addDrawerCustomerOpportunityModal,
  addDrawerCustomerNotesModal: customer.addDrawerCustomerNotesModal,
  customerByUserId: customer.customerByUserId,
  fetchingCustomerPagination: customer.fetchingCustomerPagination,
  sales: opportunity.sales,
  addDrawerCustomerPulseModal: customer.addDrawerCustomerPulseModal,
  recruiterName: opportunity.recruiterName,
  fetchingAllCustomers: customer.fetchingAllCustomers,
  sectors: sector.sectors,
  fetchingCustomers: customer.fetchingCustomers,
  fetchingCustomersError: customer.fetchingCustomersError,
  updateCustomerModal: customer.updateCustomerModal,
  user: auth.userDetails,
  employees: employee.employees,
  countries: auth.countries,
  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getCustomerActivityTimeline
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustrActivityJumpstartCardList);

























