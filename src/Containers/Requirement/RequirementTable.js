import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import {
  StyledTable,
  StyledPopconfirm,
  StyledModal,
  StyledDrawer,
} from "../../Components/UI/Antd";
import HelpIcon from "@mui/icons-material/Help";
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import SkillBarChatModal from "../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/Child/SkillBarChartModal";
import RecruitmentFilter from "../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/RecruitmentFilter";

import {getAllRequirementTable,ClearReducerDataOfRequirement,handleRecruiterModal,updateRecruiterData} from "../Requirement/RequirementAction"
import {handleBarChartOrderModal,getSkillsCount,getCandidateRequirement,getRecruiter,LinkSkillsRecruit,getRecruiterName} from "../Opportunity/OpportunityAction"
import InfiniteScroll from "react-infinite-scroll-component";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import CategoryIcon from '@mui/icons-material/Category';
import EventIcon from '@mui/icons-material/Event';
import AddRecruiterModal from "./AddRecruiterModal"
import { Tooltip, Avatar,Button,Select } from "antd";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import PortraitIcon from '@mui/icons-material/Portrait';
import ContactsIcon from '@mui/icons-material/Contacts';
import { BundleLoader } from "../../Components/Placeholder";
import NodataFoundPage from "../../Helpers/ErrorBoundary/NodataFoundPage";
import EmptyPage from "../Main/EmptyPage";
import SubTableClickCandidate from "../Opportunity/Child/OpportunityDetail/OpportunityTab/Recruitment/SubTableClickCandidate";
const Option = Select;
const RequirementTable = (props) => {
  const [hasMore, setHasMore] = useState(true);
  const [candidatePostData, setCandidatePostData] = useState(null);
  const [skillSetData, setSkillSetData] = useState(null);
  const [subTableVisible, setSubTableVisible] = useState(false);
  const [page, setPage] = useState(0);
    const [selectedRecruiter, setSelectedRecruiter] = useState({});
   const [isAssignDropdownRecruiter, setIsAssignRecruiter] = useState(null);
   const [currentCandidate, setCurrentCandidate] = useState("");
  const [loading, setLoading] = useState(true);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  useEffect(() => {
          const fetchMenuTranslations = async () => {
            try {
              const itemsToTranslate = [
              "1744",//  "Job",//0
             "1152" ,//   "Requirement",//1
              "213",//   " Quotation ID",//2
             "14" ,//   "Category",//3
              "248",//   "Customer",//4
             "73", //   "Contact",//5
             "679", //   "Created",//6
              "158",//   "Start",//7
             "1010", //   "Billing",//8
              "1153",//   "Talent",//9
               
            
             ];
      
              const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
              setTranslatedMenuItems(translations);
            } catch (error) {
              console.error('Error translating menu items:', error);
            }
          };
      
          fetchMenuTranslations();
        }, [props.selectedLanguage]);

  
    useEffect(() => {
      window.addEventListener('error', e => {
        if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'Script error.') {
          const resizeObserverErrDiv = document.getElementById(
            'webpack-dev-server-client-overlay-div'
          )
          const resizeObserverErr = document.getElementById(
            'webpack-dev-server-client-overlay'
          )
          if (resizeObserverErr) {
            resizeObserverErr.setAttribute('style', 'display: none');
          }
          if (resizeObserverErrDiv) {
            resizeObserverErrDiv.setAttribute('style', 'display: none');
          }
        }
      })
       
        props.getAllRequirementTable(props.userId,page)
        props.getRecruiterName(props.orgId)
        setPage(page + 1);
        props.ClearReducerDataOfRequirement()
    }, []);


      const handleAssignRecruit = (values,item, index) => {
        setSelectedRecruiter((prev) => ({ ...prev, [index]: values }));

      //   const selectedIds = props.requirementTable[index].recruiterList
      //   .filter((user) => selectedRecruiter[index]?.includes(user.empName))
      //   .map((user) => user.employeeId);

      // console.log({ recruiterId: selectedIds });

      const selectedIds =  props.requirementTable[index].recruiterList
      .filter((user) => values.includes(user.empName))
      .map((user) => user.employeeId);

      let result={
        recruitmentId:item.recruitmentId,
        recruiterIds:selectedIds
      }

      props.updateRecruiterData(result)

    console.log({ recruiterId: selectedIds }); // Log recruiterId

    setIsAssignRecruiter(null)
    
        //props.updateProspectUser(customerId,value);
       
      };


    function handleClickCandidateName(item) {
      setCurrentCandidate(item);
      setSubTableVisible(!subTableVisible);
      // console.log("opp",item);
    }
    
    const handleSkillsetChoose = (data) => {
      setSkillSetData(data);
    };

    const handleCandidateDataSet = (data) => {
      setCandidatePostData(data);
    };

    const handleAvatarClick = (index) => {
      setIsAssignRecruiter(index); // Set the dropdown visibility for the clicked row
    };


    // const handleKeyPress = (event, index) => {
    //   if (event.key === "Enter") {
    //     const selectedIds = props.requirementTable[index].recruiterList
    //       .filter((user) => selectedRecruiter[index]?.includes(user.empName))
    //       .map((user) => user.employeeId);
  
    //     console.log({ recruiterId: selectedIds }); // Log recruiterId
    //   }
    // };
  

    const handleLoadMore = () => {
      setPage(page + 1);
      props.getAllRequirementTable(
        props.userId,page,
      );
  };
    const {
        fetchingAllRequirementTableError,
        requirementTable,
        fetchingAllRequirementTable
      } = props;
      if (fetchingAllRequirementTable) {
        return <div><BundleLoader/></div>;
      }
console.log(requirementTable)
    return (
        <div className="flex flex-col w-full ">
            <div className="flex sticky z-auto">
                    <div className="rounded m-1 p-1 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
                        <div className="flex justify-between w-[96%] p-1 bg-transparent font-bold font-poppins !text-lm sticky z-10">
                           
                        <div className=" max-md:w-[6.1rem] w-[7.1rem] text-sm truncate text-[#00A2E8]"> <WorkHistoryIcon className="!text-icon  "/>
                        {translatedMenuItems[0]} ID{/* Job ID */}
                        </div>
        <div className=" max-md:w-[8.2rem] truncate w-[8.5rem]"> <RecentActorsIcon className="!text-icon  "/>
        {translatedMenuItems[1]} {/* Requirement */}
        </div>
        <div className="max-md:w-[3.31rem] truncate  w-[6.9rem]"> 
        {translatedMenuItems[2]} {/* Quotation ID */}
           </div>
        <div className="max-md:w-[10.2rem] truncate w-[10.2rem]"> <CategoryIcon className="!text-icon text-[#42858c] "/>
        {translatedMenuItems[3]} {/* Category */}
         </div>
        <div className="max-md:w-[8.5rem] truncate w-[8.1rem]"> 
          <AcUnitIcon className="!text-icon  text-[#c42847]"/> 
          {translatedMenuItems[4]} {/* Customer */}
          </div>
        <div className="max-md:w-[3.3rem] truncate w-[8rem]"> 
          <ContactsIcon className="!text-icon text-[#d64933] "/>
          {translatedMenuItems[5]}{/* Contact */}
           </div>  
        <div className="max-md:w-[3.8rem] truncate w-[6.8rem]">
           <EventIcon className="!text-icon text-[#5A189A] "/> 
           {translatedMenuItems[6]}{/* Created */}
           </div> 
        <div className="max-md:w-[6.2rem] truncate w-[7.2rem]">
           <RecentActorsIcon className="!text-icon text-[#84a59d] "/> 
           Recruiter
           </div>
        {/* <div className="max-md:w-[8.5rem] truncate w-[2.1rem]"> 
           On 
          </div> */}
        <div className="max-md:w-[2.3rem] truncate w-[6.3rem]"> 
          <EventIcon className="!text-icon  "/> 
          {translatedMenuItems[7]}{/* Start  */}
          </div>
        <div className="max-md:w-[5.3rem] truncate w-[6rem]"> 
          <EventIcon className="!text-icon text-[#f42c04] "/>
           Duration 
           </div>
        <div className="max-md:w-[3.3rem] truncate  w-[5.5rem]">
           <AccessAlarmIcon className="!text-icon  text-[#c42847]"/>
           {translatedMenuItems[8]} {/* Billing  */}
            </div>
        <div className="max-md:w-[3.3rem] truncate  w-[4.9rem]"> 
          <PortraitIcon className="!text-icon  text-[#e4eb2f]"/> 
          {translatedMenuItems[9]} {/* Talent  */}
          </div>    
                                  
                        </div>
                        <InfiniteScroll
        dataLength={requirementTable.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllRequirementTable?<div  class="flex justify-center"><BundleLoader/></div>:null}
        height={"83vh"}
        style={{scrollbarWidth:"thin"}}
        endMessage={ <p class="flex text-center font-poppins font-bold text-xs text-red-500">You have reached the end of page. </p>}
      > 
        {
  fetchingAllRequirementTableError ? (
    <NodataFoundPage />
  ) : !fetchingAllRequirementTable && requirementTable.length === 0 ? (
    <EmptyPage />
  ) : (
    requirementTable.map((item, index) => {
         const currentdate = dayjs().format("DD/MM/YYYY");
         const date = dayjs(item.creationDate).format("DD/MM/YYYY");
         const date2 = dayjs(item.avilableDate).format("DD/MM/YYYY");
         const diff = Math.abs(
          dayjs().diff(dayjs(item.lastRequirementOn), "days")
          );    
                    return (
                        <div>
                             <div className="flex rounded justify-between  bg-white mt-1 items-center  max-sm:rounded-lg max-xl:text-[0.65rem] max-lg:text-[0.45rem] max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500   max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]">
            
                                     <div class="flex max-sm:justify-between max-sm:w-wk max-sm:items-center">
                                     <div className=" flex items-center  border-l-2 border-green-500 bg-[#eef2f9] h-8  w-[5.9rem] max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* >Source */}

                                    <div class="text-xs  font-poppins ml-gap  max-sm:text-sm">
                                    
                                          {item.jobOrder}
                                        &nbsp;
                                          {date === currentdate ? (
                                                <span class="text-[tomato] text-[0.65rem] mt-[0.4rem] font-bold">
                                                  New
                                                </span>
                                              ) : null}
                                    </div>
                                </div>
                                <div className=" flex   w-[7.5rem]   items-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[8.8rem] max-lg:w-[5.8rem] max-sm:flex-row max-sm:w-auto  ">
                                <div className="text-xs  font-poppins ml-gap ">
                                                 {item.requirementName}                                         
                                        </div>  
                                        </div>   
                                        <div className=" flex items-center  justify-center h-8 ml-gap bg-[#eef2f9] w-[8.518rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">                           
                                    <div class="text-xs truncate  font-poppins  max-sm:text-sm">
                               {item.opportunityId}
                                    </div>
                                    
                                </div>                                                                               
                                        <div className=" flex   items-center h-8 ml-gap bg-[#eef2f9]  w-[6.1rem]  max-xl:w-[8.8rem] max-lg:w-[5.8rem] max-sm:flex-row max-sm:w-auto">                                      
                                            {/* Name */}                        
                                            <div class=" flex items-center   text-xs text-blue-500 ml-gap  font-poppins font-semibold cursor-pointer">                                                            
                                             {item.category}                                  
                                            </div>
                                            </ div>                             
                                
                                </div>
                                <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                                <div className=" flex items-center h-8 ml-gap bg-[#eef2f9]  w-[8.1rem] max-xl:w-[6.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">                 
                                    <div class="text-xs  font-poppins ml-gap  max-sm:text-sm">   
                                       {item.customerName}
                                    </div>
                                 </div>         
                                 <div className=" flex items-center h-8 ml-gap bg-[#eef2f9]  w-[7.1rem] max-xl:w-[7.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">    
                                {item.contactName}
                                  </div>                
                                          <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9] w-[6.113rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* # Category */}
                            <div class="text-xs justify-center ml-gap  font-poppins  max-sm:text-sm">
                                    {date}
                                    </div>
                                </div>
                                <div className=" flex items-center h-8 ml-gap bg-[#eef2f9] w-[7.211rem] max-xl:w-[4.911rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* >Source */}

                                    <div class="text-xs ml-gap font-poppins  max-sm:text-sm">
                                    {isAssignDropdownRecruiter === index ? (
          <Select
            style={{ width: "8rem" }}
           
            mode="multiple"
            value={
              selectedRecruiter[index] ||
              (item.recruiterList ? item.recruiterList.map((user) => user.empName) : [])
            }     
          
            onChange={(values) => handleAssignRecruit(values, item,index)}
            // onKeyDown={(event) => handleKeyPress(event, index)} // Log on Enter key
            onBlur={() => setIsAssignRecruiter(null)} // Hide dropdown on blur
           
           
          >
            {props.recruiterName.map(recruit => (
                 <Option key={recruit.employeeId} value={recruit.employeeId}>
            <div className="flex">
             
            <span>{recruit.empName}</span> 
            </div>
            </Option>
              ))}
            </Select>
          ):(
          <div 
          onClick={() => {
            handleAvatarClick(index)
            }}  
          className="cursor-pointer"
        >
                                  <Avatar.Group
                   maxCount={7}
                  maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                    {item.recruiterList &&
                  item.recruiterList.map((candidate, i) => {
                    
                    const data1 =candidate.empName ? candidate.empName.slice(0, 2).toUpperCase() : ``
                    // "None"
                    return (
                      <Tooltip title={candidate.empName} key={i}>
                      <Avatar style={{ backgroundColor: "#f56a00" }}>
                      {data1}
                    
                    </Avatar>
                    </Tooltip>        
                    );
                  })}
                 
            </Avatar.Group> 
        </div>  
                              )}  
                                    </div>
                                </div>
                              </div>  

                                         <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9] w-[7.113rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* # Category */}
                            <div class="text-xs justify-center ml-gap  font-poppins  max-sm:text-sm">
                                    {/* {date} */}
                                    <RecruitmentFilter
                 handleSkillsetChoose={handleSkillsetChoose}
                
                  SkillList={item.skillSetList}
                  name={skillSetData}
                  skillName={item.skillName}
                  candidatetList={item.candidatetList}
                  fullName={item.fullName}
                />
               
                                    </div>
                                </div> 


                                
                                         <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9] w-[7.113rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* # Category */}
                            <div class="text-xs justify-center ml-gap  font-poppins  max-sm:text-sm">
                                    {/* {date} */}
                                    <span>
                <Tooltip
                  // title={text}
                  style={{ whiteSpace: "pre-line" }}
                >
                  <span
                    style={{
                      // color:
                      //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
                      cursor: "pointer",
                      marginLeft: "-4px",
                      fontSize: "large",
                    }}
                    onClick={() => {
                      props.getSkillsCount(
                        item.recruitmentId,
                        props.orgId
                      );
                      props.handleBarChartOrderModal(true);
                    }}
                  >
                    <HelpIcon 
                    // style={{ fontSize: "1rem" }} 
                    className="cursor-pointer !text-icon text-[blue]"
                    />
                  </span>
                </Tooltip>
              </span>
               
                                    </div>
                                </div> 




                                           <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9] w-[7.113rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* # Category */}
                            <div class="text-xs justify-center ml-gap  font-poppins  max-sm:text-sm">
                                    {/* {date} */}
             
                                
                  <span
                    // type="edit"
                    style={{
                      cursor: "pointer",
                      color: "tomato",
                      fontSize: "15px",
                    }}
                    onClick={() => {
                      props.LinkSkillsRecruit({
                      
                        stageId: item.stageId,
                        recruitmentProcessId: item.recruitmentProcessId,
                        skillName: skillSetData || item.skillName,
                        recruitmentId: item.recruitmentId,
                        profileId: item.profileId,
                      });
                      props.getRecruiter(
                        skillSetData || item.skillName,
                        item.recruitmentId,
                        
                      );
                      handleCandidateDataSet(item);
                    props.handleRecruiterModal(true);
                    }}
                  >
                    <InterpreterModeIcon 
                  className="cursor-pointer !text-icon text-[orange]"
                    />
                  </span>
                
                                    </div>
                                </div>  



                                           <div className=" flex  items-center  h-8 ml-gap bg-[#eef2f9] w-[7.113rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                    {/* # Category */}
                            <div class="text-xs justify-center ml-gap  font-poppins  max-sm:text-sm">
                                    {/* {date} */}
             
                                <div
                                                  style={{
                                                    margin: "2px",
                                                    borderRadius: "50%",
                                                    cursor: "pointer",
                                                  }}
                                                  onClick={() => {
                                                  handleClickCandidateName(
                                                     item
                                                    );
                                                    // this.handleClick(item.customerId);
                                                    props.getCandidateRequirement(item.recruitmentId);
                                                    props.getRequirementOwner(item.recruitmentId);
                                                    
                                                  }}
                                                >
                                                  <Avatar.Group
                                                    maxCount={7}
                                                    maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                                                  >
                                                    {item.candidatetList &&
                                                      item.candidatetList.map((candidate, i) => {
                                                        const data1 = candidate.fullName
                                                          .slice(0, 2)
                                                          .split("")[0]
                                                          .toUpperCase();
                                                        console.log("datas", data1);
                                                        return (
                                                          <Tooltip title={candidate.fullName}>
                                                            <Avatar style={{ backgroundColor: "#94b3e4" }}>
                                                              {data1}
                                                            </Avatar>
                                                          </Tooltip>
                                                        );
                                                      })}
                                                    <div
                                                      style={{ placeSelf: "center" }}
                                                      onClick={() => {
                                                      handleClickCandidateName(
                                                         item
                                                        );
                                                        // this.handleClick(item.customerId);
                                                         this.props.getCandidateRequirement(item.recruitmentId);
                                                        
                                                      }}
                                                    >
                                                      {item.candidateNo}
                                                    </div>
                                                  </Avatar.Group>
                                                </div>
                
                
                                    </div>
                                </div>            
                                <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                                <div className=" flex  items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[6.117rem] max-xl:w-[6.117rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  {/* On */}
                                  </div>
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[6.212rem]  max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                <div class="text-xs justify-center  font-poppins  max-sm:text-sm">
                                     {date2}
                                     </div>
                                 </div>
                            
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[5.918rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                 
                                    <div class="text-xs justify-center  font-poppins  max-sm:text-sm">
                                   {item.billableHour}
                                    </div>
                                  
                                </div>
                                </div>
                                <div class="flex max-sm:justify-evenly max-sm:w-wk max-sm:items-center">
                                <div className=" flex items-center justify-center h-8 ml-gap bg-[#eef2f9] w-[7.519rem] max-xl:w-[3.1rem] max-lg:w-[1.1rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">                           
                                    <div class="text-xs justify-center  font-poppins  max-sm:text-sm">
                                   {item.billing}
                                    </div>
                                    
                                </div>                         
                 </div>   
                
                            </div>
                        </div>
                    )
                }))}
     </InfiniteScroll> 
     <SkillBarChatModal
          skillsCount={props.skillsCount}
         // candidatePostData={this.state.candidatePostData}
          showBarChartModal={props.showBarChartModal}
          handleBarChartOrderModal={props.handleBarChartOrderModal}
          //particularRowData={particularRowData}
        />
          <AddRecruiterModal
                    addRecruiterModal={props.addRecruiterModal}
                    handleRecruiterModal={props.handleRecruiterModal}
                    recruiter={props.recruiter}
                    //recruitmentId={this.state.recruitmentId}
                    candidatePostData={candidatePostData}
                    // opportunityId={this.props.opportunityId}
                  />
         <StyledDrawer
          title={currentCandidate.jobOrder}
          width="58rem"
          visible={subTableVisible}
          closable
          placement="right"
          destroyOnClose
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          onClose={() =>
            handleClickCandidateName(currentCandidate.recruitmentId)
          }
        >
          <SubTableClickCandidate
                    //customerId={this.state.customerId}
                      requirementOwner={props.requirementOwner}
                      fetchingCandidateRequirement={
                        props.fetchingCandidateRequirement
                      }
                      candidateRequirement={props.candidateRequirement}
                    />
                    </StyledDrawer>
                    </div>
                </div>
        </div>
    );
};

const mapStateToProps = ({ auth, requirement,opportunity }) => ({
  user: auth.userDetails,
  requirementTable:requirement.requirementTable,
  addRecruiterModal:requirement.addRecruiterModal,
  userId:auth.userDetails.userId,
  orgId:auth.userDetails.organizationId,
  skillsCount: opportunity.skillsCount,
  showBarChartModal:opportunity.showBarChartModal,
  SkillList: opportunity.SkillList,
  fetchingCandidateRequirement: opportunity.fetchingCandidateRequirement,
  requirementOwner: opportunity.requirementOwner,
  recruiter: opportunity.recruiter,
  recruiterName: opportunity.recruiterName,
  candidateRequirement: opportunity.candidateRequirement,
  fetchingAllRequirementTable:requirement.fetchingAllRequirementTable,
  fetchingAllRequirementTableError:requirement.fetchingAllRequirementTableError
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAllRequirementTable,
            getRecruiterName,
            handleRecruiterModal,
            getSkillsCount,
            getRecruiter,
            LinkSkillsRecruit,
            updateRecruiterData,
            ClearReducerDataOfRequirement,
            handleBarChartOrderModal,
            getCandidateRequirement
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RequirementTable);
