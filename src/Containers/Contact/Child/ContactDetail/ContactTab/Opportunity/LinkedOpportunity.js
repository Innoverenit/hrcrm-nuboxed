import React, { useEffect ,useState} from "react";
import { connect } from "react-redux";
import LockIcon from "@mui/icons-material/Lock";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import {  Menu, Dropdown, Progress } from "antd";
import { Link } from "../../../../../../Components/Common";
import { FormattedMessage } from "react-intl";
import { CurrencySymbol } from "../../../../../../Components/Common";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import {
  MultiAvatar,
  MultiAvatar2,
  SubTitle,
} from "../../../../../../Components/UI/Elements";
import styled from "styled-components";
import { getOpportunityListByContactId } from "../../../../ContactAction";
import { Tooltip } from "antd";
import NodataFoundPage from "../../../../../../Helpers/ErrorBoundary/NodataFoundPage";

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function OpportunityTable(props) {
  const [currentOpportunityId, setCurrentOpportunityId] = useState("");
  useEffect(() => {
    props.getOpportunityListByContactId(props.contactId);
  }, []);
  console.log(props.contactId);
  function handleSetCurrentOpportunityId(opportunityId,opportunityName) {
    setCurrentOpportunityId(opportunityId,opportunityName);
  }
  const { fetchingContactOpportunity, opportunityByContactId,user } = props;

 
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 0.75;

  return (
    <>
    <div class="rounded m-1 max-sm:m-1 p-1 w-[99%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
 <div className="flex max-sm:hidden  w-[99%] max-xl:w-[87%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" w-[20.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[16.8rem] ">Name</div>
        <div className=" w-[6.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Prospect</div>
        <div className=" w-[8.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">Sponsor</div>
        <div className="w-[9.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Start Date</div>
        <div className="w-[6.3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Value</div>
        <div className="w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Stages</div> 
        <div className="w-[9.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Sales Rep</div>
        <div className="w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:w-[0.2rem]">Owner</div>
        <div className="w-[4.8rem] "></div>
        <div className="w-12"></div>
      </div>

      <InfiniteScroll
        dataLength={props.opportunityByContactId.length}
        //next={handleLoadMore}
        // hasMore={hasMore}
        loader={props.fetchingContactOpportunity?<div class="flex justify-center" >Loading...</div> :null}
        height={"75vh"}
      >
 <CardWrapper>      
 { !props.fetchingContactOpportunity && props.opportunityByContactId.length === 0 ?<NodataFoundPage />: props.opportunityByContactId.map((item,index) =>  {
                 
                 var findProbability = item.probability;
                 item.stageList.forEach((element) => {
                   if (element.oppStage === item.oppStage) {
                     findProbability = element.probability;
                   }
                 });
                 return (

                  <div className="max-sm:w-wk">
                   <div
                className="flex rounded justify-between  bg-white mt-1 h-8 items-center p-1 max-sm:h-[9rem] max-sm:flex-col"
              >
                   <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                    <div className=" flex font-medium  w-[13rem] max-xl:w-[10rem] max-lg:w-[8rem] max-sm:flex-row max-sm:w-auto  ">
                              <div>

          <MultiAvatar
            primaryTitle={item.opportunityName}
            imageId={item.imageId}
            imgWidth={"1.8rem"}
            imgHeight={"1.8rem"}
          />
        
</div>
                                 <div class="w-[4%]">

                                 </div>
                                 
                                      <Tooltip>
                                      <div class=" flex max-sm:w-full  flex-row md:flex-col">
        
                                          <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold cursor-pointer">
                                              
                                          <Link class="overflow-ellipsis max-sm:text-sm whitespace-nowrap max-xl:text-[0.65rem] max-lg:text-[0.45rem] h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`opportunity/${item.opportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link>&nbsp;&nbsp;
     
                                          </div>
</div>
                                      </Tooltip>
                            
                              </div>

                              <div className=" flex font-medium   w-[7.01rem] max-xl:w-[5.5rem] max-lg:w-[3.9rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">

                                  <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">   
                                  
                                  {item.customer}
                  
                                  </div>
                              </div>
                              </div>
                            
                              
                              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                              <div className=" flex font-medium  w-[4rem] max-xl:w-[4rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                                

                                <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                               
                                {item.contactName === null ? "None" :
          <MultiAvatar2
            primaryTitle={item.contactName}
            imageId={item.imageId}
             imageURL={item.imageURL}
            imgWidth={"1.8em"}
            imgHeight={"1.8em"}
          />
        }
       
                                </div>
                            </div>
                              <div className=" flex font-medium  w-[7rem] max-xl:w-[5.51rem] max-lg:w-[3.51rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">


                                  <div class=" text-sm justify-center text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                  {dayjs(item.startDate).format("DD/MM/YYYY")}
                                  </div>
                              </div>
                           
                              <div className=" flex font-medium  w-[6.01rem] max-xl:w-[5rem] max-lg:w-[4rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
   

                                  <div class=" text-sm text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                  <CurrencySymbol currencyType={item.currency} />
          &nbsp;
          {item.proposalAmount}

                                  </div>
                              </div>
                              </div>
                              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                              <div className=" flex font-medium  w-[4.02rem] max-xl:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
           

                                  <div class=" text-sm text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                  <Dropdown
overlay={
<div>
<Menu mode="horizontal">
<Menu.Item
  style={{
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#F5F5F5",
  }}
>
  
</Menu.Item>
</Menu>
</div>
}
trigger={["click"]}
>
<Tooltip title={item.stageName}>
{" "}
<Progress
type="circle"
className=" !text-icon cursor-pointer text-[red]"
percent={findProbability}
width={30}
strokeColor={"#005075"}
/>
</Tooltip>
</Dropdown>

                                  </div>
                              </div>
                              <div className=" flex font-medium  w-[6.02rem] max-xl:w-[4.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                    

                                  <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:text-sm">
                                  
                                  <span>
                                  <MultiAvatar2
            primaryTitle={item.assignedTo}
            imgWidth={"1.8rem"}
            imgHeight={"1.8rem"}
          />
          </span>
           
                                  </div>
                              </div>
                              <div className=" flex font-medium  w-20 max-lg:w-[2rem] max-sm:w-auto max-sm:flex-row  mb-1 max-sm:justify-between ">
                     


            <Tooltip title={item.ownerName}>
        <span>
          <MultiAvatar2
             primaryTitle={item.ownerName}
             imageId={item.ownerImageId}
              imageURL={item.imageURL}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
          </span>
          </Tooltip>
                 </div>
                 </div>
                 <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                 <div>
                  {/* <ReinstateToggleForLost 
          opportunityId={item.opportunityId} 
          
          
          /> */}
                  </div>
               
                 <div class="flex flex-col w-6 max-lg:w-[1rem] max-sm:flex-row max-sm:w-auto">
                 <div>
                 <span
       
       className=" cursor-pointer"
onClick={() => {
props.getAllRecruitmentByOppId(item.opportunityId);
props.getAllRecruitmentPositionByOppId(item.opportunityId);
props.getAllRecruitmentAvgTimeByOppId(item.opportunityId);
props.getAllRecruitmentPositionFilledByOppId(
item.opportunityId
);
props.getAllRecruitmentDetailsByOppId(item.opportunityId);
props.handleOpportunityDrawerModal(true);
props.getOpportunitySKill(item.oppInnitiative);
handleSetCurrentOpportunityId(item.opportunityName);
}}
>
         {user.pulseAccessInd === true && (
           <MonitorHeartIcon
           className=" !text-icon cursor-pointer text-[#df9697]"
           />
         )}
       </span>
                      </div>
          </div>
        
                 <div class="flex flex-col w-6 max-lg:w-[1rem] max-sm:flex-row max-sm:w-auto">
                  <div>
                  <Tooltip title='Click to Open'><span
       onClick={() => {
        props.LinkClosedOpportunity(
          item.opportunityId,
          {
            closeInd:false,
          }
               
        );         
      }}         
     
       >
        <LockIcon
         className=" !text-icon cursor-pointer"
            />
          </span>
   </Tooltip> 
                  </div>
                
                </div>
                <div class="flex flex-col w-6 max-lg:w-[1rem] max-sm:flex-row max-sm:w-auto">
                 
                    <div>
                       {/* <Tooltip
                      placement="right"
                      title={
                        <FormattedMessage
                          id="app.edit"
                          defaultMessage="Edit"
                        />
                      }
                    >
                      {user.opportunityUpdateInd ===true && (
            
            <span
            className=" !text-xl cursor-pointer text-[grey]"
             
              onClick={() => {
                props.setEditOpportunity(item);
                handleUpdateOpportunityModal(true);
                handleSetCurrentOpportunityId(item);
              }}
            >
                          <BorderColorIcon
                          className=" !text-xl cursor-pointer text-[tomato]"
                            
                          />
                        </span>
                      )}
                    </Tooltip> */}
                    </div>
                  
                  
                    <div>
                    {/* <StyledPopconfirm
                      title="Do you want to delete?"
                      onConfirm={() =>
                        deleteLostOpportunity(item.opportunityId)
                      }
                    >
                         <Tooltip
                    
                      title={
                        <FormattedMessage
                          id="app.Delete"
                          defaultMessage="Delete"
                        />
                      }
                    >
                        {user.opportunityDeleteInd ===true && (
                      
                        <DeleteOutlined
                          type="delete"
                          className=" !text-xl cursor-pointer text-[red]"
                        />
                        )}
                        </Tooltip>
                        </StyledPopconfirm> */}
                    </div>
           
                  <div></div>
                </div>  
                </div>
                </div> 
                            
                    
                          </div>
                  

                 )  
            })}
              </CardWrapper>
  

      </InfiniteScroll>
      </div>
    </>
  );
}
// }
const mapStateToProps = ({ auth, contact, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,
  fetchingContactOpportunity: contact.fetchingContactOpportunity,
  // accounts: accountSelector(account),
  opportunityByContactId: contact.opportunityByContactId,
  contactId: contact.contact.contactId,
  // opportunityId: opportunity.opportunityId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOpportunityListByContactId,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityTable);

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  
  @media only screen and (max-width: 600px) {
    -webkit-justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
`
