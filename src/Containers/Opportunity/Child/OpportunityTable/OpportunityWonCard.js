import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Tooltip, Menu, Dropdown, Progress } from "antd";
import { CurrencySymbol } from "../../../../Components/Common";
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
         getWonOpportunity,
         LinklostdOpportunity,
         deleteLostOpportunity,
} from "../../OpportunityAction";
import AddOpportunityDrawerModal from "./AddOpportunityDrawerModal";
import UpdateOpportunityModal from "../UpdateOpportunity/UpdateOpportunityModal";
import ReinstateToggleForLost from "../../Child/OpportunityTable/ReinstateToggleForLost"
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";

function OpportunityWonCard(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    if(props.role==="USER"&&user.department==="Recruiter"){
      props.getRecruiterList(props.recruiterId);     
    }else{
     
    } 
    props. getWonOpportunity(props.userId,page);
    setPage(page + 1);
  }, []);

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
      props. getWonOpportunity(props.userId,page);    
  }
    const [currentOpportunityId, setCurrentOpportunityId] = useState("");
    function handleSetCurrentOpportunityId(opportunityId,opportunityName) {
      setCurrentOpportunityId(opportunityId,opportunityName);
    }
    const {
        user,
        fetchingWonOpportunity,
    handleUpdateOpportunityModal,
    updateOpportunityModal,
    deleteOpportunityData,
     fetchingAllOpportunities,
     wonOpportunity,
     
      } = props;

      if (isMobile){
        return (    
          <>
          <div class="rounded-lg  p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
              <InfiniteScroll
                 dataLength={wonOpportunity.length}
                next={handleLoadMore}
                hasMore={hasMore}
                loader={fetchingWonOpportunity ?<div style={{ textAlign: 'center' }}>Loading...</div>:null}
                height={"75vh"}
              >
        {wonOpportunity.map((item) => {
                         
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
                              <div className=" flex font-medium   ">
                                        <div>
        
                    <MultiAvatar
                      primaryTitle={item.opportunityName}
                      imageId={item.imageId}
                      // imageURL={imageURL}
                      imgWidth={"1.8rem"}
                      imgHeight={"1.8rem"}
                    />
                  
        </div>
                                           <div class="w-[4%]">
        
                                           </div>
                                           
                                                <Tooltip>
                                                <div class=" flex max-sm:w-full  flex-row md:flex-col">
                                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">
                                                    Name
                                                    </div> */}
                                                    <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold cursor-pointer flex items-center w-max">
                                                        
                                                    <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`opportunity/${item.opportunityId}`} title={item.opportunityName}>
              {item.opportunityName}
            </Link>&nbsp;&nbsp;
                {/* {date === currentdate ? (
                  <span
                    style={{
                      color: "tomato",
                      fontWeight: "bold",
                    }}
                  >
                    New
                  </span>
                ) : null} */}
               
                                                    </div>
        </div>
                                                </Tooltip>
                                      
                                        </div>
        
                                        <div className=" flex font-medium  ">
                                   
                                            {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                                            <div class=" text-sm text-cardBody font-poppins ">   
                                            
                                            {item.customer}
                            
                                            </div>
                                        </div>
                                       
                                        <div className=" flex font-medium ">
                                          
        
                                            {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Country</div> */}
                                            <div class=" text-sm text-cardBody font-poppins">
                                          
                                            {item.contactName === null ? "None" :
                      <MultiAvatar2
                        primaryTitle={item.contactName}
                        imageId={item.imageId}
                         imageURL={item.imageURL}
                        imgWidth={"1.8rem"}
                        imgHeight={"1.8rem"}
                      />
                    }
                    
                                            </div>
                                        </div>
                                        </div>
                                        <div class="flex justify-between items-center w-wk ">
                                        <div className=" flex font-medium ">
                                           
        
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
                                        <div className=" flex font-medium ">
                               
                               
        
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
      <div className=" flex  w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[13.8rem]">Name</div>
        <div className=" md:w-[9.12rem]">Prospect</div>
        <div className=" md:w-[12.2rem] ">Sponsor</div>
        <div className="md:w-[8.8rem]">Start Date</div>
        <div className="md:w-[9.3rem]">Proposal Amount</div>
        <div className="md:w-[8.1rem]">Sales Rep</div>
        <div className="md:w-[2.2rem]">Owner</div>
        <div className="md:w-[4.8rem]"></div>
        <div className="w-12"></div>
      </div>
      <InfiniteScroll
         dataLength={wonOpportunity.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingWonOpportunity ?<div class="flex justify-center">Loading...</div>:null}
        height={"75vh"}
      >
{ !fetchingWonOpportunity && wonOpportunity.length === 0 ?<NodataFoundPage />:wonOpportunity.map((item,index) =>  {
                 
                 var findProbability = item.probability;
                 item.stageList.forEach((element) => {
                   if (element.oppStage === item.oppStage) {
                     findProbability = element.probability;
                   }
                 });
                 return (
                    <div>
                    <div
                      className="flex rounded-xl  bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
                      // style={{
                      //   borderBottom: "3px dotted #515050",
                      // }}
                    >
                      <div class="flex ">
                      <div className=" flex font-medium  md:w-[13rem] max-sm:flex-row w-full ">
                                <div>

            <MultiAvatar
              primaryTitle={item.opportunityName}
              imageId={item.imageId}
              // imageURL={imageURL}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
          
</div>
                                   <div class="w-[4%]">

                                   </div>
                                   
                                        <Tooltip>
                                        <div class=" flex max-sm:w-full  flex-row md:flex-col">
                                            {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">
                                            Name
                                            </div> */}
                                            <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold cursor-pointer">
                                                
                                            <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"  to={`opportunity/${item.opportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link>
         &nbsp;&nbsp;
        {/* {date === currentdate ? (
          <span
            style={{
              color: "tomato",
              fontWeight: "bold",
            }}
          >
            New
          </span>
        ) : null} */}
       
                                            </div>
</div>
                                        </Tooltip>
                              
                                </div>

                                <div className=" flex font-medium flex-col  md:w-[10.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                           
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                                    <div class=" text-sm text-cardBody font-poppins">   
                                    
                                    {item.customer}
                    
                                    </div>
                                </div>
                               
                                <div className=" flex font-medium flex-col md:w-44 max-sm:flex-row w-full max-sm:justify-between ">
                                  

                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Country</div> */}
                                    <div class=" text-sm text-cardBody font-poppins">
                                    
                                    {item.contactName === null ? "None" :
              <MultiAvatar2
                primaryTitle={item.contactName}
                imageId={item.imageId}
                 imageURL={item.imageURL}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
            }
            
                                    </div>
                                </div>
                                </div>
                                <div class="flex">
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center text-cardBody font-poppins">
                                    {moment(item.startDate).format("ll")}
                                    </div>
                                </div>
                             
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-sm text-cardBody font-poppins text-center">
                                    <CurrencySymbol currencyType={item.currency} />
            &nbsp;
            {item.proposalAmount}

                                    </div>
                                </div>
                                
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    {/* <div class=" text-sm text-cardBody font-poppins text-center">
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

                                    </div> */}
                              
                                <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Assigned to</div> */}

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
                                <div className=" flex font-medium flex-col md:w-20 max-sm:flex-row w-full mb-1 max-sm:justify-between ">
                       
                       {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Owner</div> */}

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
                  
                   <div class="flex flex-col w-[6%] max-sm:flex-row max-sm:w-[10%]">
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
                  </div>
                  <div class="flex flex-col w-[6%] max-sm:flex-row max-sm:w-[10%]">
                   
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
             
                    <div></div>
                  </div>   
                                <div class="flex flex-col w-[6%] max-sm:flex-row max-sm:w-[10%]">
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


const mapStateToProps = ({ auth, account, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,
  opportunitySkills:opportunity.opportunitySkills,
  sales: opportunity.sales,
  recruiterName: opportunity.recruiterName,
  recruiterList:opportunity.recruiterList,
  fetchingWonOpportunity:opportunity.fetchingWonOpportunity,
  fetchinglostOpportunity:opportunity.fetchinglostOpportunity,
  fetchinglostOpportunityError:opportunity.fetchinglostOpportunityError,
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
    wonOpportunity:opportunity.wonOpportunity
  
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
         getWonOpportunity,
         LinklostdOpportunity,
         deleteLostOpportunity,
    },
    dispatch
  );
export default connect(
mapStateToProps,
mapDispatchToProps
)(OpportunityWonCard);
