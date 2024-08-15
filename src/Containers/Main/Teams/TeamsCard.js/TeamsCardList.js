import React, { useEffect, useState,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  Select, Tooltip } from "antd";
import {getTeamList} from "../TeamsAction";
import { MultiAvatar2 } from "../../../../Components/UI/Elements";
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
<div className=" md:w-[70.5rem]">
   {props.translatedMenuItems[0]}
</div>

<div className="md:w-[71.12rem]"> 
{props.translatedMenuItems[1]}</div>

 <div className="md:w-[23.1rem]"> 
 {props.translatedMenuItems[2]}</div>




</div>


{props.teamList.map((item) => { 
const firstTeamMember = item.teamMemberIds && item.teamMemberIds.length > 0 ? item.teamMemberIds[0] : null;
const empName = firstTeamMember ? firstTeamMember.empName : null;
console.log(empName)
          return (
              <div>
                  <div className="flex rounded justify-between bg-white mt-[0.5rem] h-8 items-center p-1 scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
                      >
                           
                           <div className=" flex  md:w-[14rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

<div class="max-sm:w-full">
                              <Tooltip>
                                <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                
                                  <div class="text-xs text-blue-500  font-poppins font-semibold  cursor-pointer">
                                      
{item.teamName}


                                  </div>
                                  </div>
                              </Tooltip>
                              </div>
                              </div>
                      </div>
                     

                   
                    
                      <div className=" flex  md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                      
                        
                        <div >
                          <MultiAvatar2

                           primaryTitle= {item.teamLead}
                          
                            imgHeight={"1.8rem"}
                            imgWidth={"1.8rem"}
                            imgRadius={20}
                          />
                         </div>
                    </div>

                    <div className=" flex  md:w-[12.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                      
                        <div class="text-xs  font-poppins">
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

