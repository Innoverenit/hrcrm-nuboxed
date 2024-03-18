import React, { useEffect, useState,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Tooltip, Menu, Dropdown, Progress } from "antd";
import { CurrencySymbol, } from "../../../../Components/Common";
import { Link } from 'react-router-dom';
import moment from "moment";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LockIcon from "@mui/icons-material/Lock";
import { DeleteOutlined } from "@ant-design/icons";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import {
  MultiAvatar,
  MultiAvatar2,
} from "../../../../Components/UI/Elements";
import {
  getRecruiterList,
  handleUpdateOpportunityModal,
  setEditOpportunity,
  deleteOpportunityData,
  updateOwneroppById,
      handleOpportunityDrawerModal,
      getAllRecruitmentByOppId,
        getAllRecruitmentPositionByOppId,
          getAllRecruitmentAvgTimeByOppId,
         getAllRecruitmentPositionFilledByOppId,
         getAllRecruitmentDetailsByOppId,
         getOpportunitySKill,
         getFullOpportunity,
} from "../../OpportunityAction";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";
const AddOpportunityDrawerModal =lazy(()=> import("./AddOpportunityDrawerModal"));
const UpdateOpportunityModal =lazy(()=> import("../UpdateOpportunity/UpdateOpportunityModal"));
const ReinstateToggleForLost =lazy(()=> import("../../Child/OpportunityTable/ReinstateToggleForLost"));


function OpportunityAllCardList(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    if(props.role==="USER"&&user.department==="Recruiter"){
      props.getRecruiterList(props.recruiterId);     
    }else{
     
    } 
    props. getFullOpportunity(page);
    setPage(page + 1);
  },[]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleLoadMore = () => {
    setPage(page + 1);
      props. getFullOpportunity(page);
  }
    const [currentOpportunityId, setCurrentOpportunityId] = useState("");
    function handleSetCurrentOpportunityId(opportunityId,opportunityName) {
      setCurrentOpportunityId(opportunityId,opportunityName);
    }
    const {
        user,
        fetchinglostOpportunity,
    fetchinglostOpportunityError,
    deleteLostOpportunity,
    handleUpdateOpportunityModal,
    updateOpportunityModal,
    deleteOpportunityData,
    fetchingAllOpportunity,
    allOpportunity,
     
      } = props;

      if (isMobile){
        return (    
          <>
        <div class="rounded-lg  p-2 w-wk overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
         
         
              <InfiniteScroll
                dataLength={allOpportunity.length}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={fetchingAllOpportunity?<div style={{ textAlign: 'center' }}>Loading...</div> :null}
                height={"75vh"}
              >
              
                      {allOpportunity.map((item) => {
                         
                         var findProbability = item.probability;
                         item.stageList.forEach((element) => {
                           if (element.oppStage === item.oppStage) {
                             findProbability = element.probability;
                           }
                         });
                         return (
        
                          <div>
                          <div
                        className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[9rem] items-center p-3"
                      >
                             <div class="flex justify-between items-center w-wk ">
                            <div className=" flex font-medium  ">
                                      <div>
     
                  <MultiAvatar
                    primaryTitle={item.opportunityName}
                    imageId={item.imageId}
                    imgWidth={"1.8rem"}
                    imgHeight={"1.8rem"}
                  />
               
        </div>
                                        
                                         
                                              <Tooltip>
                                              <div class=" flex max-sm:w-full  flex-row md:flex-col">
                
                                                  <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold cursor-pointer flex items-center w-max ">
                                                      
                                                  <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`opportunity/${item.opportunityId}`} title={item.opportunityName}>
              {item.opportunityName}
            </Link>&nbsp;&nbsp;
             
                                                  </div>
        </div>
                                              </Tooltip>
                                    
                                      </div>
        
                                      <div className=" flex font-medium  ">
        
                                          <div class=" text-sm text-cardBody font-poppins">   
                                          
                                          {item.customer}
                          
                                          </div>
                                      </div>
                                     
                                      <div className=" flex font-medium  ">
                                        
        
                                          <div class=" text-sm text-cardBody font-poppins">
                                         
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
                                      </div>
                                      <div class="flex justify-between items-center w-wk ">
                                      <div className=" flex font-medium  ">
        
        
                                          <div class=" text-sm justify-center text-cardBody font-poppins">
                                          {moment(item.startDate).format("ll")}
                                          </div>
                                      </div>
                                   
                                      <div className=" flex font-medium  ">
           
        
                                          <div class=" text-sm text-cardBody font-poppins text-center">
                                          <CurrencySymbol currencyType={item.currency} />
                  &nbsp;
                  {item.proposalAmount}
        
                                          </div>
                                      </div>
                                      <div className=" flex font-medium  ">
                   
        
                                          <div class=" text-sm text-cardBody font-poppins text-center">
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
        className=" !text-base cursor-pointer text-[red]"
        percent={findProbability}
        width={30}
        strokeColor={"#005075"}
        />
        </Tooltip>
        </Dropdown>
        
                                          </div>
                                      </div>
                                      <div className=" flex font-medium  ">
                            
        
                                          <div class=" text-sm text-cardBody font-poppins">
                                          
                                          <span>
                                          <MultiAvatar2
                    primaryTitle={item.assignedTo}
                    imgWidth={"1.8rem"}
                    imgHeight={"1.8rem"}
                  />
                  </span>
                   
                                          </div>
                                      </div>
                                      <div className=" flex font-medium  ">
                             
        
        
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
                         <div class="flex justify-between items-center w-wk ">
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
                   className=" !text-base cursor-pointer text-[#df9697]"
                   />
                 )}
               </span>
                              </div>
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
                      className=" !text-base cursor-pointer"
                    />
                  </span>
           </Tooltip> 
                          </div>
                          <div>
                          <ReinstateToggleForLost 
                  opportunityId={item.opportunityId} 
                  
                  
                  />
                          </div>
                            <div>
                               <Tooltip
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
                    className=" !text-base cursor-pointer text-[grey]"
                      onClick={() => {
                        props.setEditOpportunity(item);
                        handleUpdateOpportunityModal(true);
                        handleSetCurrentOpportunityId(item);
                      }}
                    >
                                  <BorderColorIcon
                                   className=" !text-base cursor-pointer text-[tomato]"
                                  />
                                </span>
                              )}
                            </Tooltip>
                            </div>
                            <div>
                            <StyledPopconfirm
                              title="Do you want to delete?"
                              onConfirm={() =>
                                deleteLostOpportunity(item.opportunityId)
                              }
                            >
                                {user.opportunityDeleteInd ===true && (
                              
                                <DeleteOutlined
                                  type="delete"
                                  className=" !text-base cursor-pointer text-[red]"
                                />
                                )}
                                </StyledPopconfirm>
                            </div>
                          </div>          
                            
                                  </div>
                              </div>
        
                         )  
                    })}
                     
          
        
              </InfiniteScroll>
              </div>
              <UpdateOpportunityModal
                opportunityId={currentOpportunityId}
                opportunityName={currentOpportunityId}
                opportunityData={currentOpportunityId}
                updateOpportunityModal={updateOpportunityModal}
                handleUpdateOpportunityModal={handleUpdateOpportunityModal}
                handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
              />
        
        <AddOpportunityDrawerModal
         handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
         opportunityName={currentOpportunityId}
         opportunitySkills={props.opportunitySkills}
        allRecruitmentDetailsByOppId={props.allRecruitmentDetailsByOppId}
                     allRecruitmentByOppId={props.allRecruitmentByOppId}
                     allRecruitmentPositionFilledByOppId={props.allRecruitmentPositionFilledByOppId}
                     allRecruitmentAvgTimeByOppId={props.allRecruitmentAvgTimeByOppId}
                     allRecruitmentPositionByOppId={props.allRecruitmentPositionByOppId}
                       handleOpportunityDrawerModal={props.handleOpportunityDrawerModal}
                       addDrawerOpportunityModal={props.addDrawerOpportunityModal}
                     // candidateByUserId={this.props.candidateByUserId}
              />
            </>
          );
      }

      return (    
  <>
<div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
 <div className="flex  w-[99%] max-xl:w-[87%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" w-[13.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-xl:w-[16.8rem] ">Name</div>
        <div className=" w-[9.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Prospect</div>
        <div className=" w-[8.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] ">Sponsor</div>
        <div className="w-[8.8rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Start Date</div>
        <div className="w-[11.3rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Proposal Amount</div>
        <div className="w-[5.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Stages</div> 
        <div className="w-[8.1rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem]">Sales Rep</div>
        <div className="w-[2.2rem] max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-lg:w-[0.2rem]">Owner</div>
        <div className="w-[4.8rem] "></div>
        <div className="w-12"></div>
      </div>

      <InfiniteScroll
        dataLength={allOpportunity.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllOpportunity?<div class="flex justify-center" >Loading...</div> :null}
        height={"75vh"}
      >
 <CardWrapper>      
 { !fetchingAllOpportunity && allOpportunity.length === 0 ?<NodataFoundPage />:allOpportunity.map((item,index) =>  {
                 
                 var findProbability = item.probability;
                 item.stageList.forEach((element) => {
                   if (element.oppStage === item.oppStage) {
                     findProbability = element.probability;
                   }
                 });
                 return (

                  <div>
                  <div
                    className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-2"
                  >
                    <div class="flex ">
                    <div className=" flex font-medium  w-[13rem] max-xl:w-[10rem] max-lg:w-[8rem] max-sm:flex-row  ">
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
                                              
                                          <Link class="overflow-ellipsis whitespace-nowrap max-xl:text-[0.65rem] max-lg:text-[0.45rem] h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`opportunity/${item.opportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link>&nbsp;&nbsp;
     
                                          </div>
</div>
                                      </Tooltip>
                            
                              </div>

                              <div className=" flex font-medium flex-col  w-44 max-xl:w-[5.5rem] max-lg:w-[3.9rem] max-sm:flex-row  max-sm:justify-between ">

                                  <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">   
                                  
                                  {item.customer}
                  
                                  </div>
                              </div>
                             
                              <div className=" flex font-medium flex-col w-[7rem] max-xl:w-[4rem] max-lg:w-[3.8rem] max-sm:flex-row  max-sm:justify-between ">
                                

                                  <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                 
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
                              </div>
                              <div class="flex">
                              <div className=" flex font-medium flex-col w-[8rem] max-xl:w-[5.51rem] max-lg:w-[3.51rem] max-sm:flex-row  max-sm:justify-between ">


                                  <div class=" text-sm justify-center text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                  {moment(item.startDate).format("ll")}
                                  </div>
                              </div>
                           
                              <div className=" flex font-medium flex-col w-36 max-xl:w-[5rem] max-lg:w-[4rem] max-sm:flex-row  max-sm:justify-between ">
   

                                  <div class=" text-sm text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                  <CurrencySymbol currencyType={item.currency} />
          &nbsp;
          {item.proposalAmount}

                                  </div>
                              </div>
                              <div className=" flex font-medium flex-col w-36 max-xl:w-[5.1rem] max-sm:flex-row  max-sm:justify-between ">
           

                                  <div class=" text-sm text-cardBody font-poppins text-center max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
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
className=" !text-base cursor-pointer text-[red]"
percent={findProbability}
width={30}
strokeColor={"#005075"}
/>
</Tooltip>
</Dropdown>

                                  </div>
                              </div>
                              <div className=" flex font-medium flex-col w-32 max-xl:w-[4.2rem] max-lg:w-[3.8rem] max-sm:flex-row  max-sm:justify-between ">
                    

                                  <div class=" text-sm text-cardBody font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem]">
                                  
                                  <span>
                                  <MultiAvatar2
            primaryTitle={item.assignedTo}
            imgWidth={"1.8rem"}
            imgHeight={"1.8rem"}
          />
          </span>
           
                                  </div>
                              </div>
                              <div className=" flex font-medium flex-col w-20 max-lg:w-[2rem] max-sm:flex-row  mb-1 max-sm:justify-between ">
                     


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
                 
                 <div>
                  <ReinstateToggleForLost 
          opportunityId={item.opportunityId} 
          
          
          />
                  </div>
               
                 <div class="flex flex-col w-6 max-lg:w-[1rem] max-sm:flex-row max-sm:w-[10%]">
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
           className=" !text-base cursor-pointer text-[#df9697]"
           />
         )}
       </span>
                      </div>
          </div>
        
                 <div class="flex flex-col w-6 max-lg:w-[1rem] max-sm:flex-row max-sm:w-[10%]">
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
         className=" !text-base cursor-pointer"
            />
          </span>
   </Tooltip> 
                  </div>
                
                </div>
                <div class="flex flex-col w-6 max-lg:w-[1rem] max-sm:flex-row max-sm:w-[10%]">
                 
                    <div>
                       <Tooltip
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
            className=" !text-base cursor-pointer text-[grey]"
             
              onClick={() => {
                props.setEditOpportunity(item);
                handleUpdateOpportunityModal(true);
                handleSetCurrentOpportunityId(item);
              }}
            >
                          <BorderColorIcon
                          className=" !text-base cursor-pointer text-[tomato]"
                            
                          />
                        </span>
                      )}
                    </Tooltip>
                    </div>
                  
                  
                    <div>
                    <StyledPopconfirm
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
                          className=" !text-base cursor-pointer text-[red]"
                        />
                        )}
                        </Tooltip>
                        </StyledPopconfirm>
                    </div>
           
                  <div></div>
                </div>  
                </div> 
                            
                    
                          </div>
                  

                 )  
            })}
              </CardWrapper>
  

      </InfiniteScroll>
      </div>
      <UpdateOpportunityModal
        opportunityId={currentOpportunityId}
        opportunityName={currentOpportunityId}
        opportunityData={currentOpportunityId}
        updateOpportunityModal={updateOpportunityModal}
        handleUpdateOpportunityModal={handleUpdateOpportunityModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
      />

<AddOpportunityDrawerModal
 handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
 opportunityName={currentOpportunityId}
 opportunitySkills={props.opportunitySkills}
allRecruitmentDetailsByOppId={props.allRecruitmentDetailsByOppId}
             allRecruitmentByOppId={props.allRecruitmentByOppId}
             allRecruitmentPositionFilledByOppId={props.allRecruitmentPositionFilledByOppId}
             allRecruitmentAvgTimeByOppId={props.allRecruitmentAvgTimeByOppId}
             allRecruitmentPositionByOppId={props.allRecruitmentPositionByOppId}
               handleOpportunityDrawerModal={props.handleOpportunityDrawerModal}
               addDrawerOpportunityModal={props.addDrawerOpportunityModal}
             // candidateByUserId={this.props.candidateByUserId}
      />
    </>
  );
}


const mapStateToProps = ({ auth, account, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,
  opportunitySkills:opportunity.opportunitySkills,
  sales: opportunity.sales,
  recruiterName: opportunity.recruiterName,
  recruiterList:opportunity.recruiterList,
  fetchingAllOpportunity:opportunity.fetchingAllOpportunity,
  fetchingAllOpportunityError:opportunity.fetchingAllOpportunityError,
  fetchingRecruiterList:opportunity.fetchingRecruiterList,
  fetchingRecruiterListError:opportunity.fetchingRecruiterListError,
  fetchingOpportunity: opportunity.fetchingOpportunity,
  fetchingOpportunityError: opportunity.fetchingOpportunityError,
  fetchingAllOpportunities:opportunity.fetchingAllOpportunities,
  opportunityByUserId: opportunity.opportunityByUserId,
  updateOpportunityModal: opportunity.updateOpportunityModal,
  recruiterId:auth.userDetails.userId,
  addDrawerOpportunityModal:opportunity.addDrawerOpportunityModal,
  allRecruitmentPositionByOppId: opportunity.allRecruitmentPositionByOppId,
  allRecruitmentAvgTimeByOppId: opportunity.allRecruitmentAvgTimeByOppId,
  allRecruitmentPositionFilledByOppId:
    opportunity.allRecruitmentPositionFilledByOppId,
    allRecruitmentByOppId: opportunity.allRecruitmentByOppId,
    allRecruitmentDetailsByOppId:opportunity.allRecruitmentDetailsByOppId,
    allOpportunity:opportunity.allOpportunity
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRecruiterList,
      getOpportunitySKill,
      handleUpdateOpportunityModal,
      handleOpportunityDrawerModal,
      setEditOpportunity,
      deleteOpportunityData,
      updateOwneroppById,
      getAllRecruitmentByOppId,
         getAllRecruitmentPositionByOppId,
          getAllRecruitmentAvgTimeByOppId,
         getAllRecruitmentPositionFilledByOppId,
         getAllRecruitmentDetailsByOppId,
         getFullOpportunity,
    //      LinklostdOpportunity,
    //      deleteLostOpportunity,
    },
    dispatch
  );
export default connect(
mapStateToProps,
mapDispatchToProps
)(OpportunityAllCardList);

const Header = styled.div`
  text-overflow: ellipsis;

  white-space: nowrap;
  overflow: hidden;
  height: 2em;
  font-size: 1em;
padding:4px;
  color:blue;
  cursor:pointer;
  // font-family: Poppins;
  //font-weight: 700;
  @media only screen and (max-width: 600px) {
    text-overflow: ellipsis;
display: flex;
    justify-content: flex-end;
white-space: nowrap;
overflow: hidden;
height: 2em;
font-size: 1.3em;
font-family: Poppins;
font-weight: 700;
width:100%

text-align:center
  }
`
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
const CardElement = styled.div`
 
border-radius: 0.75rem;
    border: 3px solid #EEEEEE;
    background-color: rgb(255,255,255);
    box-shadow: 0 0.25em 0.62em #aaa;
    height: 17rem;
    color: rgb(68,68,68);
    margin: 1em;
    padding: 0.2rem;
    width: 20vw;
    display: flex;
    flex-direction: column;
  @media only screen and (max-width: 600px) {
    width: -webkit-fill-available;
    
  }
`