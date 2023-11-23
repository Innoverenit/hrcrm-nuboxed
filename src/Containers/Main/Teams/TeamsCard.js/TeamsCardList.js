import React, { useEffect, useState, useMemo, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { OnlyWrapCard } from '../../../../Components/UI/Layout'
import { Tooltip, Select,Button } from "antd"
import {getTeamList} from "../TeamsAction"
import moment from "moment";
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function TeamsCardList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
 props.getTeamList(props.userId);
  }, []);


  const [RowData, setRowData] = useState("");

  function handleCurrentRowData(datas) {
    setRowData(datas);
  }

//   const handleLoadMore = () => {

//       setPage(page + 1);
//       props.getInvestorsbyId(
//         props.currentUser ? props.currentUser : props.userId,
//         page,
//         props.filter?props.filter:"creationdate"
//       );
//   };

  const {
    fetchingInvestors,
    investorsbyId,
    handleUpdateInvestorModal,
    updateInvestorModal,
    fetchingInvestorsError,
    fetchingAllCustomers,
    user,
    IconShowhover,
  } = props;
  console.log("ee");
 
  // if (fetchingInvestors) {
  //   return <BundleLoader />;
  // }

  return (
    <>
  
        <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
        <div className=" flex justify-between w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[5rem]">Name</div>
        <div className=" md:w-[5rem]">Sector</div>
      
        {/* <div className="w-12">Action</div> */}

      </div>
      {props.teamList.map((item) => { 
        
  
                   return (
                       <div>
                           <div className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
                               // style={{
                               //     borderBottom: "3px dotted #515050"
                               // }}
                               >
                                    
                               <div className=" flex font-medium flex-col md:w-52 max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full"> 

         &nbsp;
         <div class="max-sm:w-full">
                                       
                                         <div class=" flex max-sm:w-full justify-between flex-row md:flex-col">
                                           <div class="text-xs text-cardBody font-poppins max-sm:hidden">
                                           Name
                                           </div>
                                           <div class="text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                               
    {item.teamName}
      
                                           </div>
                                           </div>
                                           <div class=" flex max-sm:w-full justify-between flex-row md:flex-col">
                                           <div class="text-xs text-cardBody font-poppins max-sm:hidden">
                                           Name
                                           </div>
                                           <div class="text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
     {item.teamMember}
      
                                           </div>
                                           </div>
                                       </div>
                                       </div>
                               </div>
               
                           </div>
                       </div>


                   )
               })}
     </OnlyWrapCard>
     

   
   
    </>
  );
}
// }
const mapStateToProps = ({
  auth,
  teams
}) => ({
  teamList:teams.teamList,
  userId:auth.userDetails.userId,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTeamList
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(TeamsCardList);

