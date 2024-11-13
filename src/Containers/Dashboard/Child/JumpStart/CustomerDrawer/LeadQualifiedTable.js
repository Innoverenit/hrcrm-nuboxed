import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
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

    // const columns = [
    //   {
    //     title: <FormattedMessage
    //       id="app.name"
    //       defaultMessage="Name"
    //     />,
    //     width: "30%",
    //     dataIndex: "name",
    //   },
     
    //   {
    //     title: <FormattedMessage
    //       id="app.emailId"
    //       defaultMessage="Email Id"
    //     />,
    //     width: "22%",
    //     dataIndex: "email",
    //     defaultSortOrder: 'descend',
    //     // sorter: (a, b) => a.proposalAmount - b.proposalAmount,
  
    //     // render: (name, item, i) => {
    //     //   return (
    //     //     <span>
    //     //       <CurrencySymbol currencyType={this.props.currency} />{" "}
    //     //       {`${item.proposalAmount}`}
    //     //     </span>
    //     //   );
    //     // },
    //   },
    //   {
    //     // title: "Status",
    //     title: <FormattedMessage
    //       id="app.companyName"
    //       defaultMessage="Company Name"
    //     />,
    //     width: "25%",
    //     dataIndex: "companyName",
    //     // sorter: (a, b) => {
    //     //   const stageNameA = a.stageName && a.stageName.toLowerCase();
    //     //   const stageNameB = b.stageName && b.stageName.toLowerCase();
    //     //   if (stageNameA < stageNameB) {
    //     //     return -1;
    //     //   }
    //     //   if (stageNameA > stageNameB) {
    //     //     return 1;
    //     //   }
    //     //   return 0;
    //     // },
    //   },
    // ];
    if (props.fetchingLeadsQualified) return <BundleLoader/>;
  
    return (
      <>
        <div class="rounded-lg m-5 p-2 w-[98%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
          <div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
          <div className=" md:w-[6.5rem]">
        <FormattedMessage
                  id="app.name"
                  defaultMessage="Name"
                /></div>
 
        <div className="md:w-[10.1rem]">  <FormattedMessage id="app.emailId" defaultMessage="Email Id" /></div>
                 <div className="md:w-[10.1rem]">
                 <FormattedMessage
          id="app.companyName"
          defaultMessage="Company Name"
        /></div>
                     
                     
      

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