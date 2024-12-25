import React, { useEffect, useState,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Tooltip, Menu, Dropdown, Progress,Select } from "antd";
import { CurrencySymbol, } from "../../../../Components/Common";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LockIcon from "@mui/icons-material/Lock";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { emptyLeads,getCrm}from"./././../../../Leads/LeadsAction";
import {
  MultiAvatar,
  MultiAvatar2,
} from "../../../../Components/UI/Elements";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import "jspdf-autotable";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import StairsIcon from '@mui/icons-material/Stairs';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import {
  getRecruiterList,
  handleUpdateOpportunityModal,
  setEditOpportunity,
  LinkStageOpportunity,
  deleteOpportunityData,
  updateOwneroppById,
      handleOpportunityDrawerModal,
      getAllRecruitmentByOppId,
        getAllRecruitmentPositionByOppId,
          getAllRecruitmentAvgTimeByOppId,
         getAllRecruitmentPositionFilledByOppId,
         getAllRecruitmentDetailsByOppId,
         getOpportunitySKill,
         getTeamOpportunity,
         getTeamUserList,
          updateOpportunity

} from "../../OpportunityAction";
import SearchedDataOpportunity from "./SearchedDataOpportunity";
import { BundleLoader } from "../../../../Components/Placeholder";
import relativeTime from 'dayjs/plugin/relativeTime';
import { base_url2 } from "../../../../Config/Auth";
import EmptyPage from "../../../Main/EmptyPage";
import axios from "axios";
import OpportunitySelectStages from "./OpportunitySelectStages";
const Option = Select;
const AddOpportunityDrawerModal =lazy(()=> import("./AddOpportunityDrawerModal"));
const UpdateOpportunityModal =lazy(()=> import("../UpdateOpportunity/UpdateOpportunityModal"));
const ReinstateToggleForLost =lazy(()=> import("../../Child/OpportunityTable/ReinstateToggleForLost"));


dayjs.extend(relativeTime);

const getRelativeTime = (creationDate) => {
    const now = dayjs();
    const creationDay = dayjs(creationDate);

    if (creationDay.isSame(now, 'day')) {
        return 'Today';
    } else {
        return creationDay.from(now); 
    }
};

function OpportunityTeamsCard(props) {
  const [hasMore, setHasMore] = useState(true);
  const [pageNo, setPageNo] = useState(0);
  const [page, setPage] = useState(0);
  const [page1, setPage1] = useState(0);
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAssignDropdownVisible, setIsAssignDropdownVisible] = useState(null);
    const [selectedAssign, setSelectedAssign] = useState();
  useEffect(() => {
    if(props.role==="USER"&&user.department==="Recruiter"){
      props.getRecruiterList(props.recruiterId);     
    }else{
     
    } 
    props. getTeamOpportunity(props.userId,pageNo);
    setPageNo(pageNo + 1);
    props.getTeamUserList(props.userId)
    // props.getCrm();
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
  // const handleLoadMore = () => {
  //   setPage(page + 1);
  //     props. getTeamOpportunity(page);
  // }

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
        '110', // 0
'97', // 1
'216', // 2
'176', // 3
'218', // 4
'219', // 5
'76', // 6
'77' ,// 7
"232", // 'Click to Open' 8
"170", // "Edit" 9
 "1259",// "Do you want to delete?" 10
 "84",// notes" 11
 "213", //12
 "73" ,//contact


        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);

  const handleAssignChange = (newOppId,value) => {

    props.updateProspectUser(newOppId,value);
    setIsAssignDropdownVisible(null); // Hide the dropdown after the request
  };
  useEffect(() => {
    return () => props.emptyLeads();
  }, []);

  const handleLoadMore = () => {
    setPage(page + 1);
    props. getFullOpportunity(page);
    const callPageMapd = props.teamOpportunity && props.teamOpportunity.length &&props.teamOpportunity[0].pageCount
    setTimeout(() => {
      const {
        getTeamOpportunity,
       // userDetails: { employeeId },
      } = props;
      if  (props.teamOpportunity)
      {
        if (pageNo < callPageMapd) {
            setPageNo(pageNo + 1);
            getTeamOpportunity(props.userId,pageNo); 
      }
      if (pageNo === callPageMapd){
        setHasMore(false)
      }
    }
    }, 100);
  };
  
    const [currentOpportunityId, setCurrentOpportunityId] = useState("");
    function handleSetCurrentOpportunityId(opportunityId,opportunityName) {
      setCurrentOpportunityId(opportunityId,opportunityName);
    }
    const viewAnDownloadPdf= async (item) => {  
      try {
        const response = await axios.get(`${base_url2}/quotation/customer/pdf/${`opportunity`}/${item.opportunityId}`, {
          responseType: 'blob',
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        });
    
        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const filename = 'custom-pdf-name.pdf';
    
        window.open(url, '_blank');
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = filename; 
        downloadLink.click(); 
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }  
    
    };
    const handleButtonClick = (employeeId) => {
      props.getCrm(employeeId, page1, "creationdate");
      props.emptyLeads();
      setSelectedEmployee(employeeId);
    };

    const {
        user,
        fetchinglostOpportunity,
    fetchinglostOpportunityError,
    deleteLostOpportunity,
    handleUpdateOpportunityModal,
    updateOpportunityModal,
    deleteOpportunityData,
    fetchingTeamOpportunity,
    teamOpportunity,
     
      } = props;

      
      if (loading) {
        return <div><BundleLoader/></div>;
      }
      return (    
  <>
    {props.ooportunitySerachedData.length > 0 ? (
    <SearchedDataOpportunity
    ooportunitySerachedData={props.ooportunitySerachedData}
    translateText={props.translateText}
    selectedLanguage={props.selectedLanguage}
    />
  ) : (
    <div className=" flex">
       <div className=' flex rounded w-[13vw] h-[85vh] flex-col border border-[#0000001f] items-center justify-center  '>
      <div class="flex rounded w-[92%] m-1 p-1 box-content border border-[#0000001f] h-6 bg-[white] mt-1  items-center shadow-[#a3abb980] ">
       <div class="w-[14vw]"> Search team Member</div>
        </div>
        <div class="flex flex-col rounded w-[11vw]  h-[78vh] box-content border bg-[white] mt-1 border-[#0000001f]   shadow-[#a3abb980]">
        {props.teamUserList.map((item,index) =>{
           return (
         <div class="rounded-md border-2 bg-[#ffffff] shadow-[0_0.25em_0.62em] shadow-[#aaa] h-[4.8rem] 
                  text-[#444444] mt-1  max-sm:w-wk flex flex-col scale-[0.99] hover:scale-100 ease-in duration-100   border-solid  p-1 leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE] ">
        <div class="flex items-center h-16">
          <div class=" flex  mr-[0.2rem] h-15" >
            <MultiAvatar
              primaryTitle={item.opportunityName}
              imageId={item.imageId}
              imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
            />
          </div>
          
          <div class="flex  overflow-hidden">
          
          <div class="font-semibold text-[#337df4] cursor-pointer !text-lm font-poppins"  >
        


          {item.opportunityName}
        </div> 
        </div>
          
       
        </div>
        <div className="flex flex-col max-sm:justify-between ">
          
        <div class="overflow-hidden text-ellipsis font-poppins cursor-pointer text-lm truncate  flex items-center">
              {item.mobileNo}    </div>
            
          <div>
          <div class="font-medium text-xs ">
       
          <div class="overflow-hidden  text-ellipsis font-poppins cursor-pointer text-lm truncate  flex items-center">
                {item.emailId}  
              </div>
          </div>
          </div>
          </div>    
      </div>
  )
})}
        </div>
        </div>
  <div className=' flex  sticky  w-[87%] z-auto'>
<div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
 <div className="flex max-sm:hidden  w-[94%]  max-xl:w-[87%] p-1 bg-transparent font-bold sticky items-end z-10">
 <div className="   flex justify-between w-[88%] font-bold  items-end font-poppins max-xl:text-[0.65rem] max-lg:text-[0.45rem] !text-lm">
   <div className=" w-[10.1rem] truncate text-[#00A2E8] text-sm ">
   <LightbulbIcon className="!text-icon  text-[#84a59d]"/>{translatedMenuItems[12]} ID</div>
        <div className=" w-[12.1rem] truncate max-md:w-[16.8rem]  max-xl:w-[15.8rem] ">
          <RequestQuoteIcon className="!text-icon text-[#aa3e98] "/>
        {translatedMenuItems[0]}</div>
        <div className=" w-[16.5rem] truncate max-md:w-[12.2rem]  "> 
        <ContactPageIcon className='!text-icon text-[#f28482] '  />  {translatedMenuItems[13]}</div>
        <div className=" w-[8.2rem] truncate max-md:w-[12.2rem] ">
        <CurrencyExchangeIcon className='!text-icon text-[#4c0827]' /> {translatedMenuItems[4]}</div>
        <div className=" w-[8.5rem] truncate max-md:w-[10.6rem]  ">
        <StairsIcon className='!text-icon text-[#f19953] '  />  {translatedMenuItems[5]}</div> 
        <div className=" w-[6.12rem] truncate max-md:w-[11.12rem] "> 
        <AccountCircleIcon className="!text-icon mr-1 text-[#f28482]"/>{translatedMenuItems[6]}</div> 
        <div className=" w-[6.1rem] truncate  max-md:w-[15.1rem] "> 
        <AccountCircleIcon className="!text-icon mr-1 text-[#f28482]"/>{translatedMenuItems[7]}</div>      
        <div className="w-12"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={teamOpportunity.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingTeamOpportunity?<div class="flex justify-center" >Loading...</div> :null}
        style={{scrollbarWidth:"thin"}}
        height={"83vh"}
        endMessage={ <p class="flex text-center font-bold text-xs text-red-500">You have reached the end of page. </p>}
      >
     
 { !fetchingTeamOpportunity && teamOpportunity.length === 0 ?<EmptyPage/>:teamOpportunity.map((item,index) =>  {
                 
                 var findProbability = item.probability;
                 item.stageList.forEach((element) => {
                   if (element.stageName === item.oppStage) {
                     findProbability = element.probability;
                   }
                 });
                 return (
                  <div className="max-sm:w-wk">        
                   <div className="flex rounded justify-between  bg-white  items-center py-ygap max-sm:rounded-lg max-xl:text-[0.65rem] max-lg:text-[0.45rem]  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500  max-sm:h-[8rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid   leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                   <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                   <div className=" flex   w-[8.3rem] items-center   border-l-2 border-green-500 h-8  bg-[#eef2f9] max-xl:w-[5.5rem] max-lg:w-[3.9rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
<div class=" text-xs ml-gap items-center font-poppins  max-sm:text-sm">   
{item.newOppId}
</div>
</div>
                    <div className=" flex  w-[10rem] h-8 ml-gap bg-[#eef2f9] max-xl:w-[10rem] max-lg:w-[8rem] max-sm:flex-row max-sm:w-auto  ">
                              <div className=" flex items-center">
                                  <MultiAvatar
                                    primaryTitle={item.opportunityName}
                                    imageId={item.imageId}
                                    imgWidth={"1.8rem"}
                                    imgHeight={"1.8rem"}
                                  />        
                             </div>                                
                                      <Tooltip>
                                      <div class=" flex max-sm:w-full  flex-row items-center">    
                                          <div class=" text-xs text-blue-500  ml-gap font-poppins font-semibold cursor-pointer">                                       
                                          <Link class="overflow-ellipsis max-sm:text-sm whitespace-nowrap  h-8 text-xs p-1 text-[#042E8A] cursor-pointer"  to={`/opportunity/${item.opportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link>
                                          </div>
</div>
                                      </Tooltip>                    
                              </div>
                              </div>
                              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                              <div className=" flex   w-[14rem] items-center  h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.5rem] max-lg:w-[3.9rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                              <div className=" flex   w-[9rem] items-center   max-xl:w-[5.5rem] max-lg:w-[3.9rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                                  <div class=" text-xs ml-gap font-poppins  max-sm:text-sm">                                 
                                  {item.customer}               
                                  </div>
                              </div>                      
                              <div className=" flex  w-[5rem] items-center justify-center  max-xl:w-[4rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">                            
                                <div class=" text-xs font-poppins  max-sm:text-sm">                            
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
                              <div className=" flex  w-[6.45rem] items-center justify-start  h-8 ml-gap bg-[#eef2f9] max-xl:w-[5rem] max-lg:w-[4rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                                  <div class=" text-xs ml-gap font-poppins text-center  max-sm:text-sm">
                                  <CurrencySymbol currencyType={item.currency} />
          &nbsp;
          {item.proposalAmount}
                                  </div>
                              </div>
                              </div>
                              <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                              <div className=" flex   w-[7.01rem] items-center  justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.1rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">
                                  <div class=" text-xs  font-poppins text-center  max-sm:text-sm">
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
    <OpportunitySelectStages
        rec={item}
        oppStage={item.oppStage}
        stageClick={(stagesId) => {
          props.LinkStageOpportunity(
            {
              opportunityId: item.opportunityId,
              opportunityStagesId:stagesId
            },
           
          );
        }}
      />{" "}
  
</Menu.Item>
</Menu>
</div>
}
trigger={["click"]}
>
<Tooltip title={item.oppStage}>
{" "}
<Progress
type="circle"
className=" !text-xl cursor-pointer text-[red]"
percent={findProbability}
width={30}
strokeColor={"#005075"}
/>
</Tooltip>
</Dropdown>

                                  </div>
                              </div>
                              {/* <div className=" flex w-[5.25rem] items-center  justify-center h-8 ml-gap bg-[#eef2f9] max-xl:w-[4.2rem] max-lg:w-[3.8rem] max-sm:w-auto max-sm:flex-row  max-sm:justify-between ">                  
                              <div class=" text-xs  font-poppins">
                            {item.assignedTo === null ? (
        "None"
      ) : (
                            <div>
         {isAssignDropdownVisible === item.newOppId ? (
          <Select
            style={{ width: "8rem" }}
            value={selectedAssign}          
            onChange={(value) => {
              setSelectedAssign(value); 
              handleAssignChange(item.newOppId,value); 
            }}
             onBlur={() => setIsAssignDropdownVisible(null, null, null)} 
            autoFocus
          >
             {props.crmAllData.map(customer => (
                 <Option key={customer.employeeId} value={customer.employeeId}>
                  <div className="flex">
                   <MultiAvatar
          primaryTitle={customer.empName} 
          imageId={item.imageId}
                    imageURL={item.imageURL}
                    imgWidth={"1.8rem"}
                    imgHeight={"1.8rem"} 
        />
                  <span>{customer.empName}</span> 
                  </div>
                 </Option>
               ))}
          </Select>
        ):(
          <div 
          onClick={() => {
            setIsAssignDropdownVisible(item.newOppId); 
            setSelectedAssign(item.assignedTo); 
            }}  
          className="cursor-pointer"
        >
          <MultiAvatar2
          primaryTitle={item.assignedTo}
          imgWidth={"1.8rem"}
          imgHeight={"1.8rem"}
        />   
        </div>  
                              )}  
    </div>
       )}
                            </div>
                              </div> */}
                              <div className=" flex w-20 items-center  justify-center h-8 ml-gap bg-[#eef2f9] max-lg:w-[2rem] max-sm:w-auto max-sm:flex-row  mb-1 max-sm:justify-between "> 
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
                 <div className=" flex justify-center items-center w-[6rem] h-8 ml-gap bg-[#eef2f9] max-sm:w-auto max-xl:w-[3rem] max-lg:w-[2rem] max-sm:flex-row  max-sm:justify-between ">
                      <span class="bg-blue-100 text-blue-800 text-[0.6rem] w-[6rem] font-medium inline-flex items-center py-[0.1rem] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
<svg class="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
</svg>
{getRelativeTime(item.creationDate)}
</span></div>
                 </div>
                 <div class="flex max-sm:justify-between max-sm:w-wk h-8 ml-gap bg-[#eef2f9] items-center justify-end ">
                 <div>
                  <ReinstateToggleForLost 
          opportunityId={item.opportunityId}                
          />
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
           className=" !text-icon cursor-pointer text-[#df9697]"
           />
         )}
       </span>
                      </div>       
                  <div>
                  <Tooltip title={translatedMenuItems[8]}><span
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
                  <div >
                  <PictureAsPdfIcon className="!text-icon text-[red] cursor-pointer" 
    onClick={()=> viewAnDownloadPdf(item)}
    />
          </div>              
                    <div>
                       <Tooltip
                      placement="right"
                      title={translatedMenuItems[9]}
                    >
                      {user.opportunityUpdateInd ===true && (          
            <span
            className=" !text-icon cursor-pointer text-[grey]"           
                onClick={() => {
                props.setEditOpportunity(item);
                handleUpdateOpportunityModal(true);
                handleSetCurrentOpportunityId(item);
              }}
            >
                          <BorderColorIcon
                          className=" !text-icon cursor-pointer text-[tomato]"                         
                          />
                        </span>
                      )}
                    </Tooltip>
                    </div>         
                    <div>
                    <StyledPopconfirm
                      title={translatedMenuItems[10]}
                      onConfirm={() =>
                        deleteLostOpportunity(item.opportunityId)
                      }
                    >
                         <Tooltip                  
                      title={translatedMenuItems[11]}
                    >
                        {user.opportunityDeleteInd ===true && (                    
                      <DeleteOutlineIcon className="!text-icon text-[tomato] cursor-pointer"  />
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
      </InfiniteScroll>
      </div>
      </div>
      </div>
 )} 

      <UpdateOpportunityModal
        opportunityId={currentOpportunityId}
        opportunityName={currentOpportunityId}
        opportunityData={currentOpportunityId}
        updateOpportunityModal={updateOpportunityModal}
        handleUpdateOpportunityModal={handleUpdateOpportunityModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
        translateText={props.translateText}
        selectedLanguage={props.selectedLanguage}
        translatedMenuItems={props.translatedMenuItems}
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
               translateText={props.translateText}
               selectedLanguage={props.selectedLanguage}
               translatedMenuItems={props.translatedMenuItems}
             // candidateByUserId={this.props.candidateByUserId}
      />
    </>
  );
}


const mapStateToProps = ({ auth, account, opportunity,leads,customer }) => ({
  crmAllData:leads.crmAllData,
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,
  opportunitySkills:opportunity.opportunitySkills,
  sales: opportunity.sales,
  recruiterName: opportunity.recruiterName,
  recruiterList:opportunity.recruiterList,
  fetchingTeamOpportunity:opportunity.fetchingTeamOpportunity,
  fetchingTeamOpportunityError:opportunity.fetchingTeamOpportunityError,
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
    allOpportunity:opportunity.allOpportunity,
    teamOpportunity:opportunity.teamOpportunity,
    ooportunitySerachedData: opportunity.ooportunitySerachedData,
    teamUserList:customer.teamUserList
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      emptyLeads,
      getCrm,
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
         getTeamOpportunity,
       getTeamUserList,
       LinkStageOpportunity
    //      LinklostdOpportunity,
    //      deleteLostOpportunity,
    },
    dispatch
  );
export default connect(
mapStateToProps,
mapDispatchToProps
)(OpportunityTeamsCard);
