import React, { useEffect, useState,lazy,Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Tooltip, Menu, Dropdown, Progress ,Input} from "antd";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import LockIcon from "@mui/icons-material/Lock";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import DateRangeIcon from '@mui/icons-material/DateRange';
import RepartitionIcon from '@mui/icons-material/Repartition';
import CategoryIcon from '@mui/icons-material/Category';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StairsIcon from '@mui/icons-material/Stairs';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { getSources } from "../../../../Containers/Settings/Category/Source/SourceAction";
import { getSectors } from "../../../../Containers/Settings/Sectors/SectorsAction";
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
         LinklostdOpportunity,
         deleteLostOpportunity,
         getTeamUserList
} from "../../../Opportunity/OpportunityAction";
import {getWonDeals,handleUpdateDealModal,handleDealsNotesDrawerModal,updateDeal } from "../../DealAction";
import { BundleLoader } from "../../../../Components/Placeholder";
const AddDealsNotesDrawerModal =lazy(()=>import("../AddDealsNotesDrawerModal"));


function DealWonCard(props) {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [editableField, setEditableField] = useState(null); 
  const [editingValue, setEditingValue] = useState(""); 
  const [touchedSector, setTouchedSector] = useState(false);
  const [touchedSource, setTouchedSource] = useState(false);

  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
          "110",//0  Name
          "511",//1 Investor
          "73",//2 Contact
          "176",//3 Start Date
          "1159",//4 Values
          "219",//5 Stages
          "76",//6 Assigned
          "77",//7 Owner
          "232", // Click to Open
          "316", // Notes
          "170", // "Edit"
          "1259",// "Do you want to delete?"          
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

  useEffect(() => {
    if(props.role==="USER"&&user.department==="Recruiter"){
      props.getRecruiterList(props.recruiterId);     
    }else{   
    } 
    props. getWonDeals(props.userId,page);
    setPage(page + 1);
    props.getTeamUserList(props.userId)
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
      props. getWonDeals(props.userId,page);    
  }
  const [currentItem, setCurrentItem] = useState("");

  function handleSetCurrentItem(item) {
    setCurrentItem(item);
  }

    const handleEditRowField = (investorId, field, currentValue) => {
      setEditableField({ investorId, field });  
      setEditingValue(currentValue);  
    };
    const handleChangeRowItem = (e) => {
      setEditingValue(e.target.value);
    };
    const handleUpdateSubmit = async () => {
      const { investorId, field } = editableField;
      const updatedData = {};
      let mappedField = field;
      if (field === 'name') {
        mappedField = 'name'; 
      } else if (field === 'sector') {
        mappedField = 'sectorId';
      } else if (field === 'source') {
        mappedField = 'source';
      } else if (field === 'department') {
        mappedField = 'departmentId';
      }
      updatedData[mappedField] = editingValue;
      props.updateDeal (updatedData,investorId)
      setEditableField(null);
        setEditingValue("");
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleUpdateSubmit(); 
      }
    };
    const handleChangeRowSelectItem = async (value) => {
      setEditingValue(value);
  
        const { investorId, field } = editableField;
        const updatedData = {};
        let mappedField = field;
      
       // Map the field to the correct key if needed
       if (field === 'name') {
        mappedField = 'name'; 
      } else if (field === 'sector') {
        mappedField = 'sectorId';
        } else if (field === 'source') {
          mappedField = 'source';
        } else if (field === 'department') {
          mappedField = 'departmentId';
        }
        updatedData[mappedField] = value; // Update the value with selected option
        props.updateDeal (updatedData,investorId)
        setEditableField(null);
        setEditingValue("");
      
    };
  
    const handleContract = async (checked, investorId) => {
      const newCategory = checked ? "Institutional" : "Private";
    
      // Map the field to the correct key
      //  if (field === 'name') {
      //   mappedField = 'name'; 
      const mappedField = "pvtAndIntunlInd";
      const updatedData = { [mappedField]: newCategory }; // Update the value with toggle state
    
      // Call the prop function to update the data
      props.updateDeal (updatedData, investorId);
    
      // Optionally reset any temporary state (if required)
      setEditableField(null);
    };
    const handleSelectSectorFocus = () => {
      if (!touchedSector) {
        props.getSectors();
        setTouchedSector(true);
      }
    };
    const handleSelectSourceFocus = () => {
      if (!touchedSource) {
        props.getSources(props.orgId);
        setTouchedSource(true);
      }
    };
    const {
        user,
        fetchingWonDeals,
        handleUpdateDealModal,
        openupdateDealModal,
        deleteOpportunityData,
        wonDeals,
      } = props;

      if (loading) {
        return <div><BundleLoader/></div>;
      }
      return (    
  <>    
<div class="rounded m-1 max-sm:m-1 p-1 w-[100%]  overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[white]">
      <div className=" flex max-sm:hidden justify-between w-[100%]  p-1 bg-transparent font-bold font-poppins   max-xl:text-xs] max-lg:text-[0.45rem] !text-lm sticky  z-10">
        <div className=" w-[14.82rem] max-md:w-[13.82rem] text-sm truncate max-xl:w-[11.12rem] text-[#3a86ff]">
        <CategoryIcon className='!text-icont ext-[#3a86ff]' />
        {translatedMenuItems[0]}
       {/* "name" */}
                </div>
        <div className=" w-[9.22rem] max-md:w-[7.21rem]  truncate max-xl:w-[7.21rem]">
        <RepartitionIcon className='!text-icon text-[#BBE6E4]' />
        {translatedMenuItems[1]}
         {/* investor"              */}
                </div>
        <div className=" truncate  w-[9.5rem] max-md:w-[9.21rem] max-xl:w-[9.21rem] ">
        <ContactPageIcon className='!text-icon text-[#4F5D75]' />
        {translatedMenuItems[2]}
        {/* "Contact"          */}
                </div>
        <div className=" truncate w-[7.45rem] max-md:w-[6.11rem] max-xl:w-[7.11rem]">
        <DateRangeIcon className="!text-icon mr-1 text-[#1b263b]"/>
        {translatedMenuItems[3]}
       {/* startdate" */}       
                </div>
        <div className=" truncate w-[9.16rem] max-md:w-[7.16rem] max-xl:w-[7.16rem]">
        <CurrencyExchangeIcon className="!text-icon mr-1 text-[#ffbe0b]"/>
        {translatedMenuItems[4]}
                </div>
        <div className=" truncate w-[9.9rem] max-md:w-[8.14rem] max-xl:w-[6.14rem]">
        <StairsIcon className='!text-icon mr-1 text-[#2f3e46]' />
        {translatedMenuItems[5]}
         {/* "stages" */}             
                </div> 
        <div className="truncate w-[7.9rem] max-md:w-[8.1rem] max-xl:w-[7.1rem]">
        <AccountCircleIcon className="!text-icon mr-1 text-[#d64933]"/> 
        {translatedMenuItems[6]}
        {/* Assigned" */}      
                </div>
        <div className="truncate w-[16.9rem] max-md:w-[17.5rem] max-xl:w-[17.5rem]">
        <AccountCircleIcon className="!text-icon mr-1 text-[#d64933]"/> 
        {translatedMenuItems[7]} 
        {/* owner" */}
                </div>
      </div>
      <InfiniteScroll
         dataLength={wonDeals.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingWonDeals ?<div><BundleLoader/></div>:null}
        height={"83vh"}
        style={{scrollbarWidth:"thin"}}
      >
         {wonDeals.map((item) => {
                 
                 var findProbability = item.probability;
                 item.stageList.forEach((element) => {
                   if (element.oppStage === item.oppStage) {
                     findProbability = element.probability;
                   }
                 });
                 return (
                    <div>
                    <div
                className="flex rounded justify-between  bg-white  h-8 items-center max-sm:rounded-lg  max-xl:text-xs] max-lg:text-[0.45rem]  max-sm:bg-gradient-to-b max-sm:from-blue-200 max-sm:to-blue-100 max-sm:border-b-4 max-sm:border-blue-500   p-1 max-sm:h-[9rem] max-sm:flex-col scale-[0.99] hover:scale-100 ease-in duration-100 shadow  border-solid m-1  leading-3 hover:border  hover:border-[#23A0BE]  hover:shadow-[#23A0BE]"
              >
                      <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                      <div className=" flex border-l-2 border-green-500 bg-[#eef2f9] w-[14.1rem] max-xl:w-[8.1rem] max-lg:w-[6.1rem] max-sm:flex-row max-sm:w-auto  items-center">
                                <div>
            <MultiAvatar
              primaryTitle={item.opportunityName}
              imageId={item.imageId}
              // imageURL={imageURL}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
</div>                                               
                                        <Tooltip>
                                        <div class=" flex max-sm:w-full w-[100%] flex-row md:flex-col">                                   
                                           {/* Name */}                                   
                                           <div class=" flex items-center justify-between  text-xs text-blue-500 ml-gap  font-poppins font-semibold cursor-pointer">
                                        <Link class="overflow-ellipsis whitespace-nowrap text-xs  text-[#042E8A] max-sm:text-sm cursor-pointer"  to={`dealDetails/${item.invOpportunityId}`} title={item.opportunityName}>
      {item.opportunityName}
    </Link> 
    <div>
                      {editableField?.investorId === item.investorId &&
   editableField?.field === 'name' ? (
<Input
  type="text"
  className="h-7 w-[4rem] text-xs"
  value={editingValue}
  onChange={handleChangeRowItem}
  onMouseDown={handleUpdateSubmit}
  onKeyDown={handleKeyDown} 
  onBlur={() => handleEditRowField(null, null, null)}
  autoFocus
/>
) : (
<div onClick={() => 
    handleEditRowField(item.investorId, 'name', item.name)} 
    className="cursor-pointer text-xs font-poppins flex items-center opacity-0 hover:opacity-100 ">
   <BorderColorIcon  className=" !text-icon cursor-pointer"/>
    
    </div> 
)}                 
                      </div>    
                   </div>
                 
</div>
                                        </Tooltip>                         
                                </div>
                                </div>   
                                <div className=" flex   w-[9.4rem] items-center mt-1 h-8 ml-gap bg-[#eef2f9] max-xl:w-[5.8rem] max-lg:w-[4.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                       {/* sector */}
                                   
                                    <div class=" text-xs  font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-xs">   
                                    <Link to ="/investor">
                        {item.investor}
                        </Link>
                                    </div>
                                </div>
                                 
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex   items-center justify-center h-8 ml-gap mt-1 bg-[#eef2f9]  w-[9.4rem] max-xl:w-[9.4rem] max-lg:w-[3.4rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                                              {/* Country */}
                                  <div class=" text-xs  font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-xs">                            
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
                                <div className=" flex items-center justify-center h-8 ml-gap mt-1 bg-[#eef2f9] w-[7.2rem] max-xl:w-[5.2rem] max-lg:w-[4.21rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  {/* Deals */}

                                    <div class=" text-xs justify-center  font-poppins max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-xs">
                                    {dayjs(item.startDate).format("DD/MM/YYYY")}
                                    </div>
                                </div>                           
                                <div className=" flex items-center justify-center h-8 ml-gap mt-1 bg-[#eef2f9] w-[9.2rem] max-xl:w-[4.2rem] max-lg:w-[4.2rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  {/* Value */}
                                    <div class=" text-xs  font-poppins text-center max-xl:text-xs max-lg:text-[0.45rem] max-sm:text-xs">              
            &nbsp;
            {item.proposalAmount}
                                    </div>
                                </div>
                                </div>
                                <div class="flex max-sm:justify-between max-sm:w-wk items-center">
                                <div className=" flex items-center justify-center h-8 ml-gap mt-1 bg-[#eef2f9] w-[9.9rem] max-xl:w-[8.11rem] max-lg:w-[6.11rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                               {/* Value */}

                                    <div class=" text-xs  mt-1 font-poppins text-center max-sm:text-xs">
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
              <Tooltip title={item.oppStage}>
                {" "}
                <Progress className="cursor-pointer text-red text-lg"
                  type="circle"              
                  percent={findProbability}
                  width={30}
                  strokeColor={"#005075"}
                />
              </Tooltip>
            </Dropdown>
                                    </div>
                                </div>
                                <div className=" flex  items-center justify-center h-8 ml-gap mt-1 bg-[#eef2f9] w-[8.1rem] max-xl:w-[5.8rem] max-lg:w-[4.8rem] max-sm:flex-row max-sm:w-auto max-sm:justify-between ">
                                  {/* Assigned */}

                                    <div class=" text-xs  font-poppins max-sm:text-xs">                                   
                                    <span>
                                    <MultiAvatar2
              primaryTitle={item.assignedTo}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
            </span>     
                                    </div>
                                </div>
                                <div className=" flex items-center justify-center h-8 ml-gap mt-1 bg-[#eef2f9] w-[12.5rem] max-xl:w-[7.5rem] max-lg:w-[4.5rem] max-sm:flex-row max-sm:w-auto  max-sm:justify-between ">
                                {/* Owner */}
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
                   <div class="flex max-sm:justify-evenly max-sm:w-wk items-center  justify-end h-8 ml-gap mt-1 bg-[#eef2f9]">
                   
                    <div>
                    <Tooltip title= {translatedMenuItems[8]}><span
            onClick={() => {
           props.LinkClosedOpportunity(
             item.opportunityId,
             {
               closeInd:false,
             }         
           );         
         }}                
         >
          <LockIcon className="!text-icon cursor-pointer" />
            </span>
     </Tooltip> 
                    </div>
                    <div>
                    <Tooltip
                        placement="right"
                        title= {translatedMenuItems[9]}
                      >
                        <span
                            onClick={() => {
                            props.handleDealsNotesDrawerModal(true);
                            handleSetCurrentItem(item);
                          }}
                        >
                          <NoteAltIcon
                            className="!text-icon cursor-pointer text-[green]"
                          />
                        </span>
                      </Tooltip>
                    </div>                                          
              
                      <div>
                      <StyledPopconfirm
                        title= {translatedMenuItems[11]}
                        onConfirm={() =>
                          deleteOpportunityData(item.opportunityId)
                        }
                      >
                        {user.imInd === true && user.dealDeleteInd === true && (
                        
                        <DeleteOutlineIcon className="!text-icon text-[tomato] cursor-pointer"  />
                          )}
                          </StyledPopconfirm>
                      </div>                                                                
                   <div>
                   <span class=" cursor-default"     
         
           onClick={() => {
            
           }}
         >
           {user.pulseAccessInd === true && (
             <MonitorHeartIcon className="!text-icon text-[#df9697]" />
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
      <Suspense fallback={<BundleLoader />}>

      <AddDealsNotesDrawerModal
        currentItem={currentItem}
        addDrawerDealsNotesModal={props.addDrawerDealsNotesModal}
        handleDealsNotesDrawerModal={props.handleDealsNotesDrawerModal}
        handleSetCurrentItem={handleSetCurrentItem}
      />
      </Suspense>
    </>
  );
}
const mapStateToProps = ({ auth, deal, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,
  opportunitySkills:opportunity.opportunitySkills,
  recruiterName: opportunity.recruiterName,
  recruiterList:opportunity.recruiterList,
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

    fetchingWonDeals:deal.fetchingWonDeals,
    wonDeals:deal.wonDeals,
    openupdateDealModal: deal.openupdateDealModal,
    addDrawerDealsNotesModal: deal.addDrawerDealsNotesModal,
  
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
         getWonDeals,
         LinklostdOpportunity,
         deleteLostOpportunity,
         handleUpdateDealModal,
         handleDealsNotesDrawerModal,
         getTeamUserList,
         updateDeal ,
         getSectors,
         getSources
    },
    dispatch
  );
export default connect(
mapStateToProps,
mapDispatchToProps
)(DealWonCard);
