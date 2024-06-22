

import React, { useEffect } from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";
import { Link } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import {
  MultiAvatar,
  SubTitle,
} from "../../../../../../Components/UI/Elements";
import { getOpportunityListByContactId } from "../../../../../Contact/ContactAction";
import { Progress, Tooltip } from "antd";
import { CurrencySymbol } from "../../../../../../Components/Common";
import InfoIcon from '@mui/icons-material/Info';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";
import { BundleLoader } from "../../../../../../Components/Placeholder";

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function LinkedDealTable(props) {
  useEffect(() => {
     props.getOpportunityListByContactId(props.contactInVestDetail.contactId);
  }, []);

  const { fetchingContactOpportunity, opportunityByContactId } = props;
console.log(props.contactInVestDetail.contactId)
if (fetchingContactOpportunity) return <BundleLoader/>;
  return (
    <>
    <div className=' flex justify-end sticky top-28 z-auto'>
    <div class="rounded-lg m-5 p-2 w-[98%] overflow-y-auto overflow-x-hidden shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#eaedf1]">
      <div className=" flex justify-between w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[3rem]">Name</div>
        <div className=" md:w-[4.1rem]">Start Date</div>
        <div className=" md:w-[4.2rem] ">End Date</div>
        <div className="md:w-[4.2rem]">Value</div>
        <div className="md:w-[4.5rem]">Status</div>
        <div className="md:w-[3.8rem]">Sponsor</div> 
        <div className="w-[9rem]"></div>

      </div>

      { !fetchingContactOpportunity && opportunityByContactId.length === 0 ?<NodataFoundPage />:opportunityByContactId.map((item,index) =>  {
              var findProbability = item.probability;
              item.stageList.forEach((element) => {
                if (element.oppStage === item.oppStage) {
                  findProbability = element.probability;}
               });
          const currentdate = dayjs().format("DD/MM/YYYY");
          const date = dayjs(item.creationDate).format("DD/MM/YYYY");

          const diff = Math.abs(
            dayjs().diff(dayjs(item.lastRequirementOn), "days")
          );
          const dataLoc = ` Address : ${
            item.address && item.address.length && item.address[0].address1
          } 
               Street : ${
                 item.address && item.address.length && item.address[0].street
               }   
              State : ${
                item.address && item.address.length && item.address[0].state
              }
             Country : ${
               (item.address &&
                 item.address.length &&
                 item.address[0].country) ||
               ""
             } 
               PostalCode : ${
                 item.address &&
                 item.address.length &&
                 item.address[0].postalCode
               } `;
          return (
            <div>
              <div
                className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
              >
                <div class="flex ">
                <div className=" flex font-medium flex-col md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between  ">
<div className="flex max-sm:w-full items-center"> 
          &nbsp;
          <div class="max-sm:w-full">
                                        <Tooltip>
                                          <div class=" flex max-sm:w-full justify-between flex-row md:flex-col ">
                                          
                                            <div class="text-sm flex text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                            <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`/opportunity/${item.opportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link>                                     
        
        &nbsp;&nbsp;
        {date === currentdate ? (
          <div class="text-xs mt-[0.4rem]"
            style={{
              color: "tomato",
              fontWeight: "bold",
            }}
          >
            New
          </div>
        ) : null}
       
                                            </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                </div>
                <div class="flex">
                  <div className=" flex font-medium flex-col  md:w-[9rem] max-sm:flex-row w-full max-sm:justify-between ">
         
                    <h4 class=" text-xs text-cardBody font-poppins">
                    {dayjs(item.startDate).format("DD/MM/YYYY")}
                 
                    </h4>
                  </div>
                  <div className=" flex font-medium flex-col  md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">
         
         <h4 class=" text-xs text-cardBody font-poppins">
         {dayjs(item.endDate).format("DD/MM/YYYY")}
           
      
         </h4>
       </div>
                </div>
                <div class="flex">
                  <div className=" flex font-medium justify-center flex-col  md:w-[8.5rem] max-sm:flex-row w-full max-sm:justify-between ">
         
                    <h4 class=" text-xs text-cardBody font-poppins">
                    <div>
            <CurrencySymbol currencyType={item.currency} />
            &nbsp;&nbsp;{item.proposalAmount}
          </div>
                 
                    </h4>
                  </div>
                  <div className=" flex font-medium flex-col  md:w-[10.5rem] max-sm:flex-row w-full max-sm:justify-between ">
         
         <h4 class=" text-xs text-cardBody font-poppins">
         <Tooltip title={item.oppStage}>
{" "}
<Progress
type="circle"
style={{ cursor: "pointer",color:"red" }}
percent={findProbability}
//disable={true}
width={30}
 strokeColor={"#005075"}

/>
  
</Tooltip>
      
         </h4>
       </div>
                </div>
                <div class="flex">
                  <div className=" flex font-medium flex-col  md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
         
                    <h4 class=" text-xs text-cardBody font-poppins">
                    <Tooltip title={item.contactName}>
              <div>
                <MultiAvatar
                  primaryTitle={item.contactName}
                  imageId={item.imageId}
                  imageURL={item.imageURL}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
              </div>
            </Tooltip>
                 
                    </h4>
                  </div>
      
                </div>
              
                <div class="flex md:items-center ">
                  <div className=" flex font-medium flex-col md:w-[5rem] max-sm:flex-row w-full max-sm:justify-between ">
                    <div class=" text-xs text-cardBody font-poppins">
                      <Tooltip title={item.description}>
           
          <InfoIcon 
          
              // type="edit"
              style={{ cursor: "pointer",fontSize:"1.25rem" }}
             
            />
          
          </Tooltip>
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-[5rem]  max-sm:flex-row w-full max-sm:justify-between">
                  <Tooltip title="Edit">
             {/* {user.opportunityUpdateInd ===true && ( */}
          <BorderColorIcon 
          
              type="edit"
              style={{ cursor: "pointer",fontSize:"1.25rem" }}
              onClick={() => {
                props.setEditCustomerOpportunity(item);
               // handleUpdateCustomerOpportunityModal(true);
               // handleSetCurrentOpportunityId(item.opportunityId)
                
              }}
            />
            {/* )} */}
          </Tooltip>
                  </div>
                
             
               
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
      {/* <AddCustomerUpdateOpportunityModal
      opportunityId={currentOpportunityId}
      defaultCustomers={[{ label: name, value: customerId }]}
      customerId={{ value: customerId }}
       addUpdateCustomerOpportunityModal={addUpdateCustomerOpportunityModal}
        handleUpdateCustomerOpportunityModal={handleUpdateCustomerOpportunityModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
        
      /> */}
    </>
  );
}

const mapStateToProps = ({ auth,contact }) => ({
  userId: auth.userDetails.userId,
  fetchingContactOpportunity: contact.fetchingContactOpportunity,
  opportunityByContactId: contact.opportunityByContactId,
  contactId: contact.contact.contactId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       getOpportunityListByContactId,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LinkedDealTable);
