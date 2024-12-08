import React, { useEffect } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StyledTable } from "../../../../../Components/UI/Antd";
import {getLeadQualified} from "../../../DashboardAction";
import { Tooltip } from "antd";
import { BundleLoader } from "../../../../../Components/Placeholder";

function LeadQualifiedTable (props) {
    useEffect(()=>{
      if (props.timeRangeType === "today"){
        props.getLeadQualified(props.userId,props.endDate,props.startDate);
      }
      else {
        props.getLeadQualified(props.userId,props.endDate,props.startDate); 
      }
    }, [props.userId,props.endDate,props.startDate]);

    if (props.fetchingLeadsQualified) return <BundleLoader/>;
  
    return (
      <>
        <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
          <div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
          <div className=" md:w-[6.5rem]">
       Name</div>
 
        <div className="md:w-[10.1rem]"> Email Id</div>
                 <div className="md:w-[10.1rem]">
               Company Name</div>
                     
                     
      

      </div>
   
        
      {props.showQualifiedLeads=="" ? "None" :props.showQualifiedLeads.map((item) => { 
        
        
                    return (
                        <div>
                            <div className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
                                >
                                     
                                     <div className=" flex font-medium flex-col md:w-[8rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 

          <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col w-[8rem]">
                                          
                                            <div class="text-sm text-blue-500  font-poppins font-semibold  cursor-pointer">
                                                
      {item.name}
     
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div class="flex">

                             
                              
                                <div className=" flex font-medium flex-col md:w-[24.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                  <div class="text-sm  font-poppins">
                                  {item.email}
                                  </div>
                              </div>

                              <div className=" flex font-medium flex-col md:w-[10.3rem]  max-sm:flex-row w-full max-sm:justify-between">
                                
                                <div class="text-sm  font-poppins">
                                {item.companyName}
                                </div>
                            </div>
                        

                           
                              </div>
                  
                            

                              
                             
                            </div>
                        </div>


                    )
                })}
                    
      </div>
        {/* <StyledTable
          columns={columns}
          dataSource={props.showQualifiedLeads}
          loading={props.fetchingLeadsQualified}
        /> */}
      </>
    );
  }
  const mapStateToProps = ({dashboard,auth }) => ({
    showQualifiedLeads:dashboard.showQualifiedLeads,
    userId: auth.userDetails.userId,
    fetchingLeadsQualified:dashboard.fetchingLeadsQualified,
    timeRangeType:dashboard.timeRangeType,
    startDate: dashboard.startDate,
    endDate: dashboard.endDate,
});

const mapDispatchToProps = (dispatch) =>
bindActionCreators(
  {
    getLeadQualified,
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(LeadQualifiedTable);