import React, { useEffect, useState,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Select, Tooltip } from "antd"
import {getTeamteamsList} from "./TeamsAction"
import { MultiAvatar2 } from "../../../Components/UI/Elements";
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function TeamsList(props) {

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
 props.getTeamteamsList(props.teamLead);
  }, []);


  const [RowData, setRowData] = useState("");

  function handleCurrentRowData(datas) {
    setRowData(datas);
  }

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
  
  <div class="rounded m-1 p-1 w-[100%]  overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
<div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold sticky  z-10">
<div className="font-bold font-poppins text-xs md:w-[44.5rem]">
{props.translatedMenuItems[0]}</div>

<div className="font-bold font-poppins text-xs md:w-[28.12rem]"> 
{props.translatedMenuItems[1]}</div>

 <div className="font-bold font-poppins text-xs md:w-[22.1rem]"> 
 {props.translatedMenuItems[2]}</div>




</div>


{props.teamteamsList.map((item) => { 
const firstTeamMember = item.teamMemberIds && item.teamMemberIds.length > 0 ? item.teamMemberIds[0] : null;
const empName = firstTeamMember ? firstTeamMember.empName : null;
console.log(empName)
          return (
              <div>
                  <div className="flex rounded border-l-2 border-green-500 bg-[#eef2f9] justify-between bg-white mt-[0.5rem] h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                      >
                           
                           <div className=" flex  md:w-[27rem] items-center justify-start h-8 bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

<div class="max-sm:w-full">
                              <Tooltip>
                                <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                
                                  <div class="text-xs text-blue-500  font-poppins ml-gap items-center font-semibold  cursor-pointer">
                                      
                                   {item.teamName}


                                  </div>
                                  </div>
                              </Tooltip>
                              </div>
                              </div>
                      </div>
                     

                   
                    
                      <div className=" flex  md:w-[28.3rem]  items-center justify-center h-8 bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">
                      
                        
                        <div >
                          <MultiAvatar2

                           primaryTitle= {item.teamLead}
                          
                            imgHeight={"1.8rem"}
                            imgWidth={"1.8rem"}
                            imgRadius={20}
                          />
                         </div>
                    </div>

                    <div className=" flex  md:w-[28.4rem] items-center justify-start h-8 bg-[#eef2f9]  max-sm:flex-row w-full max-sm:justify-between">
                      
                        <div class="text-xs ml-gap items-center font-poppins">
                        {empName}
                        </div>
                    </div>

                 
                   
            

                    
                   
                  </div>
              </div>


          )
      })}
          
</div>
     

   
   
    </>
  );
}
// }
const mapStateToProps = ({
  auth,
  teams
}) => ({
    teamteamsList:teams.teamteamsList,
    teamLead:auth.userDetails.userId,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getTeamteamsList
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(TeamsList);

