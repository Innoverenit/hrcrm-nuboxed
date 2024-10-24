import React,{lazy,useState,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin,Button} from "antd";
import {getSources} from "../Settings/Category/Source/SourceAction"

import {
  getAllCustomerlIST,
 
} from "../Customer/CustomerAction";


import {
  getSectors,
 
} from "../Settings/Sectors/SectorsAction";
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
    props.getSectors()
    props.getSources(props.orgId)
    
  }, []);
  console.log(props.rules);


  return (
    <div>
        {/* setSelectedButtonTab={props.setSelectedButtonTab}
        selectedButtonTab={props.selectedButtonTab} */}
      <div>
      <Button
       onClick={() => props.setSelectedButtonTab('byList')}
      >By List</Button>
        <Button
         onClick={() => props.setSelectedButtonTab('bySector')}
        >By Sector</Button>
        <Button
         onClick={() => props.setSelectedButtonTab('bySource')}
        >By Source</Button>
      </div>
      {props.selectedButtonTab==="byList" && (
      <div class=" flex flex-col flex-block"
    
       >
          <div class="flex flex-col">
  <h2 className="text-xl font-bold mb-4 ">
  
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
          onClick={() => props.handleCardClick(lead.name,lead)}
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
      )}
{/* By Sector */}
{props.selectedButtonTab==="bySector" && (
      <div class=" flex flex-col flex-block"
    
       >
          <div class="flex flex-col">
  <h2 className="text-xl font-bold mb-4 ">
  
</h2>
   {props.sectors.length === 0 &&props.fetchingSectors? (
    <>
     <Spin color="#00008b" size={50} /> 
     <div>No data found</div>
    </>
    
   
  ) : ( 
   <>
    
   { props.sectors.map((lead, index) => {
    return ( 
      <div 
      // key={index} 
      className="mb-4 p-2 box-content border-2 border-[#00008b23] ml-2">
        <div className="flex justify-between">
          <div 
          className="font-semibold"
          // onClick={() => props.handleCardClick(lead.name)}
          >
            {lead.sectorName}
           
            </div>
           <div 
          className="font-semibold"
         
          >
            <MultiAvatar
                            primaryTitle={lead.sectorName}
                            // imageId={lead.imageId}
                            // imageURL={lead.imageURL}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />
            </div>
          <div className="text-sm text-gray-500 font-poppins">
            {/* {lead.phoneNumber} */}
            </div>
          
        </div>
        <div className="text-sm text-gray-500 font-poppins">
          {/* {lead.sector}  {lead.source} */}
          </div>
        <div class="flex justify-between">
        <div className="text-sm text-gray-500 font-poppins">
          {/* {lead.oppNo} */}
          </div>
        {/* <Button>To Order</Button> */}
        </div>
      </div>
     )
   })} 
   </>
  
   )}
</div>
      </div>
)}

{props.selectedButtonTab==="bySource" && (
      <div class=" flex flex-col flex-block"
    
       >
          <div class="flex flex-col">
  <h2 className="text-xl font-bold mb-4 ">
  
</h2>
  {props.sources.length === 0 &&props.fetchingSources? (
    <>
     <Spin color="#00008b" size={50} /> 
     <div>No data found</div>
    </>
    
   
  ) : ( 

    <>
  {props.sources.map((lead, index) => {
    return ( 
      <div 
      // key={index} 
      className="mb-4 p-2 box-content border-2 border-[#00008b23] ml-2">
        <div className="flex justify-between">
          <div 
          className="font-semibold"
          // onClick={() => props.handleCardClick(lead.name)}
          >
            {lead.name}
           
            </div>
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
          <div className="text-sm text-gray-500 font-poppins">
            {/* {lead.phoneNumber} */}
            </div>
          
        </div>
        <div className="text-sm text-gray-500 font-poppins">
          {/* {lead.sector}  {lead.source} */}
          </div>
        <div class="flex justify-between">
        <div className="text-sm text-gray-500 font-poppins">
          {/* {lead.oppNo} */}
          </div>
        {/* <Button>To Order</Button> */}
        </div>
      </div>
     )
   })} 
   </>
   
  )} 
</div>
      </div>
)}
    </div>
  );
}


const mapStateToProps = ({
  auth,
  customer,
  sector,
  source,
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
  sectors: sector.sectors,
  fetchingSectors:sector.fetchingSectors,
  orgId:auth.userDetails.organizationId,

  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
  customerSearch: customer.customerSearch,
  sources: source.sources,
  fetchingSources:source.fetchingSources

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllCustomerlIST,
      getSectors,
      getSources
    
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DataRoomProspectActionLeft);
