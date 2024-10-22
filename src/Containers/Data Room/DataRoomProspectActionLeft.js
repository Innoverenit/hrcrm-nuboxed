import React,{lazy,useState,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin} from "antd";

import {
  getAllCustomerlIST,
 
} from "../Customer/CustomerAction";
import { MultiAvatar } from "../../Components/UI/Elements";



const UserData = [
  {
    name: "Ramesh",
    location: "Mumbai",
    age: "20",
    department: "IT",
  },
  {
    name: "Mukesh",
    location: "Odisha",
    age: "24",
    department: "Finance",
  },
];

function DataRoomProspectActionLeft(props) {

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);


  const handleLoadMore = () => {
   
    setPage(page + 1);
    props.getAllCustomerlIST( page,
      "creationdate"
    );
};

  useEffect(() => {
    
    setPage(page + 1);
    props.getAllCustomerlIST(page,"creationdate");
    
  }, []);
  console.log(props.rules);


  return (
    <div>
      <div class=" flex flex-col flex-block"
      // flexDirection="column" style={{ display: "block" }}
       >
          <div class="flex flex-col">
  <h2 className="text-xl font-bold mb-4 ">
  {/* QUOTATION -
  ({`${props.quotationDashboardCount.countByUserId} `}) */}
</h2>
  {props.allCustomers.length === 0 &&props.fetchingAllCustomerList? (
    <>
     <Spin color="#00008b" size={50} /> 
     <div>No data found</div>
    </>
    
   
  ) : (
    <InfiniteScroll
    dataLength={props.allCustomers.length}
    next={handleLoadMore}
    hasMore={hasMore}
    loader={props.fetchingAllCustomerList?<div class="flex justify-center">Loading...</div>:null}
    height={"83vh"}
    style={{ scrollbarWidth:"thin"}}
  >
    
   {props.allCustomers.map((lead, index) => {
    return (
      <div key={index} className="mb-4 p-2 box-content border-2 border-[#00008b23] ml-2">
        <div className="flex justify-between">
          <div 
          className="font-semibold"
          onClick={() => props.handleCardClick(lead.name)}
          >{lead.name}</div>
           <div 
          className="font-semibold"
         
          >
            <MultiAvatar
                            primaryTitle={lead.name}
                            imageId={lead.imageId}
                            imageURL={lead.imageURL}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />
            </div>
          <div className="text-sm text-gray-500 font-poppins">{lead.phoneNumber}</div>
          
        </div>
        <div className="text-sm text-gray-500 font-poppins">{lead.sector}  {lead.source}</div>
        <div class="flex justify-between">
        <div className="text-sm text-gray-500 font-poppins">{lead.oppNo}</div>
        {/* <Button>To Order</Button> */}
        </div>
      </div>
    )
   })}
   </InfiniteScroll>
  )}
</div>
      </div>
    </div>
  );
}


const mapStateToProps = ({
  auth,
  customer,
  sector,
  opportunity,
  employee,
}) => ({
  userId: auth.userDetails.userId,
  addDrawerCustomerNotesModal:customer.addDrawerCustomerNotesModal,
  allCustomers: customer.allCustomers,
 
  fetchingAllCustomers: customer.fetchingAllCustomers,

  fetchingAllCustomerList: customer.fetchingAllCustomerList,
  fetchingAllCustomerListError: customer.fetchingAllCustomerListError,
  updateCustomerModal: customer.updateCustomerModal,
  user: auth.userDetails,

  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
  customerSearch: customer.customerSearch,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllCustomerlIST,
    
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DataRoomProspectActionLeft);
