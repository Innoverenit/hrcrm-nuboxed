import React, { useEffect, useState,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Select, Tooltip } from "antd"
import {getTeamteamsList} from "./TeamsAction"
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';
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
  
  <div class="rounded m-1 p-1 w-[100%]  overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white] h-[88vh]">
<div className=" flex justify-between w-[100%]  p-1 bg-transparent font-bold font-poppins !text-lm sticky  z-10">
<div className="truncate w-[27.5rem] max-md:w-[44.5rem]">< ApartmentIcon className=" text-icon"/>
{props.translatedMenuItems[0]}</div>

<div className="truncate w-[29.12rem] max-md:w-[28.12rem]"> 
<GroupsIcon className=" text-icon"/>{props.translatedMenuItems[1]}</div>

 <div className="truncate w-[27.9rem] max-md:w-[28.9rem]"> 
 <GroupsIcon className=" text-icon"/>{props.translatedMenuItems[2]}</div>
</div>

{props.teamteamsList.map((item) => { 
const firstTeamMember = item.teamMemberIds && item.teamMemberIds.length > 0 ? item.teamMemberIds[0] : null;
const empName = firstTeamMember ? firstTeamMember.empName : null;
console.log(empName)
          return (
              <div>
                  <div className="flex rounded justify-between bg-white mt-[0.5rem]  items-center py-ygap scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                      >
                           
                           <div className=" flex  md:w-[28rem] items-center justify-start h-8  border-l-2 border-green-500 bg-[#eef2f9]  max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

<div class="max-sm:w-full">
                              <Tooltip>
                                <div class=" flex max-sm:w-full  bg-[#eef2f9]  ml-gap h-8 justify-center flex-row md:flex-col w-[8rem]">                             
                                  <div class="flex text-xs text-blue-500  font-poppins ml-gap items-center font-semibold  cursor-pointer">                                   
                                   {item.teamName}
                                  </div>
                                  </div>
                              </Tooltip>
                              </div>
                              </div>
                      </div>          
                      <div className=" flex  md:w-[29.3rem] ml-gap items-center justify-center h-8 bg-[#eef2f9] max-sm:flex-row w-full max-sm:justify-between">                                       
                        <div >
                          <MultiAvatar2
                           primaryTitle= {item.teamLead}                       
                            imgHeight={"1.8rem"}
                            imgWidth={"1.8rem"}
                            imgRadius={20}
                          />
                         </div>
                    </div>
                    <div className=" flex  md:w-[28.4rem] ml-gap items-center justify-start h-8 bg-[#eef2f9]  max-sm:flex-row w-full max-sm:justify-between">                    
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

