import React,{lazy,useState,useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin} from "antd";

import {getAllInvestorsbyId,
   
  
  } from "../Investor/InvestorAction";
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

function DataRoomInvestorActionLeft(props) {

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);


  const handleLoadMore = () => {
    const callPageMapd = props.allInvestorsbyId && props.allInvestorsbyId.length &&props.allInvestorsbyId[0].pageCount
    setTimeout(() => {  
      if  (props.allInvestorsbyId)
      {
        if (page < callPageMapd) {    
    setPage(page + 1);
    props.getAllInvestorsbyId(
      
      page,
      "creationdate"
    );
            }
              if (page === callPageMapd){
                setHasMore(false)
              }
            }
            }, 100);
  }

  useEffect(() => {
    
    setPage(page + 1);
    props.getAllInvestorsbyId( page,"creationdate");
    
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
  {props.allInvestorsbyId.length === 0 &&props.fetchingAllInvestors? (
    <>
     <Spin color="#00008b" size={50} /> 
     <div>No data found</div>
    </>
    
   
  ) : (
    <InfiniteScroll
    dataLength={props.allInvestorsbyId.length}
    next={handleLoadMore}
    hasMore={hasMore}
    loader={props.fetchingAllInvestors?<div class="flex justify-center">Loading...</div>:null}
    height={"83vh"}
    style={{ scrollbarWidth:"thin"}}
  >
    
   {props.allInvestorsbyId.map((lead, index) => {
    return (
      <div key={index} className="mb-4 p-2 box-content border-2 border-[#00008b23] ml-2">
        <div className="flex justify-between">
          <div 
          className="font-semibold"
          onClick={() => props.handleCardClickInvestor(lead.name)}
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
  investor
}) => ({
  userId: auth.userDetails.userId,
 
  allInvestorsbyId:investor.allInvestorsbyId,
  addDrawerInvestorPulseModal:investor.addDrawerInvestorPulseModal,
  addDrawerInvestorContactModal:investor.addDrawerInvestorContactModal,
  addDrawerInvestorNotesModal:investor.addDrawerInvestorNotesModal,
  recruiterName: opportunity.recruiterName,
  fetchingAllCustomers: customer.fetchingAllCustomers,
  fetchingAllInvestors: investor.fetchingAllInvestors,
  fetchingInvestorsError: investor.fetchingInvestorsError,
  updateInvestorModal: investor.updateInvestorModal,
  user: auth.userDetails,
  investorSerachedData:investor.investorSerachedData,
  fetchingInvestorSearchData:investor.fetchingInvestorSearchData,
 


});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getAllInvestorsbyId
    
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DataRoomInvestorActionLeft);
